<script setup>
import { Diagram } from 'elastic-ui'

// Una paleta de ejemplo: muchos grises y un solo acento.
const ESCALA = ['#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#71717a', '#52525b', '#3f3f46', '#27272a', '#18181b']
const ACENTO = '#0d9488'
</script>

<template>
  <Diagram
    label="Una paleta de ejemplo: una escala de nueve grises y un solo color de acento."
    caption="Muchos grises y un solo color de acento."
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
  >
    <div class="flex h-14 overflow-hidden rounded-[var(--radius-md)]">
      <span v-for="c in ESCALA" :key="c" class="diagram-in flex-1" :style="{ background: c }" />
    </div>
    <div class="diagram-in mt-3 flex items-center gap-3">
      <span class="size-8 shrink-0 rounded-full" :style="{ background: ACENTO }" />
      <span class="text-sm text-fg-muted">El acento, solo para lo que importa.</span>
    </div>
  </Diagram>
</template>
