<script setup>
import { Diagram } from 'elastic-ui'
import { FileCode, Puzzle } from '@lucide/vue'

// Un fragmento vive en un archivo y se inserta en varias plantillas, así se
// cambia en un solo sitio. Un color por concepto, el mismo en toda la página.
const FRAGMENTO = '#7c3aed'
const PAGINA = '#2563eb'
</script>

<template>
  <Diagram
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    label="Un fragmento guardado una sola vez, la cabecera, se inserta con th:insert en varias plantillas. Se cambia en un sitio y se actualiza en todas."
  >
    <div class="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': FRAGMENTO }">
        <span class="flex items-center gap-1.5 text-sm font-semibold">
          <Puzzle :size="16" :stroke-width="1.5" aria-hidden="true" /> fragmentos.html
        </span>
        <span class="diagram-chip diagram-in">cabecera</span>
        <span class="text-sm text-fg-secondary">Se escribe una vez.</span>
      </div>

      <span class="diagram-in text-center text-fg-faint sm:hidden" aria-hidden="true">↓</span>
      <span class="diagram-in hidden text-center text-fg-faint sm:inline" aria-hidden="true">→</span>

      <ul class="flex flex-col gap-2">
        <li class="diagram-area diagram-in gap-0" :style="{ '--diagram-color': PAGINA }">
          <span class="diagram-chip diagram-in">
            <FileCode :size="16" :stroke-width="1.5" aria-hidden="true" /> index.html
          </span>
        </li>
        <li class="diagram-area diagram-in gap-0" :style="{ '--diagram-color': PAGINA }">
          <span class="diagram-chip diagram-in">
            <FileCode :size="16" :stroke-width="1.5" aria-hidden="true" /> productos.html
          </span>
        </li>
      </ul>
    </div>
  </Diagram>
</template>
