<script setup>
import { Diagram } from 'elastic-ui'
import { GitFork, Hammer, PackageCheck, Search } from '@lucide/vue'

// Busca antes de construir: lo que haces depende de lo que encuentres. Como el
// dibujo del equipo de agentes: una pieza arriba que se reparte en tres, cada
// una un tinte sobre el fondo del dibujo, sin bordes. Color de concepto: el de
// la sección Extra.
const EXTRA = '#0d9488'

const CASOS = [
  { icono: PackageCheck, si: 'Hay algo maduro que hace lo que necesitas', haz: 'Úsalo', como: 'como dependencia o tal cual.' },
  { icono: GitFork, si: 'Hay algo parecido, pero no justo lo tuyo', haz: 'Adáptalo', como: 'con un fork, o sácale ideas.' },
  { icono: Hammer, si: 'No hay nada', haz: 'Constrúyelo', como: 'y publícalo, para el siguiente.' },
]
</script>

<template>
  <Diagram
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    label="Antes de construir, busca. Si hay algo maduro que hace lo que necesitas, úsalo; si hay algo parecido, adáptalo con un fork o sácale ideas; si no hay nada, constrúyelo y publícalo."
  >
    <div class="flex flex-col items-center gap-2">
      <span class="diagram-chip diagram-in px-4 py-2.5" style="--diagram-color: var(--color-fg-muted)">
        <Search class="size-5" :stroke-width="1.5" aria-hidden="true" />
        Antes de construir, busca
      </span>

      <svg viewBox="0 0 100 20" preserveAspectRatio="none" class="diagram diagram-in hidden h-6 w-full sm:block" aria-hidden="true">
        <path class="diagram-line" d="M50 0 V8 M16.7 20 V8 H83.3 V20 M50 8 V20" />
      </svg>
      <span class="diagram-in text-fg-faint sm:hidden" aria-hidden="true">↓</span>

      <div class="grid w-full gap-3 sm:grid-cols-3">
        <div v-for="c in CASOS" :key="c.haz" class="diagram-area diagram-in gap-2" :style="{ '--diagram-color': EXTRA }">
          <span class="text-sm text-fg-secondary">{{ c.si }}</span>
          <span class="flex items-center gap-2 text-base font-semibold">
            <component :is="c.icono" class="size-5 shrink-0" :stroke-width="1.5" aria-hidden="true" />
            {{ c.haz }}
          </span>
          <span class="text-sm text-fg-secondary">{{ c.como }}</span>
        </div>
      </div>
    </div>
  </Diagram>
</template>
