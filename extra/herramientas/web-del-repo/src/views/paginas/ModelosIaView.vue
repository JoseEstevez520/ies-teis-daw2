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

const COMANDOS = `opencode models                     # lista los modelos que tienes
opencode --model proveedor/modelo   # arranca con ese`

const COLOR_MODELO = '#7c3aed'
const COSTE_MIN = 0.2
const COSTE_MAX = 74
// Barra proporcional al logaritmo del coste, para que se vea la diferencia real.
const ancho = (coste) =>
  ((Math.log10(coste) - Math.log10(COSTE_MIN)) / (Math.log10(COSTE_MAX) - Math.log10(COSTE_MIN))) * 100

const MODELOS = [
  { nombre: 'DeepSeek V4 Pro', calidad: '79,3 %', coste: 0.2, costeTexto: '$0,20' },
  { nombre: 'Qwen3.5', calidad: '80,2 %', coste: 0.46, costeTexto: '$0,46' },
  { nombre: 'MiniMax M2.5', calidad: '80,6 %', coste: 1.31, costeTexto: '$1,31' },
  { nombre: 'Gemini 3.1 Pro', calidad: '80,8 %', coste: 11, costeTexto: '$11' },
  { nombre: 'GPT-5.4', calidad: '80,6 %', coste: 18, costeTexto: '$18' },
  { nombre: 'Claude Opus 4.6', calidad: '80,8 %', coste: 74, costeTexto: '$74' },
]

const NIVELES = [
  { titulo: 'Barato y rápido', texto: 'Autocompletar, resumir, renombrar, un test sencillo.', color: '#0891b2' },
  { titulo: 'El de en medio', texto: 'Una feature normal, leyendo el código.', color: '#7c3aed' },
  { titulo: 'El más potente', texto: 'Depurar algo difícil, decidir la arquitectura, un refactor grande.', color: '#d97706' },
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
      Pagar más no siempre compra más calidad. En estos seis modelos la calidad es casi la misma; lo
      que cambia de verdad es el coste: de veinte céntimos a setenta y cuatro dólares por tarea.
    </p>
    <DiagramaModelos />
    <div class="not-prose flex flex-col gap-2">
      <div
        v-for="m in MODELOS"
        :key="m.nombre"
        class="grid grid-cols-[10rem_1fr_3.5rem] items-center gap-3 text-sm"
      >
        <span class="truncate text-fg">{{ m.nombre }}</span>
        <div class="h-2.5 overflow-hidden rounded-full bg-bg-inset">
          <div class="h-full rounded-full" :style="{ width: ancho(m.coste) + '%', background: COLOR_MODELO }" />
        </div>
        <span class="text-right tabular-nums text-fg-secondary">{{ m.costeTexto }}</span>
      </div>
    </div>
    <p class="text-sm text-fg-muted">
      Coste por tarea resuelta, en escala logarítmica. Datos de AgentMarketCap, abril de 2026, sobre
      2 millones de tokens por tarea; cambian a menudo.
    </p>

    <h2 id="repartir">Repartir el trabajo</h2>
    <p>Lo interesante no es usar siempre el modelo más potente: es darle a cada tarea el que le vale.</p>
    <div class="not-prose grid gap-3 sm:grid-cols-3">
      <div v-for="n in NIVELES" :key="n.titulo" class="diagram-area gap-1" :style="{ '--diagram-color': n.color }">
        <span class="text-sm font-semibold">{{ n.titulo }}</span>
        <span class="text-sm text-fg-secondary">{{ n.texto }}</span>
      </div>
    </div>
    <p>
      Una práctica común: el más listo hace el <strong>plan</strong> y el barato lo
      <strong>ejecuta</strong>. En el plan se decide bien o mal; ejecutar es seguir unos pasos, que
      no necesita tanta cabeza.
    </p>
    <Callout type="tip">
      <p>
        Para el usuario promedio no hace falta comerse la cabeza: coge uno bueno y listo. Saberlo
        vale para optimizar, bajando de modelo en lo fácil.
      </p>
    </Callout>

    <h2 id="opencode">Cómo se elige en OpenCode</h2>
    <p>
      En la terminal, <code>/models</code> abre el selector dentro del chat. También se puede fijar
      al arrancar o en la configuración:
    </p>
    <CodeBlock :code="COMANDOS" language="bash" />
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
      Además de generalistas cada vez más listos, van a crecer los
      <strong>pequeños y específicos</strong>, buenos en una sola cosa. Es como un equipo: a cada
      recado, quien mejor lo hace.
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
