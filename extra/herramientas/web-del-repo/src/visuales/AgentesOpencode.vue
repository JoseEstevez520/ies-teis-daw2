<script setup>
import { computed, ref } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import { Check, CircleHelp, X } from '@lucide/vue'

// Los agentes de OpenCode como catálogo: los que trae y dos hechos para clase.
// Al elegir uno se ve qué puede hacer (permisos), cuándo usarlo y cómo se
// llama. Los permisos de los que vienen son los de la documentación oficial.

const GRUPOS = [
  {
    titulo: 'Principales',
    nota: 'hablas con ellos; cambias con Tab',
    ids: ['build', 'plan'],
  },
  {
    titulo: 'Subagentes',
    nota: 'los llama el agente, o tú con @',
    ids: ['general', 'explore', 'scout'],
  },
  {
    titulo: 'Tuyos',
    nota: 'un .md en .opencode/agents/',
    ids: ['tutor', 'revisor'],
  },
]

const AGENTES = {
  build: {
    nombre: 'Build',
    resumen: 'El de por defecto. Hace el trabajo: edita archivos y ejecuta comandos.',
    permisos: { leer: 'si', editar: 'si', terminal: 'si' },
    cuando: 'Cuando ya sabes qué quieres y quieres que lo haga.',
    como: 'Viene seleccionado al abrir OpenCode.',
    ejemplo: '> Añade validación al formulario de registro\n✓ RegistroForm.vue (editado)',
  },
  plan: {
    nombre: 'Plan',
    resumen: 'Analiza y propone, pero te pregunta antes de tocar un archivo o lanzar un comando.',
    permisos: { leer: 'si', editar: 'pregunta', terminal: 'pregunta' },
    cuando: 'Antes de un cambio grande, para ver qué haría sin que lo haga.',
    como: 'Tab para pasar de Build a Plan (y otra vez Tab para volver).',
    ejemplo:
      '> Cuando se borre un producto, márcalo como borrado\nPropuesta:\n  1. Campo `borrado` en Producto.java\n  2. ProductoService.borrar() solo lo marca\n(Tab → Build para aplicarlo)',
  },
  general: {
    nombre: 'General',
    resumen: 'Un ayudante para tareas de varios pasos. Puede editar. Sirve para repartir trabajo en paralelo.',
    permisos: { leer: 'si', editar: 'si', terminal: 'si' },
    cuando: 'Cuando hay varias cosas independientes que hacer a la vez.',
    como: 'Lo llama el agente principal, o tú: @general',
    ejemplo: '> @general busca dónde se usa calcularTotal y cámbialo a calcularImporte',
  },
  explore: {
    nombre: 'Explore',
    resumen: 'Rápido y de solo lectura: busca archivos y código sin tocar nada.',
    permisos: { leer: 'si', editar: 'no', terminal: 'no' },
    cuando: 'Para entender un proyecto que no conoces.',
    como: 'Lo llama el agente principal, o tú: @explore',
    ejemplo: '> @explore ¿dónde se configura la base de datos en este proyecto?',
  },
  scout: {
    nombre: 'Scout',
    resumen: 'De solo lectura, para fuera de tu proyecto: documentación y código de librerías.',
    permisos: { leer: 'si', editar: 'no', terminal: 'no' },
    cuando: 'Cuando la duda es sobre una librería, no sobre tu código.',
    como: 'Lo llama el agente principal, o tú: @scout',
    ejemplo: '> @scout ¿cómo implementa vue-router el guard beforeEach?',
  },
  tutor: {
    nombre: 'tutor',
    propio: true,
    resumen: 'Te explica y te hace preguntas, pero nunca escribe el código por ti.',
    permisos: { leer: 'si', editar: 'no', terminal: 'no' },
    cuando: 'Para las prácticas: aprendes tú, y no puede resolverlas aunque se lo pidas.',
    como: 'Tab hasta llegar a él (es principal).',
    fichero: `.opencode/agents/tutor.md`,
    definicion: `---
description: Explica conceptos y guía sin escribir la solución
mode: primary
permission:
  edit: deny
  bash: deny
---

Eres un profesor de 2º DAW. Explica el concepto, haz
preguntas que me lleven a la solución y revisa lo que
escribo yo. Nunca me des el código de la práctica.`,
  },
  revisor: {
    nombre: 'revisor',
    propio: true,
    resumen: 'Revisa tu práctica antes de entregarla: errores, casos que se te escapan, nombres.',
    permisos: { leer: 'si', editar: 'no', terminal: 'no' },
    cuando: 'Justo antes de entregar, o cuando algo "funciona" pero no sabes si está bien.',
    como: 'Tú: @revisor, o lo llama Build solo si le pides revisar.',
    fichero: `.opencode/agents/revisor.md`,
    definicion: `---
description: Revisa código de prácticas antes de entregar
mode: subagent
permission:
  edit: deny
---

Revisa el código como lo haría el profesor: errores,
casos límite, nombres poco claros. Señala el problema
y la línea; no lo arregles tú.`,
  },
}

