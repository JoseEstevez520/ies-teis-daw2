<script setup>
import { ArrowUpRight } from '@lucide/vue'

// Fuentes y referencias de las vistas a medida: nombre y una nota, separadas
// por una línea fina, sin caja. Las que tienen `url` son enlaces.
defineProps({
  items: { type: Array, required: true }, // [{ nombre, nota, url? }]
})
</script>

<template>
  <ul class="flex flex-col divide-y divide-border">
    <li v-for="item in items" :key="item.nombre">
      <component
        :is="item.url ? 'a' : 'div'"
        v-bind="item.url ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' } : {}"
        class="group flex items-center justify-between gap-3 py-3"
      >
        <div class="flex flex-col gap-0.5">
          <span class="text-sm font-medium text-fg">{{ item.nombre }}</span>
          <span class="text-sm text-fg-muted">{{ item.nota }}</span>
        </div>
        <ArrowUpRight
          v-if="item.url"
          class="size-4 shrink-0 text-fg-faint transition-[color,translate] duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
        />
      </component>
    </li>
  </ul>
</template>
