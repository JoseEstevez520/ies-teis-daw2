<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Check, ChevronDown } from '@lucide/vue'

const props = defineProps({
  opciones: { type: Array, required: true }, // [{ id, label }]
})
const modelValue = defineModel({ required: true })

const abierto = ref(false)
const contenedor = ref(null)

const seleccionada = computed(
  () => props.opciones.find((o) => o.id === modelValue.value) ?? props.opciones[0]
)

function elegir(id) {
  modelValue.value = id
  abierto.value = false
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
      <span>{{ seleccionada?.label }}</span>
      <ChevronDown
        class="w-3.5 h-3.5 text-neutral-400 transition-transform duration-150"
        :class="{ 'rotate-180': abierto }"
      />
    </button>

    <TransitionGroup
      v-if="abierto"
      tag="div"
      name="item"
      class="absolute z-10 mt-1.5 min-w-full w-max rounded-lg border border-neutral-200 bg-white p-1 shadow-lg shadow-neutral-900/5"
    >
      <button
        v-for="(o, i) in opciones"
        :key="o.id"
        type="button"
        :style="{ '--i': i }"
        @click="elegir(o.id)"
        class="w-full flex items-center justify-between gap-4 px-2.5 py-1.5 rounded-md text-xs text-left whitespace-nowrap transition-colors duration-100 hover:bg-neutral-50"
        :class="o.id === modelValue ? 'text-neutral-900 font-medium' : 'text-neutral-600'"
      >
        {{ o.label }}
        <Check v-if="o.id === modelValue" class="w-3 h-3 text-neutral-900" />
      </button>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.item-enter-active {
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
  transition-delay: calc(0.03s * var(--i));
}
.item-leave-active {
  transition: opacity 0.1s ease-in;
}
.item-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}
.item-leave-to {
  opacity: 0;
}
</style>