const PERMISOS = [
  { clave: 'leer', etiqueta: 'Leer archivos' },
  { clave: 'editar', etiqueta: 'Editar archivos' },
  { clave: 'terminal', etiqueta: 'Usar la terminal' },
]

const ESTADOS = {
  si: { icono: Check, texto: 'sí', clase: 'text-neutral-900' },
  pregunta: { icono: CircleHelp, texto: 'te pregunta', clase: 'text-neutral-600' },
  no: { icono: X, texto: 'no', clase: 'text-neutral-400' },
}

const elegido = ref('plan')
const agente = computed(() => AGENTES[elegido.value])
</script>

<template>
  <div class="rounded-xl border border-neutral-200 bg-white overflow-hidden grid md:grid-cols-[240px_1fr]">
    <!-- Catálogo -->
    <div class="border-b md:border-b-0 md:border-r border-neutral-200 bg-neutral-50 p-4 flex flex-col gap-5">
      <div v-for="grupo in GRUPOS" :key="grupo.titulo" class="flex flex-col gap-1.5">
        <div>
          <p class="text-xs font-semibold text-neutral-900 uppercase tracking-wide">{{ grupo.titulo }}</p>
          <p class="text-[11px] text-neutral-500">{{ grupo.nota }}</p>
        </div>
        <button
          v-for="id in grupo.ids"
          :key="id"
          type="button"
          @click="elegido = id"
          class="rounded-lg border px-3 py-2 text-left text-sm transition-colors duration-150"
          :class="
            elegido === id
              ? 'border-neutral-900 bg-white text-neutral-900 font-medium'
              : 'border-transparent text-neutral-600 hover:bg-white hover:border-neutral-200'
          "
        >
          <span :class="AGENTES[id].propio ? 'font-mono text-[13px]' : ''">{{ AGENTES[id].nombre }}</span>
        </button>
      </div>
    </div>

    <!-- Detalle -->
    <AnimatePresence mode="wait">
      <motion.div
        :key="elegido"
        :initial="{ opacity: 0, x: 8 }"
        :animate="{ opacity: 1, x: 0 }"
        :exit="{ opacity: 0, x: -8 }"
        :transition="{ duration: 0.18 }"
        class="p-5 flex flex-col gap-5 min-w-0"
      >
        <div class="flex flex-col gap-1">
          <p class="text-lg font-semibold text-neutral-900" :class="agente.propio ? 'font-mono' : ''">{{ agente.nombre }}</p>
          <p class="text-sm text-neutral-700 leading-relaxed">{{ agente.resumen }}</p>
        </div>

        <div class="grid grid-cols-3 rounded-lg border border-neutral-200 divide-x divide-neutral-200">
          <div v-for="p in PERMISOS" :key="p.clave" class="px-3 py-2.5 flex flex-col gap-1">
            <p class="text-[11px] text-neutral-500">{{ p.etiqueta }}</p>
            <p class="flex items-center gap-1.5 text-sm font-medium" :class="ESTADOS[agente.permisos[p.clave]].clase">
              <component :is="ESTADOS[agente.permisos[p.clave]].icono" class="w-3.5 h-3.5 shrink-0" />
              {{ ESTADOS[agente.permisos[p.clave]].texto }}
            </p>
          </div>
        </div>

        <dl class="grid sm:grid-cols-[110px_1fr] gap-x-4 gap-y-2 text-sm">
          <dt class="text-neutral-500">Cuándo</dt>
          <dd class="text-neutral-800">{{ agente.cuando }}</dd>
          <dt class="text-neutral-500">Cómo se usa</dt>
          <dd class="text-neutral-800">{{ agente.como }}</dd>
        </dl>

        <div v-if="agente.definicion" class="rounded-lg border border-neutral-200 overflow-hidden">
          <p class="px-4 py-2 bg-neutral-50 border-b border-neutral-200 text-xs text-neutral-500 font-mono">{{ agente.fichero }}</p>
          <pre class="p-4 overflow-x-auto text-xs font-mono text-neutral-800 leading-relaxed"><code>{{ agente.definicion }}</code></pre>
        </div>
        <pre
          v-else
          class="rounded-lg bg-neutral-900 p-4 overflow-x-auto text-xs font-mono text-neutral-200 leading-relaxed whitespace-pre-wrap"
        ><code>{{ agente.ejemplo }}</code></pre>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
