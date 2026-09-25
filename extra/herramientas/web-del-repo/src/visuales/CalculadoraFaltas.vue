<script setup>
import { computed, ref } from 'vue'
import { Callout, Field, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, TextMorph } from 'elastic-ui'
import { RESUMEN } from './horario.js'

// La calculadora de faltas dentro de la web, con los mismos datos que el
// horario (visuales/horario.js): las horas de cada módulo salen de sus sesiones
// de 50 min por semana, así que si cambia el horario, cambia la calculadora.
// La fórmula y los umbrales están explicados en la propia página.
const SEMANAS_LECTIVAS = 20.8 // 2º, hasta la 2ª avaliación (antes de la FCT)
const SESION_HORAS = 50 / 60
const APERCIBIMIENTO = 6
const PERDIDA = 10

const MODULOS = RESUMEN.map((m) => ({
  id: m.codigo,
  horasTotales: m.sesiones * SESION_HORAS * SEMANAS_LECTIVAS,
  semana: aHoras(m.sesiones * 50),
}))

function aHoras(min) {
  const h = Math.floor(min / 60)
  const resto = Math.round(min % 60)
  return h ? `${h}h${resto ? ` ${resto}min` : ''}` : `${resto}min`
}

const moduloId = ref(MODULOS[0].id)
const faltasTexto = ref('0')

const modulo = computed(() => MODULOS.find((m) => m.id === moduloId.value) ?? MODULOS[0])
const faltas = computed(() => Math.max(0, Math.floor(Number(faltasTexto.value) || 0)))
const error = computed(() => (Number(faltasTexto.value) < 0 ? 'No puede ser negativo.' : ''))
const pct = computed(() => ((faltas.value * SESION_HORAS) / modulo.value.horasTotales) * 100)

// Cuántas faltas llevan a cada umbral, para decir cuántas te quedan.
const faltasHasta = (umbral) => Math.ceil(((umbral / 100) * modulo.value.horasTotales) / SESION_HORAS)

const estado = computed(() => {
  if (pct.value >= PERDIDA) {
    return {
      tipo: 'caution',
      titulo: 'Pérdida de evaluación continua',
      texto: 'Pasas del 10 %: el módulo solo se aprueba con el examen final.',
      color: 'var(--color-danger)',
    }
  }
  if (pct.value >= APERCIBIMIENTO) {
    const quedan = faltasHasta(PERDIDA) - faltas.value
    return {
      tipo: 'warning',
      titulo: 'Apercibimiento',
      texto: `Pasas del 6 %. Te ${quedan === 1 ? 'queda 1 falta' : `quedan ${quedan} faltas`} antes del 10 %.`,
      color: 'var(--color-warning)',
    }
  }
  const quedan = faltasHasta(APERCIBIMIENTO) - faltas.value
  return {
    tipo: 'tip',
    titulo: 'Dentro del margen',
    texto: `Te ${quedan === 1 ? 'queda 1 falta' : `quedan ${quedan} faltas`} antes del apercibimiento (6 %).`,
    color: 'var(--color-success)',
  }
})

// El anillo va de 0 a 10 %, el límite: lleno es perder la evaluación continua.
const RADIO = 52
const CIRCUNFERENCIA = 2 * Math.PI * RADIO
const relleno = computed(() => CIRCUNFERENCIA * (1 - Math.min(pct.value / PERDIDA, 1)))
// La marca del 6 %, a 6/10 de la vuelta.
const marca = computed(() => {
  const angulo = (APERCIBIMIENTO / PERDIDA) * 2 * Math.PI - Math.PI / 2
  return { x: 60 + RADIO * Math.cos(angulo), y: 60 + RADIO * Math.sin(angulo) }
})
</script>

<template>
  <div class="not-prose flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
    <div class="flex flex-1 flex-col gap-4">
      <Field label="Módulo">
        <Select v-model="moduloId" class="w-full">
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem v-for="m in MODULOS" :key="m.id" :value="m.id">{{ m.id }} · {{ m.semana }}/semana</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Faltas sin justificar" description="Las sesiones de 50 min a las que faltaste, según AbalarMóvil." :error="error">
        <Input v-model="faltasTexto" type="number" min="0" inputmode="numeric" />
      </Field>
    </div>

    <figure class="flex flex-col items-center gap-2" role="img" :aria-label="`${pct.toFixed(1)} % de faltas: ${estado.titulo}`">
      <div class="relative size-40">
        <svg viewBox="0 0 120 120" class="diagram size-40 -rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" :r="RADIO" fill="none" stroke="var(--color-border)" stroke-width="10" />
          <circle
            cx="60"
            cy="60"
            :r="RADIO"
            fill="none"
            :stroke="estado.color"
            stroke-width="10"
            stroke-linecap="round"
            :stroke-dasharray="CIRCUNFERENCIA"
            :stroke-dashoffset="relleno"
            class="transition-[stroke-dashoffset,stroke] duration-500 ease-emphasized motion-reduce:transition-none"
          />
          <!-- El 6 %, donde empieza el apercibimiento. -->
          <circle :cx="marca.x" :cy="marca.y" r="2.5" fill="var(--color-fg-muted)" />
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-3xl font-semibold tracking-tight text-fg tabular-nums">
            <TextMorph :text="`${pct.toFixed(1).replace('.', ',')} %`" />
          </span>
          <span class="text-xs text-fg-muted">de 10 %</span>
        </div>
      </div>
      <figcaption class="text-xs text-fg-muted">{{ Math.round(modulo.horasTotales) }} h totales del módulo</figcaption>
    </figure>
  </div>

  <Callout :type="estado.tipo" :title="estado.titulo">
    <p>{{ estado.texto }}</p>
  </Callout>
</template>
