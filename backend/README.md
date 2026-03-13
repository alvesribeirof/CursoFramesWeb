# backend

API Node.js para o projeto CursoFramesWeb.

## Execucao

```bash
npm install
node loader.js
```

## Atualizacao de Seguranca e Dependencias (2026-03-13)

- Remocao de `node-restful` e migracao para handlers Express + Mongoose.
- Atualizacao de dependencias principais (Express, Mongoose e utilitarios).
- Lockfile regenerado e ambiente estabilizado.
- Auditoria de producao (`npm audit --omit=dev`) sem vulnerabilidades.
