<script setup>
import { Bot, Code, Lightbulb, Palette, Wrench } from '@lucide/vue'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'

// extra/README.md
const APARTADOS = [
  { href: '/extra/ia', titulo: 'IA', icono: Bot, descripcion: 'Trabajar mejor con IA y empezar con agentes.' },
  { href: '/extra/open-source', titulo: 'Open source', icono: Code, descripcion: 'Busca antes de construir, aprovecha lo de otros y publica lo tuyo.' },
  {
    href: '/extra/ideas-proyecto-fin-curso',
    titulo: 'Ideas para el proyecto de fin de curso',
    icono: Lightbulb,
    descripcion: 'Propuestas y referencias para el proyecto de fin de curso.',
  },
  { href: '/extra/diseno', titulo: 'Diseño', icono: Palette, descripcion: 'Tipografía, color, referencias y cómo evitar el look de IA.' },
  { href: '/extra/herramientas', titulo: 'Herramientas', icono: Wrench, descripcion: 'Mini-proyectos útiles para el día a día de la clase.' },
]
</script>

<template>
  <PlantillaPagina titulo="Extra" entradilla="Lo que no es temario pero ayuda en el curso.">
    <RejillaTarjetas>
      <TarjetaPagina v-for="a in APARTADOS" :key="a.href" v-bind="a" />
    </RejillaTarjetas>
  </PlantillaPagina>
</template>
