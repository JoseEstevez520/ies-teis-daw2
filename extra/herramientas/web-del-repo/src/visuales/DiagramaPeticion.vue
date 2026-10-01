<script setup>
import { Diagram } from 'elastic-ui'
import { Braces, FileCode, Globe, Route } from '@lucide/vue'

// El viaje de una petición: entra por el controlador y sale como vista (HTML) o
// como datos (JSON). Un color por concepto, el mismo en toda la página.
const CLIENTE = '#2563eb'
const CONTROLADOR = '#7c3aed'
const VISTA = '#0891b2'
const DATOS = '#db2777'
</script>

<template>
  <Diagram
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    label="Una petición HTTP sale del navegador o de Postman hacia el controlador. El controlador busca el método de esa ruta y responde con una vista HTML o con datos JSON."
  >
    <div class="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      <div class="diagram-area diagram-in gap-2" :style="{ '--diagram-color': CLIENTE }">
        <span class="flex items-center gap-1.5 text-sm font-semibold">
          <Globe :size="16" :stroke-width="1.5" aria-hidden="true" /> Cliente
        </span>
        <ul class="flex flex-wrap justify-center gap-1.5">
          <li class="diagram-chip diagram-in">Navegador</li>
          <li class="diagram-chip diagram-in">Postman</li>
        </ul>
        <span class="text-sm text-fg-secondary">Pide una URL (GET).</span>
      </div>

      <span class="diagram-in text-center text-fg-faint sm:hidden" aria-hidden="true">↓</span>
      <span class="diagram-in hidden text-center text-fg-faint sm:inline" aria-hidden="true">→</span>

      <div class="diagram-area diagram-in gap-2" :style="{ '--diagram-color': CONTROLADOR }">
        <span class="flex items-center gap-1.5 text-sm font-semibold">
          <Route :size="16" :stroke-width="1.5" aria-hidden="true" /> Controlador
        </span>
        <span class="diagram-chip diagram-in">@GetMapping("/products")</span>
        <span class="text-sm text-fg-secondary">Busca el método de esa ruta.</span>
      </div>

      <span class="diagram-in text-center text-fg-faint sm:hidden" aria-hidden="true">↓</span>
      <span class="diagram-in hidden text-center text-fg-faint sm:inline" aria-hidden="true">→</span>

      <div class="flex flex-col gap-2">
        <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': VISTA }">
          <span class="diagram-chip diagram-in whitespace-nowrap">
            <FileCode :size="16" :stroke-width="1.5" aria-hidden="true" /> Vista (HTML)
          </span>
          <span class="text-sm text-fg-secondary">@Controller</span>
        </div>
        <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': DATOS }">
          <span class="diagram-chip diagram-in whitespace-nowrap">
            <Braces :size="16" :stroke-width="1.5" aria-hidden="true" /> Datos (JSON)
          </span>
          <span class="text-sm text-fg-secondary">@RestController</span>
        </div>
      </div>
    </div>
  </Diagram>
</template>
