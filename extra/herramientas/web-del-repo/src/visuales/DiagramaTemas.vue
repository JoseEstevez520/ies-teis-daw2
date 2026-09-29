<script setup>
import { Diagram } from 'elastic-ui'

// Cómo cambian los temas de un canal con los años. Los datos son de ejemplo. Se
// dibuja a mano con las clases de diagrama: una línea es el tema que sube (acento),
// la otra el que baja (apagada y discontinua).
const ANOS = ['2023', '2024', '2025', '2026']
const X = [70, 200, 330, 460]
const Y = (valor) => 160 - valor * 1.4

const HOOKS = [20, 45, 70, 90]
const ESTADO = [80, 65, 45, 30]
const puntos = (serie) => serie.map((v, i) => `${X[i]},${Y(v)}`).join(' ')
</script>

<template>
  <Diagram
    label="Gráfico de líneas: los temas Hooks y Estado en el canal, con Hooks subiendo y Estado bajando entre 2023 y 2026."
    caption="Ejemplo inventado: cómo cambian los temas del canal con los años."
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    style="--diagram-color: #65a30d"
  >
    <svg class="diagram w-full" viewBox="0 0 520 200" aria-hidden="true">
      <line class="diagram-line" x1="60" y1="160" x2="480" y2="160" />
      <polyline class="diagram-quiet" :points="puntos(ESTADO)" fill="none" />
      <polyline class="diagram-emphasis" :points="puntos(HOOKS)" fill="none" />
      <circle v-for="(v, i) in HOOKS" :key="i" :cx="X[i]" :cy="Y(v)" r="3.5" style="fill: var(--diagram-color)" />
      <text class="diagram-label" x="460" y="24" text-anchor="middle">Hooks</text>
      <text class="diagram-text" x="460" y="134" text-anchor="middle">Estado</text>
      <text v-for="(a, i) in ANOS" :key="a" class="diagram-text" :x="X[i]" y="182" text-anchor="middle">{{ a }}</text>
    </svg>
  </Diagram>
</template>
