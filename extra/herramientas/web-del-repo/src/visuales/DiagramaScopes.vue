<script setup>
import { ref } from 'vue'
import { Button, Diagram } from 'elastic-ui'
import { RotateCcw } from '@lucide/vue'

// Singleton frente a prototype, en vivo: pide el bean en cada lado y compara
// cuántas instancias salen. Un color por concepto, el mismo en toda la página:
// singleton azul, prototype violeta.
const SINGLETON = '#2563eb'
const PROTOTYPE = '#7c3aed'

const nuevaInstancia = () => '#' + Math.random().toString(16).slice(2, 8)

const pedidosSingleton = ref([])
const pedidosPrototype = ref([])
let instanciaUnica = null

function pedirSingleton() {
  if (!instanciaUnica) instanciaUnica = nuevaInstancia()
  pedidosSingleton.value.push(instanciaUnica)
}

function pedirPrototype() {
  pedidosPrototype.value.push(nuevaInstancia())
}

function reiniciar() {
  pedidosSingleton.value = []
  pedidosPrototype.value = []
  instanciaUnica = null
}
</script>

<template>
  <Diagram
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    label="Singleton frente a prototype, en vivo. En singleton, cada vez que pides el bean recibes la misma instancia; en prototype, una instancia nueva cada vez."
  >
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between gap-3">
        <p class="text-sm text-fg-secondary">Pide el bean en cada lado y compara.</p>
        <Button variant="ghost" size="sm" :icon="RotateCcw" @click="reiniciar">Reiniciar</Button>
      </div>

      <div class="grid gap-5 sm:grid-cols-2">
        <section class="flex flex-col gap-3" :style="{ '--diagram-color': SINGLETON }">
          <header class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-sm font-semibold text-fg">
              Singleton <span class="font-normal text-fg-muted">· por defecto</span>
            </span>
            <Button size="sm" @click="pedirSingleton">Pedir el bean</Button>
          </header>
          <ul class="flex min-h-16 flex-col gap-1.5">
            <li v-for="(id, i) in pedidosSingleton" :key="i" class="diagram-chip">
              Petición {{ i + 1 }} → {{ id }}
            </li>
            <li v-if="!pedidosSingleton.length" class="text-sm text-fg-muted">
              Todavía no has pedido nada.
            </li>
          </ul>
          <p class="text-sm text-fg-secondary">
            {{ pedidosSingleton.length }} peticiones · <strong>1 instancia</strong>, siempre la misma
          </p>
        </section>

        <section class="flex flex-col gap-3" :style="{ '--diagram-color': PROTOTYPE }">
          <header class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-sm font-semibold text-fg">Prototype</span>
            <Button size="sm" @click="pedirPrototype">Pedir el bean</Button>
          </header>
          <ul class="flex min-h-16 flex-col gap-1.5">
            <li v-for="(id, i) in pedidosPrototype" :key="i" class="diagram-chip">
              Petición {{ i + 1 }} → {{ id }}
            </li>
            <li v-if="!pedidosPrototype.length" class="text-sm text-fg-muted">
              Todavía no has pedido nada.
            </li>
          </ul>
          <p class="text-sm text-fg-secondary">
            {{ pedidosPrototype.length }} peticiones ·
            <strong>{{ pedidosPrototype.length }} {{ pedidosPrototype.length === 1 ? 'instancia' : 'instancias' }}</strong>
          </p>
        </section>
      </div>
    </div>
  </Diagram>
</template>
