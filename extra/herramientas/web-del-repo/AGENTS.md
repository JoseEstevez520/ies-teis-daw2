# AGENTS.md

Explorador del repo entero, en Vue: convierte el contenido de `modulos/` y `extra/` en
una web navegable con diseño propio, no en markdown renderizado sin más.

## Stack

Vue 3 + Vite + Tailwind + vue-router + `@lucide/vue`, con los componentes de
[elastic-ui](design.md#elastic-ui). Sin VitePress ni ningún generador de sitios: los `.md`
los pinta el componente `Markdown` de la librería, y cada página a medida es un componente
Vue.

## Qué lleva diseño a medida y qué no

No todo el repo se convierte en página Vue diseñada a mano. Eso le pondría a cualquiera de
la clase que solo quiere escribir un apunte la barrera de saber Vue: este es un espacio
colaborativo para toda la clase, también para quien no programa.

- **Diseño a medida**: herramientas con entidad propia (`panel-aula-virtual`,
  `calculadora-de-faltas`...) y la propia portada del explorador.
- **Desde su `.md`**, con la plantilla común de [design.md](design.md): el resto de
  `modulos/` y `extra/`.

## La web sigue la estructura del repo

Cada carpeta o `.md` del repo es una página, y sale en las migas de la carpeta que la
contiene. No organices la web distinto al repo: si algo merece su propia página, sácalo a su
propio `.md` en vez de montarlo solo en la web.

## Antes de tocar el visual

Lee [design.md](design.md) y el `USAGE.md` de elastic-ui. No inventes un estilo nuevo
por página, y si a la librería le falta algo, se le pide a ella en vez de hacerlo a mano
aquí.

## Contenido en `.md`

Si vas a escribir o revisar contenido nuevo en `.md` en cualquier otra parte del repo
(no en este proyecto), sigue la skill
[apuntes-claros](../../../.agents/skills/apuntes-claros/SKILL.md).
