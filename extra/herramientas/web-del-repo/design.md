# Sistema de diseño

La web está hecha con [elastic-ui](#elastic-ui), la librería de componentes Vue de José.
Las reglas de cómo usarla están en su `USAGE.md`: gris por defecto, un solo ancho, una
sola cosa que se mueve a la vez, iconos solo donde ayudan, sin sombras propias. Este
archivo solo recoge lo propio de esta web.

**Qué es de la librería y qué de la web**: cómo se ven y se comportan las cosas es de
elastic-ui. Lo que se dice es de la web: los textos (en los `.md`), cada dibujo concreto,
los guiones de las sesiones de agente y los datos (el horario, el árbol de páginas, los
colores de las secciones). Si algo de la librería falla o falta, se le cuenta a la
librería; no se arregla por encima desde aquí.

## elastic-ui

Está publicada en npm como `@joseestevez/vue-elastic-ui`. En este proyecto se usa bajo el
alias `elastic-ui`, para que los `import` no cambien:

```json
"elastic-ui": "npm:@joseestevez/vue-elastic-ui@^0.3.1"
```

El repo de la librería: [JoseEstevez520/elastic-ui](https://github.com/JoseEstevez520/elastic-ui).

No trae CSS compilado: `src/style.css` importa sus tokens y le dice a Tailwind que lea sus
componentes (`@source`). Los textos que pone la librería por su cuenta (nombres para
lectores de pantalla, "En esta página", "Paso 2 de 4"...) están en español en
`src/main.js`, con `app.use(ElasticUi, { labels })`.

## Estructura

- **Barra lateral** (`Sidebar` conectada): solo las cuatro secciones (Inicio, Módulos,
  Extra, Horario), con su icono.
- **Cabecera** (`SidebarLayoutHeader`): las migas a la izquierda (`Breadcrumbs`, con las
  demás páginas de cada nivel detrás del chevron), y el buscador y el tema a la derecha.
  Las migas salen del árbol de páginas, que sigue las carpetas del repo
  (`src/lib/arbolNav.js` y `src/lib/migas.js`).
- **Entre páginas** (`PageTransition`): solo cambia el contenido, con un fundido corto. La
  rayita de scroll (`ScrollIndicator`) se asoma en cada página nueva.
- **Cada página** (`PlantillaPagina.vue`): un artículo a un solo ancho (`prose article`),
  con su título, y en pantallas muy anchas el índice de sus títulos a la derecha.

## Color

Gris por defecto. `--color-accent` está en `src/style.css` con el mismo gris casi negro
del texto (casi blanco en oscuro): la web no tiene color de acento.

El color con significado de esta web:

- **Cada sección** tiene el suyo (Módulos azul, Extra verde azulado, IA violeta,
  Herramientas ámbar, Diseño fucsia, Ideas de PFC verde lima, Horario rosa), en un
  único sitio, [`src/lib/colorSeccion.js`](src/lib/colorSeccion.js). Solo se usa en los
  iconos de las secciones (barra lateral y portada).
- **Cada módulo** tiene el suyo en el horario (`src/visuales/horario.js`), el mismo en el
  horario y en la tabla de módulos.
- **Modelo violeta y harness cian** en todas las páginas de agentes.

## Páginas

Cada página es un componente en `src/views/` (la regla, en [AGENTS.md](AGENTS.md)), dentro
de `PlantillaPagina`: un artículo con su título, una entradilla opcional y el índice, que
saca solo de sus `h2` y `h3` con `id`. Dentro va HTML normal (`h2`, párrafos, listas,
tablas), que la librería ya pinta con su tipografía, y sus piezas donde toca:

| Para | Pieza |
|---|---|
| páginas de una carpeta, enlaces a otras webs | tarjetas (`RejillaTarjetas` + `TarjetaPagina`) |
| código | `CodeBlock` (con `title` si es un archivo, `wrap` si es texto) |
| comandos que se ejecutan | `TerminalReplay` |
| pasos para hacer algo | `Steps static` |
| un aviso | `Callout` |
| una comparación | tabla, o dos `CodeBlock` en `side-by-side` si son dos textos cortos |
| detalles que no todos necesitan | `Accordion` |

Las páginas de los módulos comparten `ModuloView` mientras no tengan apuntes.

**Páginas en orden.** Las que se leen una detrás de otra (hoy, las de IA) forman una serie
en [`src/data/series.js`](src/data/series.js). Cada página de la serie acaba con la anterior
y la siguiente (`NavegacionSerie.vue`, dentro de `PlantillaPagina`), y la página de su
carpeta las numera. En su `.md` de GitHub va lo mismo como una línea al final.

## Piezas visuales (`src/visuales/`)

Para lo que se entiende mejor viéndolo que leyéndolo. Cada página las importa donde las
necesita. Cómo hacerlas: skill [apuntes-web](../../../.agents/skills/apuntes-web/SKILL.md).

- **Dibujos** con `Diagram` y las clases de la librería (`diagram-area`, `diagram-chip`...):
  `DiagramaHarness.vue` (qué es un agente) y `DiagramaAgentes.vue` (un equipo de agentes).
- **Sesiones de agente** con `AgentReplay`: cada guion está en `src/visuales/sesiones.js` y
  se pone con `<SesionAgente nombre="..." />`. Son inventados, y la página lo dice.
- **Horario** con `Timetable`: `HorarioSemanal.vue` (y su PNG) y `HorarioModulos.vue`.
