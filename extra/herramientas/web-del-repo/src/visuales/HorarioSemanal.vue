<script setup>
import { nextTick, ref } from 'vue'
import { Button, TextMorph, Timetable } from 'elastic-ui'
import { Coffee, Download } from '@lucide/vue'
import { CLASES, MODULOS } from './horario.js'

// Horario de 2º DAW, pintado
// con el Timetable de elastic-ui: sesiones de 50 min desde las 8:10, con el
// recreo de 11:30 a 12:00.

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']

// Sesiones: 0-3 por la mañana, 4-7 después del recreo, en minutos desde las 8:10.
const INICIO_SESION = [0, 50, 100, 150, 230, 280, 330, 380]
const hora = (min) => {
  const t = 8 * 60 + 10 + min
  return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`
}

const CLASES_TIMETABLE = CLASES.map(([dia, codigo, sesion, n]) => {
  const m = MODULOS[codigo]
  return {
    day: dia,
    start: hora(INICIO_SESION[sesion]),
    end: hora(INICIO_SESION[sesion + n - 1] + 50),
    title: codigo,
    detail: m.profe,
    color: m.color,
    to: m.ruta,
  }
})

const RECREO = [{ start: '11:30', end: '12:00', label: 'Recreo', icon: Coffee }]

// Descarga como PNG la semana entera, desde una copia quieta del horario
// (`still`: sin enlaces ni pestañas) que solo existe mientras se genera.
const lienzo = ref(null)
const exportando = ref(false)
async function descargar() {
  exportando.value = true
  try {
    const { toPng } = await import('html-to-image')
    await nextTick()
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
    // El fondo del tema que se está viendo, para que el texto se lea también en oscuro.
    const fondo = getComputedStyle(document.body).backgroundColor
    const url = await toPng(lienzo.value, { pixelRatio: 2, backgroundColor: fondo })
    const a = document.createElement('a')
    a.href = url
    a.download = 'horario-2daw.png'
    a.click()
  } finally {
    exportando.value = false
  }
}
</script>

<template>
  <div class="not-prose flex flex-col gap-3">
    <div class="flex items-center justify-between gap-3">
      <Button variant="ghost" size="sm" :icon="Download" :disabled="exportando" @click="descargar">
        <TextMorph :text="exportando ? 'Generando…' : 'Descargar PNG'" />
      </Button>
    </div>

    <Timetable :days="DIAS" start="08:10" end="15:20" :events="CLASES_TIMETABLE" :breaks="RECREO" />

    <!-- Solo mientras se genera el PNG, fuera de la pantalla. -->
    <div v-if="exportando" aria-hidden="true" class="fixed top-0 -left-[10000px]">
      <div ref="lienzo" class="flex w-[760px] flex-col gap-5 bg-bg p-5">
        <p class="text-base font-semibold text-fg">Horario · CSDAW 2º</p>
        <Timetable :days="DIAS" start="08:10" end="15:20" :events="CLASES_TIMETABLE" :breaks="RECREO" still />
      </div>
    </div>
  </div>
</template>
