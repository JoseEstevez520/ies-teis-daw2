<script setup>
import { Diagram } from 'elastic-ui'
import { FolderOpen, User } from '@lucide/vue'

// Cómo funciona el sistema: tú hablas con tu app, dentro van los agentes, y todo se
// guarda en un vault de Markdown. Colores de concepto de las páginas de agentes:
// modelo violeta, harness cian.
const MODELO = '#7c3aed'
const HARNESS = '#0891b2'
const AGENTES = ['Research', 'Oportunidades', 'Trayectoria']
</script>

<template>
  <Diagram
    label="El sistema: tú hablas con tu app, que lleva los agentes de research, oportunidades y trayectoria, y todo se guarda en un vault de Markdown."
    caption="Tú, los agentes dentro de tu app y el vault de Markdown."
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
  >
    <div class="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      <span class="diagram-chip diagram-in self-center" style="--diagram-color: var(--color-fg-muted)">
        <User class="size-4" :stroke-width="1.5" aria-hidden="true" />Tú
      </span>
      <span class="diagram-in self-center text-fg-faint max-sm:rotate-90" aria-hidden="true">⇄</span>
      <div class="diagram-area diagram-in flex-1" :style="{ '--diagram-color': HARNESS }">
        <span class="text-sm font-semibold">Tu app <span class="font-normal text-fg-muted">· agentes en Python</span></span>
        <ul class="grid grid-cols-1 gap-2 text-sm font-medium sm:grid-cols-3">
          <li v-for="a in AGENTES" :key="a" class="diagram-chip" :style="{ '--diagram-color': MODELO }">{{ a }}</li>
        </ul>
      </div>
      <span class="diagram-in self-center text-fg-faint max-sm:rotate-90" aria-hidden="true">→</span>
      <span class="diagram-chip diagram-in self-center" style="--diagram-color: #ca8a04">
        <FolderOpen class="size-4" :stroke-width="1.5" aria-hidden="true" />Vault · Markdown
      </span>
    </div>
  </Diagram>
</template>
