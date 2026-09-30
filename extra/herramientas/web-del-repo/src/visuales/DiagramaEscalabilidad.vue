<script setup>
import { Diagram } from 'elastic-ui'

// Escalabilidad: a mano, el trabajo de conectar los objetos crece muy rápido con
// el número de clases; con Spring lo hace el contenedor y se mantiene bajo. El
// problema va en ámbar y Spring en el azul del módulo, como en el resto de la
// página.
const SPRING = '#2563eb'
</script>

<template>
  <Diagram
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    label="Gráfico de escalabilidad: cuanto más grande es la aplicación, más conexiones hay que montar a mano, y esa curva sube muy rápido. La línea de Spring se mantiene baja, porque las conexiones las hace el contenedor."
  >
    <svg viewBox="0 0 360 210" class="diagram w-full" aria-hidden="true">
      <line class="diagram-line" x1="48" y1="16" x2="48" y2="176" />
      <line class="diagram-line" x1="48" y1="176" x2="344" y2="176" />

      <path
        class="diagram-emphasis"
        style="--diagram-color: var(--color-warning)"
        d="M48 172 C 170 170, 250 150, 340 24"
      />
      <path
        class="diagram-emphasis"
        :style="{ '--diagram-color': SPRING }"
        d="M48 168 C 170 164, 250 158, 340 150"
      />

      <text class="diagram-label" x="336" y="36" text-anchor="end" style="--diagram-color: var(--color-warning)">A mano</text>
      <text class="diagram-label" x="336" y="140" text-anchor="end" :style="{ '--diagram-color': SPRING }">Con Spring</text>

      <text class="diagram-text" x="196" y="200" text-anchor="middle">nº de clases →</text>
      <text class="diagram-text" x="18" y="96" transform="rotate(-90 18 96)" text-anchor="middle">conexiones que montar</text>
    </svg>
  </Diagram>
</template>
