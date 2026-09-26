<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'

// extra/README.md
const APARTADOS = [
  { href: '/extra/ia', titulo: 'IA aplicada', descripcion: 'Trabajar mejor con IA y empezar con agentes.' },
  { href: '/extra/herramientas', titulo: 'Herramientas', descripcion: 'Mini-proyectos útiles para el día a día de la clase.' },
  { href: '/extra/diseno-web', titulo: 'Diseño web', descripcion: 'Recursos para que un frontend no parezca hecho a última hora.' },
  { href: '/extra/open-source', titulo: 'Open source', descripcion: 'Busca antes de construir, aprovecha lo de otros y publica lo tuyo.' },
  {
    href: '/extra/ideas-proyecto-fin-curso',
    titulo: 'Ideas para el proyecto de fin de curso',
    descripcion: 'Propuestas y referencias para el proyecto de fin de curso.',
  },
]
</script>

<template>
  <PlantillaPagina titulo="Extra" entradilla="Lo que no es temario pero ayuda en el curso.">
    <RejillaTarjetas>
      <TarjetaPagina v-for="a in APARTADOS" :key="a.href" v-bind="a" />
    </RejillaTarjetas>
  </PlantillaPagina>
</template>
