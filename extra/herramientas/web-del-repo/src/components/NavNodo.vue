<script setup>
import { ChevronRight } from '@lucide/vue'
import { colorDeRuta } from '../lib/colorSeccion.js'

// Un nivel de desplegable dentro de una sección de la barra lateral. Se llama
// a sí mismo para los niveles de más abajo (p.ej. Extra > Herramientas > ...).
defineProps({
  nodos: { type: Array, required: true },
  abiertos: { type: Set, required: true },
  rutaActual: { type: String, required: true },
})
defineEmits(['alternar'])
</script>

<template>
  <ul class="ml-5 pl-2 border-l border-neutral-200 flex flex-col gap-0.5 mt-0.5">
    <li v-for="nodo in nodos" :key="nodo.ruta">
      <div
        class="flex items-center rounded-md transition-colors duration-150"
        :class="rutaActual === nodo.ruta ? 'bg-neutral-100' : 'hover:bg-neutral-50'"
      >
        <RouterLink
          :to="nodo.ruta"
          :title="nodo.titulo"
          class="flex flex-1 min-w-0 items-center gap-2 px-2 py-1.5 text-[13px]"
          :class="rutaActual === nodo.ruta ? 'text-neutral-900 font-medium' : 'text-neutral-600 hover:text-neutral-900'"
        >
          <span class="w-1.5 h-1.5 rounded-full shrink-0" :style="{ backgroundColor: colorDeRuta(nodo.ruta) }" />
          <span class="truncate">{{ nodo.titulo }}</span>
        </RouterLink>
        <button
          v-if="nodo.hijos.length"
          type="button"
          @click="$emit('alternar', nodo.ruta)"
          class="mr-1 p-1 rounded text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/60"
          :aria-label="abiertos.has(nodo.ruta) ? `Plegar ${nodo.titulo}` : `Desplegar ${nodo.titulo}`"
          :aria-expanded="abiertos.has(nodo.ruta)"
        >
          <ChevronRight
            class="w-3.5 h-3.5 transition-transform duration-150"
            :class="abiertos.has(nodo.ruta) ? 'rotate-90' : ''"
          />
        </button>
      </div>
      <NavNodo
        v-if="nodo.hijos.length && abiertos.has(nodo.ruta)"
        :nodos="nodo.hijos"
        :abiertos="abiertos"
        :ruta-actual="rutaActual"
        @alternar="$emit('alternar', $event)"
      />
    </li>
  </ul>
</template>
