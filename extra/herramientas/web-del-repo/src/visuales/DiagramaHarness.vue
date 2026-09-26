<script setup>
import { Diagram } from 'elastic-ui'
import { Brain, FileCode, FilePen, FolderOpen, ScrollText, ShieldCheck, SquareTerminal, User } from '@lucide/vue'

// Qué es un agente: el modelo es una caja, y el harness una caja más grande a
// su alrededor con lo que le da para trabajar, entre tú y tu proyecto.
// Colores de concepto, los mismos en todas las páginas de agentes: modelo
// violeta, harness cian.
const MODELO = '#7c3aed'
const HARNESS = '#0891b2'
const HERRAMIENTAS = [
  { texto: 'Leer archivos', icono: FileCode },
  { texto: 'Editar archivos', icono: FilePen },
  { texto: 'Ejecutar comandos', icono: SquareTerminal },
  { texto: 'Instrucciones', icono: ScrollText },
  { texto: 'Permisos', icono: ShieldCheck },
]
</script>

<template>
  <Diagram class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6" label="Un agente: el modelo dentro de un harness, que le da herramientas, instrucciones y permisos, entre tú y tu proyecto">
    <div class="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      <span class="diagram-chip diagram-in self-center" style="--diagram-color: var(--color-fg-muted)">
        <User class="size-4" :stroke-width="1.5" aria-hidden="true" />Tú
      </span>
      <span class="diagram-in self-center text-fg-faint max-sm:rotate-90" aria-hidden="true">⇄</span>
      <div class="diagram-area diagram-in flex-1" :style="{ '--diagram-color': HARNESS }">
        <span class="text-sm font-semibold">Harness <span class="font-normal text-fg-muted">· lo que le das al modelo</span></span>
        <span class="diagram-chip px-4 py-3" :style="{ '--diagram-color': MODELO }">
          <Brain class="size-5" :stroke-width="1.5" aria-hidden="true" />
          Modelo <span class="font-normal text-fg-secondary">· piensa</span>
        </span>
        <ul class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-medium sm:grid-cols-3">
          <li v-for="h in HERRAMIENTAS" :key="h.texto" class="flex items-center gap-2">
            <component :is="h.icono" class="size-4 shrink-0" :stroke-width="1.5" aria-hidden="true" />{{ h.texto }}
          </li>
        </ul>
      </div>
      <span class="diagram-in self-center text-fg-faint max-sm:rotate-90" aria-hidden="true">⇄</span>
      <span class="diagram-chip diagram-in self-center" style="--diagram-color: #ca8a04">
        <FolderOpen class="size-4" :stroke-width="1.5" aria-hidden="true" />Tu proyecto
      </span>
    </div>
  </Diagram>
</template>
