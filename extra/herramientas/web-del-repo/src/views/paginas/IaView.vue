<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'
import { serieDeCarpeta } from '../../data/series.js'

// extra/ia/README.md
// Las páginas en el orden en que se leen (data/series.js), numeradas.
const PAGINAS = serieDeCarpeta('/extra/ia').paginas.map((p, i) => ({
  href: p.ruta,
  titulo: `${i + 1}. ${p.titulo}`,
  descripcion: p.descripcion,
}))
</script>

<template>
  <PlantillaPagina titulo="IA aplicada" entradilla="Cómo usar la IA en clase para aprender más, no para que te haga el trabajo. Se lee en orden: cada página se apoya en la anterior.">
    <RejillaTarjetas>
      <TarjetaPagina v-for="p in PAGINAS" :key="p.href" v-bind="p" />
    </RejillaTarjetas>

    <h2 id="recursos">Recursos</h2>
    <p>
      <a href="https://www.youtube.com/watch?v=kzcI5F4tGiU" target="_blank" rel="noopener noreferrer">How I Use AI to Learn Things</a>
      (vídeo, en inglés): usar la IA para aprender algo nuevo, no para que te lo resuelva.
    </p>
  </PlantillaPagina>
</template>
