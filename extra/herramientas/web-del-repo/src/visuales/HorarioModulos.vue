<script setup>
import { RouterLink } from 'vue-router'
import { ArrowRight } from '@lucide/vue'
import { RESUMEN } from './horario.js'

// Los módulos del horario con su profe y sus sesiones por semana. El punto es
// el color del módulo en el horario de arriba: sirve de leyenda. Los que
// tienen página en la web llevan a ella.
</script>

<template>
  <ul class="grid gap-x-8 sm:grid-cols-2">
    <li v-for="m in RESUMEN" :key="m.codigo" class="border-b border-border">
      <component
        :is="m.ruta ? RouterLink : 'div'"
        :to="m.ruta"
        class="group flex items-center gap-3 py-2.5 focus-visible:outline-2 focus-visible:outline-accent"
      >
        <span class="size-2.5 shrink-0 rounded-full" :style="{ backgroundColor: m.color }" />
        <span class="w-14 text-sm font-semibold text-fg">{{ m.codigo }}</span>
        <span class="mask-fade-r min-w-0 flex-1 text-sm whitespace-nowrap text-fg-secondary">{{ m.profe }}</span>
        <span class="text-xs text-fg-muted tabular-nums">{{ m.sesiones }} {{ m.sesiones === 1 ? 'sesión' : 'sesiones' }}</span>
        <ArrowRight
          v-if="m.ruta"
          class="size-3.5 text-fg-faint transition-[color,translate] duration-150 group-hover:translate-x-0.5 group-hover:text-fg"
        />
        <span v-else class="w-3.5" />
      </component>
    </li>
  </ul>
</template>
