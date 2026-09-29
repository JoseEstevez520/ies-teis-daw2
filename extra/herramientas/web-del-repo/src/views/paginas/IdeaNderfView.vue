<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import EtiquetasIdea from '../../components/EtiquetasIdea.vue'
import EnlacesIdea from '../../components/EnlacesIdea.vue'
import TarjetaReferencia from '../../components/TarjetaReferencia.vue'
import DiagramaRepite from '../../visuales/DiagramaRepite.vue'
import { ideaDe } from '../../data/ideas.js'

// extra/ideas-proyecto-fin-curso/experiencias-cercanas-a-la-muerte.md
const idea = ideaDe('experiencias-cercanas-a-la-muerte')

// De dónde sale la idea.
const REFERENCIAS = [
  {
    titulo: 'The OA',
    href: 'https://en.wikipedia.org/wiki/The_OA',
    imagen: 'https://upload.wikimedia.org/wikipedia/en/6/6d/The_OA.png',
    texto: 'La serie de Brit Marling y Zal Batmanglij: gente que vuelve de la muerte con algo que contar.',
  },
]
</script>

<template>
  <PlantillaPagina :titulo="idea.titulo" :entradilla="idea.resumen">
    <EtiquetasIdea :idea="idea" />

    <p>{{ idea.descripcion }}</p>

    <h2 id="como-funciona">Cómo funciona</h2>
    <p>Se agrupan los relatos parecidos y se ve qué se repite. Los temas y los números son de ejemplo.</p>
    <DiagramaRepite />
    <p><strong>Lo que se repite sale solo al mirar los relatos en conjunto.</strong></p>

    <h2 id="mas-alla">Para ir más allá</h2>
    <p>Con los patrones delante, salen preguntas que uno solo no deja ver:</p>
    <ul>
      <li>¿Cambian los relatos según el país o la época?</li>
      <li>¿Se parecen a lo que describe la neurociencia?</li>
      <li>¿Hay un orden común (primero la calma, luego la luz)?</li>
      <li>¿Qué se repite casi siempre y qué es raro?</li>
    </ul>

    <p>
      El trabajo está en recoger los 16.000 relatos, limpiarlos y agruparlos por lo que se parece,
      y en montar una web que enseñe lo que sale con esas preguntas al lado. Es un proyecto de
      datos: primero el análisis, y después contarlo bien.
    </p>

    <p><span class="font-medium">A escala de PFC:</span> {{ idea.escala }}</p>

    <h2 id="de-donde-sale">De dónde sale</h2>
    <p>La idea la sacó <em>The OA</em>; los relatos son de NDERF:</p>
    <div class="not-prose grid gap-4 sm:grid-cols-2">
      <TarjetaReferencia v-for="r in REFERENCIAS" :key="r.titulo" v-bind="r" />
    </div>

    <EnlacesIdea :idea="idea" />
  </PlantillaPagina>
</template>
