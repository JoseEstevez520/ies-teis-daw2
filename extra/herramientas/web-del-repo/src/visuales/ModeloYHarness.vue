<script setup>
import { computed, ref, watch } from 'vue'
import { SegmentedControl, SegmentedControlItem } from 'elastic-ui'
import { ArrowLeftRight, Brain, FileCode, FilePen, FolderOpen, ScrollText, ShieldCheck, SquareTerminal, User, X } from '@lucide/vue'

// El modelo es el cerebro; el harness es lo que le das para trabajar
// (herramientas, instrucciones, permisos) y con lo que llega a tu proyecto.
// Colores: modelo violeta, harness cian, en todas las páginas de agentes.
//
// Al pasar a "Modelo + harness" no aparece un dibujo nuevo: el harness crece
// alrededor del modelo, que se queda donde estaba.

const MODELO = '#7c3aed'
const HARNESS = '#0891b2'

const HERRAMIENTAS = [
  { icono: FileCode, texto: 'Leer archivos' },
  { icono: FilePen, texto: 'Editar archivos' },
  { icono: SquareTerminal, texto: 'Ejecutar comandos' },
  { icono: ScrollText, texto: 'Instrucciones' },
  { icono: ShieldCheck, texto: 'Permisos' },
]

const modo = ref('harness')
const conHarness = computed(() => modo.value === 'harness')

// Lo que se ve al cargar simplemente está; solo se anima lo que cambia el usuario.
const cambiado = ref(false)
watch(modo, () => (cambiado.value = true))

const tinte = (color, porcentaje) => `color-mix(in oklab, ${color} ${porcentaje}%, var(--color-bg))`
</script>

<template>
  <div class="flex flex-col gap-6">
    <SegmentedControl v-model="modo" label="Qué ver">
        <SegmentedControlItem value="modelo">Solo el modelo</SegmentedControlItem>
        <SegmentedControlItem value="harness">Modelo + harness</SegmentedControlItem>
    </SegmentedControl>

    <div class="flex flex-col items-stretch gap-4 md:flex-row md:items-center">
      <div class="flex items-center justify-center gap-2 md:w-16 md:flex-col">
        <User class="size-5 text-fg" />
        <span class="text-sm font-medium text-fg">Tú</span>
      </div>

      <ArrowLeftRight class="size-4 shrink-0 self-center text-fg-faint max-md:rotate-90" />

      <!-- El harness: una zona de su color alrededor del modelo que se abre hacia abajo. -->
      <div
        class="flex-1 rounded-[var(--radius-xl)] p-3 transition-[background-color] duration-[450ms] ease-emphasized motion-reduce:transition-none"
        :style="{ backgroundColor: conHarness ? tinte(HARNESS, 10) : 'transparent' }"
      >
        <div class="flex items-center gap-3 rounded-[var(--radius-lg)] px-4 py-4" :style="{ backgroundColor: tinte(MODELO, 12) }">
          <Brain class="size-6 shrink-0" :style="{ color: MODELO }" />
          <div class="flex flex-col">
            <span class="text-sm font-semibold" :style="{ color: MODELO }">Modelo</span>
            <span class="text-xs text-fg-secondary">el cerebro: piensa</span>
          </div>
        </div>

        <div
          class="grid transition-[grid-template-rows] ease-emphasized motion-reduce:transition-none"
          :class="conHarness ? 'grid-rows-[1fr] duration-[450ms]' : 'grid-rows-[0fr] delay-100 duration-300'"
        >
          <div class="overflow-hidden">
            <Transition leave-active-class="animate-content-out">
              <div v-if="conHarness" class="flex flex-col gap-3 px-1 pt-4 pb-1" :class="cambiado && 'stagger-children'">
                <p class="text-xs font-semibold" :style="{ color: HARNESS }">Harness: lo que le das al modelo</p>
                <ul class="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3" :class="cambiado && 'stagger-items'">
                  <li v-for="h in HERRAMIENTAS" :key="h.texto" class="flex items-center gap-2 text-xs font-medium text-fg">
                    <component :is="h.icono" class="size-4 shrink-0" :style="{ color: HARNESS }" />
                    {{ h.texto }}
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <!-- Cambian sin animarse: lo que manda es el harness abriéndose. -->
      <ArrowLeftRight v-if="conHarness" class="size-4 shrink-0 self-center max-md:rotate-90" :style="{ color: HARNESS }" />
      <X v-else class="size-4 shrink-0 self-center text-fg-faint" />

      <div
        class="flex items-center justify-center gap-2 transition-colors duration-300 md:w-20 md:flex-col"
        :class="conHarness ? 'text-fg' : 'text-fg-faint'"
      >
        <FolderOpen class="size-5" />
        <span class="text-center text-sm font-medium">Tu proyecto</span>
      </div>
    </div>

    <p
      :key="modo"
      class="text-sm leading-relaxed text-fg-secondary"
      :class="cambiado && 'animate-[blur-in_0.45s_var(--ease-soft)] motion-reduce:animate-none'"
    >
      <template v-if="!conHarness">
        Te contesta con texto. Copiar, pegar y ejecutar lo haces tú. Es el chat de ChatGPT o Claude.
      </template>
      <template v-else>
        Con un harness, el modelo trabaja directamente en tu proyecto. Eso es un
        <strong class="font-semibold text-fg">agente</strong>.
      </template>
    </p>
  </div>
</template>
