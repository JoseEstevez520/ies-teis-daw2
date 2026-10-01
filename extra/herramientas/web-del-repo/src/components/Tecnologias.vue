<script setup>
import Logo from './Logo.vue'

// Una fila de tecnologías con su logo y su nombre, para nombrar el stack sin
// gastar texto. `items` es una lista de { nombre, ... }: la mayoría traen
// `icon` (un logo de simple-icons) y las marcas que no están allí traen `img`
// (la ruta de un logo descargado, con `mono: true` si es de un solo color).
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
      <img
        v-if="t.img"
        :src="t.img"
        alt=""
        width="18"
        height="18"
        :class="['rounded', t.mono && 'logo-mono']"
      />
      <Logo v-else :icon="t.icon" :size="18" />
      <span class="text-sm text-fg-secondary">{{ t.nombre }}</span>
    </li>
  </ul>
</template>
