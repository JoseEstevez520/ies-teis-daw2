<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { motion } from 'motion-v'
import { ChevronRight, PanelLeftClose, PanelLeftOpen } from '@lucide/vue'
import { ARBOL_NAV } from '../lib/arbolNav.js'
import NavNodo from './NavNodo.vue'

const route = useRoute()
const abierta = ref(true)
// Rutas con el desplegable abierto. Al navegar se abren solos los niveles
// que contienen la página actual, sin cerrar los que abrió el usuario.
const abiertos = ref(new Set())

function esActivo(seccion) {
  if (seccion.ruta === '/') return route.path === '/'
  return route.path === seccion.ruta || route.path.startsWith(seccion.ruta + '/')
}

function alternar(ruta) {
  const s = new Set(abiertos.value)
  s.has(ruta) ? s.delete(ruta) : s.add(ruta)
  abiertos.value = s
}

watch(
  () => route.path,
  (path) => {
    const s = new Set(abiertos.value)
    const partes = path.split('/').filter(Boolean)
    for (let i = 1; i < partes.length; i++) s.add('/' + partes.slice(0, i).join('/'))
    abiertos.value = s
  },
  { immediate: true }
)
</script>

<template>
  <motion.nav
    :animate="{ width: abierta ? 256 : 64 }"
    :transition="{ type: 'spring', stiffness: 320, damping: 32 }"
    class="shrink-0 border-r border-neutral-200 bg-white flex flex-col gap-1 p-3 overflow-x-hidden overflow-y-auto"
  >
    <button
      type="button"
      @click="abierta = !abierta"
      class="flex items-center px-3 py-2 rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors duration-150 mb-1"
      :aria-label="abierta ? 'Replegar barra lateral' : 'Desplegar barra lateral'"
    >
      <component :is="abierta ? PanelLeftClose : PanelLeftOpen" class="w-4 h-4 shrink-0" />
    </button>

    <div v-for="seccion in ARBOL_NAV" :key="seccion.ruta">
      <div class="flex items-center">
        <RouterLink
          :to="seccion.ruta"
          class="flex flex-1 items-center px-3 py-2 rounded-lg text-sm transition-colors duration-150 min-w-0 overflow-hidden"
          :class="
            esActivo(seccion)
              ? 'bg-neutral-100 text-neutral-900 font-medium'
              : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
          "
          :title="!abierta ? seccion.etiqueta : undefined"
        >
          <component :is="seccion.icono" class="w-4 h-4 shrink-0" />
          <span
            class="overflow-hidden whitespace-nowrap transition-[max-width,margin-left] duration-300 ease-out"
            :class="abierta ? 'max-w-40 ml-2.5' : 'max-w-0 ml-0'"
          >
            {{ seccion.etiqueta }}
          </span>
        </RouterLink>
        <button
          v-if="abierta && seccion.hijos.length"
          type="button"
          @click="alternar(seccion.ruta)"
          class="p-1.5 rounded-md text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
          :aria-label="abiertos.has(seccion.ruta) ? `Plegar ${seccion.etiqueta}` : `Desplegar ${seccion.etiqueta}`"
          :aria-expanded="abiertos.has(seccion.ruta)"
        >
          <ChevronRight
            class="w-4 h-4 transition-transform duration-150"
            :class="abiertos.has(seccion.ruta) ? 'rotate-90' : ''"
          />
        </button>
      </div>
      <NavNodo
        v-if="abierta && seccion.hijos.length && abiertos.has(seccion.ruta)"
        :nodos="seccion.hijos"
        :abiertos="abiertos"
        :ruta-actual="route.path"
        @alternar="alternar"
      />
    </div>
  </motion.nav>
</template>
