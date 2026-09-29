<script setup>
import { Diagram } from 'elastic-ui'
import { GraduationCap, Plug, User } from '@lucide/vue'

// El panel, con agentes: tú le hablas al agente, el agente mira el Aula Virtual por
// una conexión MCP y te devuelve tus datos. El agente va en cian (el harness) y la
// conexión MCP en ámbar; lo demás, en gris.
const HARNESS = '#0891b2'
const MCP = '#d97706'
const NEUTRO = 'var(--color-fg-muted)'
</script>

<template>
  <Diagram
    label="Tú hablas con el agente, el agente consulta el Aula Virtual por una conexión MCP y te devuelve el panel con tus entregas, notas y avisos."
    caption="El agente mira el Aula Virtual por MCP y te devuelve el panel."
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
  >
    <div class="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      <span class="diagram-chip diagram-in self-center" :style="{ '--diagram-color': NEUTRO }">
        <User class="size-4" :stroke-width="1.5" aria-hidden="true" />Tú
      </span>
      <span class="diagram-in self-center text-fg-faint max-sm:rotate-90" aria-hidden="true">⇄</span>
      <div class="diagram-area diagram-in flex flex-1 flex-col" :style="{ '--diagram-color': HARNESS }">
        <span class="text-sm font-semibold">Agente</span>
        <span class="text-xs font-normal text-fg-secondary">consulta y te responde</span>
      </div>
      <span class="diagram-in self-center text-fg-faint max-sm:rotate-90" aria-hidden="true">⇄</span>
      <span class="diagram-chip diagram-in self-center" :style="{ '--diagram-color': MCP }">
        <Plug class="size-4" :stroke-width="1.5" aria-hidden="true" />MCP
      </span>
      <span class="diagram-in self-center text-fg-faint max-sm:rotate-90" aria-hidden="true">→</span>
      <span class="diagram-chip diagram-in self-center" :style="{ '--diagram-color': NEUTRO }">
        <GraduationCap class="size-4" :stroke-width="1.5" aria-hidden="true" />Aula Virtual
      </span>
    </div>
  </Diagram>
</template>
