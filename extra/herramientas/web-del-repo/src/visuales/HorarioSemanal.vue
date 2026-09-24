<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Button, SegmentedControl, SegmentedControlItem, TextMorph, Tooltip } from 'elastic-ui'
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
const lienzo = ref(null)
const exportando = ref(false)
const d = new Date().getDay()
const hoy = d >= 1 && d <= 5 ? d - 1 : -1

// En el móvil no caben cinco columnas: se ve un día, con pestañas para
// cambiar (empieza en hoy). El PNG siempre lleva la semana entera.
const consulta = window.matchMedia('(max-width: 639px)')
const esMovil = ref(consulta.matches)
const alCambiar = (e) => (esMovil.value = e.matches)
consulta.addEventListener('change', alCambiar)
onBeforeUnmount(() => consulta.removeEventListener('change', alCambiar))
const diaMovil = ref(hoy === -1 ? 0 : hoy)
// SegmentedControl trabaja con cadenas.
const pestanaMovil = computed({
  get: () => String(diaMovil.value),
  set: (v) => (diaMovil.value = Number(v)),
})

// Una línea en la columna de hoy a la hora que es, si estás en horario de clase.
const ahora = ref(minutosDesdeInicio())
function minutosDesdeInicio() {
  const n = new Date()
  return n.getHours() * 60 + n.getMinutes() - (8 * 60 + 10)
}
const reloj = setInterval(() => (ahora.value = minutosDesdeInicio()), 60_000)
onBeforeUnmount(() => clearInterval(reloj))
const lineaAhora = computed(() => {
  if (hoy === -1 || !dias.value.includes(hoy) || ahora.value < 0 || ahora.value >= FIN_DIA) return null
  return {
    gridColumn: columna(hoy),
    gridRow: Math.floor(ahora.value / MIN_POR_FILA) + 2,
    translate: `0 ${((ahora.value % MIN_POR_FILA) / MIN_POR_FILA) * 11}px`,
  }
})

// El texto de cada bloque en su color, pero mezclado con el del tema para que
// se lea igual de bien en claro y en oscuro.
const colorTexto = (color) => `color-mix(in oklab, ${color} 75%, var(--color-fg))`
const colorFondo = (color) => `color-mix(in oklab, ${color} 14%, var(--color-bg))`

const dias = computed(() => (esMovil.value && !exportando.value ? [diaMovil.value] : [0, 1, 2, 3, 4]))
const columna = (dia) => dias.value.indexOf(dia) + 2
const bloquesVisibles = computed(() => bloques.filter((b) => dias.value.includes(b.dia)))

// Descarga como PNG: solo la tabla y la leyenda, sin el botón ni la marca de
// hoy (una imagen guardada no debería decir qué día era al guardarla).
async function descargar() {
  exportando.value = true
  try {
    const { toPng } = await import('html-to-image')
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
  <div class="flex flex-col gap-3">
    <div class="flex items-center justify-between gap-3">
      <p class="flex items-center gap-1.5 text-sm text-fg-muted">
        <MapPin class="w-3.5 h-3.5 shrink-0" />
        Todas en el Taller Inf 2
      </p>
      <Button variant="ghost" size="sm" :icon="Download" :disabled="exportando" @click="descargar">
        <TextMorph :text="exportando ? 'Generando…' : 'Descargar PNG'" />
      </Button>
    </div>

    <SegmentedControl v-model="pestanaMovil" label="Día" class="sm:hidden">
        <SegmentedControlItem v-for="(dia, i) in DIAS" :key="dia" :value="String(i)" class="px-3">
          {{ dia.slice(0, 3) }}<span v-if="i === hoy" class="ml-0.5 text-fg-faint">·</span>
        </SegmentedControlItem>
    </SegmentedControl>

    <div class="overflow-x-auto scrollbar-subtle">
      <div
        ref="lienzo"
        class="flex flex-col gap-5 bg-bg py-2 sm:min-w-[640px]"
        :style="exportando ? { width: '760px' } : undefined"
      >
        <!-- Solo sale en el PNG, que no tiene el título de la página -->
        <p v-if="exportando" class="text-base font-semibold text-fg">Horario · CSDAW 2º</p>

        <div
          class="grid gap-x-1"
          :style="{
            gridTemplateColumns: `44px repeat(${dias.length}, 1fr)`,
            gridTemplateRows: `28px repeat(${FIN_DIA / MIN_POR_FILA}, 11px)`,
          }"
        >
          <div
            v-for="i in dias"
            :key="DIAS[i]"
            class="text-sm text-center"
            :class="i === hoy && !exportando ? 'text-fg font-semibold' : 'text-fg-muted'"
            :style="{ gridColumn: columna(i), gridRow: 1 }"
          >
            {{ DIAS[i] }}
            <span v-if="i === hoy && !exportando" class="block mx-auto mt-0.5 w-1 h-1 rounded-full bg-fg" />
          </div>

          <span
            v-for="m in marcas"
            :key="'m' + m"
            class="text-[11px] text-fg-faint tabular-nums -translate-y-1.5"
            :style="{ gridColumn: 1, gridRow: fila(m) }"
          >{{ hora(m) }}</span>

          <div
            class="flex items-center justify-center gap-1.5 text-xs text-fg-faint"
            :style="{ gridColumn: `2 / ${dias.length + 2}`, gridRow: `${fila(RECREO.inicio)} / ${fila(RECREO.fin)}` }"
          >
            <Coffee class="w-3.5 h-3.5" /> Recreo
          </div>

          <Tooltip
            v-for="(b, i) in bloquesVisibles"
            :key="i"
            :content="`${b.codigo} · ${b.profe} · ${hora(b.inicio)}–${hora(b.fin)}`"
            :disabled="exportando"
          >
            <component
              :is="b.ruta && !exportando ? RouterLink : 'div'"
              :to="b.ruta"
              class="m-0.5 flex flex-col gap-0.5 overflow-hidden rounded-[var(--radius-md)] px-2.5 py-2 transition-opacity duration-150 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-accent"
              :style="{
                gridColumn: columna(b.dia),
                gridRow: `${fila(b.inicio)} / ${fila(b.fin)}`,
                backgroundColor: colorFondo(b.color),
              }"
            >
              <span class="text-sm leading-tight font-semibold" :style="{ color: colorTexto(b.color) }">{{ b.codigo }}</span>
              <span class="mask-fade-r text-xs leading-tight whitespace-nowrap text-fg-secondary">{{ b.profe }}</span>
            </component>
          </Tooltip>

          <!-- La hora que es, sobre la columna de hoy. No sale en el PNG. -->
          <div
            v-if="lineaAhora && !exportando"
            aria-hidden="true"
            class="pointer-events-none relative z-10 mx-0.5 h-px self-start bg-fg"
            :style="lineaAhora"
          >
            <span class="absolute -top-[3px] -left-1 size-[7px] rounded-full bg-fg" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
