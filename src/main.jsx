
import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import initSqlJs from 'sql.js';
import { COURSE } from './courseData.js';
import './styles.css';

const LS_USER = 'sql_pwa_user_v1';
const LS_PROGRESS = 'sql_pwa_progress_v1';
const LS_DB_RESET = 'sql_pwa_db_reset_v1';

function loadProgress(){
  try { return JSON.parse(localStorage.getItem(LS_PROGRESS) || '{}'); } catch { return {}; }
}
function saveProgress(p){ localStorage.setItem(LS_PROGRESS, JSON.stringify(p)); }
function normalizeSql(s){ return (s||'').trim().replace(/;+\s*$/,''); }
function isSafeSelect(sql){
  const s = normalizeSql(sql).toLowerCase();
  if (!s) return false;
  if (/(^|\s)(insert|update|delete|drop|alter|create|truncate|replace|attach|detach|pragma)\b/i.test(s)) return false;
  return /^(select|with)\b/i.test(s);
}
function runQuery(db, sql){
  const clean = normalizeSql(sql);
  if (!isSafeSelect(clean)) throw new Error('Neste curso, os exercícios aceitam apenas SELECT ou WITH. Comandos de alteração ficam bloqueados para proteger o banco de treino.');
  const res = db.exec(clean);
  if (!res.length) return { columns: [], rows: [] };
  return { columns: res[0].columns, rows: res[0].values };
}
function makeId(modId, exId){ return `${modId}::${exId}`; }

function Login({ onLogin }){
  const [name,setName]=useState('');
  const [pass,setPass]=useState('');
  const [err,setErr]=useState('');
  function submit(e){
    e.preventDefault();
    if(name.trim().length<2){ setErr('Informe seu nome.'); return; }
    if(pass.trim().length<4){ setErr('Senha mínima: 4 caracteres.'); return; }
    const user={name:name.trim(),loginAt:new Date().toISOString()};
    localStorage.setItem(LS_USER,JSON.stringify(user));
    onLogin(user);
  }
  return <main className="login-page">
    <section className="login-card">
      <div className="brand-badge">SQL</div>
      <h1>Curso SQL Offline</h1>
      <p>Treinamento prático com teoria, exemplos, banco local e exercícios bloqueados por validação.</p>
      <form onSubmit={submit}>
        <label>Nome<input value={name} onChange={e=>setName(e.target.value)} autoComplete="name" /></label>
        <label>Senha simples<input type="password" value={pass} onChange={e=>setPass(e.target.value)} autoComplete="current-password" /></label>
        {err && <div className="error">{err}</div>}
        <button>Entrar</button>
      </form>
      <small>Dados salvos apenas neste navegador. Funciona offline após o primeiro carregamento completo.</small>
    </section>
  </main>
}

function TheorySlide({ slide }){
  return <article className="slide-card">
    <div className="slide-kind">{slide.kind === 'example' ? 'Exemplo' : 'Teoria'}</div>
    <h2>{slide.title}</h2>
    {slide.points && <ul>{slide.points.map((p,i)=><li key={i} dangerouslySetInnerHTML={{__html:p}} />)}</ul>}
    {slide.sql && <pre className="sql-block"><code>{slide.sql}</code></pre>}
    {slide.explanation && <p className="muted" dangerouslySetInnerHTML={{__html:slide.explanation}} />}
    {slide.tip && <div className="tip" dangerouslySetInnerHTML={{__html:slide.tip}} />}
    {slide.warn && <div className="warn" dangerouslySetInnerHTML={{__html:slide.warn}} />}
    {slide.diagram && <figure className="diagram"><figcaption>{slide.diagram.title}</figcaption><div dangerouslySetInnerHTML={{__html:slide.diagram.svg}} /></figure>}
  </article>
}

function ResultTable({ result }){
  if(!result) return null;
  if(result.error) return <div className="error result-box">{result.error}</div>;
  return <div className="result-box">
    <div className="result-head">Resultado: {result.rows.length} linha(s)</div>
    <div className="table-wrap">
      <table>
        <thead><tr>{result.columns.map(c=><th key={c}>{c}</th>)}</tr></thead>
        <tbody>{result.rows.slice(0,80).map((r,i)=><tr key={i}>{r.map((v,j)=><td key={j}>{v===null?'NULL':String(v)}</td>)}</tr>)}</tbody>
      </table>
    </div>
  </div>
}

function Exercise({ mod, ex, db, done, onDone }){
  const [sql,setSql]=useState('');
  const [msg,setMsg]=useState('');
  const [result,setResult]=useState(null);
  function run(){
    setMsg('');
    try{
      const check = ex.check ? ex.check(sql) : {ok:true};
      if(!check.ok){ setResult(null); setMsg(check.msg || 'A query ainda não atende ao enunciado.'); return; }
      const out = runQuery(db, sql);
      setResult(out);
      if(out.columns.length === 0){ setMsg('A query executou, mas não retornou colunas. Ajuste para retornar o relatório pedido.'); return; }
      onDone(makeId(mod.id, ex.id), sql);
      setMsg('✅ Correto. Exercício liberado e salvo no progresso.');
    }catch(err){
      setResult({error:err.message});
      setMsg('Ajuste a query e execute novamente.');
    }
  }
  return <article className={`exercise-card ${done?'done':''}`}>
    <div className="exercise-top"><h3>{ex.title}</h3>{done && <span>Concluído</span>}</div>
    <p dangerouslySetInnerHTML={{__html:ex.statement}} />
    <details><summary>Dica</summary><p>{ex.hint}</p></details>
    <textarea value={sql} onChange={e=>setSql(e.target.value)} spellCheck="false" placeholder="Escreva sua query aqui..." />
    <div className="actions"><button onClick={run}>Executar e validar</button><button className="ghost" onClick={()=>setSql(ex.hint || '')}>Usar dica como rascunho</button></div>
    {msg && <div className={msg.startsWith('✅')?'ok':'warn'}>{msg}</div>}
    <ResultTable result={result}/>
  </article>
}

