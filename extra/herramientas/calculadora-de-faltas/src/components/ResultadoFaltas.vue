<script setup>
import { ref, computed } from 'vue'
import { CircleCheck, TriangleAlert, CircleX, Info, X } from '@lucide/vue'

const props = defineProps({
  pct: { type: Number, required: true },
  horasTotales: { type: Number, required: true },
})

const mostrarInfo = ref(false)

const RADIO = 50
const CIRCUNFERENCIA = 2 * Math.PI * RADIO

const estado = computed(() => {
  if (props.pct >= 10) {
    return {
      icono: CircleX,
      anillo: '#dc2626',
      texto: 'text-red-700',
      fondo: 'bg-red-50',
      borde: 'border-red-200',
      mensaje: 'Pérdida de evaluación continua.',
    }
  }
  if (props.pct >= 6) {
    return {
      icono: TriangleAlert,
      anillo: '#d97706',
      texto: 'text-amber-700',
      fondo: 'bg-amber-50',
      borde: 'border-amber-200',
      mensaje: 'Apercibimiento (6%).',
    }
  }
  return {
    icono: CircleCheck,
    anillo: '#059669',
    texto: 'text-emerald-700',
    fondo: 'bg-emerald-50',
    borde: 'border-emerald-200',
    mensaje: 'Dentro del margen.',
  }
})

const dashoffset = computed(() => {
  const fraccion = Math.min(props.pct / 10, 1)
  return CIRCUNFERENCIA * (1 - fraccion)
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="flex flex-col items-center gap-2">
      <div class="relative w-36 h-36">
        <svg viewBox="0 0 120 120" class="w-36 h-36 -rotate-90">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e5e5" stroke-width="10" />
          <circle
            cx="60" cy="60" r="50" fill="none"
            :stroke="estado.anillo" stroke-width="10" stroke-linecap="round"
            :stroke-dasharray="CIRCUNFERENCIA"
            :stroke-dashoffset="dashoffset"
            class="transition-[stroke-dashoffset] duration-300"
          />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-3xl font-bold text-neutral-900">{{ pct.toFixed(1) }}%</span>
        </div>
      </div>
      <span class="text-xs text-neutral-400">{{ horasTotales.toFixed(0) }} h totales del módulo</span>
    </div>

    <div class="flex items-center gap-3 rounded-lg border px-3.5 py-3" :class="[estado.fondo, estado.borde]">
      <component :is="estado.icono" class="w-4 h-4 shrink-0" :class="estado.texto" />
      <span class="text-sm leading-relaxed flex-grow" :class="estado.texto">{{ estado.mensaje }}</span>
      <button
        type="button"
        @click="mostrarInfo = true"
        class="shrink-0 -m-1 p-1 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors duration-150"
        aria-label="Qué significa esto"
      >
        <Info class="w-4 h-4" />
      </button>
    </div>
  </div>

  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="mostrarInfo"
        class="fixed inset-0 bg-neutral-900/40 flex items-center justify-center p-6 z-50"
        @click.self="mostrarInfo = false"
      >
        <div class="modal-card w-full max-w-sm bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4">
          <div class="flex items-start justify-between gap-4">
            <h2 class="text-base font-semibold text-neutral-900">Faltas en FP</h2>
            <button
              type="button"
              @click="mostrarInfo = false"
              class="shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors duration-150"
              aria-label="Cerrar"
            >
              <X class="w-4 h-4" />
            </button>
          </div>

          <p class="text-sm text-neutral-500">Solo cuentan las faltas sin justificar (AbalarMóvil).</p>

          <div class="flex flex-col">
            <div class="flex gap-3">
              <div class="flex flex-col items-center">
                <div class="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></div>
                <div class="w-px flex-grow bg-neutral-200"></div>
              </div>
              <div class="flex flex-col gap-0.5 pb-5">
                <span class="text-sm font-semibold text-neutral-900">Apercibimiento · 6%</span>
                <span class="text-sm text-neutral-500">Queda constancia en secretaría.</span>
              </div>
            </div>

            <div class="flex gap-3">
              <div class="flex flex-col items-center">
                <div class="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0"></div>
              </div>
              <div class="flex flex-col gap-0.5">
                <span class="text-sm font-semibold text-neutral-900">Pérdida de evaluación continua · 10%</span>
                <span class="text-sm text-neutral-500">Solo se aprueba por examen final.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease-out;
}
.modal-enter-active .modal-card,
.modal-leave-active .modal-card {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-card,
.modal-leave-to .modal-card {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
}
</style>
