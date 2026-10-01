<script setup>
import Logo from './Logo.vue'

// Una fila de tecnologías con su logo y su nombre, para nombrar el stack sin
// gastar texto. `items` es una lista de { icon, nombre } de simple-icons.
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <ul class="not-prose flex flex-wrap gap-2">
    <li
      v-for="t in items"
      :key="t.nombre"
      class="flex items-center gap-2 rounded-[var(--radius-lg)] bg-bg-subtle px-3 py-1.5"
    >
      <Logo :icon="t.icon" :size="18" />
      <span class="text-sm text-fg-secondary">{{ t.nombre }}</span>
    </li>
  </ul>
</template>
