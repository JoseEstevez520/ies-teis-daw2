<script setup>
import { SECCIONES } from '../data/secciones.js'
import { colorDeRuta } from '../lib/colorSeccion.js'
import PlantillaPagina from '../components/PlantillaPagina.vue'
import TarjetaPagina from '../components/TarjetaPagina.vue'

const tarjetas = SECCIONES.filter((s) => s.enPortada)
</script>

<template>
  <PlantillaPagina titulo="2º DAW · IES de Teis">
    <p>
      Espacio colaborativo para que a toda la clase de 2º DAW le vaya mejor: apuntes,
      conocimientos extra, ideas y herramientas que cualquiera puede usar. Todo el contenido
      del repo, navegable sin buscar por carpetas en GitHub.
    </p>

    <div class="not-prose grid gap-4 sm:grid-cols-2">
      <TarjetaPagina
        v-for="seccion in tarjetas"
        :key="seccion.ruta"
        :href="seccion.ruta"
        :titulo="seccion.etiqueta"
        :icono="seccion.icono"
        :color="colorDeRuta(seccion.ruta)"
        :descripcion="seccion.descripcion"
      />
    </div>
  </PlantillaPagina>
</template>
