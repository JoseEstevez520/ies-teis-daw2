<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'

// extra/ia/README.md
const PAGINAS = [
  { href: '/extra/ia/fundamentos', titulo: 'Fundamentos', descripcion: 'Qué es un modelo, un harness y un agente. Empieza por aquí.' },
  { href: '/extra/ia/opencode', titulo: 'Agentes con OpenCode', descripcion: 'Trabajar con agentes usando OpenCode, que es gratis.' },
  { href: '/extra/ia/consejos', titulo: 'Consejos', descripcion: 'Cómo sacarle partido sin que te resuelva las prácticas.' },
]
</script>

<template>
  <PlantillaPagina titulo="IA aplicada" entradilla="Cómo usar la IA en clase para aprender más, no para que te haga el trabajo.">
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
