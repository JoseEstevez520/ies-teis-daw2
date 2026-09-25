---
name: apuntes-web
description: Cómo crear o mejorar una página de la web del repo (web-del-repo) que explica algo, con diagramas, piezas interactivas y ejemplos. Úsala siempre que añadas o rehagas un apunte, tema o recurso de extra/ o modulos/ que se vaya a ver en la web, junto con apuntes-claros para el texto.
---

# Apuntes web

## Principios

1. **Se entiende a simple vista.** Si hace falta leer un párrafo para entenderlo, falta un
   visual o sobra texto.
2. **Poco texto.** Una frase por idea. Si el visual ya lo explica, fuera la prosa.
3. **Lo concreto primero.** "Ejecuta comandos (`npm test`)" y, como pista, "sus manos".
   Una comparación sola no se entiende.
4. **Minimalista.** Sin cajas dentro de cajas, sin bordes de adorno, sin sombras. Color
   solo si significa algo.
5. **Funciona en el móvil.** A 390 px, sin scroll horizontal.

El texto sigue [apuntes-claros](../apuntes-claros/SKILL.md).

## Antes de escribir

- Datos de la **documentación oficial**, nunca de memoria.
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
| un cambio en un fichero | bloque ```` ```diff ```` |
| piezas que encajan | dibujo con cajas (una dentro de otra si una contiene a la otra) |
| cómo trabaja un agente | sesión de agente (una por idea, una detrás de otra) |

## Piezas visuales

Componentes Vue en `extra/herramientas/web-del-repo/src/visuales/`, registrados en
`index.js` y metidos en el `.md` así:

````markdown
```visual
nombre-de-la-pieza
```
````

Referencias: `DiagramaHarness.vue` (cajas), las sesiones de `sesiones.js` (se ven como
`sesion-<nombre>`) y `HorarioSemanal.vue`. Antes de hacer una pieza, mira si basta una
tabla o un bloque de código. La forma (colores, dibujos, movimiento) la ponen los
componentes de elastic-ui; su `USAGE.md` tiene las reglas.

- **Alrededor de cada pieza**: una frase antes que diga en qué fijarse, y después su
  conclusión en negrita, para quien solo mira el final.

- **Color:** uno por concepto, el mismo en toda la página. Verde / ámbar / rojo solo
  para sí / con condiciones / no. Fuera de las piezas, el de la sección
  (`src/lib/colorSeccion.js`).
- **Nunca:** cajas semitransparentes sobre líneas, un visual vacío al cargar, bordes
  laterales de color, datos repetidos dentro de cada caja.
- **Móvil:** si no cabe, cambia de forma (un día cada vez, fichas en vez de esquema).
- **Ejemplos** de clase o de este repo. Si no es literal, dilo.

## Meterla en la web

- Página nueva: regístrala en `src/data/paginas.js` (ruta como las carpetas) y, si su `#`
  es demasiado largo para las migas, un título corto en `src/data/fichas.js`.
- Compruébala con captura, no basta con que compile (a 1280 y a 390 px de ancho):

Con un navegador de verdad (Playwright, o el tuyo): Chrome sin interfaz con
`--virtual-time-budget` congela las animaciones a medias y la captura sale desenfocada. Las
piezas que se reproducen solas arrancan al verse enteras, así que haz scroll hasta ellas
antes de la captura.
