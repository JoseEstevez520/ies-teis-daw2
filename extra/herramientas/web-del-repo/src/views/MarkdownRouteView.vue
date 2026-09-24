<script setup>
import { computed } from 'vue'
import PaginaMarkdown from '../components/PaginaMarkdown.vue'
import { extraerTitulo } from '../lib/markdown.js'
import { colorDeRuta } from '../lib/colorSeccion.js'

const props = defineProps({
  pagina: { type: Object, required: true },
})

const info = computed(() => extraerTitulo(props.pagina.fuente))
const color = computed(() => colorDeRuta(props.pagina.ruta))
</script>

<template>
  <div class="max-w-4xl flex flex-col gap-6">
    <div class="flex items-center gap-2.5">
      <component :is="pagina.icono" class="w-5 h-5 shrink-0" :style="{ color }" />
      <h1 class="text-2xl font-semibold text-neutral-900">{{ info.titulo }}</h1>
    </div>

    <PaginaMarkdown :markdown="info.cuerpo" :directorio="pagina.directorio" :color="color" />
  </div>
</template>
