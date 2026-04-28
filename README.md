# Curso SQL Offline — PWA

Pacote completo usando o `course.js` fornecido como base.

## O que tem

- React + Vite
- PWA offline com `manifest.webmanifest` e `public/sw.js`
- Banco SQLite local via `sql.js`
- Base rica fictícia TechNova em `public/data/tecnova.sql`
- Login simples local
- Progresso salvo no navegador
- Teoria, exemplos, diagramas e exercícios vindos de `src/courseData.js`
- Exercícios liberam progresso apenas quando:
  1. a validação do exercício aprova a query;
  2. a query executa no banco local;
  3. a query retorna colunas.

## Rodar local

```bash
npm install
npm run dev
```

Abrir o endereço indicado pelo Vite.

## Build para Render Static Site

```bash
npm install
npm run build
```

Configuração no Render:

- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

## Observação

O arquivo `sql-wasm.wasm` é copiado automaticamente do pacote `sql.js` para `public/` no `postinstall`.
