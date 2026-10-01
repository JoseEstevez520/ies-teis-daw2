<script setup>
import { Diagram } from 'elastic-ui'

// La conversación va llenando la ventana de contexto. Con poco, sobra sitio y el
// modelo lo tiene todo a la vista; llena, se pierde y cuesta más.
const CORTA = '#0891b2'
const LARGA = '#d97706'
</script>

<template>
  <Diagram
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    label="Con una conversación corta, al modelo le sobra sitio y lo tiene todo a la vista. Cuando la conversación se hace muy larga, se llena la ventana de contexto: se pierde y cuesta más."
  >
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-2">
        <div class="flex items-baseline justify-between gap-2">
          <span class="text-sm font-semibold text-fg">Conversación corta</span>
          <span class="text-xs text-fg-muted">cabe de sobra</span>
        </div>
        <div class="h-2.5 overflow-hidden rounded-full bg-bg-inset">
          <div class="diagram-in h-full rounded-full" :style="{ width: '32%', background: CORTA }" />
        </div>
        <span class="text-sm text-fg-secondary">Lo tiene todo a la vista.</span>
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex items-baseline justify-between gap-2">
          <span class="text-sm font-semibold text-fg">Conversación larga</span>
          <span class="text-xs text-fg-muted">llena</span>
        </div>
        <div class="h-2.5 overflow-hidden rounded-full bg-bg-inset">
          <div class="diagram-in h-full rounded-full" :style="{ width: '100%', background: LARGA }" />
        </div>
        <span class="text-sm text-fg-secondary">Se llena: se pierde y cuesta más.</span>
      </div>
    </div>
  </Diagram>
</template>
