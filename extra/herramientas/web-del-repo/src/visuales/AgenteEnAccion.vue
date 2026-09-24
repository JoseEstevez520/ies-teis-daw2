<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import { Bot, ChevronLeft, ChevronRight, FileCode, FileText, Pause, Play, Plug, Sparkles, User } from '@lucide/vue'

// Un agente trabajando, paso a paso: a la izquierda qué pieza entra en juego
// (se enciende en el esquema), abajo lo que verías en la terminal. El caso es
// real de este repo: pedir un apunte, con su AGENTS.md y su skill.

const NODOS = {
  tu: { etiqueta: 'Tú', icono: User, x: 11, y: 50 },
  agente: { etiqueta: 'Agente', detalle: 'modelo de IA + herramientas', icono: Bot, x: 45, y: 50 },
  reglas: { etiqueta: 'AGENTS.md', detalle: 'reglas del proyecto', icono: FileText, x: 84, y: 13 },
  skills: { etiqueta: 'Skills', detalle: 'instrucciones a demanda', icono: Sparkles, x: 84, y: 37.5 },
  mcp: { etiqueta: 'MCP', detalle: 'herramientas de fuera', icono: Plug, x: 84, y: 62.5 },
  archivos: { etiqueta: 'Tus archivos', detalle: 'lee y edita', icono: FileCode, x: 84, y: 87 },
}

const PASOS = [
  {
    activos: ['tu', 'agente'],
    titulo: 'Le pides algo, en lenguaje normal',
    texto: 'No hace falta saber el comando exacto. Le dices qué quieres, como a un compañero.',
    terminal: [{ tipo: 'tu', t: '> Escríbeme un apunte sobre v-model en modulos/dwcc' }],
  },
  {
    activos: ['agente', 'reglas'],
    titulo: 'Lee AGENTS.md',
    texto: 'Siempre, al arrancar. Así sabe cómo es este proyecto sin que se lo repitas.',
    terminal: [
      { tipo: 'accion', t: 'Leyendo AGENTS.md' },
      { tipo: 'archivo', t: '| vas a escribir un .md → lee .agents/skills/apuntes-claros' },
      { tipo: 'archivo', t: '- Push directo, sin pull requests' },
    ],
  },
  {
    activos: ['agente', 'skills'],
    titulo: 'Carga la skill que encaja',
    texto:
      'De cada skill solo conoce el nombre y la descripción. "Estilo para cualquier .md de este repo" encaja con la tarea, así que carga el contenido entero.',
    terminal: [
      { tipo: 'accion', t: 'Skills disponibles: apuntes-claros' },
      { tipo: 'accion', t: 'Cargando skill: apuntes-claros' },
      { tipo: 'archivo', t: '- Empieza por lo importante, no por el contexto.' },
      { tipo: 'archivo', t: '- Código en bloques, nunca descrito en prosa.' },
    ],
  },
  {
    activos: ['agente', 'mcp'],
    titulo: 'Consulta fuera, con MCP',
    texto: 'Lo que no está en tu proyecto lo busca con un servidor MCP. Aquí, la documentación actual de Vue con Context7.',
    terminal: [
      { tipo: 'accion', t: 'context7 → buscar documentación: vue, "v-model"' },
      { tipo: 'archivo', t: 'v-model en un componente = prop modelValue + evento update:modelValue' },
    ],
  },
  {
    activos: ['agente', 'archivos'],
    titulo: 'Escribe en tus archivos',
    texto: 'Con las reglas, la skill y la documentación, escribe el apunte donde le dijiste.',
    terminal: [{ tipo: 'ok', t: '✓ modulos/dwcc/v-model.md   (nuevo)' }],
  },
  {
    activos: ['tu', 'agente'],
    titulo: 'Tú revisas',
    texto: 'El agente propone; decides tú. Si no te convence, /undo y se lo vuelves a pedir de otra forma.',
    terminal: [
      { tipo: 'accion', t: 'Apunte escrito siguiendo apuntes-claros.' },
      { tipo: 'tu', t: '> Añade un ejemplo con un formulario de registro' },
    ],
  },
]

const paso = ref(0)
const actual = computed(() => PASOS[paso.value])
const activos = computed(() => new Set(actual.value.activos))

// Terminal acumulada: todo lo que ha salido hasta el paso actual, como en una
// sesión de verdad. Lo del paso actual se marca para distinguirlo.
const lineas = computed(() =>
  PASOS.slice(0, paso.value + 1).flatMap((p, i) => p.terminal.map((l) => ({ ...l, nueva: i === paso.value })))
)

function ir(n) {
  paso.value = Math.max(0, Math.min(PASOS.length - 1, n))
}

function irANodo(id) {
  const i = PASOS.findIndex((p) => p.activos.includes(id) && id !== 'agente')
  if (i !== -1) ir(i)
}

