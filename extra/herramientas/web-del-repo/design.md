# Sistema de diseño

La web está hecha con [elastic-ui](#elastic-ui), la librería de componentes Vue de José:
las cosas se transforman en vez de aparecer de golpe, pocas cajas y una sola animación
que manda en cada pantalla. Este archivo dice cómo se aplica aquí. Extiende la regla de
[`../README.md#estilo-visual`](../README.md#estilo-visual): paleta neutra, color solo con
significado.

## elastic-ui

Aún no está en npm. Va empaquetada en `vendor/elastic-ui-<versión>.tgz`, para que funcione
al clonar el repo sin tener la librería en tu ordenador.

Para actualizarla, desde la carpeta de la librería:

```bash
npm run build
npm pack --pack-destination <ruta-a>/web-del-repo/vendor
```

Y aquí `npm install ./vendor/elastic-ui-<versión>.tgz`. Borra el `.tgz` viejo.

No trae CSS compilado: `src/style.css` importa sus tokens y le dice a Tailwind que lea sus
componentes (`@source`).

Antes de montar algo a mano, mira si la librería ya lo tiene. Qué usa la web:

| Para | Componente |
|---|---|
| estructura | `SidebarLayout`, `Sidebar variant="connected"`, `SidebarToggle`, `NavTree` |
| índice de cada página | `TableOfContents` (los `##`, a la derecha, solo en pantallas anchas) |
| bloques de código | `CodeBlock` |
| avisos | `Callout` |
| `###` de un `.md` | `Accordion` |
| tarjetas | `Card` |
| filtros | `Tabs variant="pill"` + `AnimatedList` |
| buscador | `SearchMorph` (se abre con `/`) |
| tema claro / oscuro | `ThemeToggle` |
| botones y etiquetas | `Button`, `Badge`, `TextMorph` |

## Paleta

Los colores son los tokens de elastic-ui (`--color-bg`, `--color-fg`...), en clases de
Tailwind (`bg-bg`, `text-fg-secondary`...). Cada token tiene valor claro y oscuro, así que
la web sale bien en los dos temas sin hacer nada.

| Token | Uso |
|---|---|
| `bg` | fondo de la página |
| `bg-subtle`, `bg-muted` | fondos suaves: código, hover |
| `border`, `border-strong` | líneas y bordes |
| `fg` | títulos y texto importante |
| `fg-secondary` | texto normal |
| `fg-muted`, `fg-faint` | texto secundario, iconos apagados |

No pongas grises fijos (`neutral-500`, `#fff`...): en tema oscuro no se ven.

**Sin acento de color.** `--color-accent` está en `src/style.css` con el mismo gris casi
negro del texto (casi blanco en oscuro). La página activa, el foco o la pestaña elegida se
marcan con ese gris, no con un color.

**Color por sección**: cada sección del repo tiene su color (Módulos azul, Extra verde
azulado, IA violeta, Herramientas ámbar, Diseño web fucsia, Ideas de PFC verde lima,
Horario rosa), definido en un único sitio, [`src/lib/colorSeccion.js`](src/lib/colorSeccion.js).
Solo se usa en iconos. Como los componentes piden el icono como componente, el color se le
pone con `iconoConColor` de [`src/lib/iconos.js`](src/lib/iconos.js).

**Excepción, tarjetas de recursos**: cuando una lista del `.md` es casi toda enlaces
externos con descripción, sale como tarjetas con el favicon real del sitio (vía
`icon.horse`) y un degradado del color medio de ese favicon (`src/lib/colorFavicon.js`).
Mientras carga, o si falla, un degradado por hash del dominio. Es la única zona con color a
propósito: sin ella, una lista de herramientas externas es igual que cualquier otra lista.

**Excepción, piezas visuales** (`src/visuales/`): llevan color, siempre con significado. Las
reglas están en la skill [apuntes-web](../../../.agents/skills/apuntes-web/SKILL.md).

Los avisos (`Callout`) usan los colores de la librería: verde para consejo, ámbar para
aviso, rojo para cuidado.

## Tipografía

Sin fuente propia: la de elastic-ui cae a la del sistema si no está instalada.

| Uso | Clases |
|---|---|
| Título de página | `text-2xl font-semibold tracking-tight text-fg` |
| Título de sección (`##`) | `text-lg font-semibold tracking-tight text-fg` |
| Título de tarjeta | `CardTitle size="sm"` |
| Cuerpo | `text-sm text-fg-secondary` |
| Texto secundario | `text-xs text-fg-muted` |

## Iconos

`@lucide/vue`. En la barra lateral, solo las secciones de primer nivel llevan icono; el
resto va con el texto solo. No hace falta un icono ni una marca en cada cosa.

| Sección | Icono |
|---|---|
| Inicio | `Home` |
| Módulos | `BookOpen` |
| Extra | `Layers` |
| Herramientas | `Wrench` |
| IA | `Bot` |
| Diseño web | `Palette` |
| Ideas de PFC | `Lightbulb` |
| Horario | `Calendar` |

**Tarjetas de páginas del repo**: cuando una lista del `.md` es casi toda enlaces internos
con descripción, sale como tarjetas (`TarjetaInterna.vue`) con título e icono de
[`src/data/fichas.js`](src/data/fichas.js). Sin ficha, el nombre de la carpeta y
`FileText`. Flecha `ArrowRight` si abre dentro de la web, `ArrowUpRight` si va a GitHub.

## Layout

- **Barra lateral**: `Sidebar` conectada. La página activa es una pestaña del mismo color
  que el contenido, que entra en la barra, sin sombra: las esquinas curvas que la unen a la
  página se redibujan en `src/style.css` con un degradado en vez del `box-shadow` de la
  librería. Se pliega a una columna de iconos; en el móvil es un panel que se abre
  con el botón de arriba. Un grupo no es un enlace, así que su propia página va como
  primera entrada, "Índice".
- **Cabecera**: buscador y cambio de tema, a la derecha.
- **Contenido**: `max-w-3xl`, con el índice de la página a la derecha en pantallas anchas.
  La ventana es la que hace scroll, no el contenido.
- **Portada**: una frase + rejilla de tarjetas, una por sección.

## Cajas

Las tarjetas que llevan a otra página van en caja (`Card` con borde), que se marca más al
pasar por encima. El resto va sin caja: las secciones se separan con espacio, las tablas y
listas de enlaces solo con líneas entre filas, y el código con un fondo suave.

## Movimiento

Lo pone la librería; no animes nada a mano.

- Lo que ya está al cargar la página se muestra sin animar. Al cambiar de página, la nueva
  entra enfocándose (`blur-in`).
- Una sola animación manda en cada pantalla: no añadas otra al lado de la de un componente.
- Si un texto cambia de valor (un botón que pasa a "Generando…"), `TextMorph`.

## Plantilla de página

Dos variantes. Cuál usar está en [`AGENTS.md`](AGENTS.md#qué-lleva-diseño-a-medida-y-qué-no).
Las dos usan `PlantillaPagina` (título, icono y el índice a la derecha) y `SeccionPagina`
para cada `##`.

**A medida** (herramientas con entidad propia):

```vue
<script setup>
import { IconoDeLaSeccion } from '@lucide/vue'
import { colorDeRuta } from '../lib/colorSeccion.js'
import PlantillaPagina from '../components/PlantillaPagina.vue'
import SeccionPagina from '../components/SeccionPagina.vue'

const INDICE = [{ id: 'primera', label: 'Primera sección', level: 2 }]
</script>

<template>
  <PlantillaPagina titulo="Título" :icono="IconoDeLaSeccion" :color="colorDeRuta('/ruta')" :indice="INDICE">
    <SeccionPagina id="primera">
      <template #titulo>Primera sección</template>
      <!-- contenido -->
    </SeccionPagina>
  </PlantillaPagina>
</template>
```

**Desde `.md`** (apuntes y el resto de `extra/`): `MarkdownRouteView` pasa el `.md` por
[`src/lib/markdown.js`](src/lib/markdown.js), que lo convierte en bloques, y cada bloque sale
con su componente:

| En el `.md` | Sale como |
|---|---|
| `##` | sección, con icono y en el índice de la página |
| `###` | desplegable (`Accordion`) |
| bloque de código | `CodeBlock` |
| `> [!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]` | `Callout` |
| párrafo que empieza por "Ojo:", "Cuidado:", "Nota:"... | `Callout` |
| lista numerada | pasos |
| lista de enlaces | tarjetas |

Los bloques ```` ```mermaid ```` se pintan como diagrama (`DiagramaMermaid.vue`), con los
colores del tema que se está viendo. Mermaid solo se descarga en las páginas que lo usan.

**Piezas visuales interactivas** (`src/visuales/`): para lo que se entiende mejor tocándolo
que leyéndolo. El `.md` las mete con un bloque ```` ```visual ```` y el nombre de la pieza,
registrado en `src/visuales/index.js`. Cómo hacerlas: skill
[apuntes-web](../../../.agents/skills/apuntes-web/SKILL.md).
