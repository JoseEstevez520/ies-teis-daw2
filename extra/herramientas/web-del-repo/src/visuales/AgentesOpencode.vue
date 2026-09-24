<script setup>
import { computed, ref } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import { ArrowRight, Check, CircleHelp, X } from '@lucide/vue'

// Todos los agentes son lo mismo, un modelo de IA con tres ajustes:
// instrucciones, permisos y cómo se le llama. Al elegir uno se ven sus tres
// ajustes, así que se nota que solo cambian eso. Los permisos de los que
// vienen son los de la documentación oficial; los "tuyos" son ejemplos.

const GRUPOS = [
  { titulo: 'Vienen de serie', ids: ['build', 'plan', 'explore', 'general'] },
  { titulo: 'Ejemplos tuyos', ids: ['tutor', 'revisor', 'apuntes'] },
]

const AGENTES = {
  build: {
    nombre: 'Build',
    paraQue: 'Hacer el trabajo. Es el que está activo al abrir OpenCode.',
    instrucciones: 'Desarrolla lo que te pidan, con acceso completo.',
    permisos: { leer: 'si', editar: 'si', terminal: 'si' },
    tipo: 'principal',
    llamada: 'Activo por defecto. Tab para cambiar a otro principal.',
  },
  plan: {
    nombre: 'Plan',
    paraQue: 'Ver qué haría antes de que lo haga.',
    instrucciones: 'Analiza y propone un plan, sin cambiar nada por tu cuenta.',
    permisos: { leer: 'si', editar: 'pregunta', terminal: 'pregunta' },
    tipo: 'principal',
    llamada: 'Tab desde Build.',
  },
  explore: {
    nombre: 'Explore',
    paraQue: 'Encontrar cosas en un proyecto que no conoces.',
    instrucciones: 'Busca archivos y código rápido. No modifica nada.',
    permisos: { leer: 'si', editar: 'no', terminal: 'no' },
    tipo: 'subagente',
    llamada: 'Lo llama Build cuando necesita buscar, o tú con @explore.',
    encargo: {
      pide: '¿Dónde se configura la base de datos?',
      devuelve: 'En src/main/resources/application.properties',
    },
  },
  general: {
    nombre: 'General',
    paraQue: 'Repartir una tarea grande en partes que se hacen a la vez.',
    instrucciones: 'Resuelve tareas de varios pasos. Puede editar.',
    permisos: { leer: 'si', editar: 'si', terminal: 'si' },
    tipo: 'subagente',
    llamada: 'Lo llama Build para trabajar en paralelo, o tú con @general.',
    encargo: {
      pide: 'Renombra calcularTotal a calcularImporte en todo el proyecto',
      devuelve: 'Hecho: 6 archivos cambiados',
    },
  },
  tutor: {
    nombre: 'tutor',
    propio: true,
    paraQue: 'Las prácticas: te explica, pero no puede resolverlas por ti.',
    instrucciones: 'Explica el concepto y hazme preguntas. Nunca me des el código.',
    permisos: { leer: 'si', editar: 'no', terminal: 'no' },
    tipo: 'principal',
    llamada: 'Tab hasta llegar a él.',
    fichero: '.opencode/agents/tutor.md',
    definicion: `---
description: Explica y guía sin escribir la solución
mode: primary
permission:
  edit: deny
  bash: deny
---

Explica el concepto y hazme preguntas que me lleven
a la solución. Nunca me des el código de la práctica.`,
  },
  revisor: {
    nombre: 'revisor',
    propio: true,
    paraQue: 'Revisar tu práctica antes de entregarla.',
    instrucciones: 'Revisa como el profesor: errores, casos límite, nombres. No arregles nada.',
    permisos: { leer: 'si', editar: 'no', terminal: 'si' },
    tipo: 'subagente',
    llamada: 'Tú con @revisor, o Build si le pides una revisión.',
    fichero: '.opencode/agents/revisor.md',
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
  apuntes: {
    nombre: 'apuntes',
    propio: true,
    paraQue: 'Pasar a limpio tus notas de clase en este repo.',
    instrucciones: 'Escribe apuntes siguiendo la skill apuntes-claros.',
    permisos: { leer: 'si', editar: 'si', terminal: 'no' },
    tipo: 'subagente',
    llamada: 'Tú con @apuntes y tus notas pegadas.',
    fichero: '.opencode/agents/apuntes.md',
    definicion: `---
description: Pasa notas de clase a un apunte del repo
mode: subagent
permission:
  bash: deny
---

Convierte mis notas en un apunte en modulos/<módulo>/.
Sigue la skill apuntes-claros.`,
  },
}

const PERMISOS = [
  { clave: 'leer', etiqueta: 'Leer' },
  { clave: 'editar', etiqueta: 'Editar' },
  { clave: 'terminal', etiqueta: 'Terminal' },
]

const ESTADOS = {
  si: { icono: Check, texto: 'sí', clase: 'text-emerald-700' },
  pregunta: { icono: CircleHelp, texto: 'pregunta', clase: 'text-amber-600' },
  no: { icono: X, texto: 'no', clase: 'text-red-600' },
}

const elegido = ref('plan')
const agente = computed(() => AGENTES[elegido.value])
</script>

<template>
  <div class="rounded-xl border border-neutral-200 bg-white overflow-hidden grid md:grid-cols-[200px_1fr]">
    <!-- Lista -->
    <div class="border-b md:border-b-0 md:border-r border-neutral-200 bg-neutral-50 p-4 flex flex-col gap-4 md:gap-5">
      <div v-for="grupo in GRUPOS" :key="grupo.titulo" class="flex flex-wrap md:flex-col gap-1">
        <p class="w-full text-[11px] font-semibold text-neutral-500 uppercase tracking-wide mb-1">{{ grupo.titulo }}</p>
        <button
          v-for="id in grupo.ids"
          :key="id"
          type="button"
          @click="elegido = id"
          class="flex items-center justify-between gap-3 rounded-lg border px-3 py-1.5 text-left text-sm transition-colors duration-150"
          :class="
            elegido === id
              ? 'border-neutral-900 bg-white text-neutral-900 font-medium'
              : 'border-transparent text-neutral-600 hover:bg-white hover:border-neutral-200'
          "
        >
          <span :class="AGENTES[id].propio ? 'font-mono text-[13px]' : ''">{{ AGENTES[id].nombre }}</span>
          <span class="hidden md:inline text-[10px] text-neutral-400">{{ AGENTES[id].tipo }}</span>
        </button>
      </div>
    </div>

    <!-- Los tres ajustes del agente elegido -->
    <AnimatePresence mode="wait">
      <motion.div
        :key="elegido"
        :initial="{ opacity: 0, x: 8 }"
        :animate="{ opacity: 1, x: 0 }"
        :exit="{ opacity: 0, x: -8 }"
        :transition="{ duration: 0.18 }"
        class="p-5 flex flex-col gap-4 min-w-0"
      >
        <div class="flex flex-col gap-0.5">
          <p class="text-lg font-semibold text-neutral-900" :class="agente.propio ? 'font-mono' : ''">{{ agente.nombre }}</p>
          <p class="text-sm text-neutral-700">{{ agente.paraQue }}</p>
        </div>

        <div class="flex flex-col rounded-lg border border-neutral-200 divide-y divide-neutral-200 text-sm">
          <div class="grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-3 px-4 py-3">
            <p class="text-neutral-500">Instrucciones</p>
            <p class="text-neutral-900">"{{ agente.instrucciones }}"</p>
          </div>
          <div class="grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-3 px-4 py-3">
            <p class="text-neutral-500">Permisos</p>
            <div class="flex flex-wrap gap-x-5 gap-y-1">
              <span
                v-for="p in PERMISOS"
                :key="p.clave"
                class="flex items-center gap-1.5"
                :class="ESTADOS[agente.permisos[p.clave]].clase"
              >
                <component :is="ESTADOS[agente.permisos[p.clave]].icono" class="w-3.5 h-3.5 shrink-0" />
                {{ p.etiqueta }}
                <span v-if="agente.permisos[p.clave] === 'pregunta'" class="opacity-70">(te pregunta)</span>
              </span>
            </div>
          </div>
          <div class="grid sm:grid-cols-[100px_1fr] gap-1 sm:gap-3 px-4 py-3">
            <p class="text-neutral-500">Se llama</p>
            <p class="text-neutral-900">{{ agente.llamada }}</p>
          </div>
        </div>

        <!-- Subagente: el encargo de ida y vuelta -->
        <div v-if="agente.encargo" class="grid sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-2 text-xs [&>svg]:self-center [&>svg]:max-sm:rotate-90 [&>svg]:max-sm:justify-self-center">
          <div class="rounded-lg border border-neutral-200 p-3">
            <p class="text-neutral-500 mb-1">Build le encarga</p>
            <p class="text-neutral-900">{{ agente.encargo.pide }}</p>
          </div>
          <ArrowRight class="w-4 h-4 text-neutral-400" />
          <div class="rounded-lg border border-neutral-900 p-3">
            <p class="text-neutral-500 mb-1">{{ agente.nombre }} trabaja aparte</p>
            <p class="text-neutral-900">sin llenar la conversación principal</p>
          </div>
          <ArrowRight class="w-4 h-4 text-neutral-400" />
          <div class="rounded-lg border border-neutral-200 p-3">
            <p class="text-neutral-500 mb-1">Devuelve solo esto</p>
            <p class="text-neutral-900">{{ agente.encargo.devuelve }}</p>
          </div>
        </div>

        <!-- Tuyo: el fichero que lo define -->
        <div v-if="agente.definicion" class="rounded-lg border border-neutral-200 overflow-hidden">
          <p class="px-4 py-2 bg-neutral-50 border-b border-neutral-200 text-xs text-neutral-500 font-mono">{{ agente.fichero }}</p>
          <pre class="p-4 overflow-x-auto text-xs font-mono text-neutral-800 leading-relaxed"><code>{{ agente.definicion }}</code></pre>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
