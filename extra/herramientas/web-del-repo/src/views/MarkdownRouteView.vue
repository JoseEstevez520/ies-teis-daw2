<script setup>
import { computed } from 'vue'
import PaginaMarkdown from '../components/PaginaMarkdown.vue'
import { extraerTitulo } from '../lib/markdown.js'

const props = defineProps({
  pagina: { type: Object, required: true },
})

const info = computed(() => extraerTitulo(props.pagina.fuente))
</script>

<template>
  <div class="max-w-4xl flex flex-col gap-6">
    <div class="flex items-center gap-2.5">
      <component :is="pagina.icono" class="w-5 h-5 text-neutral-900 shrink-0" />
      <h1 class="text-2xl font-semibold text-neutral-900">{{ info.titulo }}</h1>
    </div>

    <PaginaMarkdown :markdown="info.cuerpo" :directorio="pagina.directorio" />
  </div>
</template>
