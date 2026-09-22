<script setup>
import ListaNotas from '../components/ListaNotas.vue'
import ListaTareas from '../components/ListaTareas.vue'
</script>

<template>
  <div class="grid sm:grid-cols-2 gap-5">
    <div class="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4">
      <h2 class="text-sm font-semibold text-neutral-900">Tareas pendientes</h2>
      <ListaTareas />
    </div>
    <div class="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4">
      <h2 class="text-sm font-semibold text-neutral-900">Notas</h2>
      <ListaNotas />
    </div>
  </div>
</template>
