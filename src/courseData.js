/* ═══════════════════════════════════════════════════════
   course.js — Conteúdo completo do curso SQL (12 módulos)
   Empresa fictícia: TechNova Ltda
═══════════════════════════════════════════════════════ */

export const COURSE = [
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MÓDULO 01 — INTRODUÇÃO A DADOS E BANCOS DE DADOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 'mod-00', level: 'Fundação', icon: '🧭',
  title: '01. Introdução: dados, tabelas e bancos de dados',
  objective: 'Entender o que são dados, informação, tabelas, tipos de dados, chaves e como um banco relacional organiza o trabalho do SQL.',

  slides: [
    {
      kind: 'theory', title: 'Antes do SQL: o que é dado?',
      points: [
        '<strong>Dado</strong> é um registro bruto: um número, texto, data, status ou valor isolado. Exemplo: <code>1250.50</code>, <code>ATIVO</code>, <code>2026-04-28</code>.',
        '<strong>Informação</strong> nasce quando o dado ganha contexto. Exemplo: <code>1250.50</code> sozinho é só número; como <code>valor_total</code> de um pedido, vira informação de venda.',
        'SQL serve para transformar dados armazenados em respostas confiáveis: filtrar, cruzar, somar, auditar, comparar períodos e montar indicadores.'
      ],
      tip: '💡 Regra prática: dado sem contexto não decide nada; dado com contexto vira informação para decisão.'
    },
    {
      kind: 'theory', title: 'Como um banco relacional organiza dados',
      points: [
        'Um banco relacional organiza dados em <strong>tabelas</strong>. Cada tabela representa um assunto: funcionários, produtos, clientes, pedidos, itens de pedido e projetos.',
        'Cada <strong>linha</strong> é um registro. Cada <strong>coluna</strong> é um atributo daquele registro. Exemplo: na tabela <code>produtos</code>, cada linha é um produto e as colunas descrevem nome, categoria, preço e status.',
        'O SQL lê essas tabelas e devolve outra tabela como resultado. Por isso quase todo resultado SQL aparece em grade: colunas + linhas.'
      ],
      tip: '💡 Tabela é a unidade central de trabalho. Antes de escrever SQL, descubra quais tabelas existem e quais colunas elas têm.'
    },
    {
      kind: 'theory', title: 'Tipos de dados mais comuns',
      points: [
        '<strong>Texto</strong>: nomes, descrições, categorias e status. Em SQL aparecem como <code>TEXT</code>, <code>VARCHAR</code> ou equivalentes.',
        '<strong>Números inteiros</strong>: IDs, quantidades e contadores. Exemplo: <code>quantidade = 3</code>.',
        '<strong>Números decimais</strong>: preços, custos, salários e percentuais. Exemplo: <code>preco = 129.90</code>.',
        '<strong>Datas e horários</strong>: criação de pedido, vencimento, admissão, encerramento. São essenciais para filtros por período.',
        '<strong>Booleanos</strong>: verdadeiro/falso. Exemplo: <code>ativo = true</code>.'
      ],
      warn: '⚠️ Tipo errado gera análise errada. Preço salvo como texto, por exemplo, pode ordenar como texto e não como número.'
    },
    {
      kind: 'theory', title: 'Chave primária e relacionamento',
      points: [
        '<strong>Chave primária</strong> identifica uma linha de forma única. Normalmente é uma coluna <code>id</code>. Dois registros não devem ter o mesmo ID.',
        '<strong>Chave estrangeira</strong> liga uma tabela a outra. Exemplo: um pedido pode ter <code>cliente_id</code>, apontando para <code>clientes.id</code>.',
        'Relacionamento é o motivo de JOIN existir: você junta tabelas diferentes para montar uma visão completa do negócio.'
      ],
      tip: '💡 Pense assim: ID é a placa do registro. Chave estrangeira é uma referência para encontrar outro registro relacionado.'
    },
    {
      kind: 'example', title: 'Exemplo — Ver tipos de dados em funcionários',
      sql: `SELECT id, nome, cargo, salario, ativo
FROM funcionarios
LIMIT 5;`,
      explanation: 'Esse exemplo mostra número inteiro em <code>id</code>, texto em <code>nome</code>/<code>cargo</code>, decimal em <code>salario</code> e booleano em <code>ativo</code>.'
    },
    {
      kind: 'example', title: 'Exemplo — Contexto transforma dado em informação',
      sql: `SELECT id, nome, categoria, preco, ativo
FROM produtos
LIMIT 5;`,
      explanation: 'O valor da coluna <code>preco</code> só faz sentido porque está ligado ao produto, categoria e status. Isso é contexto.'
    }
  ],

  exercises: []
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MÓDULO 02 — SELECT, FROM e LIMIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 'mod-01', level: 'Iniciante', icon: '🔍',
  title: '02. SELECT, FROM e LIMIT',
  objective: 'Escrever sua primeira consulta SQL, escolher colunas e tabelas e controlar a quantidade de linhas retornadas.',

  slides: [
    {
      kind: 'theory', title: 'O que é SQL e para que serve?',
      points: [
        'SQL (Structured Query Language) é a linguagem padrão para comunicar com bancos de dados relacionais — PostgreSQL, MySQL, SQL Server, Oracle e muitos outros.',
        'Com SQL você faz perguntas ao banco: "Quais funcionários estão ativos?", "Qual o faturamento do mês passado?", "Quem são os 10 maiores clientes?". O banco responde com linhas e colunas.',
        'No curso usamos o banco fictício da empresa <strong>TechNova Ltda</strong>, com tabelas de funcionários, departamentos, produtos, clientes, pedidos e projetos — tudo realista, tudo consultável offline.',
      ],
      tip: '💡 SQL não diferencia maiúsculas de minúsculas nas palavras reservadas. <code>SELECT</code>, <code>select</code> e <code>Select</code> funcionam igual. Mas convenção de mercado é escrever palavras-chave em maiúsculas.',
      diagram: {
        title: 'Fluxo de uma consulta SELECT',
        svg: `<svg viewBox="0 0 460 90" font-family="monospace" font-size="11" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="20" width="80" height="50" rx="6" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.2"/>
  <text x="42" y="43" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="bold">Você</text>
  <text x="42" y="58" text-anchor="middle" fill="#60a5fa" font-size="9">escreve SQL</text>
  <path d="M84 45 L116 45" stroke="#475569" stroke-width="1.5" marker-end="url(#arr)"/>
  <rect x="118" y="20" width="100" height="50" rx="6" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
  <text x="168" y="40" text-anchor="middle" fill="#94a3b8" font-size="9">Parser SQL</text>
  <text x="168" y="54" text-anchor="middle" fill="#94a3b8" font-size="9">+ Plano de</text>
  <text x="168" y="66" text-anchor="middle" fill="#94a3b8" font-size="9">Execução</text>
  <path d="M220 45 L252 45" stroke="#475569" stroke-width="1.5" marker-end="url(#arr)"/>
  <rect x="254" y="20" width="90" height="50" rx="6" fill="#1e3a5f" stroke="#14b8a6" stroke-width="1.2"/>
  <text x="299" y="43" text-anchor="middle" fill="#5eead4" font-size="10" font-weight="bold">Banco de</text>
  <text x="299" y="57" text-anchor="middle" fill="#5eead4" font-size="10" font-weight="bold">Dados</text>
  <path d="M346 45 L378 45" stroke="#475569" stroke-width="1.5" marker-end="url(#arr)"/>
  <rect x="380" y="20" width="78" height="50" rx="6" fill="#1e2d1e" stroke="#22c55e" stroke-width="1.2"/>
  <text x="419" y="43" text-anchor="middle" fill="#86efac" font-size="10" font-weight="bold">Resultado</text>
  <text x="419" y="57" text-anchor="middle" fill="#86efac" font-size="9">(linhas)</text>
  <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#475569"/></marker></defs>
</svg>`
      }
    },
    {
      kind: 'theory', title: 'SELECT — escolhendo as colunas',
      points: [
        '<code>SELECT</code> define <em>quais colunas</em> você quer ver no resultado. Pense como marcar checkboxes: você escolhe exatamente o que precisa.',
        'Você pode pedir colunas específicas separadas por vírgula: <code>SELECT id, nome, cargo</code> — ou usar <code>*</code> para pedir todas as colunas da tabela.',
        'Evite <code>SELECT *</code> em produção. Em tabelas com 50 colunas, trazer tudo desperdiça memória e banda. Prefira nomear as colunas que realmente precisa.',
      ],
      warn: '⚠️ <code>SELECT *</code> é ótimo para explorar dados no início, mas em sistemas reais sempre especifique as colunas. Colunas desnecessárias tornam consultas lentas em tabelas grandes.',
    },
    {
      kind: 'theory', title: 'FROM — de onde vêm os dados',
      points: [
        '<code>FROM</code> indica a tabela de onde os dados serão lidos. É obrigatório em toda consulta que busca dados de uma tabela.',
        'A sintaxe básica é: <code>SELECT colunas FROM tabela;</code> — o banco lê a tabela inteira e depois aplica os filtros e seleções que você especificou.',
        'No banco TechNova temos: <code>funcionarios</code>, <code>departamentos</code>, <code>produtos</code>, <code>clientes</code>, <code>pedidos</code>, <code>itens_pedido</code>, <code>projetos</code> e <code>avaliacoes_funcionarios</code>.',
      ],
      tip: '💡 Se você escrever um nome de tabela errado, o banco retorna erro imediatamente: <em>"tabela X não existe"</em>. Sem tabela certa, sem dado.',
    },
    {
      kind: 'theory', title: 'LIMIT — controlando o volume',
      points: [
        '<code>LIMIT N</code> restringe o resultado às primeiras N linhas. Essencial ao explorar tabelas grandes para não travar sua tela — ou o servidor.',
        'Em produção, consultas sem LIMIT em tabelas com milhões de registros podem demorar minutos e consumir memória excessiva. Sempre teste com LIMIT primeiro.',
        'Combinado com <code>ORDER BY</code> (que veremos em breve), LIMIT permite pegar os top 5, top 10 ou o registro mais recente com precisão.',
      ],
      tip: '💡 LIMIT é interpretado depois de WHERE, GROUP BY e ORDER BY. Então "LIMIT 5" significa "as 5 primeiras linhas <em>do resultado já filtrado e ordenado</em>", não as 5 primeiras da tabela bruta.',
    },
    {
      kind: 'example', title: 'Exemplo 1 — Primeiros funcionários',
      sql: `SELECT id, nome, cargo
FROM funcionarios
LIMIT 5;`,
      explanation: 'Retorna apenas as colunas <code>id</code>, <code>nome</code> e <code>cargo</code> da tabela <code>funcionarios</code>, limitando o resultado às 5 primeiras linhas. Experimente rodar!'
    },
    {
      kind: 'example', title: 'Exemplo 2 — Produtos com todas colunas',
      sql: `SELECT *
FROM produtos
LIMIT 4;`,
      explanation: 'O asterisco (<code>*</code>) traz todas as colunas da tabela <code>produtos</code>. Útil para explorar a estrutura de uma tabela quando não sabe quais colunas existem.'
    },
  ],

  exercises: [
    {
      id: 'e1', title: 'Exercício 1 — Sua primeira consulta',
      statement: 'Liste as colunas <strong>id</strong>, <strong>nome</strong> e <strong>cargo</strong> da tabela <code>funcionarios</code>, limitando a <strong>5 linhas</strong>.',
      hint: 'Use SELECT com as três colunas separadas por vírgula, FROM funcionarios e LIMIT 5.',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','id','nome','cargo','from','funcionarios','limit'].filter(t=>!n.includes(t));
        if (missing.length) return { ok:false, msg:'Faltam: '+missing.join(', ') };
        if (!/limit\s+5\b/i.test(sql)) return { ok:false, msg:'O LIMIT deve ser exatamente 5.' };
        return { ok:true };
      }
    },
    {
      id: 'e2', title: 'Exercício 2 — Catálogo de produtos',
      statement: 'Retorne <strong>id</strong>, <strong>nome</strong> e <strong>preco</strong> da tabela <code>produtos</code>, limitando em <strong>6 linhas</strong>.',
      hint: 'Mesma estrutura: SELECT colunas FROM tabela LIMIT número.',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','id','nome','preco','from','produtos','limit'].filter(t=>!n.includes(t));
        if (missing.length) return { ok:false, msg:'Faltam: '+missing.join(', ') };
        if (!/limit\s+6\b/i.test(sql)) return { ok:false, msg:'O LIMIT deve ser exatamente 6.' };
        return { ok:true };
      }
    },
    {
      id: 'e3', title: 'Exercício 3 — Explorar clientes',
      statement: 'Traga <strong>todas as colunas</strong> da tabela <code>clientes</code>, limitando em <strong>3 linhas</strong>.',
      hint: 'Para todas as colunas, use SELECT * FROM tabela LIMIT número.',
      check: sql => {
        const n = sql.toLowerCase();
        if (!n.includes('select')) return { ok:false, msg:'Falta o SELECT.' };
        if (!n.includes('*') && !n.includes('razao_social')) return { ok:false, msg:'Use * para trazer todas as colunas, ou liste todas elas.' };
        if (!n.includes('from') || !n.includes('clientes')) return { ok:false, msg:'Falta FROM clientes.' };
        if (!/limit\s+3\b/i.test(sql)) return { ok:false, msg:'O LIMIT deve ser exatamente 3.' };
        return { ok:true };
      }
    },
  ]
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MÓDULO 02 — WHERE e operadores de filtro
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 'mod-02', level: 'Iniciante', icon: '🎯',
  title: '03. WHERE e operadores de filtro',
  objective: 'Filtrar linhas com condições numéricas, textuais e booleanas usando WHERE e os operadores de comparação.',

  slides: [
    {
      kind: 'theory', title: 'Por que filtrar? O problema sem WHERE',
      points: [
        'Sem WHERE, toda consulta retorna <em>todas as linhas</em> da tabela. Em um banco com 1 milhão de clientes, isso é inviável.',
        '<code>WHERE</code> é avaliado linha por linha: para cada linha da tabela, o banco testa se a condição é verdadeira. Apenas as linhas que passam no teste aparecem no resultado.',
        'WHERE vem depois de FROM e antes de GROUP BY/ORDER BY na escrita da query, mas é executado imediatamente após a leitura da tabela — antes de qualquer agrupamento ou ordenação.',
      ],
      tip: '💡 Imagine WHERE como um segurança na porta: cada linha da tabela precisa mostrar que atende à condição para entrar no resultado.',
    },
    {
      kind: 'theory', title: 'Operadores de comparação',
      points: [
        '<code>=</code> testa igualdade. <code>!=</code> ou <code>&lt;&gt;</code> testa diferença. Funcionam para números, texto e booleanos.',
        '<code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code> comparam ordem — numérica, alfabética ou de datas.',
        'Valores de texto ficam entre aspas simples: <code>WHERE cargo = \'Gerente de Vendas\'</code>. Números e booleanos não usam aspas: <code>WHERE salario &gt; 10000</code>, <code>WHERE ativo = true</code>.',
      ],
      warn: '⚠️ Nunca use aspas duplas para valores de texto em SQL padrão. <code>WHERE nome = "Ana"</code> pode causar erro. Use aspas simples: <code>WHERE nome = \'Ana\'</code>.',
    },
    {
      kind: 'theory', title: 'AND e OR — combinando condições',
      points: [
        '<code>AND</code> exige que <em>todas</em> as condições sejam verdadeiras. Funciona como interseção: a linha precisa passar em todos os critérios.',
        '<code>OR</code> aceita que <em>pelo menos uma</em> condição seja verdadeira. Funciona como união: a linha passa se atender a qualquer um dos critérios.',
        'Misturar AND e OR pode gerar resultados inesperados. Use parênteses para deixar a precedência explícita: <code>WHERE (cidade = \'SP\' OR cidade = \'RJ\') AND ativo = true</code>.',
      ],
      diagram: {
        title: 'AND vs OR — visualização',
        svg: `<svg viewBox="0 0 420 100" font-family="sans-serif" font-size="11" xmlns="http://www.w3.org/2000/svg">
  <text x="70" y="15" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">AND (interseção)</text>
  <circle cx="55" cy="55" r="32" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" stroke-width="1.5"/>
  <circle cx="85" cy="55" r="32" fill="rgba(239,68,68,0.2)" stroke="#ef4444" stroke-width="1.5"/>
  <path d="M70,24 A32,32 0 0,1 85,87 A32,32 0 0,1 55,87 A32,32 0 0,1 70,24" fill="rgba(34,197,94,0.35)" stroke="none"/>
  <text x="29" y="58" text-anchor="middle" fill="#93c5fd" font-size="9">A</text>
  <text x="111" y="58" text-anchor="middle" fill="#fca5a5" font-size="9">B</text>
  <text x="70" y="58" text-anchor="middle" fill="#86efac" font-size="9" font-weight="bold">A∩B</text>
  <text x="230" y="15" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">OR (união)</text>
  <circle cx="215" cy="55" r="32" fill="rgba(59,130,246,0.3)" stroke="#3b82f6" stroke-width="1.5"/>
  <circle cx="245" cy="55" r="32" fill="rgba(239,68,68,0.3)" stroke="#ef4444" stroke-width="1.5"/>
  <text x="204" y="58" text-anchor="middle" fill="#93c5fd" font-size="9">A</text>
  <text x="256" y="58" text-anchor="middle" fill="#fca5a5" font-size="9">B</text>
  <text x="310" y="50" fill="#94a3b8" font-size="9">Qualquer</text>
  <text x="310" y="63" fill="#94a3b8" font-size="9">dos dois</text>
</svg>`
      }
    },
    {
      kind: 'example', title: 'Exemplo 1 — Funcionários com salário alto',
      sql: `SELECT nome, cargo, salario
FROM funcionarios
WHERE salario >= 12000;`,
      explanation: 'Filtra apenas funcionários com salário maior ou igual a R$ 12.000. Observe que o número não leva aspas.'
    },
    {
      kind: 'example', title: 'Exemplo 2 — Pedidos entregues',
      sql: `SELECT id, cliente_id, total, status
FROM pedidos
WHERE status = 'entregue';`,
      explanation: 'Filtra pedidos com status exatamente igual a "entregue". O texto fica entre aspas simples.'
    },
    {
      kind: 'example', title: 'Exemplo 3 — AND combinado',
      sql: `SELECT nome, cargo, salario, ativo
FROM funcionarios
WHERE salario > 10000
  AND ativo = true;`,
      explanation: 'Combina dois critérios: salário acima de 10.000 <em>e</em> funcionário ativo. Ambas as condições precisam ser verdadeiras.'
    },
  ],

  exercises: [
    {
      id: 'e1', title: 'Exercício 1 — Salários altos',
      statement: 'Liste <strong>nome</strong>, <strong>cargo</strong> e <strong>salario</strong> dos funcionários com salário <strong>maior ou igual a 15000</strong>.',
      hint: 'WHERE salario >= 15000',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','nome','cargo','salario','from','funcionarios','where'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        if (!/salario\s*>=\s*15000/i.test(sql)) return {ok:false,msg:'A condição deve ser salario >= 15000.'};
        return {ok:true};
      }
    },
    {
      id: 'e2', title: 'Exercício 2 — Pedidos cancelados',
      statement: 'Liste <strong>id</strong>, <strong>data_pedido</strong> e <strong>total</strong> dos pedidos com status <strong>\'cancelado\'</strong>.',
      hint: "WHERE status = 'cancelado'",
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','id','data_pedido','total','from','pedidos','where'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        if (!/status\s*=\s*'cancelado'/i.test(sql)) return {ok:false,msg:"A condição deve ser status = 'cancelado'."};
        return {ok:true};
      }
    },
    {
      id: 'e3', title: 'Exercício 3 — Produtos caros e ativos',
      statement: 'Liste <strong>nome</strong>, <strong>categoria</strong> e <strong>preco</strong> dos produtos com preço <strong>acima de 5000</strong> e que estejam <strong>ativos</strong> (<code>ativo = true</code>).',
      hint: 'Use AND para combinar as duas condições: WHERE preco > 5000 AND ativo = true',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','nome','categoria','preco','from','produtos','where','and'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        if (!/preco\s*>\s*5000/i.test(sql)) return {ok:false,msg:'Condição: preco > 5000.'};
        if (!/ativo\s*=\s*true/i.test(sql)) return {ok:false,msg:'Condição: ativo = true.'};
        return {ok:true};
      }
    },
  ]
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MÓDULO 03 — ORDER BY e aliases
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 'mod-03', level: 'Iniciante', icon: '↕️',
  title: '04. ORDER BY, aliases e DISTINCT',
  objective: 'Ordenar resultados, renomear colunas com AS e eliminar duplicatas com DISTINCT.',

  slides: [
    {
      kind: 'theory', title: 'ORDER BY — organizando a saída',
      points: [
        '<code>ORDER BY coluna ASC</code> ordena de forma crescente (menor para maior, A→Z, data mais antiga primeiro). <code>DESC</code> inverte: maior para menor, Z→A, data mais recente primeiro.',
        'Você pode ordenar por várias colunas: <code>ORDER BY estado ASC, cidade ASC</code> — primeiro agrupa por estado, depois ordena as cidades dentro de cada estado.',
        'Sem ORDER BY, o banco pode devolver linhas em qualquer ordem — a ordem "natural" da tabela não é garantida e pode mudar entre execuções. Se a ordem importa, sempre use ORDER BY.',
      ],
    },
    {
      kind: 'theory', title: 'AS — criando aliases para colunas',
      points: [
        '<code>AS</code> renomeia uma coluna no resultado. Útil para tornar relatórios mais legíveis: <code>razao_social AS cliente</code> exibe "cliente" em vez de "razao_social" na saída.',
        'Aliases são especialmente importantes em funções: <code>COUNT(*) AS total_pedidos</code>, <code>SUM(total) AS faturamento</code> — sem alias, a coluna aparece com nome gerado automaticamente e pouco legível.',
        'O alias não existe na tabela original. Você não pode usar um alias definido no SELECT dentro do WHERE da mesma query (a maioria dos bancos não suporta). Mas pode usá-lo no ORDER BY.',
      ],
    },
    {
      kind: 'theory', title: 'DISTINCT — eliminando duplicatas',
      points: [
        '<code>SELECT DISTINCT coluna</code> retorna apenas valores únicos — elimina linhas repetidas no resultado. Muito útil para ver categorias, estados ou cargos distintos na tabela.',
        'DISTINCT opera sobre a combinação de todas as colunas selecionadas, não apenas uma. <code>SELECT DISTINCT estado, cidade</code> elimina pares estado+cidade repetidos.',
        'Use DISTINCT com cuidado: ele tem custo computacional (o banco precisa ordenar ou fazer hash dos dados). Para tabelas grandes, prefira GROUP BY quando possível.',
      ],
    },
    {
      kind: 'example', title: 'Exemplo 1 — Top 5 maiores salários',
      sql: `SELECT nome, cargo, salario AS remuneracao
FROM funcionarios
ORDER BY salario DESC
LIMIT 5;`,
      explanation: 'Ordena funcionários do maior salário para o menor e pega os 5 primeiros. O alias <code>remuneracao</code> substitui "salario" no cabeçalho do resultado.'
    },
    {
      kind: 'example', title: 'Exemplo 2 — Categorias de produtos',
      sql: `SELECT DISTINCT categoria
FROM produtos
ORDER BY categoria ASC;`,
      explanation: 'Lista cada categoria de produto apenas uma vez, em ordem alfabética. Sem DISTINCT, cada produto repetiria sua categoria.'
    },
    {
      kind: 'example', title: 'Exemplo 3 — Clientes ordenados por limite',
      sql: `SELECT razao_social AS cliente, estado, limite_credito AS limite
FROM clientes
ORDER BY limite_credito DESC;`,
      explanation: 'Mostra clientes do maior para o menor limite de crédito. Aliases tornam o cabeçalho mais amigável para relatórios.'
    },
  ],

  exercises: [
    {
      id: 'e1', title: 'Exercício 1 — Ranking de salários',
      statement: 'Liste <strong>nome</strong> e <strong>salario</strong> de todos os funcionários, ordenados do <strong>maior salário para o menor</strong>.',
      hint: 'ORDER BY salario DESC',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','nome','salario','from','funcionarios','order','by','desc'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        return {ok:true};
      }
    },
    {
      id: 'e2', title: 'Exercício 2 — Clientes com alias',
      statement: 'Liste <code>razao_social</code> (com alias <strong>cliente</strong>), <code>estado</code> e <code>limite_credito</code> dos clientes, ordenados pelo maior limite.',
      hint: 'SELECT razao_social AS cliente ... ORDER BY limite_credito DESC',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','razao_social','as','cliente','estado','limite_credito','from','clientes','order','by','desc'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        return {ok:true};
      }
    },
    {
      id: 'e3', title: 'Exercício 3 — Cargos únicos',
      statement: 'Liste todos os <strong>cargos distintos</strong> da tabela <code>funcionarios</code>, em ordem <strong>alfabética crescente</strong>.',
      hint: 'SELECT DISTINCT cargo FROM funcionarios ORDER BY cargo ASC',
      check: sql => {
        const n = sql.toLowerCase();
        if (!n.includes('distinct')) return {ok:false,msg:'Use DISTINCT para eliminar cargos repetidos.'};
        const missing = ['select','cargo','from','funcionarios','order','by'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        return {ok:true};
      }
    },
  ]
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MÓDULO 04 — LIKE, IN, BETWEEN e NULL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 'mod-04', level: 'Iniciante', icon: '🔎',
  title: '05. LIKE, IN, BETWEEN e NULL',
  objective: 'Usar filtros avançados: busca por padrão de texto, listas de valores, intervalos e valores ausentes.',

  slides: [
    {
      kind: 'theory', title: 'LIKE — busca por padrões de texto',
      points: [
        '<code>LIKE</code> pesquisa padrões em campos de texto. O símbolo <code>%</code> substitui qualquer quantidade de caracteres. O símbolo <code>_</code> substitui exatamente um caractere.',
        'Exemplos práticos: <code>LIKE \'Ana%\'</code> encontra nomes que começam com "Ana". <code>LIKE \'%Silva\'</code> encontra que terminam com "Silva". <code>LIKE \'%Gomes%\'</code> encontra que contêm "Gomes" em qualquer posição.',
        'LIKE não diferencia maiúsculas de minúsculas em SQLite e SQL Server por padrão, mas diferencia em PostgreSQL. Use <code>ILIKE</code> no PostgreSQL para busca case-insensitive.',
      ],
    },
    {
      kind: 'theory', title: 'IN — comparando com uma lista',
      points: [
        '<code>IN (valor1, valor2, ...)</code> é um atalho elegante para múltiplos ORs. <code>WHERE estado IN (\'SP\', \'RJ\', \'MG\')</code> é equivalente a três condições com OR, mas muito mais legível.',
        '<code>NOT IN</code> funciona ao contrário: retorna linhas onde o valor <em>não está</em> na lista. Útil para excluir categorias específicas.',
        'Cuidado com NOT IN e NULLs: se a lista contiver NULL, <code>NOT IN</code> pode não retornar nenhuma linha. Esse é um dos erros mais silenciosos do SQL.',
      ],
    },
    {
      kind: 'theory', title: 'BETWEEN e IS NULL',
      points: [
        '<code>BETWEEN valor1 AND valor2</code> testa se um valor está dentro de um intervalo <em>fechado</em> (inclusivo nos dois extremos). Funciona com números e datas.',
        '<code>NULL</code> significa ausência de valor — não é zero, não é string vazia, não é falso. É simplesmente "desconhecido" ou "não preenchido".',
        'Para verificar NULL, use sempre <code>IS NULL</code> ou <code>IS NOT NULL</code>. Nunca <code>= NULL</code> — essa comparação nunca retorna verdadeiro em SQL padrão, porque NULL != NULL.',
      ],
      warn: '⚠️ <code>WHERE gestor_id = NULL</code> não funciona. O correto é <code>WHERE gestor_id IS NULL</code>. Esse é um dos erros mais comuns de iniciantes em SQL.',
    },
    {
      kind: 'example', title: 'Exemplo 1 — LIKE para busca de nomes',
      sql: `SELECT nome, email
FROM funcionarios
WHERE nome LIKE 'A%';`,
      explanation: 'Encontra todos os funcionários cujo nome começa com a letra A. O % substitui qualquer sequência após o A.'
    },
    {
      kind: 'example', title: 'Exemplo 2 — IN para múltiplas categorias',
      sql: `SELECT nome, categoria, preco
FROM produtos
WHERE categoria IN ('Software', 'Serviço')
ORDER BY preco DESC;`,
      explanation: 'Lista produtos das categorias Software ou Serviço. Mais limpo que usar dois ORs separados.'
    },
    {
      kind: 'example', title: 'Exemplo 3 — BETWEEN e IS NULL',
      sql: `SELECT nome, salario
FROM funcionarios
WHERE salario BETWEEN 8000 AND 12000
ORDER BY salario;`,
      explanation: 'Filtra funcionários com salário entre R$ 8.000 e R$ 12.000, ambos inclusive. BETWEEN é equivalente a >= 8000 AND <= 12000.'
    },
    {
      kind: 'example', title: 'Exemplo 4 — Funcionários sem gestor',
      sql: `SELECT nome, cargo
FROM funcionarios
WHERE gestor_id IS NULL
ORDER BY nome;`,
      explanation: 'Encontra funcionários sem gestor cadastrado — provavelmente os líderes de topo da hierarquia.'
    },
  ],

  exercises: [
    {
      id: 'e1', title: 'Exercício 1 — Busca por nome',
      statement: 'Liste <strong>nome</strong> e <strong>email</strong> dos funcionários cujo nome <strong>começa com a letra C</strong>.',
      hint: "WHERE nome LIKE 'C%'",
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','nome','email','from','funcionarios','where','like'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        if (!/'c%'/i.test(sql)) return {ok:false,msg:"Use LIKE 'C%' para buscar nomes que começam com C."};
        return {ok:true};
      }
    },
    {
      id: 'e2', title: 'Exercício 2 — Produtos por categoria',
      statement: "Liste <strong>nome</strong>, <strong>categoria</strong> e <strong>preco</strong> dos produtos das categorias <strong>'Software'</strong> ou <strong>'Hardware'</strong> usando <code>IN</code>.",
      hint: "WHERE categoria IN ('Software', 'Hardware')",
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','nome','categoria','preco','from','produtos','where','in'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        if (!/'software'/i.test(sql) || !/'hardware'/i.test(sql)) return {ok:false,msg:'Inclua Software e Hardware na lista do IN.'};
        return {ok:true};
      }
    },
    {
      id: 'e3', title: 'Exercício 3 — Pedidos por total',
      statement: 'Liste <strong>id</strong>, <strong>total</strong> e <strong>status</strong> dos pedidos com total <strong>entre 5000 e 20000</strong> (inclusive).',
      hint: 'WHERE total BETWEEN 5000 AND 20000',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','id','total','status','from','pedidos','where','between'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        if (!/between\s+5000\s+and\s+20000/i.test(sql)) return {ok:false,msg:'Use BETWEEN 5000 AND 20000.'};
        return {ok:true};
      }
    },
  ]
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MÓDULO 05 — INNER JOIN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 'mod-05', level: 'Intermediário', icon: '🔗',
  title: '06. INNER JOIN — unindo tabelas',
  objective: 'Entender chaves primárias e estrangeiras e usar INNER JOIN para combinar dados de múltiplas tabelas.',

  slides: [
    {
      kind: 'theory', title: 'Por que os dados ficam separados?',
      points: [
        'Bancos relacionais dividem dados em tabelas para evitar repetição. Em vez de gravar o nome do departamento em cada funcionário, gravamos apenas o <code>departamento_id</code> e mantemos os detalhes do departamento em uma tabela separada.',
        'Esse conceito se chama <strong>normalização</strong>: cada informação existe em um único lugar. Se o departamento mudar de nome, basta alterar na tabela <code>departamentos</code> — todos os funcionários refletem automaticamente.',
        'O preço é que para responder perguntas completas ("qual funcionário trabalha em qual departamento?"), precisamos <em>juntar</em> as tabelas. É exatamente isso que JOIN faz.',
      ],
      diagram: {
        title: 'Relacionamento funcionarios → departamentos',
        svg: `<svg viewBox="0 0 420 120" font-family="monospace" font-size="10" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="15" width="150" height="90" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="85" y="35" text-anchor="middle" fill="#60a5fa" font-size="11" font-weight="bold">funcionarios</text>
  <line x1="20" y1="42" x2="150" y2="42" stroke="#334155" stroke-width="1"/>
  <text x="30" y="57" fill="#94a3b8">id</text><text x="90" y="57" fill="#fcd34d" font-size="9">PK</text>
  <text x="30" y="71" fill="#e2e8f0">nome</text>
  <text x="30" y="85" fill="#ffa657">departamento_id</text><text x="145" y="85" fill="#60a5fa" font-size="9">FK</text>
  <text x="30" y="99" fill="#94a3b8">salario ...</text>
  <path d="M165 70 L245 70" stroke="#22c55e" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#arrow)"/>
  <rect x="250" y="15" width="155" height="90" rx="8" fill="#1e293b" stroke="#14b8a6" stroke-width="1.5"/>
  <text x="327" y="35" text-anchor="middle" fill="#5eead4" font-size="11" font-weight="bold">departamentos</text>
  <line x1="260" y1="42" x2="395" y2="42" stroke="#334155" stroke-width="1"/>
  <text x="270" y="57" fill="#94a3b8">id</text><text x="320" y="57" fill="#fcd34d" font-size="9">PK</text>
  <text x="270" y="71" fill="#e2e8f0">nome</text>
  <text x="270" y="85" fill="#e2e8f0">orcamento</text>
  <text x="270" y="99" fill="#94a3b8">...</text>
  <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#22c55e"/></marker></defs>
</svg>`
      }
    },
    {
      kind: 'theory', title: 'Chave Primária (PK) e Estrangeira (FK)',
      points: [
        '<strong>Chave Primária (PK)</strong>: coluna que identifica cada linha de forma única. Em <code>departamentos</code>, o <code>id</code> é PK — não existem dois departamentos com o mesmo id.',
        '<strong>Chave Estrangeira (FK)</strong>: coluna que referencia a PK de outra tabela. Em <code>funcionarios</code>, <code>departamento_id</code> aponta para <code>departamentos.id</code>. Isso é o "elo" que permite o JOIN.',
        'A condição de JOIN (<code>ON</code>) especifica quais colunas se conectam: <code>ON funcionarios.departamento_id = departamentos.id</code>. O banco usa essa relação para juntar as linhas correspondentes.',
      ],
    },
    {
      kind: 'theory', title: 'INNER JOIN na prática',
      points: [
        '<code>INNER JOIN</code> retorna apenas as linhas que têm correspondência <em>nos dois lados</em>. Se um funcionário tem <code>departamento_id = 99</code> e não existe departamento 99, esse funcionário não aparece.',
        'Aliases de tabela (uma letra ou abreviação) tornam a query mais curta e legível: <code>funcionarios f</code> permite escrever <code>f.nome</code> em vez de <code>funcionarios.nome</code>.',
        'Você pode encadear múltiplos JOINs: <code>JOIN clientes c ON p.cliente_id = c.id JOIN funcionarios f ON p.vendedor_id = f.id</code> — cada JOIN adiciona mais uma tabela ao contexto da query.',
      ],
    },
    {
      kind: 'example', title: 'Exemplo 1 — Funcionário com seu departamento',
      sql: `SELECT f.nome, f.cargo, d.nome AS departamento
FROM funcionarios f
JOIN departamentos d ON f.departamento_id = d.id
ORDER BY d.nome, f.nome;`,
      explanation: 'O alias <code>f</code> representa funcionarios e <code>d</code> representa departamentos. O ON define a relação entre as tabelas.'
    },
    {
      kind: 'example', title: 'Exemplo 2 — Pedidos com nome do cliente',
      sql: `SELECT p.id, c.razao_social AS cliente, p.total, p.status
FROM pedidos p
JOIN clientes c ON p.cliente_id = c.id
ORDER BY p.total DESC;`,
      explanation: 'Substitui o cliente_id numérico pelo nome real do cliente. Muito mais útil em relatórios.'
    },
  ],

  exercises: [
    {
      id: 'e1', title: 'Exercício 1 — Nome do departamento',
      statement: 'Liste <strong>nome</strong> e <strong>cargo</strong> do funcionário e o <strong>nome do departamento</strong> (alias: <code>departamento</code>) usando JOIN.',
      hint: 'JOIN departamentos d ON f.departamento_id = d.id, depois SELECT d.nome AS departamento',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','from','funcionarios','join','departamentos','on','departamento_id'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        return {ok:true};
      }
    },
    {
      id: 'e2', title: 'Exercício 2 — Pedido com cliente',
      statement: 'Liste <strong>id do pedido</strong>, <strong>razao_social do cliente</strong> (alias: <code>cliente</code>), <strong>total</strong> e <strong>status</strong> usando JOIN entre <code>pedidos</code> e <code>clientes</code>.',
      hint: 'JOIN clientes c ON p.cliente_id = c.id',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','from','pedidos','join','clientes','on','cliente_id','total'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        return {ok:true};
      }
    },
    {
      id: 'e3', title: 'Exercício 3 — Produto do item de pedido',
      statement: 'Liste <strong>pedido_id</strong>, o <strong>nome do produto</strong> e <strong>quantidade</strong> fazendo JOIN entre <code>itens_pedido</code> e <code>produtos</code>.',
      hint: 'FROM itens_pedido ip JOIN produtos p ON ip.produto_id = p.id',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','from','itens_pedido','join','produtos','on','produto_id'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        return {ok:true};
      }
    },
  ]
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MÓDULO 06 — Funções de agregação
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 'mod-06', level: 'Intermediário', icon: '📊',
  title: '07. COUNT, SUM, AVG, MIN e MAX',
  objective: 'Resumir conjuntos de dados com funções de agregação para criar indicadores e métricas.',

  slides: [
    {
      kind: 'theory', title: 'O que são funções de agregação?',
      points: [
        'Funções de agregação transformam <em>múltiplas linhas</em> em <em>um único valor resumido</em>. Em vez de ver cada linha, você vê totais, médias e extremos.',
        '<code>COUNT</code> conta registros. <code>SUM</code> soma valores numéricos. <code>AVG</code> calcula a média. <code>MIN</code> retorna o menor valor. <code>MAX</code> retorna o maior.',
        'Essas funções são a base de dashboards e relatórios executivos: "Quantos pedidos fizemos este mês?", "Qual o faturamento total?", "Qual o ticket médio por cliente?"',
      ],
    },
    {
      kind: 'theory', title: 'COUNT(*) vs COUNT(coluna)',
      points: [
        '<code>COUNT(*)</code> conta o número total de linhas no resultado — incluindo linhas com valores NULL em qualquer coluna.',
        '<code>COUNT(coluna)</code> conta apenas as linhas onde aquela coluna específica não é NULL. Em tabelas com campos opcionais, os resultados podem ser diferentes.',
        'Exemplo prático: <code>COUNT(*)</code> conta todos os funcionários. <code>COUNT(gestor_id)</code> conta apenas os que têm gestor cadastrado (exclui quem tem gestor_id NULL).',
      ],
      diagram: {
        title: 'COUNT(*) vs COUNT(coluna)',
        svg: `<svg viewBox="0 0 400 110" font-family="sans-serif" font-size="10" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="180" height="90" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1"/>
  <text x="100" y="28" text-anchor="middle" fill="#60a5fa" font-size="11" font-weight="bold">COUNT(*) = 5</text>
  <text x="30" y="48" fill="#e2e8f0">Ana    gestor=NULL ✓</text>
  <text x="30" y="62" fill="#e2e8f0">Bruno  gestor=1   ✓</text>
  <text x="30" y="76" fill="#e2e8f0">Carla  gestor=NULL ✓</text>
  <text x="30" y="90" fill="#e2e8f0">Diego  gestor=2   ✓</text>
  <text x="30" y="104" fill="#94a3b8" font-size="9">Eva    gestor=NULL ✓ (conta)</text>
  <rect x="210" y="10" width="180" height="90" rx="6" fill="#1e293b" stroke="#22c55e" stroke-width="1"/>
  <text x="300" y="28" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">COUNT(gestor_id)=2</text>
  <text x="230" y="48" fill="#94a3b8">Ana    gestor=NULL ✗</text>
  <text x="230" y="62" fill="#e2e8f0">Bruno  gestor=1   ✓</text>
  <text x="230" y="76" fill="#94a3b8">Carla  gestor=NULL ✗</text>
  <text x="230" y="90" fill="#e2e8f0">Diego  gestor=2   ✓</text>
  <text x="230" y="104" fill="#94a3b8" font-size="9">Eva    gestor=NULL ✗ (ignora)</text>
</svg>`
      }
    },
    {
      kind: 'theory', title: 'SUM, AVG, MIN e MAX',
      points: [
        '<code>SUM(coluna)</code> soma todos os valores numéricos — usado para faturamento, custo total, horas trabalhadas.',
        '<code>AVG(coluna)</code> calcula a média aritmética. Cuidado: a média pode esconder distribuições extremas. Um departamento com salários de R$ 5.000 e R$ 50.000 tem média de R$ 27.500, mas isso pode ser enganoso.',
        '<code>MIN</code> e <code>MAX</code> retornam os extremos e funcionam tanto com números quanto com texto e datas. <code>MAX(data_pedido)</code> retorna a data do pedido mais recente.',
      ],
    },
    {
      kind: 'example', title: 'Exemplo 1 — Totais gerais',
      sql: `SELECT
  COUNT(*) AS total_funcionarios,
  AVG(salario) AS salario_medio,
  MIN(salario) AS menor_salario,
  MAX(salario) AS maior_salario
FROM funcionarios;`,
      explanation: 'Cria um resumo completo dos salários: quantidade, média, menor e maior. Tudo em uma linha de resultado.'
    },
    {
      kind: 'example', title: 'Exemplo 2 — Faturamento total',
      sql: `SELECT
  COUNT(*) AS total_pedidos,
  SUM(total) AS faturamento,
  AVG(total) AS ticket_medio
FROM pedidos
WHERE status = 'entregue';`,
      explanation: 'Calcula indicadores financeiros apenas para pedidos entregues. Pedidos cancelados são excluídos pelo WHERE.'
    },
  ],

  exercises: [
    {
      id: 'e1', title: 'Exercício 1 — Contagem de funcionários',
      statement: 'Calcule a <strong>quantidade total</strong> de funcionários e a <strong>média salarial</strong> (alias: <code>salario_medio</code>).',
      hint: 'SELECT COUNT(*) AS total, AVG(salario) AS salario_medio FROM funcionarios',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','count','avg','salario','from','funcionarios'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        return {ok:true};
      }
    },
    {
      id: 'e2', title: 'Exercício 2 — Faturamento de pedidos entregues',
      statement: 'Calcule o <strong>total de pedidos</strong> e a <strong>soma dos valores</strong> (alias: <code>faturamento</code>) apenas dos pedidos com status <strong>\'entregue\'</strong>.',
      hint: "WHERE status = 'entregue' depois SUM(total)",
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','count','sum','total','from','pedidos','where'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        if (!/'entregue'/i.test(sql)) return {ok:false,msg:"Filtre por status = 'entregue'."};
        return {ok:true};
      }
    },
    {
      id: 'e3', title: 'Exercício 3 — Análise de preços',
      statement: 'Calcule o <strong>menor preço</strong> (alias: <code>preco_min</code>), o <strong>maior preço</strong> (alias: <code>preco_max</code>) e a <strong>média de preços</strong> (alias: <code>preco_medio</code>) dos produtos.',
      hint: 'MIN, MAX e AVG sobre a coluna preco da tabela produtos',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','min','max','avg','preco','from','produtos'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        return {ok:true};
      }
    },
  ]
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MÓDULO 07 — GROUP BY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 'mod-07', level: 'Intermediário', icon: '📦',
  title: '08. GROUP BY — agrupando para análise',
  objective: 'Usar GROUP BY para calcular métricas separadas por categoria, departamento, status ou qualquer outra dimensão.',

  slides: [
    {
      kind: 'theory', title: 'O que GROUP BY faz?',
      points: [
        '<code>GROUP BY</code> divide as linhas em grupos com base em valores iguais de uma ou mais colunas. Depois disso, as funções de agregação operam <em>dentro de cada grupo</em> separadamente.',
        'Sem GROUP BY: <code>COUNT(*)</code> conta todas as linhas da tabela. <em>Com</em> GROUP BY: <code>COUNT(*)</code> conta as linhas de cada grupo.',
        'Exemplo mental: GROUP BY status divide pedidos em três grupos (entregue, cancelado, em_andamento). COUNT e SUM calculam separadamente para cada grupo.',
      ],
    },
    {
      kind: 'theory', title: 'Regra de ouro do SELECT com GROUP BY',
      points: [
        'No SELECT de uma query com GROUP BY, você só pode incluir: (1) as colunas que estão no GROUP BY, e (2) funções de agregação. Nada mais.',
        'Tentar selecionar uma coluna que não está no GROUP BY e não é uma agregação causa erro na maioria dos bancos: "must appear in the GROUP BY clause or be used in an aggregate function".',
        'Correto: <code>SELECT status, COUNT(*) FROM pedidos GROUP BY status</code>. Errado: <code>SELECT status, total FROM pedidos GROUP BY status</code> — qual total exibir? Há vários por status.',
      ],
      warn: '⚠️ A regra das colunas no GROUP BY é um dos erros mais comuns. Se você tiver 5 colunas no SELECT e 3 no GROUP BY, as outras 2 precisam ser COUNT/SUM/AVG/MIN/MAX.',
    },
    {
      kind: 'theory', title: 'Ordenando grupos e combinando com JOIN',
      points: [
        'Você pode usar ORDER BY com GROUP BY: <code>ORDER BY COUNT(*) DESC</code> exibe os grupos com mais registros primeiro — lógica de ranking.',
        'Também pode combinar JOIN com GROUP BY: faça o JOIN para trazer os nomes, depois agrupe. Assim você agrupa por nome do departamento em vez de por ID numérico.',
        'A ordem de cláusulas sempre segue: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.',
      ],
    },
    {
      kind: 'example', title: 'Exemplo 1 — Pedidos por status',
      sql: `SELECT status,
       COUNT(*) AS quantidade,
       SUM(total) AS faturamento
FROM pedidos
GROUP BY status
ORDER BY faturamento DESC;`,
      explanation: 'Para cada status de pedido, conta quantos existem e soma o faturamento. ORDER BY ordena do maior faturamento para o menor.'
    },
    {
      kind: 'example', title: 'Exemplo 2 — Funcionários por departamento (com nome)',
      sql: `SELECT d.nome AS departamento,
       COUNT(*) AS funcionarios,
       AVG(f.salario) AS salario_medio
FROM funcionarios f
JOIN departamentos d ON f.departamento_id = d.id
GROUP BY d.nome
ORDER BY funcionarios DESC;`,
      explanation: 'Combina JOIN e GROUP BY: primeiro junta as tabelas, depois agrupa por nome do departamento. Resultado: um painel de RH por área.'
    },
  ],

  exercises: [
    {
      id: 'e1', title: 'Exercício 1 — Pedidos por status',
      statement: 'Conte quantos pedidos existem para cada <strong>status</strong>. Mostre <strong>status</strong> e a <strong>quantidade</strong> (alias: <code>total</code>), ordenado pela quantidade decrescente.',
      hint: 'SELECT status, COUNT(*) AS total FROM pedidos GROUP BY status ORDER BY total DESC',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','status','count','from','pedidos','group','by'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        return {ok:true};
      }
    },
    {
      id: 'e2', title: 'Exercício 2 — Produtos por categoria',
      statement: 'Para cada <strong>categoria</strong> de produto, mostre a <strong>quantidade de produtos</strong> e o <strong>preço médio</strong> (alias: <code>preco_medio</code>).',
      hint: 'SELECT categoria, COUNT(*) AS qtd, AVG(preco) AS preco_medio FROM produtos GROUP BY categoria',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','categoria','count','avg','preco','from','produtos','group','by'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        return {ok:true};
      }
    },
    {
      id: 'e3', title: 'Exercício 3 — Faturamento por departamento',
      statement: 'Use JOIN entre <code>pedidos</code>, <code>funcionarios</code> e <code>departamentos</code> para mostrar o <strong>nome do departamento</strong> e o <strong>faturamento total</strong> (alias: <code>faturamento</code>) de pedidos entregues, ordenado do maior para o menor.',
      hint: 'FROM pedidos p JOIN funcionarios f ON p.vendedor_id = f.id JOIN departamentos d ON f.departamento_id = d.id WHERE p.status = \'entregue\' GROUP BY d.nome',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','from','pedidos','join','funcionarios','join','departamentos','group','by'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam joins: '+missing.join(', ')};
        if (!n.includes('sum')) return {ok:false,msg:'Use SUM para calcular o faturamento.'};
        return {ok:true};
      }
    },
  ]
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MÓDULO 08 — HAVING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 'mod-08', level: 'Intermediário', icon: '🧹',
  title: '09. HAVING — filtrando após a agregação',
  objective: 'Usar HAVING para filtrar grupos inteiros com base no resultado de funções de agregação.',

  slides: [
    {
      kind: 'theory', title: 'WHERE não funciona para agregações',
      points: [
        'Problema clássico: você quer ver apenas departamentos com mais de 3 funcionários. A lógica seria <code>WHERE COUNT(*) > 3</code>, mas isso não funciona — WHERE é avaliado antes da agregação.',
        '<code>HAVING</code> resolve isso: é avaliado <em>após</em> o GROUP BY, quando os grupos já foram formados e as funções de agregação já foram calculadas.',
        'Regra simples: se a condição usa COUNT, SUM, AVG, MIN ou MAX — ela vai no HAVING. Se usa uma coluna diretamente — ela vai no WHERE.',
      ],
      diagram: {
        title: 'Fluxo lógico de execução SQL',
        svg: `<svg viewBox="0 0 440 60" font-family="sans-serif" font-size="10" xmlns="http://www.w3.org/2000/svg">
  ${['FROM','JOIN','WHERE','GROUP BY','HAVING','SELECT','ORDER BY','LIMIT'].map((s,i)=>`
    <rect x="${i*54+2}" y="15" width="50" height="28" rx="5" fill="${['#1e3a5f','#1e3a5f','#1a2e1a','#2a1e3a','#2a1a1a','#1e2a2a','#1a1a2e','#1e1e1e'][i]}" stroke="${['#3b82f6','#3b82f6','#22c55e','#a78bfa','#ef4444','#14b8a6','#f59e0b','#475569'][i]}" stroke-width="1.2"/>
    <text x="${i*54+27}" y="33" text-anchor="middle" fill="${['#93c5fd','#93c5fd','#86efac','#c4b5fd','#fca5a5','#5eead4','#fcd34d','#94a3b8'][i]}" font-size="8.5" font-weight="bold">${s}</text>
    ${i<7?`<path d="M${i*54+52} 29 L${i*54+56} 29" stroke="#475569" stroke-width="1" marker-end="url(#a)"/>`:''}
  `).join('')}
  <defs><marker id="a" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L0,5 L5,2.5 z" fill="#475569"/></marker></defs>
</svg>`
      }
    },
    {
      kind: 'theory', title: 'Sintaxe e boas práticas',
      points: [
        'HAVING vem sempre depois de GROUP BY na query: <code>GROUP BY coluna HAVING condição</code>. Você pode ter HAVING sem ORDER BY, mas sempre precisa de GROUP BY antes.',
        'É possível combinar WHERE e HAVING na mesma query: WHERE filtra linhas antes de agrupar, HAVING filtra grupos após agrupar. Use os dois juntos para filtragens em camadas.',
        'Boa prática: filtre o máximo possível com WHERE antes de agrupar. Isso reduz o volume de dados que o banco precisa agrupar, melhorando performance.',
      ],
    },
    {
      kind: 'example', title: 'Exemplo 1 — Departamentos grandes',
      sql: `SELECT d.nome AS departamento,
       COUNT(*) AS funcionarios
FROM funcionarios f
JOIN departamentos d ON f.departamento_id = d.id
GROUP BY d.nome
HAVING COUNT(*) >= 3
ORDER BY funcionarios DESC;`,
      explanation: 'Exibe apenas os departamentos com 3 ou mais funcionários. Departamentos menores são excluídos após a contagem.'
    },
    {
      kind: 'example', title: 'Exemplo 2 — Clientes de alto valor',
      sql: `SELECT c.razao_social AS cliente,
       COUNT(*) AS pedidos,
       SUM(p.total) AS faturamento
FROM pedidos p
JOIN clientes c ON p.cliente_id = c.id
WHERE p.status = 'entregue'
GROUP BY c.razao_social
HAVING SUM(p.total) >= 15000
ORDER BY faturamento DESC;`,
      explanation: 'WHERE filtra só pedidos entregues, GROUP BY agrupa por cliente, HAVING mostra só quem comprou R$ 15.000 ou mais no total.'
    },
  ],

  exercises: [
    {
      id: 'e1', title: 'Exercício 1 — Departamentos com 2+ funcionários',
      statement: 'Mostre <strong>departamento_id</strong> e a <strong>quantidade</strong> (alias: <code>total</code>) de funcionários, apenas para os departamentos com <strong>2 ou mais funcionários</strong>.',
      hint: 'HAVING COUNT(*) >= 2',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','count','from','funcionarios','group','by','having'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        if (!/having\s+count/i.test(sql)) return {ok:false,msg:'O HAVING deve filtrar pelo COUNT.'};
        return {ok:true};
      }
    },
    {
      id: 'e2', title: 'Exercício 2 — Status com faturamento alto',
      statement: 'Mostre <strong>status</strong> e a <strong>soma do total</strong> (alias: <code>soma</code>) dos pedidos, apenas para os status onde a soma seja <strong>maior ou igual a 50000</strong>.',
      hint: 'GROUP BY status HAVING SUM(total) >= 50000',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','status','sum','total','from','pedidos','group','by','having'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        if (!/having\s+sum/i.test(sql)) return {ok:false,msg:'O HAVING deve filtrar pelo SUM.'};
        return {ok:true};
      }
    },
    {
      id: 'e3', title: 'Exercício 3 — Clientes com múltiplos pedidos',
      statement: 'Use JOIN entre <code>pedidos</code> e <code>clientes</code>. Mostre <strong>razao_social</strong> e <strong>quantidade de pedidos</strong> (alias: <code>num_pedidos</code>), para clientes que fizeram <strong>mais de 1 pedido</strong>.',
      hint: 'HAVING COUNT(*) > 1',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['from','pedidos','join','clientes','on','group','by','having'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        if (!/having\s+count/i.test(sql)) return {ok:false,msg:'HAVING COUNT(*) > 1.'};
        return {ok:true};
      }
    },
  ]
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MÓDULO 09 — LEFT JOIN e valores ausentes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 'mod-09', level: 'Intermediário', icon: '🔓',
  title: '10. LEFT JOIN — incluindo registros sem correspondência',
  objective: 'Usar LEFT JOIN para manter todas as linhas do lado esquerdo, mesmo quando não há correspondência no lado direito.',

  slides: [
    {
      kind: 'theory', title: 'O problema do INNER JOIN',
      points: [
        'INNER JOIN só retorna linhas com correspondência nos dois lados. Se um funcionário tem <code>departamento_id</code> inválido (não existe no banco), ele some do resultado.',
        'Isso pode ser um problema em auditorias: você quer ver <em>todos</em> os funcionários, mesmo os com dados incompletos. Para isso existe o LEFT JOIN.',
        'Pergunta prática: "Quais funcionários não têm avaliações cadastradas?" Com INNER JOIN, funcionários sem avaliações não aparecem. Com LEFT JOIN + WHERE avaliacao IS NULL, você os encontra.',
      ],
    },
    {
      kind: 'theory', title: 'Como LEFT JOIN funciona',
      points: [
        'LEFT JOIN retorna <em>todas</em> as linhas da tabela da esquerda (a do FROM). Se não houver correspondência na tabela da direita (a do JOIN), as colunas do lado direito ficam como NULL.',
        'A "esquerda" é sempre a tabela no FROM; a "direita" é a tabela no JOIN. Por isso, a ordem importa em LEFT JOIN mas não em INNER JOIN.',
        'Padrão comum: <code>LEFT JOIN tabela_b ON condição WHERE tabela_b.id IS NULL</code> — isso encontra registros que existem em A mas NÃO existem em B. Muito útil para encontrar dados "órfãos" ou ausentes.',
      ],
      diagram: {
        title: 'INNER JOIN vs LEFT JOIN',
        svg: `<svg viewBox="0 0 400 105" font-family="sans-serif" font-size="10" xmlns="http://www.w3.org/2000/svg">
  <text x="95" y="14" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">INNER JOIN</text>
  <circle cx="70" cy="58" r="38" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" stroke-width="1.5"/>
  <circle cx="105" cy="58" r="38" fill="rgba(239,68,68,0.2)" stroke="#ef4444" stroke-width="1.5"/>
  <path d="M87.5,22 A38,38 0 0,1 105,96 A38,38 0 0,1 70,96 A38,38 0 0,1 87.5,22" fill="rgba(34,197,94,0.4)" stroke="none"/>
  <text x="50" y="62" fill="#93c5fd" font-size="9">A</text>
  <text x="125" y="62" fill="#fca5a5" font-size="9">B</text>
  <text x="87" y="62" fill="#86efac" font-size="8" font-weight="bold">A∩B</text>
  <text x="220" y="14" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">LEFT JOIN</text>
  <circle cx="195" cy="58" r="38" fill="rgba(59,130,246,0.35)" stroke="#3b82f6" stroke-width="2"/>
  <circle cx="230" cy="58" r="38" fill="rgba(239,68,68,0.1)" stroke="#ef4444" stroke-width="1" stroke-dasharray="4,3"/>
  <path d="M212.5,22 A38,38 0 0,1 230,96 A38,38 0 0,1 195,96 A38,38 0 0,1 212.5,22" fill="rgba(59,130,246,0.4)" stroke="none"/>
  <text x="175" y="62" fill="#93c5fd" font-size="9" font-weight="bold">A (todos)</text>
  <text x="250" y="62" fill="#fca5a5" font-size="9">B</text>
  <text x="310" y="45" fill="#94a3b8" font-size="9">Sem match:</text>
  <text x="310" y="58" fill="#94a3b8" font-size="9">colunas B</text>
  <text x="310" y="71" fill="#fcd34d" font-size="9">= NULL</text>
</svg>`
      }
    },
    {
      kind: 'example', title: 'Exemplo 1 — Funcionários sem avaliação',
      sql: `SELECT f.nome, f.cargo, av.nota
FROM funcionarios f
LEFT JOIN avaliacoes_funcionarios av
  ON f.id = av.funcionario_id
ORDER BY av.nota DESC;`,
      explanation: 'Todos os funcionários aparecem. Os sem avaliação cadastrada aparecem com nota NULL. Útil para identificar quem precisa ser avaliado.'
    },
    {
      kind: 'example', title: 'Exemplo 2 — Encontrando registros ausentes',
      sql: `SELECT f.nome, f.cargo
FROM funcionarios f
LEFT JOIN avaliacoes_funcionarios av
  ON f.id = av.funcionario_id
WHERE av.funcionario_id IS NULL
ORDER BY f.nome;`,
      explanation: 'Padrão "anti-join": LEFT JOIN + WHERE lado_direito IS NULL = encontra todos os itens de A que NÃO aparecem em B.'
    },
  ],

  exercises: [
    {
      id: 'e1', title: 'Exercício 1 — Todos os funcionários com departamento',
      statement: 'Use <strong>LEFT JOIN</strong> para listar <strong>nome</strong> do funcionário e <strong>nome do departamento</strong> (alias: <code>departamento</code>). Todos os funcionários devem aparecer, mesmo sem departamento.',
      hint: 'FROM funcionarios f LEFT JOIN departamentos d ON f.departamento_id = d.id',
      check: sql => {
        const n = sql.toLowerCase();
        if (!n.includes('left join') && !n.includes('left  join')) return {ok:false,msg:'Use LEFT JOIN (não INNER JOIN).'};
        const missing = ['from','funcionarios','departamentos','on'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        return {ok:true};
      }
    },
    {
      id: 'e2', title: 'Exercício 2 — Funcionários sem avaliação',
      statement: 'Liste <strong>nome</strong> e <strong>cargo</strong> dos funcionários que <strong>não possuem avaliação</strong> cadastrada (use LEFT JOIN + IS NULL).',
      hint: 'LEFT JOIN avaliacoes_funcionarios av ON f.id = av.funcionario_id WHERE av.funcionario_id IS NULL',
      check: sql => {
        const n = sql.toLowerCase();
        if (!n.includes('left join')) return {ok:false,msg:'Use LEFT JOIN.'};
        if (!n.includes('is null')) return {ok:false,msg:'Filtre com IS NULL para encontrar ausências.'};
        return {ok:true};
      }
    },
  ]
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MÓDULO 10 — Consultas analíticas e KPIs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 'mod-10', level: 'Avançado', icon: '📈',
  title: '11. Consultas analíticas e KPIs de negócio',
  objective: 'Construir consultas complexas que combinam múltiplos JOINs, GROUP BY e filtros para gerar indicadores reais de negócio.',

  slides: [
    {
      kind: 'theory', title: 'SQL analítico: modelar perguntas de negócio',
      points: [
        'SQL avançado não é sobre memorizar sintaxe — é sobre traduzir perguntas de negócio em queries. "Qual o ranking de vendedores por faturamento em 2024?" vira uma query com JOIN + GROUP BY + ORDER BY.',
        'Antes de escrever, mapeie: (1) quais tabelas contêm os dados, (2) como elas se conectam, (3) qual a dimensão de análise (agrupamento), (4) qual a métrica (agregação).',
        'KPIs comuns: faturamento por cliente (pedidos→clientes), ticket médio por vendedor (pedidos→funcionarios), volume por categoria (itens_pedido→produtos). Todos seguem o mesmo padrão estrutural.',
      ],
    },
    {
      kind: 'theory', title: 'Construindo queries em camadas',
      points: [
        'Comece simples: verifique se o JOIN básico funciona antes de adicionar GROUP BY. Se o JOIN retornar lixo, a agregação vai agregrar lixo.',
        'Adicione filtros com WHERE antes de agrupar — isso reduz o volume de dados e melhora a performance. Só adicione HAVING se o filtro depender da agregação.',
        'Teste cada parte da query separadamente. <code>SELECT COUNT(*)</code> primeiro para saber quantas linhas você está agrupando. Depois adicione as métricas.',
      ],
    },
    {
      kind: 'example', title: 'Exemplo 1 — Ranking de vendedores',
      sql: `SELECT f.nome AS vendedor,
       COUNT(*) AS pedidos,
       SUM(p.total) AS faturamento,
       AVG(p.total) AS ticket_medio
FROM pedidos p
JOIN funcionarios f ON p.vendedor_id = f.id
WHERE p.status = 'entregue'
GROUP BY f.nome
ORDER BY faturamento DESC;`,
      explanation: 'Ranking completo de vendedores: quantos pedidos fizeram, faturamento total e ticket médio. Apenas pedidos entregues entram no cálculo.'
    },
    {
      kind: 'example', title: 'Exemplo 2 — Faturamento por categoria de produto',
      sql: `SELECT pr.categoria,
       COUNT(DISTINCT p.id) AS pedidos,
       SUM(ip.quantidade * ip.preco_unitario) AS receita
FROM itens_pedido ip
JOIN produtos pr ON ip.produto_id = pr.id
JOIN pedidos p ON ip.pedido_id = p.id
WHERE p.status = 'entregue'
GROUP BY pr.categoria
ORDER BY receita DESC;`,
      explanation: 'Percorre três tabelas: itens_pedido como base, produto para a categoria, pedido para filtrar status. Calcula receita real = quantidade × preço unitário.'
    },
  ],

  exercises: [
    {
      id: 'e1', title: 'Exercício 1 — Ranking de clientes',
      statement: 'Liste <strong>razao_social</strong> do cliente, <strong>quantidade de pedidos</strong> (alias: <code>num_pedidos</code>) e <strong>faturamento total</strong> (alias: <code>faturamento</code>). Apenas pedidos <strong>entregues</strong>. Ordenar do maior faturamento para o menor.',
      hint: 'JOIN clientes c ON p.cliente_id = c.id WHERE status = \'entregue\' GROUP BY c.razao_social',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['from','pedidos','join','clientes','on','group','by','sum'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        if (!/'entregue'/i.test(sql)) return {ok:false,msg:"Filtre por status = 'entregue'."};
        return {ok:true};
      }
    },
    {
      id: 'e2', title: 'Exercício 2 — Análise por segmento de cliente',
      statement: 'Liste o <strong>segmento</strong> do cliente, <strong>quantidade de pedidos</strong> e <strong>faturamento total</strong> por segmento. Use JOIN entre <code>pedidos</code> e <code>clientes</code>. Ordene pelo faturamento decrescente.',
      hint: 'GROUP BY c.segmento',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['from','pedidos','join','clientes','on','group','by','segmento','sum'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        return {ok:true};
      }
    },
  ]
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MÓDULO 11 — Qualidade de dados e auditoria
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 'mod-11', level: 'Avançado', icon: '🔬',
  title: '12. Qualidade de dados e auditoria SQL',
  objective: 'Usar SQL para detectar dados ausentes, duplicados, inconsistentes ou fora das regras de negócio.',

  slides: [
    {
      kind: 'theory', title: 'SQL como ferramenta de auditoria',
      points: [
        'Além de relatórios, SQL é poderoso para garantia da qualidade de dados. Você pode detectar cadastros incompletos, valores fora do esperado, registros órfãos e duplicatas.',
        'Antes de confiar em qualquer indicador, audite os dados: cheque NULLs onde não deveria haver, verifique se os relacionamentos estão consistentes, busque valores impossíveis.',
        'Exemplos reais: funcionários com salário zero, pedidos sem itens, clientes com CNPJ duplicado, avaliações com notas fora do intervalo 0-10.',
      ],
    },
    {
      kind: 'theory', title: 'Padrões comuns de auditoria',
      points: [
        '<strong>Campos obrigatórios vazios</strong>: <code>WHERE campo IS NULL</code> ou <code>WHERE campo = \'\'</code>.',
        '<strong>Duplicatas</strong>: <code>GROUP BY campo HAVING COUNT(*) > 1</code> — encontra valores repetidos que deveriam ser únicos.',
        '<strong>Registros órfãos</strong>: LEFT JOIN + IS NULL — encontra IDs estrangeiros que não existem na tabela referenciada.',
      ],
    },
    {
      kind: 'example', title: 'Exemplo 1 — Dados de funcionários incompletos',
      sql: `SELECT id, nome, cargo, gestor_id, ativo
FROM funcionarios
WHERE gestor_id IS NULL
  AND ativo = true
ORDER BY nome;`,
      explanation: 'Lista funcionários ativos sem gestor cadastrado. Pode indicar tops de hierarquia (correto) ou cadastros incompletos (problema).'
    },
    {
      kind: 'example', title: 'Exemplo 2 — Cargos com mais de um funcionário',
      sql: `SELECT cargo, COUNT(*) AS qtd
FROM funcionarios
GROUP BY cargo
HAVING COUNT(*) > 1
ORDER BY qtd DESC;`,
      explanation: 'Encontra cargos com múltiplos funcionários. Útil para mapear onde há equipes vs. cargos únicos.'
    },
    {
      kind: 'example', title: 'Exemplo 3 — Produtos inativos ainda em pedidos',
      sql: `SELECT pr.nome AS produto, pr.ativo, COUNT(*) AS itens_em_pedidos
FROM itens_pedido ip
JOIN produtos pr ON ip.produto_id = pr.id
WHERE pr.ativo = false
GROUP BY pr.nome, pr.ativo;`,
      explanation: 'Detecta produtos marcados como inativos que ainda aparecem em itens de pedidos — possível inconsistência de dados.'
    },
  ],

  exercises: [
    {
      id: 'e1', title: 'Exercício 1 — Funcionários inativos',
      statement: 'Liste <strong>nome</strong>, <strong>cargo</strong> e <strong>data_admissao</strong> dos funcionários com <strong>ativo = false</strong>.',
      hint: 'WHERE ativo = false',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','nome','cargo','from','funcionarios','where','ativo'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        if (!/ativo\s*=\s*false/i.test(sql)) return {ok:false,msg:'Filtre ativo = false.'};
        return {ok:true};
      }
    },
    {
      id: 'e2', title: 'Exercício 2 — Cidades com mais de um cliente',
      statement: 'Liste <strong>cidade</strong> e <strong>quantidade de clientes</strong> (alias: <code>total</code>), apenas para cidades com <strong>mais de 1 cliente</strong>. Ordene pela quantidade decrescente.',
      hint: 'GROUP BY cidade HAVING COUNT(*) > 1',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','cidade','count','from','clientes','group','by','having'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        return {ok:true};
      }
    },
    {
      id: 'e3', title: 'Exercício 3 — Pedidos sem itens',
      statement: 'Use LEFT JOIN entre <code>pedidos</code> e <code>itens_pedido</code> para encontrar pedidos que <strong>não possuem itens</strong> cadastrados.',
      hint: 'FROM pedidos p LEFT JOIN itens_pedido ip ON p.id = ip.pedido_id WHERE ip.pedido_id IS NULL',
      check: sql => {
        const n = sql.toLowerCase();
        if (!n.includes('left join')) return {ok:false,msg:'Use LEFT JOIN.'};
        if (!n.includes('is null')) return {ok:false,msg:'Filtre com IS NULL.'};
        const missing = ['from','pedidos','itens_pedido','on'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        return {ok:true};
      }
    },
  ]
},


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MÓDULO 12 — Funções úteis, ANY/ALL e arrays
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 'mod-12', level: 'Avançado', icon: '🧰',
  title: '13. Funções úteis, ANY/ALL e arrays',
  objective: 'Aprender funções usadas no dia a dia e entender ANY, ALL e arrays sem travar a prática offline no SQLite.',
  slides: [
    { kind:'theory', title:'ANY, ALL, arrays e funções úteis', points:[
      'Funções, ANY, ALL e arrays entram no fim porque dependem de SELECT, WHERE, JOIN, GROUP BY, HAVING e subqueries.',
      '<strong>ANY</strong> compara com pelo menos um valor. <strong>ALL</strong> compara com todos os valores.',
      'No PostgreSQL existe <code>valor = ANY(array)</code> e <code>valor > ALL(subquery)</code>. No SQLite offline usamos equivalentes executáveis: <code>IN</code>, <code>EXISTS</code>, <code>MAX</code>, <code>GROUP_CONCAT</code>, <code>CASE</code>, <code>COALESCE</code>, <code>ROUND</code>.'
    ], warn:'Os exemplos são compatíveis com SQLite/sql.js para rodar no iPhone offline.' },
    { kind:'example', title:'Funções de texto', sql:`SELECT nome, UPPER(nome) AS nome_maiusculo, LOWER(cargo) AS cargo_minusculo, SUBSTR(nome, 1, 5) AS inicio_nome, LENGTH(nome) AS tamanho_nome
FROM funcionarios
ORDER BY nome;`, explanation:'Padroniza nomes, extrai trechos e mede tamanho de textos.' },
    { kind:'example', title:'ROUND e margem', sql:`SELECT nome, preco, custo, ROUND(preco - custo, 2) AS margem_valor, ROUND(((preco - custo) / preco) * 100, 1) AS margem_percentual
FROM produtos
WHERE ativo = 1
ORDER BY margem_percentual DESC;`, explanation:'Muito usado em BI, custo, compras e manutenção.' },
    { kind:'example', title:'CASE e COALESCE', sql:`SELECT nome, salario, COALESCE(cidade, 'SEM CIDADE') AS cidade_tratada,
CASE WHEN salario >= 15000 THEN 'ALTO' WHEN salario >= 9000 THEN 'MÉDIO' ELSE 'BASE' END AS faixa_salarial
FROM funcionarios
ORDER BY salario DESC;`, explanation:'CASE classifica registros. COALESCE trata valores nulos.' },
    { kind:'example', title:'ANY na prática — IN', sql:`SELECT nome, cargo, salario
FROM funcionarios
WHERE departamento_id IN (SELECT id FROM departamentos WHERE area IN ('Receita', 'Produto'))
ORDER BY nome;`, explanation:'IN cobre a ideia de “qualquer um destes valores”.' },
    { kind:'example', title:'ALL na prática — MAX', sql:`SELECT nome, salario
FROM funcionarios
WHERE salario > (SELECT MAX(salario) FROM funcionarios WHERE departamento_id = 5)
ORDER BY salario DESC;`, explanation:'Representa “maior que todos os salários do Suporte”.' },
    { kind:'example', title:'Array/lista — GROUP_CONCAT', sql:`SELECT c.razao_social AS cliente, GROUP_CONCAT(DISTINCT pr.nome) AS produtos_comprados
FROM pedidos p
JOIN clientes c ON c.id = p.cliente_id
JOIN itens_pedido ip ON ip.pedido_id = p.id
JOIN produtos pr ON pr.id = ip.produto_id
WHERE p.status = 'entregue'
GROUP BY c.razao_social
ORDER BY c.razao_social;`, explanation:'SQLite não tem array nativo como PostgreSQL, mas GROUP_CONCAT cria uma lista textual útil.' }
  ],
  exercises: [
    { id:'e1', title:'Exercício 1 — Faixa de preço com CASE', statement:'Liste <strong>nome</strong>, <strong>preco</strong> e <code>faixa_preco</code> classificando produtos.', hint:'Use CASE WHEN preco >= 20000 THEN ... END AS faixa_preco FROM produtos', check: sql=>{const n=sql.toLowerCase(); const miss=['case','when','then','else','end','faixa_preco','from','produtos'].filter(t=>!n.includes(t)); if(miss.length)return{ok:false,msg:'Faltam: '+miss.join(', ')}; return{ok:true};}},
    { id:'e2', title:'Exercício 2 — Receita ou Produto', statement:'Liste funcionários de departamentos cuja <code>area</code> seja Receita ou Produto. Use <code>IN</code> com subquery.', hint:"WHERE departamento_id IN (SELECT id FROM departamentos WHERE area IN ('Receita','Produto'))", check: sql=>{const n=sql.toLowerCase(); const miss=['from','funcionarios','in','select','departamentos','area'].filter(t=>!n.includes(t)); if(miss.length)return{ok:false,msg:'Faltam: '+miss.join(', ')}; return{ok:true};}},
    { id:'e3', title:'Exercício 3 — Produtos por cliente', statement:'Monte uma lista por cliente com <strong>razao_social</strong> e coluna <code>produtos</code> usando <code>GROUP_CONCAT</code>.', hint:'GROUP_CONCAT(pr.nome) AS produtos; pedidos -> clientes -> itens_pedido -> produtos', check: sql=>{const n=sql.toLowerCase(); const miss=['group_concat','clientes','pedidos','itens_pedido','produtos','join','group by'].filter(t=>!n.includes(t)); if(miss.length)return{ok:false,msg:'Faltam: '+miss.join(', ')}; return{ok:true};}}
  ]
},

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MÓDULO 13 — Projeto Final
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
{
  id: 'mod-13', level: 'Avançado', icon: '🏆',
  title: '14. Projeto Final — Relatório Executivo TechNova',
  objective: 'Consolidar todos os conceitos do curso em consultas analíticas completas que respondem a perguntas reais de negócio da TechNova.',

  slides: [
    {
      kind: 'theory', title: 'O que um relatório executivo precisa?',
      points: [
        'Um relatório executivo precisa ser claro, correto e verificável. Cada número deve ter uma fonte rastreável — a query que o gerou.',
        'Boas práticas finais: use aliases descritivos em todas as colunas calculadas, ordene por relevância (geralmente pelo maior indicador primeiro), limite a saída quando o volume for grande.',
        'Antes de apresentar dados, valide: os totais batem com outros relatórios? Os filtros de status estão corretos? Há duplicatas nos JOINs que inflariam contagens?',
      ],
    },
    {
      kind: 'theory', title: 'Próximos passos depois deste curso',
      points: [
        'Com o que aprendeu aqui, você já consegue escrever 80% das queries necessárias no dia a dia de analistas e desenvolvedores.',
        'Os próximos tópicos para aprofundar: <strong>CTEs</strong> (WITH ... AS) para queries modulares, <strong>Funções de Janela</strong> (ROW_NUMBER, RANK, LAG), <strong>Subqueries</strong> correlacionadas, e conceitos de <strong>índices e performance</strong>.',
        'Pratique em um banco PostgreSQL real com dados da sua área. A teoria do curso se consolida com prática repetida em contextos reais.',
      ],
      tip: '💡 Dica de carreira: quem domina SQL analítico tem vantagem em ciência de dados, engenharia de dados, product analytics, finanças e praticamente qualquer área que trabalhe com dados.',
    },
    {
      kind: 'example', title: 'Consulta Final 1 — Painel Comercial',
      sql: `SELECT
  c.razao_social AS cliente,
  c.segmento,
  COUNT(p.id)      AS pedidos,
  SUM(p.total)     AS faturamento,
  AVG(p.total)     AS ticket_medio,
  MIN(p.data_pedido) AS primeiro_pedido,
  MAX(p.data_pedido) AS ultimo_pedido
FROM pedidos p
JOIN clientes c ON p.cliente_id = c.id
WHERE p.status = 'entregue'
GROUP BY c.razao_social, c.segmento
ORDER BY faturamento DESC;`,
      explanation: 'Painel comercial completo por cliente: volume, faturamento, ticket médio e histórico. Apenas pedidos entregues.'
    },
    {
      kind: 'example', title: 'Consulta Final 2 — Performance de Vendedores',
      sql: `SELECT
  f.nome         AS vendedor,
  d.nome         AS departamento,
  COUNT(p.id)    AS pedidos,
  SUM(p.total)   AS faturamento,
  AVG(p.desconto) AS desconto_medio
FROM pedidos p
JOIN funcionarios f ON p.vendedor_id = f.id
JOIN departamentos d ON f.departamento_id = d.id
WHERE p.status != 'cancelado'
GROUP BY f.nome, d.nome
HAVING COUNT(p.id) >= 2
ORDER BY faturamento DESC;`,
      explanation: 'Performance de vendedores: junta 3 tabelas, exclui cancelados, só mostra vendedores com 2+ pedidos. Inclui desconto médio concedido.'
    },
  ],

  exercises: [
    {
      id: 'e1', title: 'Exercício Final 1 — Relatório por status',
      statement: 'Crie um relatório com <strong>status</strong>, <strong>quantidade de pedidos</strong> (alias: <code>pedidos</code>), <strong>faturamento total</strong> (alias: <code>faturamento</code>) e <strong>ticket médio</strong> (alias: <code>ticket_medio</code>). Ordenar por faturamento decrescente.',
      hint: 'SELECT status, COUNT(*), SUM(total), AVG(total) FROM pedidos GROUP BY status ORDER BY faturamento DESC',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['select','status','count','sum','avg','total','from','pedidos','group','by','order','by'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        return {ok:true};
      }
    },
    {
      id: 'e2', title: 'Exercício Final 2 — Top produtos vendidos',
      statement: 'Liste o <strong>nome do produto</strong>, <strong>quantidade total vendida</strong> (alias: <code>total_vendido</code>) e <strong>receita gerada</strong> (alias: <code>receita</code>) usando JOIN entre <code>itens_pedido</code> e <code>produtos</code>. Ordene pela receita decrescente.',
      hint: 'SUM(ip.quantidade) e SUM(ip.quantidade * ip.preco_unitario) com GROUP BY pr.nome',
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['from','itens_pedido','join','produtos','on','produto_id','group','by','sum'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        return {ok:true};
      }
    },
    {
      id: 'e3', title: 'Exercício Final 3 — Relatório de orçamento de projetos',
      statement: 'Liste <strong>nome do projeto</strong>, <strong>nome do departamento</strong> responsável e o <strong>orçamento</strong> de projetos com status <strong>\'em_andamento\'</strong>. Use JOIN entre <code>projetos</code> e <code>departamentos</code>. Ordene pelo orçamento decrescente.',
      hint: "FROM projetos pr JOIN departamentos d ON pr.departamento_id = d.id WHERE pr.status = 'em_andamento'",
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['from','projetos','join','departamentos','on','where'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        if (!/'em_andamento'/i.test(sql)) return {ok:false,msg:"Filtre por status = 'em_andamento'."};
        return {ok:true};
      }
    },
    {
      id: 'e4', title: 'Exercício Final 4 — Relatório final com funções úteis',
      statement: 'Crie um relatório por cliente com <code>razao_social</code>, lista de produtos com <code>GROUP_CONCAT</code>, <code>faturamento</code> com <code>SUM</code> e <code>ticket_medio</code> com <code>ROUND(AVG(...), 2)</code>. Considere apenas pedidos entregues.',
      hint: "Use pedidos, clientes, itens_pedido e produtos; filtre p.status = 'entregue'; agrupe por c.razao_social.",
      check: sql => {
        const n = sql.toLowerCase();
        const missing = ['group_concat','round','avg','sum','clientes','pedidos','itens_pedido','produtos','entregue','group by'].filter(t=>!n.includes(t));
        if (missing.length) return {ok:false,msg:'Faltam: '+missing.join(', ')};
        return {ok:true};
      }
    },
  ]
},

]; // fim COURSE