<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Check, ChevronDown, SlidersHorizontal } from '@lucide/vue'

defineProps({
  opciones: { type: Array, required: true }, // [{ id, label }]
})
// Set de ids activos (multi-selección, no excluyente).
const activos = defineModel({ required: true })

const abierto = ref(false)
const contenedor = ref(null)

function alternar(id) {
  const nuevo = new Set(activos.value)
  if (nuevo.has(id)) nuevo.delete(id)
  else nuevo.add(id)
  activos.value = nuevo
}

function clickFuera(e) {
  if (contenedor.value && !contenedor.value.contains(e.target)) {
    abierto.value = false
  }
}

onMounted(() => document.addEventListener('click', clickFuera))
onUnmounted(() => document.removeEventListener('click', clickFuera))
</script>

<template>
  <div class="relative" ref="contenedor">
    <button
      type="button"
      @click="abierto = !abierto"
      class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs text-neutral-700 transition-colors duration-150 hover:border-neutral-300"
    >
      <SlidersHorizontal class="w-3.5 h-3.5 text-neutral-400" />
      <span>Filtros</span>
      <ChevronDown
        class="w-3.5 h-3.5 text-neutral-400 transition-transform duration-150"
        :class="{ 'rotate-180': abierto }"
      />
    </button>

    <div
      v-if="abierto"
      class="absolute z-10 mt-1.5 min-w-[200px] rounded-lg border border-neutral-200 bg-white p-1 shadow-lg shadow-neutral-900/5"
    >
      <button
        v-for="o in opciones"
        :key="o.id"
        type="button"
        @click="alternar(o.id)"
        class="w-full flex items-center justify-between gap-4 px-2.5 py-1.5 rounded-md text-xs text-left whitespace-nowrap transition-colors duration-100 hover:bg-neutral-50"
        :class="activos.has(o.id) ? 'text-neutral-900 font-medium' : 'text-neutral-600'"
      >
        {{ o.label }}
        <Check v-if="activos.has(o.id)" class="w-3 h-3 text-neutral-900" />
      </button>
    </div>
  </div>
</template>
