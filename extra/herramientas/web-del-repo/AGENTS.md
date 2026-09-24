# AGENTS.md

Explorador del repo entero, en Vue: convierte el contenido de `modulos/` y `extra/` en
una web navegable con diseño propio, no en markdown renderizado sin más.

## Stack

Vue 3 + Vite + Tailwind + vue-router + `@lucide/vue`, con los componentes de
[elastic-ui](design.md#elastic-ui). Sin VitePress ni ningún generador de markdown: cada
página bespoke se escribe como componente Vue.

## Qué lleva diseño a medida y qué no

No todo el repo se convierte en página Vue diseñada a mano. Eso le pondría a cualquiera de
la clase que solo quiere escribir un apunte la barrera de saber Vue: este es un espacio
colaborativo para toda la clase, también para quien no programa.

- **Diseño a medida**: herramientas con entidad propia (`panel-aula-virtual`,
  `calculadora-de-faltas`...) y la propia portada del explorador.
- **Renderizado desde su `.md`**, con la plantilla común de [design.md](design.md) (no
  markdown crudo, pero tampoco un componente distinto por cada apunte): el resto de
  `modulos/` y `extra/`.

## La web sigue la estructura del repo

Cada carpeta o `.md` del repo es una página, y sale como tarjeta en el índice de la
carpeta que la contiene. No organices la web distinto al repo: si algo merece su propia
tarjeta, sácalo a su propio `.md` en vez de montarlo solo en la web.

## Antes de tocar el visual

Lee [design.md](design.md): paleta, tipografía, iconos y la plantilla de página. No
inventes un estilo nuevo por página.

## Contenido en `.md`

Si vas a escribir o revisar contenido nuevo en `.md` en cualquier otra parte del repo
(no en este proyecto), sigue la skill
[apuntes-claros](../../../.agents/skills/apuntes-claros/SKILL.md).
