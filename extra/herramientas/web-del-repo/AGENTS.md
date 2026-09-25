# AGENTS.md

Explorador del repo entero, en Vue: convierte el contenido de `modulos/` y `extra/` en
una web navegable con diseño propio, no en markdown renderizado sin más.

## Stack

Vue 3 + Vite + Tailwind + vue-router + `@lucide/vue`, con los componentes de
[elastic-ui](design.md#elastic-ui). Sin VitePress ni ningún generador de sitios.

## Cada página, un componente

Cada página de la web es un componente Vue compuesto a mano (`src/views/`), no el `.md`
renderizado: se decide qué va en tarjetas, qué en una tabla, qué se enseña con un dibujo o
una sesión de agente. El `.md` de cada carpeta es la versión de GitHub y la fuente del
contenido.

- **Si cambias un `.md`**, cambia también su página (`router/index.js` dice cuál es). Si no
  sabes Vue, cambia el `.md` y avisa: la página se pone al día después.
- **Página nueva**: su componente en `src/views/paginas/`, su ruta en `router/index.js` y
  su entrada en `src/data/paginas.js`, para que salga en las migas y en el buscador.

## La web sigue la estructura del repo

Cada carpeta o `.md` del repo es una página, y sale como tarjeta en la página de la
carpeta que la contiene y en sus migas. No organices la web distinto al repo: si algo
merece su propia página, sácalo a su propio `.md` en vez de montarlo solo en la web.

## Antes de tocar el visual

Lee [design.md](design.md) y el `USAGE.md` de elastic-ui. No inventes un estilo nuevo
por página, y si a la librería le falta algo, se le pide a ella en vez de hacerlo a mano
aquí.

## Contenido en `.md`

Si vas a escribir o revisar contenido nuevo en `.md` en cualquier otra parte del repo
(no en este proyecto), sigue la skill
[apuntes-claros](../../../.agents/skills/apuntes-claros/SKILL.md).
