<script setup>
import { Callout } from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import EtiquetasIdea from '../../components/EtiquetasIdea.vue'
import EnlacesIdea from '../../components/EnlacesIdea.vue'
import DiagramaRepite from '../../visuales/DiagramaRepite.vue'
import { ideaDe } from '../../data/ideas.js'

// extra/ideas-proyecto-fin-curso/experiencias-cercanas-a-la-muerte.md
const idea = ideaDe('experiencias-cercanas-a-la-muerte')
</script>

<template>
  <PlantillaPagina :titulo="idea.titulo" :entradilla="idea.resumen">
    <EtiquetasIdea :idea="idea" />

    <p>{{ idea.descripcion }}</p>

    <p>Así se leería el resultado. Los temas y los números son de ejemplo.</p>
    <DiagramaRepite />
    <p><strong>Lo que se repite sale solo al mirar los relatos en conjunto.</strong></p>

    <h2 id="preguntas">Preguntas que se puede hacer</h2>
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

    <Callout type="note" title="De dónde sale">
      Idea sacada de la serie <em>The OA</em>.
    </Callout>

    <EnlacesIdea :idea="idea" />
  </PlantillaPagina>
</template>
