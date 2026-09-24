<script setup>
import { computed, ref } from 'vue'
import { Check, RotateCcw, X } from '@lucide/vue'

// Autoexamen corto: casos reales de clase, no definiciones. Cada respuesta
// explica por qué, acierte o no.
const PREGUNTAS = [
  {
    enunciado: 'Claude Code, Codex y OpenCode, ¿qué son?',
    opciones: ['Modelos de IA', 'Harnesses', 'Servidores MCP'],
    correcta: 1,
    porque: 'Te dan el harness: las herramientas, instrucciones y permisos. El modelo (Claude, GPT, Qwen...) es aparte.',
  },
  {
    enunciado: 'Le preguntas algo a un modelo por la web, sin harness. ¿Puede ejecutar tus tests?',
    opciones: ['Sí, si se lo pides', 'No: solo devuelve texto'],
    correcta: 1,
    porque: 'Sin harness nadie ejecuta nada: el modelo te dice qué hacer y las manos las pones tú.',
  },
  {
    enunciado: 'Quieres que el agente nunca te dé la solución de las prácticas en este proyecto. ¿Dónde lo pones?',
    opciones: ['En AGENTS.md', 'En una skill', 'En un servidor MCP'],
    correcta: 0,
    porque: 'Es una regla que vale siempre en este proyecto, y AGENTS.md lo lee siempre al arrancar.',
  },
  {
    enunciado: 'Tienes unas instrucciones largas sobre cómo escribir tests, que solo hacen falta de vez en cuando. ¿Dónde van?',
    opciones: ['En AGENTS.md', 'En una skill', 'En un servidor MCP'],
    correcta: 1,
    porque: 'Una skill solo se carga cuando la tarea encaja con su descripción. En AGENTS.md ocuparían sitio en cada conversación.',
  },
  {
    enunciado: 'Quieres que consulte la documentación actual de Vue en vez de fiarse de lo que recuerda. ¿Qué necesitas?',
    opciones: ['Una skill', 'Un servidor MCP', 'Escribirlo en AGENTS.md'],
    correcta: 1,
    porque: 'La documentación está fuera de tu proyecto: para eso es MCP, para conectar al agente con cosas de fuera.',
  },
  {
    enunciado: 'Antes de cargar una skill, ¿qué sabe el agente de ella?',
    opciones: ['Nada, hay que pedírsela', 'Su nombre y su descripción', 'Todo su contenido'],
    correcta: 1,
    porque: 'Por eso la descripción importa tanto: es lo que usa para decidir si la carga.',
  },
  {
    enunciado: 'Quieres un asistente para todas tus prácticas que te explique pero que no pueda tocar tus archivos. ¿Qué haces?',
    opciones: ['Pedírselo a Build cada vez', 'Crear un agente propio con edit: deny', 'Instalar un servidor MCP'],
    correcta: 1,
    porque: 'Pedírselo no lo garantiza. Un agente con edit: deny no puede editar aunque quiera: el límite lo pone el permiso, no la buena voluntad.',
  },
  {
    enunciado: 'Estás en modo Plan y te propone tres cambios. ¿Ha tocado ya tus archivos?',
    opciones: ['Sí, ya están hechos', 'No, solo propone'],
    correcta: 1,
    porque: 'Plan te pregunta antes de editar nada. Lo normal es revisar su propuesta y pasar a Build con Tab para aplicarla.',
  },
]

const indice = ref(0)
const elegida = ref(null)
const aciertos = ref(0)
const terminado = ref(false)

const pregunta = computed(() => PREGUNTAS[indice.value])
const respondida = computed(() => elegida.value !== null)

function elegir(i) {
  if (respondida.value) return
  elegida.value = i
  if (i === pregunta.value.correcta) aciertos.value++
}

function siguiente() {
  if (indice.value === PREGUNTAS.length - 1) {
    terminado.value = true
    return
  }
  indice.value++
  elegida.value = null
}

function reintentar() {
  indice.value = 0
  elegida.value = null
  aciertos.value = 0
  terminado.value = false
}

function claseOpcion(i) {
  if (!respondida.value) return 'border-neutral-200 hover:border-neutral-900 cursor-pointer'
  if (i === pregunta.value.correcta) return 'border-emerald-600 bg-emerald-50'
  if (i === elegida.value) return 'border-red-500 bg-red-50'
  return 'border-neutral-200 opacity-50'
}
</script>

<template>
  <div class="rounded-xl border border-neutral-200 bg-white p-5 flex flex-col gap-4">
    <template v-if="!terminado">
      <div class="flex items-center justify-between">
        <p class="text-xs text-neutral-400 font-mono">Pregunta {{ indice + 1 }} de {{ PREGUNTAS.length }}</p>
        <div class="flex gap-1">
          <span
            v-for="(p, i) in PREGUNTAS"
            :key="i"
            class="h-1.5 w-6 rounded-full"
            :class="i < indice || (i === indice && respondida) ? 'bg-neutral-900' : 'bg-neutral-200'"
          />
        </div>
      </div>

      <p class="text-base font-semibold text-neutral-900 leading-snug">{{ pregunta.enunciado }}</p>

      <div class="flex flex-col gap-2">
        <button
          v-for="(op, i) in pregunta.opciones"
          :key="i"
          type="button"
          @click="elegir(i)"
          class="flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm text-neutral-900 transition-colors duration-150"
          :class="claseOpcion(i)"
        >
          {{ op }}
          <Check v-if="respondida && i === pregunta.correcta" class="w-4 h-4 text-emerald-600 shrink-0" />
          <X v-else-if="respondida && i === elegida" class="w-4 h-4 text-red-500 shrink-0" />
        </button>
      </div>

      <div v-if="respondida" class="flex items-end justify-between gap-4">
        <p class="text-sm text-neutral-700 leading-relaxed">
          <strong class="text-neutral-900">{{ elegida === pregunta.correcta ? 'Bien.' : 'No.' }}</strong>
          {{ pregunta.porque }}
        </p>
        <button
          type="button"
          @click="siguiente"
          class="shrink-0 rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-700"
        >
          {{ indice === PREGUNTAS.length - 1 ? 'Ver resultado' : 'Siguiente' }}
        </button>
      </div>
    </template>

    <div v-else class="flex items-center justify-between gap-4">
      <div class="flex flex-col gap-1">
        <p class="text-2xl font-semibold text-neutral-900">{{ aciertos }} / {{ PREGUNTAS.length }}</p>
        <p class="text-sm text-neutral-700">
          {{ aciertos === PREGUNTAS.length ? 'Lo tienes claro.' : 'Vuelve al esquema de arriba y repasa los pasos que fallaste.' }}
        </p>
      </div>
      <button
        type="button"
        @click="reintentar"
        class="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50"
      >
        <RotateCcw class="w-3.5 h-3.5" />
        Reintentar
      </button>
    </div>
  </div>
</template>
