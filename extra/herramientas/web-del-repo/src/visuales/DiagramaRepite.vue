<script setup>
import { Diagram } from 'elastic-ui'

// Un gráfico de barras de lo que más se repite en los relatos. Los datos son de
// ejemplo; el dibujo enseña cómo se leería el resultado. Se dibuja a mano, con las
// clases de diagrama de la librería (tinte para la barra, sin bordes).
const DATOS = [
  { label: 'Luz o túnel', valor: 68 },
  { label: 'Paz y calma', valor: 54 },
  { label: 'Ver a familiares', valor: 41 },
  { label: 'Revisión de la vida', valor: 33 },
  { label: 'Salir del cuerpo', valor: 22 },
]
const FILAS = [8, 44, 80, 116, 152]
const ancho = (valor) => (valor / 100) * 300
</script>

<template>
  <Diagram
    label="Gráfico de barras: los temas que más se repiten en los relatos, con Luz o túnel en cabeza."
    caption="Ejemplo inventado: temas que más se repiten en una muestra de relatos."
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    style="--diagram-color: #65a30d"
  >
    <svg class="diagram w-full" viewBox="0 0 520 190" aria-hidden="true">
      <g v-for="(d, i) in DATOS" :key="d.label">
        <text class="diagram-label" x="150" :y="FILAS[i] + 18" text-anchor="end">{{ d.label }}</text>
        <rect class="diagram-part" x="162" :y="FILAS[i]" :width="ancho(d.valor)" height="26" rx="6" />
        <text class="diagram-text" :x="162 + ancho(d.valor) + 8" :y="FILAS[i] + 18">{{ d.valor }}%</text>
      </g>
    </svg>
  </Diagram>
</template>
