# Sistema de diseño

Extiende la regla ya existente en [`../README.md#estilo-visual`](../README.md#estilo-visual)
(paleta neutra, color solo con significado, sin fondos/insignias detrás de iconos, sin
patrones de dashboard genérico) con los valores concretos de este proyecto.

## Paleta

Escala neutra de Tailwind, la misma que ya usan `panel-aula-virtual` y
`calculadora-de-faltas`:

| Token | Valor | Uso |
|---|---|---|
| `neutral-50` | `#fafafa` | fondo de la página |
| `white` | `#ffffff` | tarjetas, barra lateral |
| `neutral-200` | `#e5e5e5` | bordes |
| `neutral-400` | `#a3a3a3` | texto secundario |
| `neutral-900` | `#171717` | texto principal, títulos |

**Sin acento de color**: solo negro, blanco y grises. Lo que en otro sistema sería "el
acento" (enlace activo, indicador de "estás aquí") se marca con `neutral-900` en negrita o
un borde/fondo `neutral-100`, no con un color distinto.

**Excepción documentada — tarjetas de recursos**: cuando una lista del `.md` es
mayoritariamente enlaces externos con descripción (ver `parseMarkdown` en
[`src/lib/markdown.js`](src/lib/markdown.js)), se renderiza como tarjetas con favicon real
del sitio (vía `icon.horse`, con CORS abierto) y un degradado sacado del color medio de
ese favicon (`src/lib/colorFavicon.js`, leído por canvas en `TarjetaRecurso.vue`). Mientras
carga o si falla (favicon casi transparente, red, servicio caído), se usa de reserva un
degradado por hash del dominio, calculado en `parseMarkdown`: determinista, mismo dominio
da mismo color, sin red. Es la única zona con color a propósito: sin ella, una lista de
herramientas externas es indistinguible de cualquier otra lista. No se usa para nada más.

Se probó antes con captura real de la landing (vía `image.thum.io`): se descartó porque el
servicio gratuito falla para algunos dominios (límite de uso) sin devolver un error
detectable — carga una imagen válida con el aviso "not authorized" dentro.

Los colores semánticos (`emerald`/`amber`/`red` de éxito/aviso/error) quedan reservados
para las herramientas que ya los usan (`panel-aula-virtual`, `calculadora-de-faltas`); no
se reutilizan aquí con otro significado.

## Tipografía

Sin fuente propia: la pila `sans` por defecto de Tailwind (`system-ui` y similares) es la
misma que ya cae por defecto en el resto de herramientas, así que no hace falta cargar
nada nuevo.

| Uso | Clases |
|---|---|
| Título de página | `text-2xl font-semibold text-neutral-900` |
| Título de sección/tarjeta | `text-base font-semibold text-neutral-900` |
| Cuerpo | `text-sm text-neutral-700` |
| Texto secundario (fechas, rutas, metadatos) | `text-xs text-neutral-400` |

## Iconos

`@lucide/vue`, un icono por sección de nivel superior, no por cada módulo suelto, para no
inventar significados técnicos que no están confirmados:

| Sección | Icono |
|---|---|
| Inicio | `Home` |
| Módulos | `BookOpen` |
| Herramientas | `Wrench` |
| IA | `Bot` |
| Diseño web | `Palette` |
| Ideas de PFC | `Lightbulb` |
| Horario | `Calendar` |

**Excepción — tarjetas de páginas del repo**: cuando una lista del `.md` es
mayoritariamente enlaces internos con descripción (p.ej. el índice de herramientas), se
renderiza como tarjetas (`TarjetaInterna.vue`), cada una con su propio icono y título
sacados de [`src/data/fichas.js`](src/data/fichas.js). El icono es el mismo que ya usa la
vista a medida de esa herramienta, si la tiene. Una página sin ficha sale con el nombre
de su carpeta y `FileText`. Flecha `ArrowRight` si abre dentro de la web, `ArrowUpRight`
si no hay página y va a GitHub.

## Layout

- **Barra lateral**: fija a la izquierda, `w-64 border-r border-neutral-200 bg-white`,
  mismo patrón que [`Sidebar.vue`](../panel-aula-virtual/frontend/src/components/Sidebar.vue)
  de `panel-aula-virtual`.
- **Contenido**: `max-w-4xl` centrado dentro del área principal, `p-8`.
- **Portada**: una frase de una línea + rejilla de tarjetas (una por sección de nivel
  superior), cada tarjeta con icono, título y una frase, sin foto de fondo ni gradientes.

## Plantilla de página

Dos variantes. La decisión de cuál usar está en [`AGENTS.md`](AGENTS.md#qué-lleva-diseño-a-medida-y-qué-no).

**A medida** (herramientas con entidad propia):

```vue
<script setup>
import { IconoDeLaSeccion } from '@lucide/vue'
</script>

<template>
  <div class="max-w-4xl flex flex-col gap-6">
    <div class="flex items-center gap-2.5">
      <IconoDeLaSeccion class="w-5 h-5 text-neutral-900 shrink-0" />
      <h1 class="text-2xl font-semibold text-neutral-900">Título de la página</h1>
    </div>

    <!-- contenido propio de esta página -->
  </div>
</template>
```

**Desde `.md`** (apuntes y el resto de `extra/`): el mismo encabezado de arriba, pero el
cuerpo lo pone un componente `PaginaMarkdown` compartido que aplica la tipografía de esta
tabla al `.md` de origen. No es markdown crudo sin estilo, pero tampoco un diseño distinto
por cada apunte.

Los bloques ```` ```mermaid ```` se pintan como diagrama (`DiagramaMermaid.vue`), con la
paleta neutra de arriba. Mermaid solo se descarga en las páginas que tienen alguno.
