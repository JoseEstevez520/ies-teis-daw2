<script setup>
import { BookOpen } from '@lucide/vue'
import { colorDeRuta } from '../lib/colorSeccion.js'
import PlantillaPagina from '../components/PlantillaPagina.vue'
import TarjetaPagina from '../components/TarjetaPagina.vue'

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
  <PlantillaPagina titulo="Módulos" :icono="BookOpen" :color="colorDeRuta('/modulos')">
    <p class="text-sm text-fg-secondary">Apuntes del temario, un módulo por carpeta.</p>

    <div class="grid gap-4 sm:grid-cols-2">
      <TarjetaPagina
        v-for="modulo in MODULOS"
        :key="modulo.ruta"
        :href="modulo.ruta"
        :titulo="modulo.nombre"
        :descripcion="modulo.descripcion"
      />
    </div>
  </PlantillaPagina>
</template>
