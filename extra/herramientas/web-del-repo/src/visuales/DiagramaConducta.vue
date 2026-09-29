<script setup>
import { Diagram } from 'elastic-ui'
import { Brain, HelpCircle, MapPin } from '@lucide/vue'

// El modelo de conducta: entran lo que la persona ha vivido y la situación de ahora,
// y sale qué haría. El modelo va en violeta, el color del modelo en las páginas de
// agentes; lo que entra y lo que sale, en gris.
const MODELO = '#7c3aed'
const NEUTRO = 'var(--color-fg-muted)'
</script>

<template>
  <Diagram
    label="El modelo de conducta: lo que la persona ha vivido y la situación de ahora entran en el modelo, que predice qué haría."
    caption="Con la memoria y la situación, el modelo predice la reacción."
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
  >
    <div class="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      <div class="flex flex-col gap-2">
        <span class="diagram-chip diagram-in" :style="{ '--diagram-color': NEUTRO }">
          <Brain class="size-4" :stroke-width="1.5" aria-hidden="true" />Lo que ha vivido
        </span>
        <span class="diagram-chip diagram-in" :style="{ '--diagram-color': NEUTRO }">
          <MapPin class="size-4" :stroke-width="1.5" aria-hidden="true" />La situación ahora
        </span>
      </div>
      <span class="diagram-in self-center text-fg-faint max-sm:rotate-90" aria-hidden="true">→</span>
      <div class="diagram-area diagram-in flex flex-1 flex-col" :style="{ '--diagram-color': MODELO }">
        <span class="text-sm font-semibold">Modelo de conducta</span>
        <span class="text-xs font-normal text-fg-secondary">predice la reacción</span>
      </div>
      <span class="diagram-in self-center text-fg-faint max-sm:rotate-90" aria-hidden="true">→</span>
      <span class="diagram-chip diagram-in self-center" :style="{ '--diagram-color': NEUTRO }">
        <HelpCircle class="size-4" :stroke-width="1.5" aria-hidden="true" />Qué haría
      </span>
    </div>
  </Diagram>
</template>
