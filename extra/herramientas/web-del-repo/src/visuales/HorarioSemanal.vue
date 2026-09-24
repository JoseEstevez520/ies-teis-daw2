<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Coffee, Download, MapPin } from '@lucide/vue'

// Horario de 2º DAW, sacado de la foto oficial (horario/horario.jpg). Cada
// bloque ocupa lo que dura de verdad: sesiones de 50 min desde las 8:10, con
// el recreo de 11:30 a 12:00. Todas las clases son en el Taller Inf 2.

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']

// Sesiones: 0-3 por la mañana, 4-7 después del recreo.
const INICIO_SESION = [0, 50, 100, 150, 230, 280, 330, 380] // minutos desde las 8:10
const FIN_DIA = 430 // 15:20
const RECREO = { inicio: 200, fin: 230 }

const MODULOS = {
  DWCS: { profe: 'Patricia', color: '#e11d48', ruta: '/modulos/dwcs' },
  DWCC: { profe: 'Juan', color: '#4f46e5', ruta: '/modulos/dwcc' },
  DIW: { profe: 'Juan Carlos', color: '#0d9488', ruta: '/modulos/diw' },
  DAW: { profe: 'Marta', color: '#ca8a04', ruta: '/modulos/daw' },
  IPEII: { profe: 'Adelina (FOL)', color: '#16a34a' },
  HCLE: { profe: 'Elvira (Inglés)', color: '#2563eb' },
  DASP: { profe: 'Marcos Alonso', color: '#65a30d', ruta: '/modulos/dasp' },
  ACP: { profe: 'Iago', color: '#ea580c' },
}

// [día, módulo, primera sesión, nº de sesiones]
const CLASES = [
  [0, 'IPEII', 0, 2], [0, 'DAW', 2, 2], [0, 'DIW', 4, 2], [0, 'DASP', 6, 1],
  [1, 'DWCC', 0, 3], [1, 'DIW', 3, 1], [1, 'DIW', 4, 1], [1, 'DWCS', 5, 2],
  [2, 'DIW', 0, 2], [2, 'DWCS', 2, 2], [2, 'DWCS', 4, 1], [2, 'DAW', 5, 2],
  [3, 'DWCC', 0, 2], [3, 'DIW', 2, 2], [3, 'ACP', 4, 1], [3, 'HCLE', 5, 1], [3, 'DWCS', 6, 2],
  [4, 'DWCS', 0, 3], [4, 'HCLE', 3, 1], [4, 'DWCC', 4, 3],
]

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

const leyenda = Object.entries(MODULOS)
  .map(([codigo, m]) => ({
    codigo,
    ...m,
    sesiones: CLASES.filter((c) => c[1] === codigo).reduce((t, c) => t + c[3], 0),
  }))
  .sort((a, b) => b.sesiones - a.sesiones)

// Marca de "ahora": día de hoy y línea con la hora actual si estás en horario.
const ahora = ref(new Date())
let reloj = null
onMounted(() => (reloj = setInterval(() => (ahora.value = new Date()), 60_000)))
onBeforeUnmount(() => clearInterval(reloj))
const hoy = computed(() => {
  const d = ahora.value.getDay()
  return d >= 1 && d <= 5 ? d - 1 : -1
})
const minutoAhora = computed(() => {
  const m = ahora.value.getHours() * 60 + ahora.value.getMinutes() - (8 * 60 + 10)
  return hoy.value !== -1 && m >= 0 && m <= FIN_DIA ? m : null
})

