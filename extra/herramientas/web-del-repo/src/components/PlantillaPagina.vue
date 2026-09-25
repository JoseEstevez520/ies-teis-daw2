<script setup>
import { TableOfContents } from 'elastic-ui'

// Toda página de la web: un artículo a un solo ancho (USAGE 11), con su título,
// y a la derecha, en pantallas anchas, el índice de sus `##` y `###`. El
// índice se queda fijo justo debajo de la cabecera.
defineProps({
  titulo: { type: String, required: true },
  // [{ id, label, level }] como pide TableOfContents.
  indice: { type: Array, default: () => [] },
})
</script>

<template>
  <div class="relative">
    <article class="prose article">
      <h1>{{ titulo }}</h1>
      <slot />
    </article>

    <aside v-if="indice.length > 1" class="absolute inset-y-0 right-8 hidden w-52 2xl:block">
      <TableOfContents :items="indice" class="sticky top-[calc(var(--page-header-height)+1rem)]" />
    </aside>
  </div>
</template>
