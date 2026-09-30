<script setup>
import { Diagram } from 'elastic-ui'
import { Globe, Server, ShoppingCart } from '@lucide/vue'

// La sesión HTTP: el navegador manda en cada petición la cookie con el id, y el
// servidor localiza con ella la sesión de ese usuario, donde vive el bean de
// scope session. El color del módulo (azul) para el servidor y la sesión.
const SESION = '#2563eb'
</script>

<template>
  <Diagram
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    label="La sesión HTTP: el navegador guarda una cookie con el id de sesión y la manda en cada petición. El servidor usa ese id para encontrar la sesión del usuario, y dentro vive el bean de scope session con sus datos, como el carrito."
  >
    <div class="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      <div class="diagram-area diagram-in flex-1 gap-2" style="--diagram-color: var(--color-fg-muted)">
        <span class="flex items-center gap-2 text-sm font-semibold">
          <Globe class="size-4 shrink-0" :stroke-width="1.5" aria-hidden="true" />Navegador
        </span>
        <span class="diagram-chip diagram-in px-3 py-2 font-mono text-xs">JSESSIONID=abc123</span>
        <span class="text-sm text-fg-secondary">Login, perfil, carrito</span>
      </div>

      <div class="flex flex-col items-center gap-1">
        <span class="diagram-in text-fg-faint max-sm:rotate-90" aria-hidden="true">→</span>
        <span class="diagram-in text-xs text-fg-muted">cada petición</span>
      </div>

      <div class="diagram-area diagram-in flex-1 gap-2" :style="{ '--diagram-color': SESION }">
        <span class="flex items-center gap-2 text-sm font-semibold">
          <Server class="size-4 shrink-0" :stroke-width="1.5" aria-hidden="true" />Servidor
        </span>
        <span class="text-sm">Sesión abc123 <span class="text-fg-muted">· de Ana</span></span>
        <span class="diagram-chip diagram-in px-3 py-2">
          <ShoppingCart class="size-4 shrink-0" :stroke-width="1.5" aria-hidden="true" />
          CarritoCompra <span class="font-normal opacity-80">· scope session</span>
        </span>
      </div>
    </div>
  </Diagram>
</template>
