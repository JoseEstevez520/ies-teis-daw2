<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
import { Brain, Pause, Play, RotateCcw, User, Wrench } from '@lucide/vue'

// La misma petición, con y sin harness. Sin harness el modelo solo puede
// contestar texto; con harness, el modelo piensa y el harness hace, en bucle.
// Colores: modelo violeta, harness cian, en toda la página.

const COLOR = { modelo: '#7c3aed', harness: '#0891b2', tu: '#171717' }

const PETICION = 'Arregla el error del formulario de registro'

const SOLO_MODELO = [
  { quien: 'tu', texto: PETICION },
  {
    quien: 'modelo',
    texto: 'No puedo ver tu proyecto. Pégame el código del formulario y el error, y te digo qué cambiar.',
  },
  { quien: 'tu', texto: '(copias el código, lo pegas, copias la respuesta, la pegas en tu archivo, lo pruebas...)' },
]

const CON_HARNESS = [
  { quien: 'tu', texto: PETICION },
  { quien: 'harness', texto: 'Busca y lee RegistroForm.vue. Se lo pasa al modelo.' },
  { quien: 'modelo', texto: 'No se valida el email. Antes de tocar nada: ejecuta los tests.' },
  { quien: 'harness', texto: 'Ejecuta npm test → 1 test falla: "email inválido aceptado". Se lo pasa.' },
  { quien: 'modelo', texto: 'Confirmado. Cambia la validación del campo email así: …' },
  { quien: 'harness', texto: 'Edita RegistroForm.vue y vuelve a ejecutar los tests → todos pasan.' },
  { quien: 'modelo', texto: 'Listo: el email se valida y los tests pasan.' },
]

const QUIEN = {
  tu: { etiqueta: 'Tú', icono: User },
  modelo: { etiqueta: 'Modelo', icono: Brain, nota: 'piensa' },
  harness: { etiqueta: 'Harness', icono: Wrench, nota: 'hace' },
}

const modo = ref('harness')
const mensajes = computed(() => (modo.value === 'harness' ? CON_HARNESS : SOLO_MODELO))
const visibles = ref(CON_HARNESS.length)

function cambiarModo(m) {
  parar()
  modo.value = m
  visibles.value = mensajes.value.length
}

const reproduciendo = ref(false)
let temporizador = null
function reproducir() {
  if (reproduciendo.value) return parar()
  visibles.value = 1
  reproduciendo.value = true
  temporizador = setInterval(() => {
    if (visibles.value >= mensajes.value.length) return parar()
    visibles.value++
  }, 1400)
}
function parar() {
  reproduciendo.value = false
  clearInterval(temporizador)
}
onBeforeUnmount(parar)

const vueltas = computed(() => CON_HARNESS.filter((m) => m.quien === 'harness').length)
</script>

<template>
  <div class="rounded-xl border border-neutral-200 bg-white overflow-hidden">
    <!-- Selector -->
    <div class="flex border-b border-neutral-200 bg-neutral-50 p-1.5 gap-1.5">
      <button
        v-for="m in [
          { id: 'modelo', texto: 'Solo el modelo' },
          { id: 'harness', texto: 'Modelo + harness' },
        ]"
        :key="m.id"
        type="button"
        @click="cambiarModo(m.id)"
        class="flex-1 rounded-lg px-3 py-2 text-sm transition-colors duration-150"
        :class="modo === m.id ? 'bg-white border border-neutral-200 text-neutral-900 font-medium' : 'text-neutral-500 hover:text-neutral-900'"
      >
        {{ m.texto }}
      </button>
    </div>

    <div class="p-5 flex flex-col gap-4">
      <!-- Conversación -->
      <div class="flex flex-col gap-2 min-h-72">
        <AnimatePresence>
          <motion.div
            v-for="(m, i) in mensajes.slice(0, visibles)"
            :key="modo + i"
            :initial="{ opacity: 0, y: 6 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.2 }"
            class="flex gap-3 items-start"
            :class="m.quien === 'harness' ? 'sm:pl-16' : m.quien === 'modelo' ? 'sm:pr-16' : ''"
          >
            <span
              class="flex items-center gap-1.5 shrink-0 w-24 pt-2 text-xs font-medium"
              :style="{ color: COLOR[m.quien] }"
            >
              <component :is="QUIEN[m.quien].icono" class="w-3.5 h-3.5" />
              {{ QUIEN[m.quien].etiqueta }}
            </span>
            <p
              class="flex-1 rounded-lg border-l-2 px-3 py-2 text-sm leading-relaxed"
              :class="m.quien === 'tu' ? 'bg-neutral-100 text-neutral-900' : 'bg-neutral-50 text-neutral-800'"
              :style="{ borderColor: COLOR[m.quien] }"
            >
              {{ m.texto }}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <!-- Conclusión del modo -->
      <p class="text-sm text-neutral-700 leading-relaxed border-t border-neutral-200 pt-4">
        <template v-if="modo === 'modelo'">
          El modelo solo recibe texto y devuelve texto. <strong class="text-neutral-900">Las manos las pones tú</strong>:
          copiar, pegar, ejecutar, volver a preguntar.
        </template>
        <template v-else>
          <span :style="{ color: COLOR.modelo }" class="font-medium">El modelo piensa</span> y
          <span :style="{ color: COLOR.harness }" class="font-medium">el harness hace</span>, pasándose el
          resultado {{ vueltas }} veces hasta acabar. Tú solo pides y revisas.
        </template>
      </p>

      <div class="flex justify-end">
        <button
          type="button"
          @click="reproducir"
          class="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50"
        >
          <component :is="reproduciendo ? Pause : visibles >= mensajes.length ? RotateCcw : Play" class="w-3.5 h-3.5" />
          {{ reproduciendo ? 'Pausar' : 'Verlo paso a paso' }}
        </button>
      </div>
    </div>
  </div>
</template>
