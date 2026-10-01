<script setup>
import { Diagram } from 'elastic-ui'
import { Box, Route } from '@lucide/vue'

// El contenedor guarda las instancias que Spring crea y las entrega a quien las
// pide. Contenedor en azul; el controlador que pide, en violeta como en toda la
// página.
const CONTENEDOR = '#2563eb'
const CONTROLADOR = '#7c3aed'
</script>

<template>
  <Diagram
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    label="Spring crea los objetos y los guarda en el contenedor (ApplicationContext). Cuando una clase como PedidoController necesita un bean, se lo pide al contenedor y este se lo entrega ya creado."
  >
    <div class="mx-auto flex max-w-md flex-col gap-2">
      <span class="diagram-in text-center text-sm text-fg-secondary">Spring crea los objetos y los guarda aquí</span>

      <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': CONTENEDOR }">
        <span class="flex items-center gap-1.5 text-sm font-semibold">
          <Box :size="16" :stroke-width="1.5" aria-hidden="true" /> Contenedor · ApplicationContext
        </span>
        <span class="text-sm">HomeController · PedidoService · PedidoRepository</span>
      </div>

      <span class="diagram-in text-center text-xs text-fg-faint" aria-hidden="true">↓ entrega lo que pide</span>

      <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': CONTROLADOR }">
        <span class="flex items-center gap-1.5 text-sm font-semibold">
          <Route :size="16" :stroke-width="1.5" aria-hidden="true" /> PedidoController
        </span>
        <span class="text-sm text-fg-secondary">Pide PedidoService y lo recibe ya creado.</span>
      </div>
    </div>
  </Diagram>
</template>
