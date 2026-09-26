<script setup>
import { computed } from 'vue'
import { TextMorph } from 'elastic-ui'

// El porcentaje de faltas en un anillo que va de 0 al 10 %, el límite: lleno
// es perder la evaluación continua. Una marca en el 6 %, el apercibimiento.
const props = defineProps({
  pct: { type: Number, required: true },
  color: { type: String, required: true },
  apercibimiento: { type: Number, required: true },
  perdida: { type: Number, required: true },
})

const RADIO = 52
const CIRCUNFERENCIA = 2 * Math.PI * RADIO
const relleno = computed(() => CIRCUNFERENCIA * (1 - Math.min(props.pct / props.perdida, 1)))
const marca = computed(() => {
  const angulo = (props.apercibimiento / props.perdida) * 2 * Math.PI - Math.PI / 2
  return { x: 60 + RADIO * Math.cos(angulo), y: 60 + RADIO * Math.sin(angulo) }
})
</script>

<template>
  <div class="relative size-44">
    <svg viewBox="0 0 120 120" class="size-44 -rotate-90" aria-hidden="true">
      <circle cx="60" cy="60" :r="RADIO" fill="none" stroke="var(--color-bg-inset)" stroke-width="10" />
      <circle
        cx="60"
        cy="60"
        :r="RADIO"
        fill="none"
        :stroke="color"
        stroke-width="10"
        stroke-linecap="round"
        :stroke-dasharray="CIRCUNFERENCIA"
        :stroke-dashoffset="relleno"
        class="transition-[stroke-dashoffset,stroke] duration-500 ease-emphasized motion-reduce:transition-none"
      />
      <circle :cx="marca.x" :cy="marca.y" r="2.5" fill="var(--color-fg-muted)" />
    </svg>
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <span class="text-4xl font-semibold tracking-tight text-fg tabular-nums">
        <TextMorph :text="`${pct.toFixed(1).replace('.', ',')} %`" />
      </span>
      <span class="text-xs text-fg-muted">de {{ perdida }} %</span>
    </div>
  </div>
</template>
