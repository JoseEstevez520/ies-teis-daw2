<script setup>
import mockupEntorno from '../../../../../../extra/ideas-proyecto-fin-curso/entorno-interactivo-que-explica-el-codigo.jpg?url'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import EtiquetasIdea from '../../components/EtiquetasIdea.vue'
import EnlacesIdea from '../../components/EnlacesIdea.vue'
import { ideaDe } from '../../data/ideas.js'

// extra/ideas-proyecto-fin-curso/entorno-interactivo-que-explica-el-codigo.md
const idea = ideaDe('entorno-interactivo-que-explica-el-codigo')
</script>

<template>
  <PlantillaPagina :titulo="idea.titulo" :entradilla="idea.resumen">
    <EtiquetasIdea :idea="idea" />

    <p>{{ idea.descripcion }}</p>

    <h2 id="como-funciona">Cómo funciona</h2>
    <p>
      Escribes y ejecutas un fragmento; seleccionas una parte y pides que te la explique, que
      experimente con ella o que te la dibuje. La IA parte del código, de lo que pasó al ejecutarlo
      y del contexto del proyecto, y consulta la documentación al día.
    </p>

    <p>Y, en vez de contestar en texto, genera la pieza que mejor lo enseñe:</p>
    <ul>
      <li>Un diagrama o un flujo de ejecución.</li>
      <li>El estado de las variables, paso a paso.</li>
      <li>Un diff de la mejora que propone.</li>
      <li>Una línea de tiempo, un playground o un ejercicio.</li>
    </ul>

    <h2 id="un-ejemplo">Un ejemplo</h2>
    <p>El editor con el flujo, las dependencias y el estado de las variables al lado:</p>
    <figure class="not-prose">
      <img
        :src="mockupEntorno"
        :alt="idea.titulo"
        class="w-full rounded-[var(--radius-md)] border border-border"
      />
      <figcaption class="mt-2 text-sm text-fg-muted">
        Mockup: un editor con el flujo de ejecución, las dependencias, el estado de las variables y
        la explicación, generados a partir del código.
      </figcaption>
    </figure>

    <p><span class="font-medium">A escala de PFC:</span> {{ idea.escala }}</p>

    <EnlacesIdea :idea="idea" />
  </PlantillaPagina>
</template>
