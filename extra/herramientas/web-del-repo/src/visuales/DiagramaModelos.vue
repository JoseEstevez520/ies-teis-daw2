<script setup>
import { Diagram } from 'elastic-ui'

// Calidad frente a coste con modelos reales. La calidad es casi la misma y el
// coste por tarea se lleva hasta 160 veces. Datos de AgentMarketCap (abril de
// 2026), sobre 2 millones de tokens por tarea; cambian a menudo.
const MODELOS = [
  { nombre: 'DeepSeek V4 Pro', calidad: 79.3, coste: 0.2, lx: 0, ly: 26, anchor: 'middle' },
  { nombre: 'Qwen3.5', calidad: 80.2, coste: 0.46, lx: 0, ly: 26, anchor: 'middle' },
  { nombre: 'MiniMax M2.5', calidad: 80.6, coste: 1.31, lx: 0, ly: -14, anchor: 'middle' },
  { nombre: 'Gemini 3.1 Pro', calidad: 80.8, coste: 11, lx: -10, ly: -12, anchor: 'end' },
  { nombre: 'GPT-5.4', calidad: 80.6, coste: 18, lx: 0, ly: 26, anchor: 'middle' },
  { nombre: 'Claude Opus 4.6', calidad: 80.8, coste: 74, lx: -4, ly: -14, anchor: 'middle' },
]

const MODELO = '#7c3aed'
const x0 = 96
const x1 = 664
const y0 = 44
const y1 = 330
const COSTE_MIN = 0.1
const COSTE_MAX = 100
const CAL_MIN = 78
const CAL_MAX = 82

const px = (coste) =>
  x0 + ((Math.log10(coste) - Math.log10(COSTE_MIN)) / (Math.log10(COSTE_MAX) - Math.log10(COSTE_MIN))) * (x1 - x0)
const py = (calidad) => y1 - ((calidad - CAL_MIN) / (CAL_MAX - CAL_MIN)) * (y1 - y0)

const TICKS_X = [0.1, 1, 10, 100]
const TICKS_Y = [78, 79, 80, 81, 82]
</script>

<template>
  <Diagram
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    caption="Calidad frente a coste por tarea resuelta. Datos: AgentMarketCap, abril de 2026."
    label="Gráfica de calidad frente a coste. Seis modelos reales dan casi la misma calidad (en torno al 80% en SWE-bench), pero resolver una tarea cuesta desde veinte céntimos hasta setenta y cuatro dólares: hasta 370 veces más."
  >
    <svg viewBox="0 0 720 420" class="diagram w-full" aria-hidden="true">
      <line
        class="diagram-grid"
        v-for="t in TICKS_X"
        :key="`gx${t}`"
        :x1="px(t)"
        y1="44"
        :x2="px(t)"
        y2="330"
        :style="{ stroke: 'var(--color-border-strong)', opacity: '0.55' }"
      />
      <line
        class="diagram-grid"
        v-for="t in TICKS_Y"
        :key="`gy${t}`"
        x1="96"
        :y1="py(t)"
        x2="664"
        :y2="py(t)"
        :style="{ stroke: 'var(--color-border-strong)', opacity: '0.55' }"
      />

      <line class="diagram-line" x1="96" y1="44" x2="96" y2="330" />
      <line class="diagram-line" x1="96" y1="330" x2="664" y2="330" />

      <text class="diagram-text" v-for="t in TICKS_X" :key="`tx${t}`" :x="px(t)" y="350" text-anchor="middle">{{ t }}</text>
      <text class="diagram-text" v-for="t in TICKS_Y" :key="`ty${t}`" x="86" :y="py(t) + 4" text-anchor="end">{{ t }}%</text>

      <circle
        class="diagram-in"
        v-for="m in MODELOS"
        :key="m.nombre"
        :cx="px(m.coste)"
        :cy="py(m.calidad)"
        r="6"
        :style="{ fill: MODELO }"
      />
      <text
        class="diagram-label"
        v-for="m in MODELOS"
        :key="`l${m.nombre}`"
        :x="px(m.coste) + m.lx"
        :y="py(m.calidad) + m.ly"
        :text-anchor="m.anchor"
        :style="{ '--diagram-color': MODELO }"
      >{{ m.nombre }}</text>

      <text class="diagram-text" x="380" y="404" text-anchor="middle">coste por tarea resuelta, en dólares (escala logarítmica) →</text>
      <text class="diagram-text" x="44" y="187" transform="rotate(-90 44 187)" text-anchor="middle">calidad · SWE-bench Verified (%)</text>
    </svg>
  </Diagram>
</template>
