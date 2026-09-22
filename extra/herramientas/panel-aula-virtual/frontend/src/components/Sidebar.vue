<script setup>
import { ClipboardList, GraduationCap, Home } from '@lucide/vue'
</script>

<template>
  <nav class="w-56 shrink-0 border-r border-neutral-200 bg-white p-4 flex flex-col gap-1">
    <RouterLink
      to="/"
      class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors duration-150"
      active-class=""
      exact-active-class="bg-neutral-100 text-neutral-900 font-medium"
    >
      <Home class="w-4 h-4 shrink-0" />
      Inicio
    </RouterLink>
    <RouterLink
      to="/tareas"
      class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors duration-150"
      active-class="bg-neutral-100 text-neutral-900 font-medium"
    >
      <ClipboardList class="w-4 h-4 shrink-0" />
      Tareas
    </RouterLink>
    <RouterLink
      to="/notas"
      class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors duration-150"
      active-class="bg-neutral-100 text-neutral-900 font-medium"
    >
      <GraduationCap class="w-4 h-4 shrink-0" />
      Notas
    </RouterLink>
  </nav>
</template>