function App(){
  const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem(LS_USER)||'null')}catch{return null}});
  const [db,setDb]=useState(null);
  const [dbStatus,setDbStatus]=useState('Carregando banco offline...');
  const [modIdx,setModIdx]=useState(0);
  const [tab,setTab]=useState('teoria');
  const [progress,setProgress]=useState(loadProgress);

  useEffect(()=>{
    if('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(()=>{});
    (async()=>{
      try{
        const SQL = await initSqlJs({
          locateFile: () => '/sql-wasm.wasm',
        });
        const txt = await fetch('/data/tecnova.sql', {cache:'no-store'}).then(r=>r.text());
        const database = new SQL.Database();
        database.run(txt);
        setDb(database);
        setDbStatus('Banco TechNova carregado localmente.');
      }catch(e){ setDbStatus('Erro ao carregar banco: '+e.message); }
    })();
  },[]);

  const mod = COURSE[modIdx];
  const totalExercises = COURSE.reduce((a,m)=>a+(m.exercises?.length||0),0);
  const doneCount = Object.keys(progress).length;
  const modDone = (mod.exercises||[]).filter(e=>progress[makeId(mod.id,e.id)]).length;

  function markDone(id,sql){
    const next={...progress,[id]:{sql,doneAt:new Date().toISOString()}};
    setProgress(next); saveProgress(next);
  }
  function resetProgress(){
    if(confirm('Limpar todo o progresso deste navegador?')){
      localStorage.removeItem(LS_PROGRESS); setProgress({});
    }
  }
  function resetDb(){
    localStorage.setItem(LS_DB_RESET, String(Date.now()));
    location.reload();
  }

  if(!user) return <Login onLogin={setUser}/>;

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="side-brand"><div className="brand-badge small">SQL</div><div><strong>Curso SQL</strong><small>Offline / PWA</small></div></div>
      <div className="progress"><span>{doneCount}/{totalExercises}</span><div><i style={{width:`${(doneCount/Math.max(totalExercises,1))*100}%`}} /></div></div>
      <nav>{COURSE.map((m,i)=>{
        const d=(m.exercises||[]).filter(e=>progress[makeId(m.id,e.id)]).length;
        return <button key={m.id} className={i===modIdx?'active':''} onClick={()=>{setModIdx(i);setTab('teoria')}}>
          <span>{m.icon}</span><b>{m.title}</b><em>{d}/{m.exercises?.length||0}</em>
        </button>
      })}</nav>
    </aside>
    <main className="content">
      <header className="topbar">
        <div><h1>{mod.title}</h1><p>{mod.objective}</p></div>
        <div className="userbox"><span>{user.name}</span><button className="ghost" onClick={()=>{localStorage.removeItem(LS_USER);location.reload()}}>Sair</button></div>
      </header>
      <section className="status-row"><span>{dbStatus}</span><span>Módulo: {modDone}/{mod.exercises?.length||0}</span><button className="ghost" onClick={resetProgress}>Limpar progresso</button><button className="ghost" onClick={resetDb}>Recarregar BD</button></section>
      <div className="tabs"><button className={tab==='teoria'?'active':''} onClick={()=>setTab('teoria')}>Teoria e exemplos</button><button className={tab==='exercicios'?'active':''} onClick={()=>setTab('exercicios')}>Exercícios</button><button className={tab==='lab'?'active':''} onClick={()=>setTab('lab')}>Laboratório livre</button></div>
      {tab==='teoria' && <section className="slides">{mod.slides?.map((s,i)=><TheorySlide slide={s} key={i}/>)}</section>}
      {tab==='exercicios' && <section className="exercises">{!db && <div className="warn">Aguarde o banco carregar.</div>}{db && mod.exercises?.map(ex=><Exercise key={ex.id} mod={mod} ex={ex} db={db} done={!!progress[makeId(mod.id,ex.id)]} onDone={markDone}/>)}</section>}
      {tab==='lab' && <Lab db={db}/>}
    </main>
  </div>
}

function Lab({db}){
  const [sql,setSql]=useState('SELECT * FROM funcionarios LIMIT 10;');
  const [result,setResult]=useState(null);
  function run(){
    try{ setResult(runQuery(db,sql)); }catch(e){ setResult({error:e.message}); }
  }
  return <section className="exercise-card">
    <h2>Laboratório livre</h2>
    <p className="muted">Use para testar SELECTs no banco TechNova. Alterações no banco ficam bloqueadas.</p>
    <textarea value={sql} onChange={e=>setSql(e.target.value)} spellCheck="false"/>
    <div className="actions"><button disabled={!db} onClick={run}>Executar SQL</button></div>
    <ResultTable result={result}/>
  </section>
}

createRoot(document.getElementById('root')).render(<App/>);
