<script setup>
import { RouterLink } from 'vue-router'
import { ArrowRight } from '@lucide/vue'
import { RESUMEN } from './horario.js'

// Los módulos del horario con su profe y sus sesiones por semana. Los que
// tienen página en la web llevan a ella.
</script>

<template>
  <div class="grid sm:grid-cols-2 gap-x-6">
    <component
      :is="m.ruta ? RouterLink : 'div'"
      v-for="m in RESUMEN"
      :key="m.codigo"
      :to="m.ruta"
      class="group flex items-center gap-3 py-2.5 border-b border-neutral-100"
    >
      <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ backgroundColor: m.color }" />
      <span class="w-14 text-sm font-semibold text-neutral-900">{{ m.codigo }}</span>
      <span class="flex-1 text-sm text-neutral-600 truncate">{{ m.profe }}</span>
      <span class="text-xs text-neutral-400 tabular-nums">{{ m.sesiones }} {{ m.sesiones === 1 ? 'sesión' : 'sesiones' }}</span>
      <ArrowRight
        v-if="m.ruta"
        class="w-3.5 h-3.5 text-neutral-300 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-[color,translate] duration-150"
      />
      <span v-else class="w-3.5" />
    </component>
  </div>
</template>
