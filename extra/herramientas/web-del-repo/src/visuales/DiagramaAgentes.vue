<script setup>
import { Diagram } from 'elastic-ui'
import { Brain, Check, CircleHelp, GraduationCap, Hammer, ListChecks, Plus, Search, X } from '@lucide/vue'

// Qué es un agente, como un equipo: todos llevan el mismo modelo y cada uno
// tiene su papel, que son sus instrucciones y sus permisos. Build y Plan son
// dos que OpenCode trae hechos; el resto los creas tú. Colores de concepto,
// los de todas las páginas de agentes: modelo violeta, harness (el papel) cian.
// Los permisos, en verde / ámbar / rojo: sí / te pregunta / no.
const MODELO = '#7c3aed'
const HARNESS = '#0891b2'

const SI = { icono: Check, texto: 'sí', color: 'var(--color-success)' }
const PREGUNTA = { icono: CircleHelp, texto: 'te pregunta', color: 'var(--color-warning)' }
const NO = { icono: X, texto: 'no', color: 'var(--color-danger)' }

const AGENTES = [
  {
    papel: 'Constructor',
    ejemplo: 'Build, en OpenCode',
    icono: Hammer,
    hace: 'Hace el cambio que le pides.',
    permisos: [
      ['Edita', SI],
      ['Ejecuta comandos', SI],
    ],
  },
  {
    papel: 'Planificador',
    ejemplo: 'Plan, en OpenCode',
    icono: ListChecks,
    hace: 'Piensa el cambio y te lo propone.',
    permisos: [
      ['Edita', PREGUNTA],
      ['Ejecuta comandos', PREGUNTA],
    ],
  },
  {
    papel: 'Tutor',
    ejemplo: 'hecho por ti',
    icono: GraduationCap,
    hace: 'Te explica, pero no te resuelve la práctica.',
    permisos: [
      ['Edita', NO],
      ['Ejecuta comandos', NO],
    ],
  },
  {
    papel: 'Explorador',
    ejemplo: 'un subagente',
    icono: Search,
    hace: 'Otro agente lo manda a buscar, y vuelve solo con la respuesta.',
    permisos: [
      ['Lee', SI],
      ['Edita', NO],
    ],
  },
]
</script>

<template>
  <Diagram class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    label="Un equipo de agentes: todos usan el mismo modelo, y cada uno tiene su papel, sus instrucciones y sus permisos. El constructor edita, el planificador pregunta antes, el tutor no puede editar y el explorador solo lee. Puedes crear los tuyos."
  >
    <div class="flex flex-col items-center gap-2">
      <span class="diagram-chip diagram-in px-4 py-2.5" :style="{ '--diagram-color': MODELO }">
        <Brain class="size-5" :stroke-width="1.5" aria-hidden="true" />
        Un mismo modelo
        <span class="font-normal text-fg-secondary">· piensa en todos</span>
      </span>

      <!-- Del modelo a cada caja: en ancho, un reparto a las dos columnas; en el móvil, una flecha. -->
      <svg viewBox="0 0 100 20" preserveAspectRatio="none" class="diagram diagram-in hidden h-6 w-full sm:block" aria-hidden="true">
        <path class="diagram-line" d="M50 0 V8 M25 20 V8 H75 V20" />
      </svg>
      <span class="diagram-in text-fg-faint sm:hidden" aria-hidden="true">↓</span>

      <div class="grid w-full gap-3 sm:grid-cols-2">
        <div
          v-for="a in AGENTES"
          :key="a.papel"
          class="diagram-area diagram-in gap-2"
          :style="{ '--diagram-color': HARNESS }"
        >
          <span class="flex items-center gap-2 text-sm font-semibold">
            <component :is="a.icono" class="size-4 shrink-0" :stroke-width="1.5" aria-hidden="true" />
            {{ a.papel }}
            <span class="font-normal text-fg-muted">· {{ a.ejemplo }}</span>
          </span>
          <span class="text-sm text-fg-secondary">{{ a.hace }}</span>
          <ul class="flex flex-col gap-1 text-sm">
            <li v-for="[accion, estado] in a.permisos" :key="accion" class="flex items-center gap-1.5">
              <component :is="estado.icono" class="size-3.5 shrink-0" :stroke-width="2" :style="{ color: estado.color }" aria-hidden="true" />
              <span class="text-fg-secondary">{{ accion }}:</span>
              <span :style="{ color: estado.color }">{{ estado.texto }}</span>
            </li>
          </ul>
        </div>

        <!-- El que falta es el tuyo: un tinte flojo, sin borde, como algo por hacer. -->
        <div
          class="diagram-in flex items-center gap-3 rounded-[var(--radius-xl)] px-4 py-3 sm:col-span-2"
          :style="{ background: 'color-mix(in oklab, var(--color-fg-muted) 8%, var(--color-bg))' }"
        >
          <Plus class="size-4 shrink-0 text-fg-muted" :stroke-width="1.5" aria-hidden="true" />
          <span class="text-sm text-fg-secondary">
            <span class="font-semibold text-fg">Crea el tuyo:</span>
            un archivo con su papel (instrucciones) y lo que puede hacer (permisos).
          </span>
        </div>
      </div>
    </div>
  </Diagram>
</template>
