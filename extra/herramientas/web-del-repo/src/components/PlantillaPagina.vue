<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { TableOfContents } from 'elastic-ui'
import { tieneIndice } from '../lib/indicePagina.js'
import NavegacionSerie from './NavegacionSerie.vue'

// Toda página de la web: un artículo a un solo ancho (USAGE 11), con su título,
// y a la derecha, en pantallas anchas, el índice de sus títulos (`h2` y `h3`
// con `id`), que saca solo de la página.
defineProps({
  titulo: { type: String, required: true },
  // La frase que dice de qué va la página, justo debajo del título.
  entradilla: { type: String, default: '' },
})

const articulo = useTemplateRef('articulo')
const indice = ref([])
onMounted(async () => {
  await nextTick()
  indice.value = [...(articulo.value?.querySelectorAll(':scope > h2[id], :scope > h3[id]') ?? [])].map((h) => ({
    id: h.id,
    label: h.textContent.trim(),
    level: h.tagName === 'H2' ? 2 : 3,
  }))
  // Con índice, la rayita de scroll sobra: el índice ya marca por dónde vas.
  if (indice.value.length > 1) soltar = tieneIndice()
})
let soltar
onBeforeUnmount(() => soltar?.())
</script>

<template>
  <div class="relative">
    <article ref="articulo" class="prose article">
      <h1>{{ titulo }}</h1>
      <p v-if="entradilla" class="text-lg">{{ entradilla }}</p>
      <slot />
      <NavegacionSerie />
    </article>

    <aside v-if="indice.length > 1" class="absolute inset-y-0 right-8 hidden w-52 2xl:block">
      <TableOfContents :items="indice" class="sticky top-[calc(var(--page-header-height)+1rem)]" />
    </aside>
  </div>
</template>
