<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { modulos } from '../data/modulos.js'
import { ChevronDown, Check } from '@lucide/vue'

const moduloId = defineModel('moduloId')
const faltas = defineModel('faltas')

const abierto = ref(false)
const contenedor = ref(null)

const moduloSeleccionado = computed(
  () => modulos.find((m) => m.id === moduloId.value) ?? modulos[0]
)

function elegir(id) {
  moduloId.value = id
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
  <div class="flex flex-col gap-5">
    <div class="flex flex-col gap-1.5">
      <label class="text-sm font-medium text-neutral-900">Módulo</label>
      <div class="relative" ref="contenedor">
        <button
          type="button"
          @click="abierto = !abierto"
          class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 transition-colors duration-150 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-neutral-300"
        >
          <span>{{ moduloSeleccionado.label }}</span>
          <ChevronDown
            class="w-4 h-4 text-neutral-400 transition-transform duration-150"
            :class="{ 'rotate-180': abierto }"
          />
        </button>

        <TransitionGroup
          v-if="abierto"
          tag="div"
          name="item"
          class="absolute z-10 mt-1.5 w-full rounded-lg border border-neutral-200 bg-white p-1 shadow-lg shadow-neutral-900/5"
        >
          <button
            v-for="(m, i) in modulos"
            :key="m.id"
            type="button"
            :style="{ '--i': i }"
            @click="elegir(m.id)"
            class="w-full flex items-center justify-between px-2.5 py-2 rounded-md text-sm text-left transition-colors duration-100 hover:bg-neutral-50"
            :class="m.id === moduloId ? 'text-neutral-900 font-medium' : 'text-neutral-600'"
          >
            {{ m.label }}
            <Check v-if="m.id === moduloId" class="w-3.5 h-3.5 text-neutral-900" />
          </button>
        </TransitionGroup>
      </div>
    </div>

    <div class="flex flex-col gap-1.5">
      <label for="faltas" class="text-sm font-medium text-neutral-900">Faltas sin justificar</label>
      <input
        id="faltas"
        type="number"
        min="0"
        v-model.number="faltas"
        class="w-full px-3 py-2.5 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-900 transition-colors duration-150 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-neutral-300"
      />
    </div>
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
