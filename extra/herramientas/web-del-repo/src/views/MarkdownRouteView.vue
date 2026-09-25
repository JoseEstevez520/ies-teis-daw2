<script setup>
import { computed } from 'vue'
import { Markdown, headingsOf } from 'elastic-ui'
import BloqueVisual from '../components/BloqueVisual.vue'
import DiagramaMermaid from '../components/DiagramaMermaid.vue'
import PlantillaPagina from '../components/PlantillaPagina.vue'
import { prepararMarkdown } from '../lib/fuenteMd.js'
import { extraerTitulo } from '../lib/titulo.js'

// Una página sacada de su .md: el título es su `#`, el cuerpo lo pinta el
// Markdown de elastic-ui (código, avisos, tablas, títulos con id) y los
// bloques ```visual y ```mermaid salen como pieza o diagrama.
const props = defineProps({
  pagina: { type: Object, required: true },
})

const info = computed(() => extraerTitulo(props.pagina.fuente))
const cuerpo = computed(() => prepararMarkdown(info.value.cuerpo, props.pagina.directorio))
const indice = computed(() => headingsOf(cuerpo.value))
const COMPONENTES = { visual: BloqueVisual, mermaid: DiagramaMermaid }
</script>

<template>
  <PlantillaPagina :titulo="info.titulo" :indice="indice">
    <Markdown :source="cuerpo" :components="COMPONENTES" as="div" class="contents" />
  </PlantillaPagina>
</template>
