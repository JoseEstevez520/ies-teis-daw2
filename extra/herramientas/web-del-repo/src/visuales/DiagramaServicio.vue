<script setup>
import { Diagram } from 'elastic-ui'
import { Cog, Plug, Route } from '@lucide/vue'

// El controlador depende de la interfaz, no de la implementación: así se puede
// cambiar una sin tocar la otra. Un color por concepto, el mismo en toda la
// página.
const CONTROLADOR = '#2563eb'
const INTERFAZ = '#7c3aed'
const IMPL = '#0891b2'
</script>

<template>
  <Diagram
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    label="El controlador usa la interfaz CalculosService con @Autowired. CalculosServiceImpl implementa esa misma interfaz. El controlador no conoce la implementación, así que se puede cambiar sin tocarlo."
  >
    <div class="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
      <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': CONTROLADOR }">
        <span class="flex items-center gap-1.5 text-sm font-semibold">
          <Route :size="16" :stroke-width="1.5" aria-hidden="true" /> CalculosController
        </span>
        <span class="text-sm text-fg-secondary"><code>@Autowired</code></span>
      </div>

      <span class="diagram-in text-center text-fg-faint sm:hidden" aria-hidden="true">↓</span>
      <span class="diagram-in hidden text-center text-fg-faint sm:inline" aria-hidden="true">→</span>

      <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': INTERFAZ }">
        <span class="flex items-center gap-1.5 text-sm font-semibold">
          <Plug :size="16" :stroke-width="1.5" aria-hidden="true" /> CalculosService
        </span>
        <span class="text-sm text-fg-secondary">interfaz</span>
      </div>

      <span class="diagram-in text-center text-fg-faint sm:hidden" aria-hidden="true">↑</span>
      <span class="diagram-in hidden text-center text-fg-faint sm:inline" aria-hidden="true">←</span>

      <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': IMPL }">
        <span class="flex items-center gap-1.5 text-sm font-semibold">
          <Cog :size="16" :stroke-width="1.5" aria-hidden="true" /> CalculosServiceImpl
        </span>
        <span class="text-sm text-fg-secondary">implementa</span>
      </div>
    </div>
  </Diagram>
</template>
