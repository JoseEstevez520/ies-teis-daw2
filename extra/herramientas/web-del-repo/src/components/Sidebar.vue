<script setup>
import { useRoute } from 'vue-router'
import { SECCIONES } from '../data/secciones.js'

defineProps({
  abierta: { type: Boolean, default: true },
})

const route = useRoute()

function esActivo(seccion) {
  if (seccion.ruta === '/') return route.path === '/'
  return route.path === seccion.ruta || route.path.startsWith(seccion.ruta + '/')
}
</script>

<template>
  <nav
    class="shrink-0 border-r border-neutral-200 bg-white overflow-hidden transition-all duration-200"
    :class="abierta ? 'w-64 p-4' : 'w-0 p-0 border-r-0'"
  >
    <div class="w-56 flex flex-col gap-1">
      <RouterLink
        v-for="seccion in SECCIONES"
        :key="seccion.ruta"
        :to="seccion.ruta"
        class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors duration-150"
        :class="
          esActivo(seccion)
            ? 'bg-neutral-100 text-neutral-900 font-medium'
            : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
        "
      >
        <component :is="seccion.icono" class="w-4 h-4 shrink-0" />
        {{ seccion.etiqueta }}
      </RouterLink>
    </div>
  </nav>
</template>
