<script setup>
import { Diagram } from 'elastic-ui'
import { Braces, Layout, Palette } from '@lucide/vue'

// Un componente .vue junta tres bloques. Mismo color para los tres: son partes
// de la misma cosa.
const COMPONENTE = '#0d9488'
</script>

<template>
  <Diagram
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    label="Un componente de Vue es un archivo .vue con tres bloques: la plantilla, que es lo que se ve; el script, con los datos y las funciones; y los estilos, solo de ese componente."
  >
    <div class="flex flex-col gap-3">
      <span class="diagram-in text-center text-sm text-fg-secondary">Un componente · archivo <code>.vue</code></span>
      <div class="grid gap-3 sm:grid-cols-3">
        <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': COMPONENTE }">
          <span class="flex items-center gap-1.5 text-sm font-semibold">
            <Layout :size="16" :stroke-width="1.5" aria-hidden="true" /> Plantilla
          </span>
          <span class="text-sm text-fg-secondary">Lo que se ve.</span>
        </div>
        <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': COMPONENTE }">
          <span class="flex items-center gap-1.5 text-sm font-semibold">
            <Braces :size="16" :stroke-width="1.5" aria-hidden="true" /> Script
          </span>
          <span class="text-sm text-fg-secondary">Los datos y las funciones.</span>
        </div>
        <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': COMPONENTE }">
          <span class="flex items-center gap-1.5 text-sm font-semibold">
            <Palette :size="16" :stroke-width="1.5" aria-hidden="true" /> Estilos
          </span>
          <span class="text-sm text-fg-secondary">Solo de este componente.</span>
        </div>
      </div>
    </div>
  </Diagram>
</template>
