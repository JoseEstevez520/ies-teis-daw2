<script setup>
import { TableOfContents } from 'elastic-ui'

// La plantilla común de design.md: icono de la sección y título, el
// contenido, y a la derecha el índice de la página (sus `##`), que sigue lo
// que estás leyendo. El índice solo sale en pantallas anchas y si hay más de
// una sección.
defineProps({
  titulo: { type: String, required: true },
  icono: { type: [Object, Function], required: true },
  color: { type: String, default: 'var(--color-fg)' },
  // [{ id, label, level }] como pide TableOfContents.
  indice: { type: Array, default: () => [] },
})
</script>

<template>
  <!-- Tres columnas en pantallas anchas: el contenido centrado en la página y el
       índice pegado a la derecha, sin empujarlo. -->
  <div class="xl:grid xl:grid-cols-[1fr_minmax(0,48rem)_1fr] xl:gap-12">
    <article class="mx-auto flex max-w-3xl min-w-0 flex-col gap-8 xl:col-start-2 xl:mx-0 xl:max-w-none">
      <header class="flex items-center gap-2.5">
        <component :is="icono" class="size-5 shrink-0" :style="{ color }" />
        <h1 class="text-2xl font-semibold tracking-tight text-fg">{{ titulo }}</h1>
      </header>
      <slot />
    </article>

    <aside v-if="indice.length > 1" class="hidden w-52 justify-self-end xl:block">
      <TableOfContents :items="indice" title="En esta página" :offset="32" class="sticky top-8" />
    </aside>
  </div>
</template>
