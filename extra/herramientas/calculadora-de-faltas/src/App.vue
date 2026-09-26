<script setup>
import { computed, ref } from 'vue'
import {
  Callout,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Field,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  ThemeToggle,
} from 'elastic-ui'
import { CalendarX } from '@lucide/vue'
import AnilloFaltas from './components/AnilloFaltas.vue'
import InfoUmbrales from './components/InfoUmbrales.vue'
import { modulos, SEMANAS_LECTIVAS, DURACION_SESION_HORAS } from './data/modulos.js'

const APERCIBIMIENTO = 6
const PERDIDA = 10

const moduloId = ref(modulos[0].id)
const faltasTexto = ref('0')

const modulo = computed(() => modulos.find((m) => m.id === moduloId.value) ?? modulos[0])
const faltas = computed(() => Math.max(0, Math.floor(Number(faltasTexto.value) || 0)))
const error = computed(() => (Number(faltasTexto.value) < 0 ? 'No puede ser negativo.' : ''))
const horasTotales = computed(() => modulo.value.horasSemana * SEMANAS_LECTIVAS)
const pct = computed(() => ((faltas.value * DURACION_SESION_HORAS) / horasTotales.value) * 100)

// Cuántas faltas llevan a cada umbral, para decir cuántas te quedan.
const faltasHasta = (umbral) => Math.ceil(((umbral / 100) * horasTotales.value) / DURACION_SESION_HORAS)
const quedanTexto = (n) => (n === 1 ? 'Te queda 1 falta' : `Te quedan ${n} faltas`)

const estado = computed(() => {
  if (pct.value >= PERDIDA) {
    return { tipo: 'caution', titulo: 'Pérdida de evaluación continua', texto: 'Solo se aprueba con el examen final.', color: 'var(--color-danger)' }
  }
  if (pct.value >= APERCIBIMIENTO) {
    return {
      tipo: 'warning',
      titulo: 'Apercibimiento',
      texto: `${quedanTexto(faltasHasta(PERDIDA) - faltas.value)} antes del 10 %.`,
      color: 'var(--color-warning)',
    }
  }
  return {
    tipo: 'tip',
    titulo: 'Dentro del margen',
    texto: `${quedanTexto(faltasHasta(APERCIBIMIENTO) - faltas.value)} antes del apercibimiento (6 %).`,
    color: 'var(--color-success)',
  }
})
</script>

<template>
  <main class="flex min-h-dvh items-center justify-center p-4 sm:p-8">
    <Card class="w-full max-w-sm">
      <CardHeader class="flex-row items-center justify-between gap-3">
        <CardTitle as="h1" class="flex items-center gap-2.5">
          <CalendarX class="size-5 shrink-0 text-accent" :stroke-width="1.75" aria-hidden="true" />
          Calculadora de faltas
        </CardTitle>
        <ThemeToggle />
      </CardHeader>

      <CardContent class="flex flex-col gap-6">
        <div class="flex flex-col gap-4">
          <Field label="Módulo">
            <Select v-model="moduloId" class="w-full">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem v-for="m in modulos" :key="m.id" :value="m.id">{{ m.label }}</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Faltas sin justificar" description="Las sesiones de 50 min, según AbalarMóvil." :error="error">
            <Input v-model="faltasTexto" type="number" min="0" inputmode="numeric" />
          </Field>
        </div>

        <figure class="flex flex-col items-center gap-2" role="img" :aria-label="`${pct.toFixed(1)} % de faltas: ${estado.titulo}`">
          <AnilloFaltas :pct="pct" :color="estado.color" :perdida="PERDIDA" />
          <figcaption class="text-xs text-fg-muted">{{ Math.round(horasTotales) }} h totales del módulo</figcaption>
        </figure>

        <Callout :type="estado.tipo" :title="estado.titulo">
          <p>{{ estado.texto }}</p>
        </Callout>

        <div class="flex justify-center"><InfoUmbrales /></div>
      </CardContent>
    </Card>
  </main>
</template>
