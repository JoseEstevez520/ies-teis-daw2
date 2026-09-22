<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { PanelLeftClose, PanelLeftOpen } from '@lucide/vue'
import { SECCIONES } from '../data/secciones.js'

const route = useRoute()
const abierta = ref(true)

function esActivo(seccion) {
  if (seccion.ruta === '/') return route.path === '/'
  return route.path === seccion.ruta || route.path.startsWith(seccion.ruta + '/')
}
</script>

<template>
  <nav
    class="shrink-0 border-r border-neutral-200 bg-white flex flex-col gap-1 p-3 transition-all duration-200"
    :class="abierta ? 'w-64' : 'w-16 items-center'"
  >
    <button
      type="button"
      @click="abierta = !abierta"
      class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors duration-150 mb-1"
      :aria-label="abierta ? 'Replegar barra lateral' : 'Desplegar barra lateral'"
    >
      <component :is="abierta ? PanelLeftClose : PanelLeftOpen" class="w-4 h-4 shrink-0" />
    </button>

    <RouterLink
      v-for="seccion in SECCIONES"
      :key="seccion.ruta"
      :to="seccion.ruta"
      class="flex items-center gap-2.5 py-2 rounded-lg text-sm transition-colors duration-150 w-full"
      :class="[
        esActivo(seccion)
          ? 'bg-neutral-100 text-neutral-900 font-medium'
          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
        abierta ? 'px-3' : 'justify-center px-0',
      ]"
      :title="!abierta ? seccion.etiqueta : undefined"
    >
      <component :is="seccion.icono" class="w-4 h-4 shrink-0" />
      <span v-if="abierta">{{ seccion.etiqueta }}</span>
    </RouterLink>
  </nav>
</template>
