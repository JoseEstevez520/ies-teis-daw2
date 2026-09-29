<script setup>
import { Diagram } from 'elastic-ui'

// El flujo de una idea: cajas tintadas en fila (en columna en el móvil), unidas por
// flechas. La forma la pone elastic-ui (`diagram-chip`); aquí solo se decide qué
// dice cada caja y en qué orden.
defineProps({
  label: { type: String, required: true },
  caption: { type: String, default: '' },
  // [{ texto, detalle?, icono? }]
  pasos: { type: Array, required: true },
  color: { type: String, default: undefined },
})
</script>

<template>
  <Diagram
    :label="label"
    :caption="caption"
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    :style="color ? { '--diagram-color': color } : undefined"
  >
    <div class="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
      <template v-for="(p, i) in pasos" :key="p.texto">
        <div class="diagram-chip diagram-in flex flex-col items-center gap-1 px-4 py-3 text-center">
          <component :is="p.icono" v-if="p.icono" class="size-5" :stroke-width="1.5" aria-hidden="true" />
          <span class="text-sm font-medium">{{ p.texto }}</span>
          <span v-if="p.detalle" class="text-xs font-normal opacity-80">{{ p.detalle }}</span>
        </div>
        <span v-if="i < pasos.length - 1" class="diagram-in self-center text-lg text-fg-faint max-sm:rotate-90" aria-hidden="true">→</span>
      </template>
    </div>
  </Diagram>
</template>
