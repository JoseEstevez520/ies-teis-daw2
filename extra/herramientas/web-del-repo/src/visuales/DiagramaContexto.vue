<script setup>
import { Diagram } from 'elastic-ui'
import { BookOpen, Brain, Check, MessageSquare, Minus, Plug, ScrollText } from '@lucide/vue'

// Qué tiene delante el modelo cuando le pides algo, y cuánto entra de cada cosa.
// Como el dibujo del equipo de agentes (DiagramaAgentes.vue): cada pieza es un
// tinte de su color directamente sobre la página, con el texto normal encima;
// nada de tinte sobre tinte, que se come el contraste. Colores de concepto: el
// modelo violeta, lo que pone el harness cian y lo tuyo gris.
const MODELO = '#7c3aed'
const HARNESS = '#0891b2'
const TU = 'var(--color-fg-muted)'

const PIEZAS = [
  { nombre: 'AGENTS.md', icono: ScrollText, color: HARNESS, cuando: 'siempre, entero', texto: 'Las reglas de tu proyecto.' },
  {
    nombre: 'Skills',
    icono: BookOpen,
    color: HARNESS,
    cuando: 'solo lo que hace falta',
    skills: [
      { nombre: 'apuntes-claros', entra: 'entera: la tarea es escribir un apunte', cargada: true },
      { nombre: 'apuntes-web', entra: 'solo su nombre y descripción', cargada: false },
    ],
  },
  {
    nombre: 'MCP',
    icono: Plug,
    color: HARNESS,
    cuando: 'siempre, aunque no lo use',
    texto: 'De context7, lo que puede hacer con esa conexión. Cada aplicación que conectas suma lo suyo.',
  },
  { nombre: 'Tu petición', icono: MessageSquare, color: TU, cuando: 'ahora', texto: 'Lo que le acabas de pedir.' },
]
</script>

<template>
  <Diagram
    label="Lo que tiene delante el modelo al pedirle algo: AGENTS.md entero, siempre; de las skills, entera solo la que hace falta y del resto el nombre y la descripción; de cada MCP, lo que puede hacer con esa conexión; y tu petición."
  >
    <div class="flex flex-col items-center gap-2">
      <span class="diagram-chip diagram-in px-4 py-2.5" :style="{ '--diagram-color': MODELO }">
        <Brain class="size-5" :stroke-width="1.5" aria-hidden="true" />
        Lo que tiene delante el modelo
      </span>

      <!-- Del modelo a cada pieza: en ancho, un reparto a las dos columnas; en el móvil, una flecha. -->
      <svg viewBox="0 0 100 20" preserveAspectRatio="none" class="diagram diagram-in hidden h-6 w-full sm:block" aria-hidden="true">
        <path class="diagram-line" d="M50 0 V8 M25 20 V8 H75 V20" />
      </svg>
      <span class="diagram-in text-fg-faint sm:hidden" aria-hidden="true">↓</span>

      <div class="grid w-full gap-3 sm:grid-cols-2">
        <div v-for="p in PIEZAS" :key="p.nombre" class="diagram-area diagram-in gap-2" :style="{ '--diagram-color': p.color }">
          <span class="flex items-center gap-2 text-sm font-semibold">
            <component :is="p.icono" class="size-4 shrink-0" :stroke-width="1.5" aria-hidden="true" />
            {{ p.nombre }}
            <span class="font-normal text-fg-secondary">· {{ p.cuando }}</span>
          </span>
          <span v-if="p.texto" class="text-sm text-fg-secondary">{{ p.texto }}</span>
          <ul v-else class="flex flex-col gap-1 text-sm">
            <li v-for="s in p.skills" :key="s.nombre" class="flex items-start gap-1.5">
              <component
                :is="s.cargada ? Check : Minus"
                class="mt-0.5 size-4 shrink-0"
                :class="s.cargada ? '' : 'text-fg-muted'"
                :stroke-width="2"
                aria-hidden="true"
              />
              <span :class="s.cargada ? 'text-fg' : 'text-fg-secondary'">
                <span class="font-medium">{{ s.nombre }}</span>: {{ s.entra }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Diagram>
</template>
