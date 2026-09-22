<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { AnimatePresence, motion } from 'motion-v'
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
  <motion.nav
    :animate="{ width: abierta ? 256 : 64 }"
    :transition="{ type: 'spring', stiffness: 320, damping: 32 }"
    class="shrink-0 border-r border-neutral-200 bg-white flex flex-col gap-1 p-3 overflow-hidden"
    :class="!abierta && 'items-center'"
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
      class="flex items-center gap-2.5 py-2 rounded-lg text-sm transition-colors duration-150 w-full whitespace-nowrap"
      :class="[
        esActivo(seccion)
          ? 'bg-neutral-100 text-neutral-900 font-medium'
          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
        abierta ? 'px-3' : 'justify-center px-0',
      ]"
      :title="!abierta ? seccion.etiqueta : undefined"
    >
      <component :is="seccion.icono" class="w-4 h-4 shrink-0" />
      <AnimatePresence>
        <motion.span
          v-if="abierta"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.12 }"
        >
          {{ seccion.etiqueta }}
        </motion.span>
      </AnimatePresence>
    </RouterLink>
  </motion.nav>
</template>
