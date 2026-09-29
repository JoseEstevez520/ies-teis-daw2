# Web del repo

Convierte el contenido del repo (apuntes, recursos, extra) en una web navegable, en vez de
tener que bucear por carpetas en GitHub.

## Arrancarla

```bash
cd extra/herramientas/web-del-repo
npm install
npm run dev
```

Abre la dirección que imprime (por defecto `http://localhost:5173`). Necesita Node 20 o
superior. `npm install` descarga y compila elastic-ui, así que la primera vez tarda un
poco.

Para la versión de producción, `npm run build` (sale en `dist/`).

## Cómo está hecha

Vue 3 + Vite + Tailwind, con los componentes de [elastic-ui](design.md#elastic-ui). El
diseño y las reglas están en [design.md](design.md) y [AGENTS.md](AGENTS.md).

## La convención de nombres

La convención del repo (minúsculas-con-guiones, ver
[`../../../CONTRIBUTING.md`](../../../CONTRIBUTING.md)) existe justo por esto: esos nombres
son las URLs de la web, sin que haya que renombrar nada.
