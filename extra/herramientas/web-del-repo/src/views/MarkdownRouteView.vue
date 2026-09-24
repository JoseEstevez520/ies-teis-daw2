<script setup>
import { computed } from 'vue'
import PaginaMarkdown from '../components/PaginaMarkdown.vue'
import PlantillaPagina from '../components/PlantillaPagina.vue'
import { extraerTitulo, parseMarkdown } from '../lib/markdown.js'
import { colorDeRuta } from '../lib/colorSeccion.js'
import { textoDeHtml } from '../lib/slug.js'

const props = defineProps({
  pagina: { type: Object, required: true },
})

const info = computed(() => extraerTitulo(props.pagina.fuente))
const color = computed(() => colorDeRuta(props.pagina.ruta))
const bloques = computed(() => parseMarkdown(info.value.cuerpo, { directorio: props.pagina.directorio }))

// El índice son los `##`: los `###` salen como desplegables cerrados, y un
// enlace a algo escondido no llevaría a ningún sitio visible.
const indice = computed(() =>
  bloques.value
    .filter((b) => b.tipo === 'titulo' && b.nivel === 2)
    .map((b) => ({ id: b.id, label: textoDeHtml(b.html), level: 2 })),
)
</script>

<template>
  <PlantillaPagina :titulo="info.titulo" :icono="pagina.icono" :color="color" :indice="indice">
    <PaginaMarkdown :bloques="bloques" :color="color" />
  </PlantillaPagina>
</template>
