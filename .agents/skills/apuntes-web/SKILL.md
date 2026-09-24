---
name: apuntes-web
description: Cómo crear o mejorar una página de la web del repo (web-del-repo) que explica algo, con diagramas, piezas interactivas y ejemplos. Úsala siempre que añadas o rehagas un apunte, tema o recurso de extra/ o modulos/ que se vaya a ver en la web, junto con apuntes-claros para el texto.
---

# Apuntes web

El objetivo es que quien lo lea lo entienda a la primera, no que el `.md` quede bonito en
GitHub. Lo que cuenta es cómo se ve en la web. El texto sigue
[apuntes-claros](../apuntes-claros/SKILL.md); esta skill es todo lo demás.

## 1. Entiende el tema antes de escribir

- Saca los datos de la **documentación oficial** (comandos, rutas, permisos). No los
  inventes ni tires de memoria.
- Mira cómo lo explican los mejores (docs oficiales, buenos blogs, sitios interactivos)
  y quédate con la idea que lo hace fácil, no con su estructura.
- Busca **qué hay que entender primero**. Con OpenCode era "un agente es un modelo con
  tres ajustes": sin eso, la lista de agentes no se entendía.

## 2. Elige la forma de cada idea

Pregúntate por cada idea: **¿se entiende viéndola o haciéndola?**

| Si la idea es… | Forma |
|---|---|
| una secuencia de pasos | lista numerada (sale como pasos) |
| una comparación | tabla |
| un fichero, comando o salida | bloque de código con el ejemplo real |
| una relación simple y fija | diagrama Mermaid |
| un proceso que pasa en el tiempo | pieza visual paso a paso |
| cosas parecidas que cambian en unos pocos ajustes | pieza visual que compara al elegir |
| comprobar si se ha entendido | autoexamen |

Si el visual ya lo explica, no lo repitas en prosa: una frase antes de él que diga qué
mirar basta.

## 3. Construye las piezas visuales

Son componentes Vue hechos a mano en `extra/herramientas/web-del-repo/src/visuales/`:

1. Crea `NombreDeLaPieza.vue`. Los datos van en constantes arriba del todo.
2. Regístrala en `src/visuales/index.js` con un nombre en minúsculas-con-guiones.
3. Métela en el `.md` con:

   ````markdown
   ```visual
   nombre-de-la-pieza
   ```
   ````

Ejemplos de referencia, cópiales el patrón:

- `AgenteEnAccion.vue`: esquema que se ilumina + terminal que avanza, con Reproducir.
- `AgentesOpencode.vue`: lista a la izquierda, al elegir se ven los mismos ajustes de
  cada uno, así que se compara solo.
- `AutoexamenAgentes.vue`: preguntas de una en una, explicación, nota y reintentar.

## 4. Reglas visuales

**Color, con significado:**

- Un color por concepto, y el mismo en todo el visual: su caja, su línea y lo que sale en
  la terminal cuando actúa.
- Verde / ámbar / rojo solo para sí / con condiciones / no.
- Fuera de las piezas, el color es el de la sección (`src/lib/colorSeccion.js`). Una
  sección nueva de primer nivel necesita su color ahí.
- Nada de color de adorno. Si quitas un color y no se pierde información, sobraba.

**Lo que ha quedado mal y no se repite:**

- Sombras (también las que Mermaid pone por defecto).
- Cajas semitransparentes encima de líneas: se ven las líneas a través. Lo inactivo se
  atenúa con gris, con la caja opaca.
- Un visual vacío al cargar: el estado inicial ya tiene que enseñar algo.
- Diagramas genéricos de cajas cuando el concepto pide otra cosa.

**Contenido:**

- Ejemplos de clase o de este mismo repo (una práctica de Spring, un apunte de Vue), no
  genéricos.
- Si un ejemplo no es literal (una terminal simplificada), dilo.
- Autoexamen con casos ("¿dónde pondrías esta regla?"), no definiciones, y cada
  respuesta explica por qué.

## 5. Mete la página en la web

Si es un `.md` nuevo:

- Regístralo en `src/data/paginas.js` (ruta que siga las carpetas: `/extra/ia/opencode`).
- Si sale como tarjeta, dale título e icono en `src/data/fichas.js`.
- La barra lateral se actualiza sola.

## 6. Compruébalo viéndolo

`npm run build` que compile no basta. Con el servidor de desarrollo levantado, haz
captura y mírala:

```bash
google-chrome --headless=new --disable-gpu --no-sandbox --window-size=1280,2000 \
  --virtual-time-budget=8000 --screenshot=captura.png http://localhost:5173/<ruta>
```

Para ver un estado que requiere clic (paso 3, otro agente elegido), cambia un momento el
valor inicial del `ref` en el componente, haz la captura y déjalo como estaba.
