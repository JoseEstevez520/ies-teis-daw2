<script setup>
import { Diagram } from 'elastic-ui'
import { BookOpen, Brain, MessageSquare, Plug, ScrollText } from '@lucide/vue'

// Qué tiene delante el modelo cuando le pides algo, y cuánto entra de cada cosa:
// AGENTS.md entero; de las skills, el nombre (y entera la que hace falta); de
// cada MCP, lo que se puede hacer con esa conexión; y tu petición.
// Colores de concepto, los de todas las páginas de agentes: el modelo violeta
// (en el título), lo que pone el harness cian y lo tuyo gris. La caja de fuera
// no lleva tinte, solo un borde: las piezas de color van sobre la página, nunca
// un tinte dentro de otro, que se come el contraste. La forma dice
// cuánto entra: relleno es entero; punteado, solo el nombre.
const MODELO = '#7c3aed'
const HARNESS = '#0891b2'
const TU = 'var(--color-fg-muted)'

// Una skill que aún no ha cargado: solo su nombre, sin relleno.
const soloNombre = {
  '--diagram-color': HARNESS,
  background: 'transparent',
  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${HARNESS} 45%, transparent)`,
  fontWeight: 500,
}
</script>

<template>
  <Diagram
    label="Lo que tiene delante el modelo al pedirle algo: AGENTS.md entero siempre; de las skills, solo su nombre y descripción hasta que carga la que necesita, que entra entera; de cada MCP, lo que se puede hacer con esa conexión; y tu petición."
  >
    <div class="diagram-in flex flex-col gap-4 rounded-[var(--radius-xl)] border border-border p-4">
      <span class="flex items-center gap-2 text-sm font-semibold text-fg">
        <Brain class="size-4 shrink-0" :stroke-width="1.5" :style="{ color: MODELO }" aria-hidden="true" />
        Lo que tiene delante el modelo
      </span>

      <dl class="grid gap-x-4 gap-y-4 sm:grid-cols-[11rem_1fr] sm:items-start">
        <dt class="diagram-in pt-1.5 text-sm font-medium text-fg-secondary">AGENTS.md: siempre, entero</dt>
        <dd class="diagram-in flex flex-col gap-1">
          <span class="diagram-chip self-start" :style="{ '--diagram-color': HARNESS }">
            <ScrollText class="size-4" :stroke-width="1.5" aria-hidden="true" />AGENTS.md
          </span>
          <span class="text-sm text-fg-secondary">las reglas de tu proyecto</span>
        </dd>

        <dt class="diagram-in pt-1.5 text-sm font-medium text-fg-secondary">Skills: el nombre, y entera la que hace falta</dt>
        <dd class="diagram-in flex flex-col gap-1.5">
          <span class="flex flex-wrap items-center gap-2">
            <span class="diagram-chip" :style="soloNombre">
              <BookOpen class="size-4" :stroke-width="1.5" aria-hidden="true" />apuntes-web
            </span>
            <span class="diagram-chip" :style="soloNombre">…</span>
          </span>
          <!-- La que la tarea necesita: entra entera, con sus instrucciones. -->
          <span class="flex flex-col self-start rounded-[var(--radius-md)]" :style="{ background: `color-mix(in oklab, ${HARNESS} 14%, var(--color-bg))` }">
            <span class="diagram-chip" :style="{ '--diagram-color': HARNESS, background: 'transparent' }">
              <BookOpen class="size-4" :stroke-width="1.5" aria-hidden="true" />apuntes-claros
              <span class="font-normal text-fg-secondary">· cargada</span>
            </span>
            <span class="px-3 pb-2.5 text-sm leading-relaxed text-fg-secondary">
              + sus instrucciones: ir al grano, escribir para quien no sabe nada…
            </span>
          </span>
        </dd>

        <dt class="diagram-in pt-1.5 text-sm font-medium text-fg-secondary">MCP: siempre, aunque no la use</dt>
        <dd class="diagram-in flex flex-col gap-1">
          <span class="diagram-chip self-start" :style="{ '--diagram-color': HARNESS }">
            <Plug class="size-4" :stroke-width="1.5" aria-hidden="true" />context7
            <span class="font-normal text-fg-secondary">· lo que puede hacer con esa conexión</span>
          </span>
          <span class="text-sm text-fg-secondary">cada aplicación que conectas suma lo suyo</span>
        </dd>

        <dt class="diagram-in pt-1.5 text-sm font-medium text-fg-secondary">Lo tuyo: ahora</dt>
        <dd class="diagram-in">
          <span class="diagram-chip self-start" :style="{ '--diagram-color': TU }">
            <MessageSquare class="size-4" :stroke-width="1.5" aria-hidden="true" />Tu petición
          </span>
        </dd>
      </dl>
    </div>
  </Diagram>
</template>
