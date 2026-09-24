<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Coffee, Download, MapPin } from '@lucide/vue'
import { CLASES, MODULOS } from './horario.js'

// Horario de 2º DAW, sacado de la foto oficial (horario/horario.jpg). Cada
// bloque ocupa lo que dura de verdad: sesiones de 50 min desde las 8:10, con
// el recreo de 11:30 a 12:00. Todas las clases son en el Taller Inf 2.

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']

// Sesiones: 0-3 por la mañana, 4-7 después del recreo.
const INICIO_SESION = [0, 50, 100, 150, 230, 280, 330, 380] // minutos desde las 8:10
const FIN_DIA = 430 // 15:20
const RECREO = { inicio: 200, fin: 230 }

const MIN_POR_FILA = 10
const hora = (min) => {
  const t = 8 * 60 + 10 + min
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`
}
const fila = (min) => min / MIN_POR_FILA + 2 // fila 1 = cabecera

const bloques = CLASES.map(([dia, codigo, sesion, n]) => {
  const inicio = INICIO_SESION[sesion]
  const fin = INICIO_SESION[sesion + n - 1] + 50
  return { dia, codigo, n, inicio, fin, ...MODULOS[codigo] }
})

const marcas = [...INICIO_SESION, RECREO.inicio, FIN_DIA].sort((a, b) => a - b)

// Hoy se marca en la cabecera (no en el PNG).
const d = new Date().getDay()
const hoy = d >= 1 && d <= 5 ? d - 1 : -1

// Descarga como PNG: solo la tabla y la leyenda, sin el botón ni la marca de
// hoy (una imagen guardada no debería decir qué día era al guardarla).
const lienzo = ref(null)
const exportando = ref(false)
async function descargar() {
  exportando.value = true
  try {
    const { toPng } = await import('html-to-image')
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
    const url = await toPng(lienzo.value, { pixelRatio: 2, backgroundColor: '#ffffff' })
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
  <div class="flex flex-col gap-3">
    <div class="flex items-center justify-between gap-3">
      <p class="flex items-center gap-1.5 text-sm text-neutral-500">
        <MapPin class="w-3.5 h-3.5 shrink-0" />
        Todas en el Taller Inf 2
      </p>
      <button
        type="button"
        @click="descargar"
        :disabled="exportando"
        class="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 disabled:opacity-50"
      >
        <Download class="w-3.5 h-3.5" />
        {{ exportando ? 'Generando…' : 'Descargar PNG' }}
      </button>
    </div>

    <div class="overflow-x-auto">
      <div ref="lienzo" class="min-w-[640px] bg-white rounded-xl p-5 flex flex-col gap-5">
        <!-- Solo sale en el PNG, que no tiene el título de la página -->
        <p v-if="exportando" class="text-base font-semibold text-neutral-900">Horario · CSDAW 2º</p>

        <div
          class="grid gap-x-1"
          :style="{
            gridTemplateColumns: '44px repeat(5, 1fr)',
            gridTemplateRows: `28px repeat(${FIN_DIA / MIN_POR_FILA}, 11px)`,
          }"
        >
          <div
            v-for="(dia, i) in DIAS"
            :key="dia"
            class="text-sm text-center"
            :class="i === hoy && !exportando ? 'text-neutral-900 font-semibold' : 'text-neutral-500'"
            :style="{ gridColumn: i + 2, gridRow: 1 }"
          >
            {{ dia }}
            <span v-if="i === hoy && !exportando" class="block mx-auto mt-0.5 w-1 h-1 rounded-full bg-neutral-900" />
          </div>

          <span
            v-for="m in marcas"
            :key="'m' + m"
            class="text-[11px] text-neutral-400 tabular-nums -translate-y-1.5"
            :style="{ gridColumn: 1, gridRow: fila(m) }"
          >{{ hora(m) }}</span>

          <div
            class="flex items-center justify-center gap-1.5 text-xs text-neutral-400"
            :style="{ gridColumn: '2 / 7', gridRow: `${fila(RECREO.inicio)} / ${fila(RECREO.fin)}` }"
          >
            <Coffee class="w-3.5 h-3.5" /> Recreo
          </div>

          <component
            :is="b.ruta && !exportando ? RouterLink : 'div'"
            v-for="(b, i) in bloques"
            :key="i"
            :to="b.ruta"
            :title="`${b.codigo} · ${b.profe} · ${hora(b.inicio)}–${hora(b.fin)}`"
            class="rounded-lg m-0.5 px-2.5 py-2 flex flex-col gap-0.5 overflow-hidden transition-opacity duration-150 hover:opacity-80"
            :style="{
              gridColumn: b.dia + 2,
              gridRow: `${fila(b.inicio)} / ${fila(b.fin)}`,
              backgroundColor: `color-mix(in srgb, ${b.color} 12%, white)`,
            }"
          >
            <span class="text-sm font-semibold leading-tight" :style="{ color: b.color }">{{ b.codigo }}</span>
            <span class="text-xs text-neutral-600 leading-tight truncate">{{ b.profe }}</span>
          </component>
        </div>

      </div>
    </div>
  </div>
</template>
