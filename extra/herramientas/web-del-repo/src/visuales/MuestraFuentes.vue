<script setup>
import { Diagram } from 'elastic-ui'

// La misma frase en tres caracteres distintos, para ver que la fuente cambia el tono.
const MUESTRAS = [
  { clase: 'font-sans', nombre: 'Sans', texto: 'Una sans neutra: la de siempre.' },
  { clase: 'font-serif', nombre: 'Serif', texto: 'Una serif tiene más carácter.' },
  { clase: 'font-mono', nombre: 'Mono', texto: 'Una mono, para datos y código.' },
]
</script>

<template>
  <Diagram
    label="La misma frase en tres tipos de letra: sans, serif y monoespaciada."
    caption="El mismo texto, tres caracteres distintos."
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
  >
    <div class="flex flex-col gap-4">
      <div v-for="m in MUESTRAS" :key="m.nombre" class="diagram-in">
        <span class="text-xs font-medium text-fg-muted">{{ m.nombre }}</span>
        <p :class="m.clase" class="text-xl text-fg">{{ m.texto }}</p>
      </div>
    </div>
  </Diagram>
</template>
