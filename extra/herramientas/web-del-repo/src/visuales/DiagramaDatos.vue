<script setup>
import { Diagram } from 'elastic-ui'
import { Database, Globe } from '@lucide/vue'

// El recorrido de un dato: del portal abierto a la web. Un color por paso.
const PASOS = [
  { texto: 'Datos abiertos', color: '#0d9488', icono: Database },
  { texto: 'Limpiar y cruzar', color: '#ca8a04' },
  { texto: 'Analizar', color: '#7c3aed' },
  { texto: 'Web', color: '#2563eb', icono: Globe },
]
</script>

<template>
  <Diagram
    label="De los datos abiertos a una web: descargar, limpiar y cruzar, analizar y enseñarlo con visualizaciones."
    caption="El recorrido de un dato, del portal abierto a la web."
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
  >
    <div class="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      <template v-for="(p, i) in PASOS" :key="p.texto">
        <span v-if="i" class="diagram-in self-center text-fg-faint max-sm:rotate-90" aria-hidden="true">→</span>
        <span class="diagram-chip diagram-in self-center" :style="{ '--diagram-color': p.color }">
          <component :is="p.icono" v-if="p.icono" class="size-4" :stroke-width="1.5" aria-hidden="true" />{{ p.texto }}
        </span>
      </template>
    </div>
  </Diagram>
</template>
