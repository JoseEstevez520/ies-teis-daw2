<script setup>
import { Diagram } from 'elastic-ui'
import { ArrowLeft, ArrowRight, FolderGit2, User } from '@lucide/vue'

// Fork y pull request: el proyecto original, tu copia en tu cuenta, y el camino
// de vuelta cuando mejoras algo. Sin bordes, tintes sobre el fondo del dibujo;
// el original en gris (no es tuyo), tu fork en el color de Extra.
const EXTRA = '#0d9488'
</script>

<template>
  <Diagram
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    label="Un fork es tu copia de un proyecto, en tu cuenta: la cambias y la pruebas sin tocar el original. Si mejoras algo, le propones el cambio al original con un pull request."
  >
    <div class="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
      <div class="diagram-area diagram-in gap-1.5" style="--diagram-color: var(--color-fg-muted)">
        <span class="flex items-center gap-2 text-sm font-semibold">
          <FolderGit2 class="size-4 shrink-0" :stroke-width="1.5" aria-hidden="true" />El proyecto original
        </span>
        <span class="text-sm text-fg-secondary">De su autor. No lo tocas.</span>
      </div>

      <div class="diagram-in flex flex-col items-center gap-3 py-1 text-xs font-medium text-fg-secondary">
        <span class="flex items-center gap-1.5">
          <span>fork: te lo copias</span>
          <ArrowRight class="size-4 shrink-0 max-sm:rotate-90" :stroke-width="1.5" aria-hidden="true" />
        </span>
        <span class="flex items-center gap-1.5 font-semibold" :style="{ color: `color-mix(in oklab, ${EXTRA} 75%, var(--color-fg))` }">
          <ArrowLeft class="size-4 shrink-0 max-sm:rotate-90" :stroke-width="2" aria-hidden="true" />
          <span>pull request: le propones tu mejora</span>
        </span>
      </div>

      <div class="diagram-area diagram-in gap-1.5" :style="{ '--diagram-color': EXTRA }">
        <span class="flex items-center gap-2 text-sm font-semibold">
          <User class="size-4 shrink-0" :stroke-width="1.5" aria-hidden="true" />Tu fork
        </span>
        <span class="text-sm text-fg-secondary">Tu copia, en tu cuenta: la cambias y la rompes sin miedo.</span>
      </div>
    </div>
  </Diagram>
</template>
