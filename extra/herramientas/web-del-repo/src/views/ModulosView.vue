<script setup>
import { RouterLink } from 'vue-router'
import { BookOpen } from '@lucide/vue'

// Descripciones sacadas literalmente de la segunda línea de cada
// modulos/<módulo>/README.md.
const MODULOS = [
  { ruta: '/modulos/dasp', nombre: 'dasp', descripcion: 'Digitalización' },
  { ruta: '/modulos/daw', nombre: 'DAW', descripcion: 'Desenvolvemento de Aplicacións Web' },
  { ruta: '/modulos/despregamento', nombre: 'despregamento', descripcion: 'Apache, DNS, Git' },
  { ruta: '/modulos/diw', nombre: 'diw', descripcion: 'Vue 3 + Vite' },
  { ruta: '/modulos/dwcc', nombre: 'dwcc', descripcion: 'Desarrollo web en entorno cliente' },
  { ruta: '/modulos/dwcs', nombre: 'dwcs', descripcion: 'Spring Boot + Thymeleaf + JPA' },
]
</script>

<template>
  <div class="max-w-4xl flex flex-col gap-6">
    <div class="flex items-center gap-2.5">
      <BookOpen class="w-5 h-5 shrink-0" style="color: #2563eb" />
      <h1 class="text-2xl font-semibold text-neutral-900">Módulos</h1>
    </div>

    <p class="text-sm text-neutral-700">Apuntes del temario, un módulo por carpeta.</p>

    <div class="grid sm:grid-cols-2 gap-5">
      <RouterLink
        v-for="modulo in MODULOS"
        :key="modulo.ruta"
        :to="modulo.ruta"
        class="flex flex-col gap-1 bg-white border border-neutral-200 rounded-2xl p-6 hover:border-neutral-300 transition-colors duration-150"
      >
        <h2 class="text-base font-semibold text-neutral-900">{{ modulo.nombre }}</h2>
        <p class="text-sm text-neutral-700">{{ modulo.descripcion }}</p>
      </RouterLink>
    </div>
  </div>
</template>
