<script setup>
import { ref, computed } from 'vue'
import { modulos, SEMANAS_LECTIVAS, DURACION_SESION_HORAS } from './data/modulos.js'
import FormularioFaltas from './components/FormularioFaltas.vue'
import ResultadoFaltas from './components/ResultadoFaltas.vue'
import { CalendarX } from '@lucide/vue'

const moduloId = ref(modulos[0].id)
const faltas = ref(0)

const resultado = computed(() => {
  const modulo = modulos.find((m) => m.id === moduloId.value) ?? modulos[0]
  const horasTotales = modulo.horasSemana * SEMANAS_LECTIVAS
  const horasFalta = (faltas.value || 0) * DURACION_SESION_HORAS
  const pct = horasTotales > 0 ? (horasFalta / horasTotales) * 100 : 0

  return { horasTotales, pct }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-neutral-50 p-8">
    <div class="w-full max-w-sm bg-white border border-neutral-200 rounded-2xl p-8 flex flex-col gap-5">
      <div class="flex items-center gap-2.5">
        <CalendarX class="w-5 h-5 text-neutral-900 shrink-0" />
        <h1 class="text-lg font-semibold text-neutral-900">Calculadora de faltas · 2º DAW</h1>
      </div>

      <FormularioFaltas v-model:modulo-id="moduloId" v-model:faltas="faltas" />

      <div class="h-px bg-neutral-200"></div>

      <ResultadoFaltas :pct="resultado.pct" :horas-totales="resultado.horasTotales" />
    </div>
  </div>
</template>
