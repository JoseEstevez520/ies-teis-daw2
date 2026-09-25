<script setup>
import { Diagram } from 'elastic-ui'
import { BookOpen, MessageSquare, Plug, ScrollText } from '@lucide/vue'

// Qué tiene delante el modelo cuando le pides algo, y cuándo entra cada cosa:
// AGENTS.md entero y siempre; de las skills, solo su nombre y descripción
// hasta que una hace falta; de cada MCP, la lista de sus herramientas, que
// ocupa sitio aunque no las use. Harness cian, como en el resto de páginas de
// agentes; lo que destaca es la skill que se carga.
const HARNESS = '#0891b2'

const FILAS = [
  { icono: ScrollText, que: 'AGENTS.md', cuando: 'entero, siempre', detalle: 'las reglas de tu proyecto' },
  { icono: BookOpen, que: 'Skills', cuando: 'solo nombre y descripción', detalle: 'la entera, cuando hace falta', skills: true },
  { icono: Plug, que: 'MCP', cuando: 'la lista de sus herramientas', detalle: 'ocupa sitio aunque no las use' },
  { icono: MessageSquare, que: 'Tu petición', cuando: 'lo que le acabas de pedir', detalle: '' },
]
</script>

<template>
  <Diagram
    label="Lo que tiene delante el modelo al pedirle algo: AGENTS.md entero siempre; de las skills, solo su nombre y descripción hasta que carga la que necesita; de cada MCP, la lista de sus herramientas; y tu petición."
  >
    <div class="diagram-area diagram-in" :style="{ '--diagram-color': HARNESS }">
      <span class="text-sm font-semibold">Lo que tiene delante el modelo</span>
      <ul class="flex flex-col gap-2">
        <li
          v-for="f in FILAS"
          :key="f.que"
          class="diagram-in flex flex-col gap-1.5 rounded-[var(--radius-md)] bg-bg px-3 py-2.5 sm:flex-row sm:items-center sm:gap-3"
        >
          <span class="flex w-36 shrink-0 items-center gap-2 text-sm font-semibold">
            <component :is="f.icono" class="size-4 shrink-0" :stroke-width="1.5" aria-hidden="true" />{{ f.que }}
          </span>
          <span v-if="!f.skills" class="text-sm text-fg-secondary">
            <span class="text-fg">{{ f.cuando }}</span><template v-if="f.detalle">: {{ f.detalle }}</template>
          </span>
          <!-- Las skills: tres nombres, y solo una abierta, la que hace falta. -->
          <span v-else class="flex flex-wrap items-center gap-2 text-sm">
            <span class="rounded-[var(--radius-sm)] border border-border px-2 py-0.5 text-fg-muted">apuntes-web</span>
            <span class="rounded-[var(--radius-sm)] border-2 border-[color:var(--diagram-color)] px-2 py-0.5 font-medium text-fg">
              apuntes-claros · cargada
            </span>
            <span class="rounded-[var(--radius-sm)] border border-border px-2 py-0.5 text-fg-muted">…</span>
            <span class="w-full text-fg-secondary">
              <span class="text-fg">{{ f.cuando }}</span>; {{ f.detalle }}
            </span>
          </span>
        </li>
      </ul>
    </div>
  </Diagram>
</template>
