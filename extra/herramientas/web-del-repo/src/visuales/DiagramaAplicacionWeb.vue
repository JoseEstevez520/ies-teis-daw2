<script setup>
import { Diagram } from 'elastic-ui'
import { Database, Monitor, Server } from '@lucide/vue'

// Las tres piezas de una web con datos, una encima de otra. Un color por pieza,
// el mismo en toda la página: frontend azul, backend violeta, base de datos cian.
const FRONTEND = '#2563eb'
const BACKEND = '#7c3aed'
const DATOS = '#0891b2'
</script>

<template>
  <Diagram
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    label="Una aplicación web con datos tiene tres piezas. El frontend, lo que se ve en el navegador, le pide los datos al backend. El backend decide y lee o escribe en la base de datos. El navegador nunca habla con la base de datos directamente."
  >
    <div class="mx-auto flex max-w-sm flex-col items-stretch gap-2">
      <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': FRONTEND }">
        <span class="flex items-center gap-1.5 text-sm font-semibold">
          <Monitor :size="16" :stroke-width="1.5" aria-hidden="true" /> Frontend · Vue
        </span>
        <span class="text-sm text-fg-secondary">Lo que se ve en el navegador.</span>
      </div>

      <span class="diagram-in text-center text-xs text-fg-faint" aria-hidden="true">↓ pide los datos</span>

      <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': BACKEND }">
        <span class="flex items-center gap-1.5 text-sm font-semibold">
          <Server :size="16" :stroke-width="1.5" aria-hidden="true" /> Backend · Express
        </span>
        <span class="text-sm text-fg-secondary">Recibe las peticiones y decide.</span>
      </div>

      <span class="diagram-in text-center text-xs text-fg-faint" aria-hidden="true">↓ lee y escribe</span>

      <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': DATOS }">
        <span class="flex items-center gap-1.5 text-sm font-semibold">
          <Database :size="16" :stroke-width="1.5" aria-hidden="true" /> Base de datos · MongoDB
        </span>
        <span class="text-sm text-fg-secondary">Guarda los datos.</span>
      </div>
    </div>
  </Diagram>
</template>
