<script setup>
import { useNotas } from '../composables/usePanelApi.js'

const { datos: notas, cargando, error } = useNotas()
</script>

<template>
  <p v-if="cargando" class="text-sm text-neutral-400">Cargando…</p>
  <p v-else-if="error" class="text-sm text-red-600">{{ error }}</p>
  <p v-else-if="notas.length === 0" class="text-sm text-neutral-400">Sin notas puestas todavía.</p>

  <TransitionGroup v-else tag="ul" name="item" class="flex flex-col gap-2.5">
    <li
      v-for="n in notas"
      :key="n.id"
      class="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3"
    >
      <span class="flex flex-col gap-0.5 min-w-0">
        <span class="text-sm text-neutral-900 truncate">{{ n.nombre }}</span>
        <span class="text-xs text-neutral-400 truncate">{{ n.cursoNombre }}</span>
      </span>
      <span class="text-xs font-medium text-neutral-900 shrink-0">{{ n.valorFormateado }}</span>
    </li>
  </TransitionGroup>
</template>

<style scoped>
.item-enter-active {
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
}
.item-leave-active {
  transition: opacity 0.1s ease-in;
}
.item-enter-from,
.item-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
