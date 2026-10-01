<script setup>
import { Diagram } from 'elastic-ui'
import { Cog, Database, Route } from '@lucide/vue'

// Cómo se llama de una capa a la siguiente. Un color por capa, el mismo en toda
// la página: controlador violeta, servicio rosa, repositorio cian.
const CONTROLADOR = '#7c3aed'
const SERVICIO = '#db2777'
const REPOSITORIO = '#0891b2'
</script>

<template>
  <Diagram
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    label="Una aplicación web por capas. La petición entra por el controlador, que llama al servicio con la lógica del negocio, y este llama al repositorio, que lee y escribe en la base de datos."
  >
    <div class="mx-auto flex max-w-sm flex-col items-stretch gap-2">
      <span class="diagram-in text-center text-sm text-fg-secondary">Petición HTTP</span>
      <span class="diagram-in text-center text-fg-faint" aria-hidden="true">↓</span>

      <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': CONTROLADOR }">
        <span class="diagram-chip diagram-in">
          <Route :size="16" :stroke-width="1.5" aria-hidden="true" /> @Controller
        </span>
        <span class="text-sm text-fg-secondary">Recibe la petición y prepara la respuesta.</span>
      </div>

      <span class="diagram-in text-center text-xs text-fg-faint" aria-hidden="true">↓ llama a</span>

      <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': SERVICIO }">
        <span class="diagram-chip diagram-in">
          <Cog :size="16" :stroke-width="1.5" aria-hidden="true" /> @Service
        </span>
        <span class="text-sm text-fg-secondary">La lógica del negocio.</span>
      </div>

      <span class="diagram-in text-center text-xs text-fg-faint" aria-hidden="true">↓ llama a</span>

      <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': REPOSITORIO }">
        <span class="diagram-chip diagram-in">
          <Database :size="16" :stroke-width="1.5" aria-hidden="true" /> @Repository
        </span>
        <span class="text-sm text-fg-secondary">Lee y escribe en la base de datos.</span>
      </div>
    </div>
  </Diagram>
</template>

