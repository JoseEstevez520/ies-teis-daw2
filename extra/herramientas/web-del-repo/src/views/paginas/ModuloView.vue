<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import { enGitHub } from '../../lib/repo.js'

// La página de un módulo (modulos/<módulo>/README.md). Todos están aún sin
// apuntes, así que comparten esta página con sus datos.
defineProps({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  carpeta: { type: String, required: true },
})
</script>

<template>
  <PlantillaPagina :titulo="nombre" :entradilla="descripcion">
    <p>
      Todavía no hay apuntes. Añade uno por tema o por apunte suelto en
      <a :href="enGitHub(`modulos/${carpeta}`)" target="_blank" rel="noopener noreferrer">la carpeta del módulo</a>,
      siguiendo las
      <a :href="enGitHub('CONTRIBUTING.md')" target="_blank" rel="noopener noreferrer">convenciones de nombres</a>.
    </p>
  </PlantillaPagina>
</template>
