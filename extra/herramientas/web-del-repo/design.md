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