const reproduciendo = ref(false)
let temporizador = null
function alternarReproduccion() {
  if (reproduciendo.value) return parar()
  if (paso.value === PASOS.length - 1) paso.value = 0
  reproduciendo.value = true
  temporizador = setInterval(() => {
    if (paso.value === PASOS.length - 1) return parar()
    paso.value++
  }, 3200)
}
function parar() {
  reproduciendo.value = false
  clearInterval(temporizador)
}
onBeforeUnmount(parar)

const conexiones = Object.keys(NODOS).filter((id) => id !== 'agente')
</script>

<template>
  <div class="rounded-xl border border-neutral-200 bg-white overflow-hidden">
    <!-- Esquema -->
    <div class="overflow-x-auto border-b border-neutral-200 bg-neutral-50">
      <div class="relative h-72 min-w-[560px]">
        <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line
            v-for="id in conexiones"
            :key="id"
            :x1="NODOS.agente.x"
            :y1="NODOS.agente.y"
            :x2="NODOS[id].x"
            :y2="NODOS[id].y"
            vector-effect="non-scaling-stroke"
            class="transition-all duration-300"
            :stroke="activos.has(id) ? '#171717' : '#d4d4d4'"
            :stroke-width="activos.has(id) ? 2 : 1"
            :stroke-dasharray="activos.has(id) ? '0' : '4 4'"
          />
        </svg>

        <button
          v-for="(nodo, id) in NODOS"
          :key="id"
          type="button"
          @click="irANodo(id)"
          class="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-left transition-all duration-300"
          :class="[
            activos.has(id) ? 'border-neutral-900 shadow-sm opacity-100' : 'border-neutral-200 opacity-50 hover:opacity-80',
            id === 'agente' ? 'px-4 py-3' : '',
          ]"
          :style="{ left: nodo.x + '%', top: nodo.y + '%' }"
        >
          <component :is="nodo.icono" :class="id === 'agente' ? 'w-5 h-5' : 'w-4 h-4'" class="text-neutral-900 shrink-0" />
          <span class="flex flex-col">
            <span class="text-sm font-medium text-neutral-900 whitespace-nowrap">{{ nodo.etiqueta }}</span>
            <span v-if="nodo.detalle" class="text-[11px] text-neutral-500 whitespace-nowrap">{{ nodo.detalle }}</span>
          </span>
        </button>
      </div>
    </div>

    <!-- Explicación del paso -->
    <div class="p-5 flex flex-col gap-4">
      <div class="flex items-start justify-between gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            :key="paso"
            :initial="{ opacity: 0, y: 6 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: -6 }"
            :transition="{ duration: 0.2 }"
            class="flex flex-col gap-1"
          >
            <p class="text-xs text-neutral-400 font-mono">Paso {{ paso + 1 }} de {{ PASOS.length }}</p>
            <p class="text-base font-semibold text-neutral-900">{{ actual.titulo }}</p>
            <p class="text-sm text-neutral-700 leading-relaxed">{{ actual.texto }}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <!-- Terminal -->
      <div class="rounded-lg bg-neutral-900 p-4 font-mono text-xs leading-relaxed min-h-40 max-h-56 overflow-y-auto">
        <p
          v-for="(l, i) in lineas"
          :key="i"
          class="whitespace-pre-wrap transition-opacity duration-300"
          :class="[
            l.nueva ? 'opacity-100' : 'opacity-40',
            l.tipo === 'tu' ? 'text-white' : l.tipo === 'archivo' ? 'text-neutral-400 pl-4' : l.tipo === 'ok' ? 'text-white' : 'text-neutral-300',
          ]"
        >{{ l.t }}</p>
      </div>

      <!-- Controles -->
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-1.5">
          <button
            v-for="(p, i) in PASOS"
            :key="i"
            type="button"
            @click="ir(i); parar()"
            class="h-1.5 rounded-full transition-all duration-300"
            :class="i === paso ? 'w-6 bg-neutral-900' : 'w-1.5 bg-neutral-300 hover:bg-neutral-400'"
            :aria-label="`Ir al paso ${i + 1}`"
          />
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="alternarReproduccion"
            class="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50"
          >
            <component :is="reproduciendo ? Pause : Play" class="w-3.5 h-3.5" />
            {{ reproduciendo ? 'Pausar' : 'Reproducir' }}
          </button>
          <button
            type="button"
            @click="ir(paso - 1); parar()"
            :disabled="paso === 0"
            class="p-1.5 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 disabled:opacity-30"
            aria-label="Paso anterior"
          >
            <ChevronLeft class="w-4 h-4" />
          </button>
          <button
            type="button"
            @click="ir(paso + 1); parar()"
            :disabled="paso === PASOS.length - 1"
            class="p-1.5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-700 disabled:opacity-30"
            aria-label="Paso siguiente"
          >
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
