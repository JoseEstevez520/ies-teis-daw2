<script setup>
import { Diagram } from 'elastic-ui'

// Singleton frente a prototype: cuántas instancias crea Spring. Un color por
// concepto, el mismo en toda la página: singleton azul, prototype violeta.
const SINGLETON = '#2563eb'
const PROTOTYPE = '#7c3aed'
const CONSUMIDORES = ['PedidoController', 'PedidoService', 'FacturaService']
const PETICIONES = ['Petición 1', 'Petición 2', 'Petición 3']
</script>

<template>
  <Diagram
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    label="Singleton frente a prototype. En singleton, Spring crea una sola instancia y la comparten todos los que la piden. En prototype, cada petición recibe una instancia nueva."
  >
    <div class="grid gap-3 sm:grid-cols-2">
      <div class="diagram-area diagram-in gap-3" :style="{ '--diagram-color': SINGLETON }">
        <span class="text-sm font-semibold">
          Singleton <span class="font-normal text-fg-muted">· por defecto</span>
        </span>
        <div class="flex flex-col items-center gap-2">
          <span class="diagram-chip diagram-in px-3 py-2">Una instancia</span>
          <span class="diagram-in text-fg-faint" aria-hidden="true">↓</span>
          <ul class="flex flex-wrap justify-center gap-1.5">
            <li v-for="c in CONSUMIDORES" :key="c" class="diagram-chip diagram-in">{{ c }}</li>
          </ul>
        </div>
        <span class="text-sm text-fg-secondary">La comparten todos.</span>
      </div>

      <div class="diagram-area diagram-in gap-3" :style="{ '--diagram-color': PROTOTYPE }">
        <span class="text-sm font-semibold">Prototype</span>
        <ul class="flex flex-col gap-1.5 text-sm">
          <li v-for="(p, i) in PETICIONES" :key="p" class="flex items-center gap-2">
            <span class="text-fg-secondary">{{ p }}</span>
            <span class="text-fg-faint" aria-hidden="true">→</span>
            <span class="diagram-chip diagram-in">Instancia {{ 'ABC'[i] }}</span>
          </li>
        </ul>
        <span class="text-sm text-fg-secondary">Una nueva cada vez que se pide.</span>
      </div>
    </div>
  </Diagram>
</template>
