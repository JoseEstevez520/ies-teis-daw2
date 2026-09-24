<script setup>
import { ChevronRight } from '@lucide/vue'

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
      <div class="flex items-center">
        <RouterLink
          :to="nodo.ruta"
          :title="nodo.titulo"
          class="flex-1 min-w-0 truncate px-2 py-1.5 rounded-md text-[13px] transition-colors duration-150"
          :class="
            rutaActual === nodo.ruta
              ? 'bg-neutral-100 text-neutral-900 font-medium'
              : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
          "
        >
          {{ nodo.titulo }}
        </RouterLink>
        <button
          v-if="nodo.hijos.length"
          type="button"
          @click="$emit('alternar', nodo.ruta)"
          class="p-1 rounded-md text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
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
