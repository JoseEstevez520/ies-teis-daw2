<script setup>
import { computed } from 'vue'
import { parseMarkdown } from '../lib/markdown.js'
import BloqueMarkdown from './BloqueMarkdown.vue'

const props = defineProps({
  markdown: { type: String, required: true },
  directorio: { type: String, required: true },
})

const bloques = computed(() => parseMarkdown(props.markdown, { directorio: props.directorio }))

// Agrupa por sección (cada H2 y lo que le sigue hasta el próximo H2) para
// poder envolver cada sección en su propia tarjeta. Lo que va antes del
// primer H2 (la intro de la página) queda fuera de cualquier tarjeta.
const intro = computed(() => {
  const primerH2 = bloques.value.findIndex((b) => b.tipo === 'titulo' && b.nivel === 2)
  return primerH2 === -1 ? bloques.value : bloques.value.slice(0, primerH2)
})

const secciones = computed(() => {
  const grupos = []
  let actual = null
  for (const b of bloques.value) {
    if (b.tipo === 'titulo' && b.nivel === 2) {
      actual = { titulo: b, bloques: [] }
      grupos.push(actual)
    } else if (actual) {
      actual.bloques.push(b)
    }
  }
  return grupos
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <template v-for="(bloque, i) in intro" :key="'intro-' + i">
      <BloqueMarkdown :bloque="bloque" />
    </template>

    <section
      v-for="(seccion, si) in secciones"
      :key="si"
      class="rounded-2xl border border-neutral-200 bg-white p-6 flex flex-col gap-4"
    >
      <h2 class="text-base font-semibold text-neutral-900" v-html="seccion.titulo.html" />
      <template v-for="(bloque, bi) in seccion.bloques" :key="bi">
        <BloqueMarkdown :bloque="bloque" />
      </template>
    </section>
  </div>
</template>
