# AGENTS.md

Explorador del repo entero, en Vue: convierte el contenido de `modulos/` y `extra/` en
una web navegable con diseño propio, no en markdown renderizado sin más.

## Stack

Vue 3 + Vite + Tailwind + vue-router + `@lucide/vue`, mismo patrón que
[`panel-aula-virtual/frontend`](../panel-aula-virtual/frontend/) y
[`calculadora-de-faltas`](../calculadora-de-faltas/). Sin VitePress ni ningún generador de
markdown: cada página bespoke se escribe como componente Vue.

## Qué lleva diseño a medida y qué no

No todo el repo se convierte en página Vue diseñada a mano. Eso le pondría a cualquiera de
la clase que solo quiere escribir un apunte la barrera de saber Vue: este es un espacio
colaborativo para toda la clase, también para quien no programa.

- **Diseño a medida**: herramientas con entidad propia (`panel-aula-virtual`,
  `calculadora-de-faltas`...) y la propia portada del explorador.
- **Renderizado desde su `.md`**, con la plantilla común de [design.md](design.md) (no
  markdown crudo, pero tampoco un componente distinto por cada apunte): el resto de
  `modulos/` y `extra/`.

## Antes de tocar el visual

Lee [design.md](design.md): paleta, tipografía, iconos y la plantilla de página. No
inventes un estilo nuevo por página.

## Contenido en `.md`

Si vas a escribir o revisar contenido nuevo en `.md` en cualquier otra parte del repo
(no en este proyecto), sigue la skill
[apuntes-claros](../../../.agents/skills/apuntes-claros/SKILL.md).