// Descarga como PNG: solo la tabla y la leyenda, sin el botón ni la marca de
// "ahora" (una imagen guardada no debería decir qué hora era al guardarla).
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
      <p class="flex items-center gap-1.5 text-sm text-neutral-600">
        <MapPin class="w-3.5 h-3.5 shrink-0" />
        Todas las clases en el Taller Inf 2
      </p>
      <button
        type="button"
        @click="descargar"
        :disabled="exportando"
        class="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
      >
        <Download class="w-3.5 h-3.5" />
        {{ exportando ? 'Generando…' : 'Descargar PNG' }}
      </button>
    </div>

    <div class="overflow-x-auto rounded-xl border border-neutral-200">
      <div ref="lienzo" class="min-w-[680px] bg-white p-4 flex flex-col gap-4">
        <!-- Solo sale en el PNG, que no tiene el título de la página -->
        <div v-if="exportando" class="flex items-baseline justify-between px-1">
          <p class="text-lg font-semibold text-neutral-900">Horario · CSDAW 2º</p>
          <p class="text-xs text-neutral-500">IES de Teis · Taller Inf 2</p>
        </div>

        <div
          class="grid gap-x-1.5 relative"
          :style="{
            gridTemplateColumns: '52px repeat(5, 1fr)',
            gridTemplateRows: `32px repeat(${FIN_DIA / MIN_POR_FILA}, 11px)`,
          }"
        >
          <!-- Cabecera -->
          <div
            v-for="(d, i) in DIAS"
            :key="d"
            class="flex items-center justify-center rounded-md text-sm"
            :class="i === hoy && !exportando ? 'bg-neutral-900 text-white font-medium' : 'text-neutral-700 font-medium'"
            :style="{ gridColumn: i + 2, gridRow: 1 }"
          >
            {{ d }}
          </div>

          <!-- Horas y líneas de cada sesión -->
          <template v-for="m in marcas" :key="'m' + m">
            <span
              class="text-[11px] text-neutral-500 tabular-nums -translate-y-1.5"
              :style="{ gridColumn: 1, gridRow: fila(m) }"
            >{{ hora(m) }}</span>
            <div class="border-t border-neutral-100 pointer-events-none" :style="{ gridColumn: '2 / 7', gridRow: fila(m) }" />
          </template>

          <!-- Recreo -->
          <div
            class="flex items-center justify-center gap-1.5 rounded-md bg-neutral-50 text-xs text-neutral-500 my-0.5"
            :style="{ gridColumn: '2 / 7', gridRow: `${fila(RECREO.inicio)} / ${fila(RECREO.fin)}` }"
          >
            <Coffee class="w-3.5 h-3.5" /> Recreo
          </div>

          <!-- Clases -->
          <component
            :is="b.ruta && !exportando ? RouterLink : 'div'"
            v-for="(b, i) in bloques"
            :key="i"
            :to="b.ruta"
            :title="`${b.codigo} · ${b.profe} · ${hora(b.inicio)}–${hora(b.fin)}`"
            class="relative z-[1] rounded-md my-0.5 px-2.5 py-1.5 flex flex-col overflow-hidden border-l-[3px] transition-[filter] duration-150 hover:brightness-95"
            :style="{
              gridColumn: b.dia + 2,
              gridRow: `${fila(b.inicio)} / ${fila(b.fin)}`,
              backgroundColor: `color-mix(in srgb, ${b.color} 8%, white)`,
              borderColor: b.color,
            }"
          >
            <span class="text-sm font-semibold leading-tight" :style="{ color: b.color }">{{ b.codigo }}</span>
            <span class="text-xs text-neutral-700 leading-tight truncate">{{ b.profe }}</span>
            <span v-if="b.n > 1" class="text-[11px] text-neutral-500 tabular-nums mt-auto">
              {{ hora(b.inicio) }} – {{ hora(b.fin) }}
            </span>
          </component>

          <!-- Ahora -->
          <div
            v-if="minutoAhora !== null && !exportando"
            class="relative pointer-events-none z-10"
            :style="{ gridColumn: hoy + 2, gridRow: fila(Math.floor(minutoAhora / MIN_POR_FILA) * MIN_POR_FILA) }"
          >
            <div
              class="absolute inset-x-0 border-t-2 border-neutral-900"
              :style="{ top: ((minutoAhora % MIN_POR_FILA) / MIN_POR_FILA) * 100 + '%' }"
            >
              <span class="absolute -left-1 -top-[5px] w-2 h-2 rounded-full bg-neutral-900" />
            </div>
          </div>
        </div>

        <!-- Leyenda -->
        <div class="grid grid-cols-4 gap-x-4 gap-y-2 border-t border-neutral-100 pt-3">
          <div v-for="m in leyenda" :key="m.codigo" class="flex items-start gap-2 min-w-0">
            <span class="w-2 h-2 rounded-full shrink-0 mt-1.5" :style="{ backgroundColor: m.color }" />
            <div class="flex flex-col min-w-0">
              <span class="text-xs font-semibold text-neutral-900">
                {{ m.codigo }} <span class="font-normal text-neutral-500">· {{ m.sesiones }} h/sem</span>
              </span>
              <span class="text-[11px] text-neutral-500 truncate">{{ m.profe }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
