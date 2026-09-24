<script setup>
import { computed, ref } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import { ArrowRight, Check, ChevronLeft, ChevronRight, CircleHelp, X } from '@lucide/vue'

// Los agentes de OpenCode de menos a más: cada paso añade algo a lo que ya
// estaba. 1) Build y Plan, 2) uno tuyo, 3) subagentes. Permisos según la
// documentación oficial de OpenCode.

const AGENTES = [
  {
    nombre: 'Build',
    que: 'Hace los cambios que le pides. Viene activado.',
    editar: 'si',
    comandos: 'si',
  },
  {
    nombre: 'Plan',
    que: 'Te dice qué cambiaría. Úsalo antes de un cambio grande.',
    editar: 'pregunta',
    comandos: 'pregunta',
  },
  {
    nombre: 'tutor',
    tuyo: true,
    que: 'Te explica las prácticas, pero no puede resolverlas por ti.',
    editar: 'no',
    comandos: 'no',
  },
]

const PASOS = [
  {
    titulo: 'Build y Plan',
    texto: 'OpenCode trae dos agentes. Cambias de uno a otro con la tecla Tab.',
    agentes: 2,
  },
  {
    titulo: 'Tu propio agente',
    texto: 'Puedes crear otro con tus instrucciones y tus permisos. Este tutor no puede editar aunque se lo pidas.',
    agentes: 3,
  },
  {
    titulo: 'Subagentes',
    texto: 'Un agente puede encargarle una parte a otro. El otro trabaja aparte y le devuelve solo la respuesta.',
    agentes: 3,
  },
]

const ESTADO = {
  si: { icono: Check, texto: 'sí', color: '#059669' },
  pregunta: { icono: CircleHelp, texto: 'te pregunta', color: '#d97706' },
  no: { icono: X, texto: 'no', color: '#dc2626' },
}

const TUTOR_MD = `---
description: Explica y guía sin escribir la solución
mode: primary
permission:
  edit: deny
  bash: deny
---

Explícame el concepto y hazme preguntas.
No me des el código de la práctica.`

const paso = ref(0)
const actual = computed(() => PASOS[paso.value])
const visibles = computed(() => AGENTES.slice(0, actual.value.agentes))
</script>

<template>
  <div class="rounded-xl border border-neutral-200 bg-white p-5 flex flex-col gap-5">
    <!-- Pasos -->
    <div class="flex items-center gap-2 text-xs">
      <template v-for="(p, i) in PASOS" :key="p.titulo">
        <button
          type="button"
          @click="paso = i"
          class="flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-colors duration-150"
          :class="i === paso ? 'bg-neutral-900 text-white' : i < paso ? 'text-neutral-900' : 'text-neutral-400'"
        >
          <span class="tabular-nums">{{ i + 1 }}</span>
          <span class="hidden sm:inline">{{ p.titulo }}</span>
        </button>
        <span v-if="i < PASOS.length - 1" class="h-px w-4 bg-neutral-200" />
      </template>
    </div>

    <AnimatePresence mode="wait">
      <motion.p
        :key="paso"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.15 }"
        class="text-sm text-neutral-700"
      >
        <strong class="text-neutral-900">{{ actual.titulo }}.</strong> {{ actual.texto }}
      </motion.p>
    </AnimatePresence>

    <!-- Agentes -->
    <div class="grid sm:grid-cols-3 gap-3">
      <AnimatePresence>
        <motion.div
          v-for="a in visibles"
          :key="a.nombre"
          :initial="{ opacity: 0, y: 8 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.25 }"
          class="rounded-xl bg-neutral-50 p-4 flex flex-col gap-3"
        >
          <div class="flex items-baseline justify-between gap-2">
            <span class="text-base font-semibold text-neutral-900" :class="a.tuyo ? 'font-mono' : ''">{{ a.nombre }}</span>
            <span v-if="a.tuyo" class="text-[11px] text-neutral-500">hecho por ti</span>
          </div>
          <p class="text-sm text-neutral-600 leading-snug">{{ a.que }}</p>
          <div class="flex flex-col gap-1 text-sm mt-auto">
            <span class="flex items-center gap-1.5" :style="{ color: ESTADO[a.editar].color }">
              <component :is="ESTADO[a.editar].icono" class="w-3.5 h-3.5" />
              <span class="text-neutral-700">Edita:</span> {{ ESTADO[a.editar].texto }}
            </span>
            <span class="flex items-center gap-1.5" :style="{ color: ESTADO[a.comandos].color }">
              <component :is="ESTADO[a.comandos].icono" class="w-3.5 h-3.5" />
              <span class="text-neutral-700">Comandos:</span> {{ ESTADO[a.comandos].texto }}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>

    <!-- Paso 2: el fichero del tutor -->
    <div v-if="paso === 1" class="flex flex-col gap-1.5">
      <p class="text-xs text-neutral-500">
        Así se crea: guarda esto como <code class="font-mono text-neutral-800">.opencode/agents/tutor.md</code>
      </p>
      <pre class="rounded-lg bg-neutral-50 p-4 overflow-x-auto text-xs font-mono text-neutral-800 leading-relaxed"><code>{{ TUTOR_MD }}</code></pre>
    </div>

    <!-- Paso 3: un encargo de ida y vuelta -->
    <div v-if="paso === 2" class="grid sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-sm">
      <div class="rounded-xl bg-neutral-50 p-3">
        <p class="font-semibold text-neutral-900">Build</p>
        <p class="text-neutral-600">"¿Dónde se configura la base de datos?"</p>
      </div>
      <ArrowRight class="w-4 h-4 text-neutral-400 justify-self-center max-sm:rotate-90" />
      <div class="rounded-xl bg-neutral-50 p-3">
        <p class="font-semibold text-neutral-900">Explore</p>
        <p class="text-neutral-600">busca por el proyecto, solo leyendo</p>
      </div>
      <ArrowRight class="w-4 h-4 text-neutral-400 justify-self-center max-sm:rotate-90" />
      <div class="rounded-xl bg-neutral-50 p-3">
        <p class="font-semibold text-neutral-900">Build recibe</p>
        <p class="text-neutral-600 font-mono text-xs">application.properties</p>
      </div>
    </div>

    <!-- Navegación -->
    <div class="flex justify-between">
      <button
        type="button"
        @click="paso--"
        :disabled="paso === 0"
        class="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 disabled:invisible"
      >
        <ChevronLeft class="w-4 h-4" /> Anterior
      </button>
      <button
        type="button"
        @click="paso++"
        :disabled="paso === PASOS.length - 1"
        class="flex items-center gap-1 rounded-lg bg-neutral-900 px-3 py-1.5 text-sm text-white hover:bg-neutral-700 disabled:invisible"
      >
        {{ paso < PASOS.length - 1 ? PASOS[paso + 1].titulo : '' }} <ChevronRight class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
