<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { ChevronDown, ChevronLeft, ChevronRight } from '@lucide/vue'

const PRESETS = [
  { id: 'todas', label: 'Todas las fechas' },
  { id: 'vencidas', label: 'Vencidas' },
  { id: 'semana', label: 'Esta semana' },
  { id: 'mes', label: 'Este mes' },
]

// modelValue: id de preset, o un epoch (número) cuando se elige un día del calendario.
const modelValue = defineModel({ required: true })

const abierto = ref(false)
const contenedor = ref(null)
const mesVisible = ref(new Date(new Date().getFullYear(), new Date().getMonth(), 1))

const etiqueta = computed(() => {
  const preset = PRESETS.find((p) => p.id === modelValue.value)
  if (preset) return preset.label
  if (typeof modelValue.value === 'number') {
    return (
      'Hasta el ' +
      new Date(modelValue.value * 1000).toLocaleDateString('gl-ES', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      })
    )
  }
  return PRESETS[0].label
})

const diasDelMes = computed(() => {
  const inicio = new Date(mesVisible.value)
  inicio.setDate(inicio.getDate() - ((inicio.getDay() + 6) % 7)) // arranca en lunes
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(inicio)
    d.setDate(inicio.getDate() + i)
    return d
  })
})

function elegirPreset(id) {
  modelValue.value = id
  abierto.value = false
}

function elegirDia(dia) {
  const fin = new Date(dia)
  fin.setHours(23, 59, 59, 999)
  modelValue.value = Math.floor(fin.getTime() / 1000)
  abierto.value = false
}

function cambiarMes(delta) {
  mesVisible.value = new Date(mesVisible.value.getFullYear(), mesVisible.value.getMonth() + delta, 1)
}

function esMismoMes(d) {
  return d.getMonth() === mesVisible.value.getMonth()
}

function esSeleccionado(d) {
  return typeof modelValue.value === 'number' && new Date(modelValue.value * 1000).toDateString() === d.toDateString()
}

function clickFuera(e) {
  if (contenedor.value && !contenedor.value.contains(e.target)) abierto.value = false
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
      <span>{{ etiqueta }}</span>
      <ChevronDown
        class="w-3.5 h-3.5 text-neutral-400 transition-transform duration-150"
        :class="{ 'rotate-180': abierto }"
      />
    </button>

    <div
      v-if="abierto"
      class="absolute z-10 mt-1.5 w-64 rounded-lg border border-neutral-200 bg-white p-3 shadow-lg shadow-neutral-900/5 flex flex-col gap-3"
    >
      <div class="flex flex-wrap gap-1">
        <button
          v-for="p in PRESETS"
          :key="p.id"
          type="button"
          @click="elegirPreset(p.id)"
          class="px-2 py-1 rounded-md text-xs transition-colors duration-150"
          :class="modelValue === p.id ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'"
        >
          {{ p.label }}
        </button>
      </div>

      <div class="h-px bg-neutral-200"></div>

      <div class="flex items-center justify-between">
        <button type="button" @click="cambiarMes(-1)" class="p-1 text-neutral-400 hover:text-neutral-700" aria-label="Mes anterior">
          <ChevronLeft class="w-4 h-4" />
        </button>
        <span class="text-xs font-medium text-neutral-900 capitalize">
          {{ mesVisible.toLocaleDateString('gl-ES', { month: 'long', year: 'numeric' }) }}
        </span>
        <button type="button" @click="cambiarMes(1)" class="p-1 text-neutral-400 hover:text-neutral-700" aria-label="Mes siguiente">
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>

      <div class="grid grid-cols-7 gap-y-1 text-center">
        <span v-for="l in ['L', 'M', 'X', 'J', 'V', 'S', 'D']" :key="l" class="text-[10px] text-neutral-400">{{ l }}</span>
        <button
          v-for="d in diasDelMes"
          :key="d.toISOString()"
          type="button"
          @click="elegirDia(d)"
          class="w-7 h-7 rounded-md text-xs transition-colors duration-100 justify-self-center"
          :class="[
            esMismoMes(d) ? 'text-neutral-900' : 'text-neutral-300',
            esSeleccionado(d) ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100',
          ]"
        >
          {{ d.getDate() }}
        </button>
      </div>
    </div>
  </div>
</template>
