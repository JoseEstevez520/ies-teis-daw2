<script setup>
import {
  Callout,
  CodeBlock,
  DescriptionItem,
  DescriptionList,
} from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import DiagramaModelos from '../../visuales/DiagramaModelos.vue'
import DiagramaVentanaContexto from '../../visuales/DiagramaVentanaContexto.vue'

// extra/ia/modelos/README.md
const CAMBIA = [
  ['Capacidad', 'Cuántos pasos seguidos acierta sin perderse. Se mide con pruebas (benchmarks), como SWE-bench.'],
  ['Rapidez', 'Lo que tarda en empezar a responder. En un agente, que da muchas vueltas, se nota.'],
  ['Precio', 'Lo que cuesta cada millón de tokens, de entrada y de salida.'],
  ['Contexto', 'Cuánto texto le cabe a la vez.'],
  ['Razonamiento', 'Si "piensa" antes de responder. Acierta más en lo difícil, pero tarda y cuesta más.'],
]

const MODELOS = `opencode models                     # lista los modelos que tienes
opencode --model proveedor/modelo   # arranca con ese`

const DATOS = [
  ['DeepSeek V4 Pro', '79,3 %', '$0,20'],
  ['Qwen3.5', '80,2 %', '$0,46'],
  ['MiniMax M2.5', '80,6 %', '$1,31'],
  ['Gemini 3.1 Pro', '80,8 %', '$11'],
  ['GPT-5.4', '80,6 %', '$18'],
  ['Claude Opus 4.6', '80,8 %', '$74'],
]

const NIVELES = [
  ['Autocompletar, resumir, renombrar, un test sencillo', 'barato y rápido'],
  ['Una feature normal, leyendo el código', 'el de en medio'],
  ['Depurar algo difícil, decidir la arquitectura, un refactor grande', 'el más potente'],
]
</script>

<template>
  <PlantillaPagina
    titulo="Elegir un modelo"
    entradilla="Un agente es un modelo con herramientas. El modelo es el que piensa, y no hay uno mejor para todo: hay modelos más listos y más caros, y otros rápidos y baratos que para muchas cosas bastan."
  >
    <h2 id="que-cambia">Qué cambia entre modelos</h2>
    <p>Cinco cosas, y no van sueltas:</p>
    <DescriptionList divided>
      <DescriptionItem v-for="c in CAMBIA" :key="c[0]" :term="c[0]">{{ c[1] }}</DescriptionItem>
    </DescriptionList>
    <p>
      Piensa en vehículos: una furgoneta pequeña para repartir por el barrio, un camión para una
      mudanza. No coges el camión para comprar el pan.
    </p>

    <h2 id="no-el-mas-potente">No siempre el más potente</h2>
    <p>
      Pagar más sube la calidad, pero cada vez menos. Con datos reales se ve mejor: seis modelos dan
      casi la misma calidad, y resolver una tarea cuesta desde veinte céntimos hasta setenta y
      cuatro dólares.
    </p>
    <DiagramaModelos />
    <table>
      <thead>
        <tr><th>Modelo</th><th>SWE-bench Verified</th><th>Coste por tarea resuelta</th></tr>
      </thead>
      <tbody>
        <tr v-for="d in DATOS" :key="d[0]">
          <td>{{ d[0] }}</td>
          <td>{{ d[1] }}</td>
          <td>{{ d[2] }}</td>
        </tr>
      </tbody>
    </table>
    <p class="text-sm text-fg-muted">Datos de AgentMarketCap, abril de 2026, sobre 2 millones de tokens por tarea. Cambian a menudo.</p>
    <p>Por eso el caro se reserva para lo que sale caro si falla:</p>
    <table>
      <thead>
        <tr><th>Lo que haces</th><th>Con qué</th></tr>
      </thead>
      <tbody>
        <tr v-for="n in NIVELES" :key="n[0]">
          <td>{{ n[0] }}</td>
          <td>{{ n[1] }}</td>
        </tr>
      </tbody>
    </table>

    <h2 id="repartir">Repartir el trabajo</h2>
    <p>
      Lo típico no es usar un solo modelo para todo. Muchas veces el más listo hace el
      <strong>plan</strong> y el barato lo <strong>ejecuta</strong>: en el plan se decide bien o
      mal, y ejecutar es seguir unos pasos, que no necesita tanta cabeza. Así el caro se paga solo
      donde de verdad cambia el resultado.
    </p>
    <Callout type="tip">
      <p>
        Para el usuario promedio no hace falta comerse la cabeza con esto: coge uno bueno y listo.
        Saberlo está bien para optimizar: bajar de modelo en lo fácil y subir en lo difícil.
      </p>
    </Callout>

    <h2 id="opencode">Cómo se elige en OpenCode</h2>
    <p>
      En la terminal, <code>/models</code> abre el selector dentro del chat. También se puede fijar
      al arrancar o en la configuración:
    </p>
    <CodeBlock :code="MODELOS" language="bash" />
    <p>
      En <code>opencode.json</code> se deja el de por defecto, y
      <code>opencode stats --models</code> enseña lo que gastas por modelo.
    </p>

    <h2 id="contexto">El contexto se llena</h2>
    <p>
      A un modelo solo le cabe un trozo de conversación. Como en una mesa: con dos papeles los ves,
      con doscientos no encuentras nada.
    </p>
    <DiagramaVentanaContexto />
    <p><strong>Cuando la charla se alarga, cuesta más y acierta menos; por eso el agente resume lo viejo.</strong></p>
    <p>Conviene abrir una sesión nueva para otro tema.</p>

    <h2 id="a-donde-va">A dónde va esto</h2>
    <p>
      Además de modelos generalistas cada vez más listos, van a crecer los
      <strong>pequeños y específicos</strong> para una sola cosa. Es como un equipo: no pones al
      genio a cada recado; tienes a alguien rápido para lo fácil y a un especialista para lo
      difícil. Muchas veces lo más listo no es tirar del modelo más potente, sino repartir el
      trabajo.
    </p>

    <h2 id="para-explorar">Para explorar</h2>
    <ul>
      <li><a href="https://opencode.ai/docs/models/" target="_blank" rel="noopener noreferrer">Modelos en OpenCode</a>.</li>
      <li><a href="https://models.dev" target="_blank" rel="noopener noreferrer">models.dev</a>, el catálogo de modelos y proveedores.</li>
      <li><a href="https://artificialanalysis.ai/" target="_blank" rel="noopener noreferrer">Artificial Analysis</a>, calidad frente a coste.</li>
      <li><a href="https://www.swebench.com/" target="_blank" rel="noopener noreferrer">SWE-bench</a>, la prueba de código que enseña la gráfica.</li>
    </ul>
  </PlantillaPagina>
</template>
