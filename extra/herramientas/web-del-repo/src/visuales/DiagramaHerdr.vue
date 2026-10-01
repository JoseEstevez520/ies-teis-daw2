<script setup>
import { Diagram } from 'elastic-ui'
import { Bell, Check, Loader } from '@lucide/vue'

// Tres agentes en el servidor de Herdr, cada uno con su estado: trabajando,
// bloqueado (te necesita) o terminado. Color con significado: azul el que
// trabaja, ámbar el que espera a alguien, verde el que acabó bien.
const TRABAJANDO = '#2563eb'
const BLOQUEADO = '#d97706'
const TERMINADO = '#16a34a'
</script>

<template>
  <Diagram
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    label="Herdr mantiene varios agentes corriendo en un servidor en segundo plano. Cada uno se ve con su estado: trabajando, bloqueado (necesita una respuesta) o terminado."
  >
    <div class="flex flex-col gap-3">
      <span class="diagram-in text-center text-sm text-fg-secondary">
        Herdr · servidor en segundo plano
      </span>
      <div class="grid gap-3 sm:grid-cols-3">
        <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': TRABAJANDO }">
          <span class="flex items-center gap-1.5 text-sm font-semibold">
            <Loader :size="16" :stroke-width="1.5" aria-hidden="true" /> Trabajando
          </span>
          <span class="text-sm text-fg-secondary">Sigue solo.</span>
        </div>
        <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': BLOQUEADO }">
          <span class="flex items-center gap-1.5 text-sm font-semibold">
            <Bell :size="16" :stroke-width="1.5" aria-hidden="true" /> Te necesita
          </span>
          <span class="text-sm text-fg-secondary">Espera una respuesta.</span>
        </div>
        <div class="diagram-area diagram-in gap-1" :style="{ '--diagram-color': TERMINADO }">
          <span class="flex items-center gap-1.5 text-sm font-semibold">
            <Check :size="16" :stroke-width="1.5" aria-hidden="true" /> Terminado
          </span>
          <span class="text-sm text-fg-secondary">Listo para revisar.</span>
        </div>
      </div>
    </div>
  </Diagram>
</template>
