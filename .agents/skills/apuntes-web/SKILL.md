---
name: apuntes-web
description: Cómo crear o mejorar una página de la web del repo (web-del-repo) que explica algo (un apunte, una idea o un proyecto), con diagramas, piezas interactivas y ejemplos. Úsala siempre que añadas o rehagas un apunte, tema o recurso de extra/ o modulos/ que se vaya a ver en la web, junto con apuntes-claros para el texto.
---

# Apuntes web

## El `.md` y la web son dos archivos

El `.md` es la versión de GitHub; la página es un componente Vue compuesto a mano. No se
traducen el uno al otro: el `.md` lleva el texto, y la página decide qué va en tarjetas,
tablas, dibujos o piezas. Cambias uno, cambias el otro, pero cada uno se escribe para su
sitio. El texto, en los dos, sigue [apuntes-claros](../apuntes-claros/SKILL.md).

## Antes de componer: lee la librería

La forma (colores, movimiento, componentes) la pone `elastic-ui`. Antes de componer una
página, mírala:

- Su **`USAGE.md`** (en `extra/herramientas/web-del-repo/node_modules/elastic-ui/`): las
  reglas de cómo usarla bien (morph, un solo movimiento, iconos, color, cómo se compone una
  página).
- Sus **componentes y ejemplos**: la lista de lo que trae y, para cada pieza, su `.d.ts` y sus
  `*.stories.ts` en [su repo](https://github.com/JoseEstevez520/elastic-ui). Los ejemplos dicen
  cómo se usa de verdad.

Usa cada pieza como está pensada. No improvises un estilo ni montes a mano lo que la librería
ya trae; si le falta algo, se le pide a ella.

## Principios

1. **Se entiende a simple vista.** Si hace falta leer un párrafo para entenderlo, falta un
   visual o sobra texto.
2. **Poco texto.** Una frase por idea. Si el visual ya lo explica, fuera la prosa.
3. **Lo concreto primero.** "Ejecuta comandos (`npm test`)" y, como pista, "sus manos".
   Una comparación sola no se entiende.
4. **Minimalista.** Sin cajas dentro de cajas, sin bordes de adorno, sin sombras. Color
   solo si significa algo.
5. **Funciona en el móvil.** A 390 px, sin scroll horizontal.
6. **Nada escondido.** Lo principal se entiende sin tocar nada: no pongas el contenido que hay que
   ver de un vistazo detrás de pestañas o desplegables. Un `Tabs` vale solo para alternativas
   equivalentes, no para lo esencial.

## Antes de escribir

- Datos de la **documentación oficial**, nunca de memoria. Si enseñas números (precios,
  benchmarks), con su fuente y su fecha, y en una gráfica de verdad (ejes, rejilla), no en un
  dibujo conceptual.
- **Sin enlaces que desvíen.** No metas un "ver X" a otra página que saque de la lectura; si hace
  falta, que sea imprescindible.
- **Conceptos, no una herramienta.** Se explica la idea, que vale para cualquier
  herramienta (qué es un agente, qué es un AGENTS.md, una skill, un MCP), no cómo se usa un
  programa concreto. La herramienta de clase (en IA, OpenCode) es solo el ejemplo: sus
  nombres, archivos y rutas salen como "en OpenCode, ...", nunca como el tema de la página.
- Busca **qué hay que entender primero**, y cuéntalo con lo mínimo. En agentes bastó
  "el modelo es el cerebro, el harness le da herramientas"; el bucle y MCP confundían.
- Lo básico va en su propia página (como `extra/ia/fundamentos/`), no al principio de otra.
- **Poco, y una puerta para explorar.** Explica bien solo lo necesario para empezar. Lo
  avanzado va al final, en `## Para explorar`: una línea por tema y el enlace a la
  documentación oficial. Sin orden fijo: cada uno tira del hilo que le interese.

## Qué forma darle a cada idea

| Si la idea es… | Forma |
|---|---|
| pasos en orden | lista numerada |
| detalles o casos dentro de un tema | `###` por cada uno |
| una comparación | tabla |
| un fichero o comando | bloque de código con el ejemplo real |
| código que solo se lee, y es largo | bloque de código, no un `CodeWalkthrough` que se arrastra |
| la estructura de carpetas de un proyecto | bloque de código con el árbol |
| un cambio en un fichero | bloque ```` ```diff ```` |
| piezas que encajan | dibujo con cajas (una dentro de otra si una contiene a la otra) |
| cómo trabaja un agente | sesión de agente (una por idea, una detrás de otra) |

## Páginas de idea o de proyecto

No solo apuntes: las páginas de una idea o un proyecto (`extra/ideas-proyecto-fin-curso/`)
siguen las mismas reglas, con esta forma:

1. **Qué es**, en una frase que ya sirva sola.
2. **La idea entera**, como estaba en el `.md`: qué es y a escala de PFC. No la recortes.
3. **Una pieza** que la haga concreta (un diagrama, una sesión de agente, un gráfico, una
   pieza real de la librería), con su frase antes y su conclusión en negrita después. Una
   pieza por idea.
4. **De dónde sale**, si viene de una serie, un libro o un proyecto.
5. **Sus enlaces.**

Cada idea con su pieza: no todas con el mismo esquema. Mira la librería y usa lo que le
encaje a esa idea (tabs, filtros, chat, sesión de agente, gráfico, diff...).

Las secciones van con etiquetas de rol, siempre las mismas, no resumiendo el contenido:

| Qué hay en la sección | Título |
|---|---|
| el mecanismo, la pieza principal | **Cómo funciona** |
| una demostración concreta | **Un ejemplo** |
| lo que se suma a la idea | **Para ir más allá** |
| el origen (serie, libro, proyecto) | **De dónde sale** |
| el plan de trabajo | **A escala de PFC** |

Mal: "Vidas enteras", "Análisis del canal", "Con agentes y MCP" (eso cuenta el contenido).
Bien: "Cómo funciona", "Un ejemplo", "Para ir más allá".

Los `h2` y `h3` salen en el índice lateral de la página, así que esos títulos se leen solos.

## Piezas visuales

Cada página de la web es un componente Vue compuesto a mano, en
`extra/herramientas/web-del-repo/src/views/`; el `.md` es la versión de GitHub. Las piezas
visuales son componentes en `src/visuales/` que la página importa donde toca.

Referencias: `DiagramaHarness.vue` (cajas), las sesiones de `sesiones.js` (con
`<SesionAgente nombre="..." />`) y `HorarioSemanal.vue`. Antes de hacer una pieza, mira si
basta una tabla o un bloque de código. La forma (colores, dibujos, movimiento) la ponen los
componentes de elastic-ui; su `USAGE.md` tiene las reglas.

- **Alrededor de cada pieza**: una frase antes que diga en qué fijarse, y después su
  conclusión en negrita, para quien solo mira el final.
- **El texto no repite el dibujo**: lo que la pieza ya enseña no se vuelve a contar en
  prosa. Si el diagrama lista las etapas, el texto no las enumera otra vez; la frase de
  antes dice en qué fijarse, no lo que ya se ve. Si dos bloques dicen lo mismo, sobra uno.
- **Color:** uno por concepto, el mismo en toda la página. Verde / ámbar / rojo solo
  para sí / con condiciones / no. Fuera de las piezas, el de la sección
  (`src/lib/colorSeccion.js`).
- **Iconos y logos:** Lucide (`@lucide/vue`) para iconos generales y de concepto, a 16–20 px y
  trazo 1.5, con una etiqueta corta al lado. Simple Icons (`simple-icons`) para marcas y
  tecnologías, con `Logo.vue` y `Tecnologias.vue`. Si una marca **no está en Simple Icons**,
  coge su logo real de su web y guárdalo en `src/assets/` (como `herdr.png`), en vez de usar un
  icono de Lucide; Lucide es para conceptos, no para marcas. Algunas marcas son casi negras
  (Gradle, Thymeleaf) y en tema oscuro no se leen en su color: van en monocromo (el color del
  texto) o sobre una ficha clara.
- **El dibujo, en su fondo:** todo el dibujo va sobre un fondo gris muy suave, sin borde
  (`bg-bg-subtle` en el `Diagram`), para que se vea que es un dibujo y no texto.
- **Tintes, sin bordes:** cada pieza, un tinte suave de su color sobre ese fondo, con
  texto normal encima. Lo secundario, con un tinte más flojo y el
  texto más apagado, no con un borde. Nunca un tinte dentro de otro tinte ni letra pequeña
  y gris sobre color: el texto se queda sin contraste, sobre todo en oscuro. Referencia que
  se lee bien: `DiagramaAgentes.vue`. Comprueba cada visual en tema oscuro: uno que no se lee
  no sirve, por bonito que sea.
- **Nunca:** cajas semitransparentes sobre líneas, un visual vacío al cargar, bordes
  laterales de color, datos repetidos dentro de cada caja.
- **Móvil:** si no cabe, cambia de forma (un día cada vez, fichas en vez de esquema).
- **Una sola pieza para tocar por pantalla.** Un "juguete" (botones, un interruptor) solo
  cuando tocarlo es el punto, y uno por página. Una comparación (singleton frente a
  prototype) va después de explicar los dos, no entre medias.
- **Ejemplos** de clase o de este repo. Si no es literal, dilo.
- **De dónde sale:** si la página parte de una serie, un libro o un proyecto, ciérrala con una
  sección "De dónde sale": una tarjeta por referencia, con su imagen, el título y una línea,
  y toda la tarjeta como enlace. Es `TarjetaReferencia.vue`, hecha con `Card` + `CardImage`
  (`fade`, `aspect-video`), como en los ejemplos de la propia librería. Sin imagen, la tarjeta
  va con el título y el texto.
- **Reutiliza:** si una pieza se repite en dos páginas, sácala a `src/components/` (piezas de
  la web, como `TarjetaReferencia.vue`) o a `src/visuales/` (dibujos) y úsala desde las dos.

## Meterla en la web

- Página nueva: su componente en `src/views/paginas/`, su ruta en `src/router/index.js`
  (como las carpetas) y su entrada en `src/data/paginas.js`. Si su `#` es demasiado largo
  para las migas, un título corto en `src/data/fichas.js`.
- Compruébala con captura, no basta con que compile (a 1280 y a 390 px de ancho):

Con un navegador de verdad (Playwright, o el tuyo): Chrome sin interfaz con
`--virtual-time-budget` congela las animaciones a medias y la captura sale desenfocada. Las
piezas que se reproducen solas arrancan al verse enteras, así que haz scroll hasta ellas
antes de la captura.
