<script setup>
import { useRoute } from 'vue-router'
import { SECCIONES } from '../data/secciones.js'

const route = useRoute()

function esActivo(seccion) {
  if (seccion.ruta === '/') return route.path === '/'
  return route.path === seccion.ruta || route.path.startsWith(seccion.ruta + '/')
}
</script>

<template>
  <nav class="w-64 shrink-0 border-r border-neutral-200 bg-white p-4 flex flex-col gap-1">
    <RouterLink
      v-for="seccion in SECCIONES"
      :key="seccion.ruta"
      :to="seccion.ruta"
      class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors duration-150"
      :class="
        esActivo(seccion)
          ? 'bg-neutral-100 text-cyan-600 font-medium'
          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
      "
    >
      <component :is="seccion.icono" class="w-4 h-4 shrink-0" />
      {{ seccion.etiqueta }}
    </RouterLink>
  </nav>
</template>
