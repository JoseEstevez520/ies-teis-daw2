<script setup>
import { Diagram } from 'elastic-ui'
import { BrainCircuit, Ruler, UserRound, Video } from '@lucide/vue'

// La cadena del proyecto: del vídeo del combate a los patrones. Un color por eslabón.
const PASOS = [
  { icono: Video, titulo: 'Datos observables', nota: 'Vídeo del combate', color: 'var(--color-fg-muted)' },
  { icono: Ruler, titulo: 'Features', nota: 'Golpes, desplazamientos, defensa', color: '#0891b2' },
  { icono: UserRound, titulo: 'Perfiles', nota: 'Cómo se comporta cada deportista', color: '#7c3aed' },
  { icono: BrainCircuit, titulo: 'Modelos ML', nota: 'Clasificación, clustering, estilos', color: '#ca8a04' },
]
</script>

<template>
  <Diagram
    label="La cadena del proyecto: del vídeo del combate se sacan features, con ellas se construyen perfiles de comportamiento y con Machine Learning salen los modelos y los estilos."
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
  >
    <div class="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
      <template v-for="(p, i) in PASOS" :key="p.titulo">
        <span
          v-if="i"
          class="diagram-in self-center text-fg-faint max-sm:rotate-90"
          aria-hidden="true"
        >→</span>
        <div class="diagram-area diagram-in flex-1" :style="{ '--diagram-color': p.color }">
          <span class="flex items-center gap-2 text-sm font-semibold">
            <component :is="p.icono" class="size-4 shrink-0" :stroke-width="1.5" aria-hidden="true" />
            {{ p.titulo }}
          </span>
          <span class="text-xs text-fg-muted">{{ p.nota }}</span>
        </div>
      </template>
    </div>
  </Diagram>
</template>
