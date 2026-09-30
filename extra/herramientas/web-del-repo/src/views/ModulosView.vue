<script setup>
import PlantillaPagina from '../components/PlantillaPagina.vue'
import TarjetaPagina from '../components/TarjetaPagina.vue'

// Descripciones sacadas literalmente de la segunda línea de cada
// modulos/<módulo>/README.md.
const MODULOS = [
  { ruta: '/modulos/dasp', nombre: 'DASP', descripcion: 'Digitalización' },
  { ruta: '/modulos/daw', nombre: 'DAW', descripcion: 'Desenvolvemento de Aplicacións Web' },
  { ruta: '/modulos/despregamento', nombre: 'Despregamento', descripcion: 'Apache, DNS, Git' },
  { ruta: '/modulos/diw', nombre: 'DIW', descripcion: 'Vue 3 + Vite' },
  { ruta: '/modulos/dwcc', nombre: 'DWCC', descripcion: 'Desarrollo web en entorno cliente' },
  { ruta: '/modulos/dwcs', nombre: 'DWCS', descripcion: 'Spring Boot + Thymeleaf + JPA' },
]
</script>

<template>
  <PlantillaPagina titulo="Módulos">
    <p>Apuntes del temario, un módulo por carpeta.</p>

    <div class="not-prose grid gap-4 sm:grid-cols-2">
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
