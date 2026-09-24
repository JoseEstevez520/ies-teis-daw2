<script setup>
import { computed } from 'vue'
import { parseMarkdown } from '../lib/markdown.js'
import { iconoDeTitulo } from '../lib/iconoSeccion.js'
import { ChevronDown } from '@lucide/vue'
import BloqueMarkdown from './BloqueMarkdown.vue'

const props = defineProps({
  markdown: { type: String, required: true },
  directorio: { type: String, required: true },
  // Color de la sección del repo (ver lib/colorSeccion.js), para los iconos.
  color: { type: String, default: '#171717' },
})

const bloques = computed(() => parseMarkdown(props.markdown, { directorio: props.directorio }))

// Agrupa por sección (cada H2 y lo que le sigue hasta el próximo H2) para
// poder envolver cada sección en su propia tarjeta. Lo que va antes del
// primer H2 (la intro de la página) queda fuera de cualquier tarjeta.
const intro = computed(() => {
  const primerH2 = bloques.value.findIndex((b) => b.tipo === 'titulo' && b.nivel === 2)
  return primerH2 === -1 ? bloques.value : bloques.value.slice(0, primerH2)
})

// Dentro de una sección, cada ### y lo que le sigue (hasta el siguiente ###)
// es un desplegable: para detalles que no todo el mundo necesita leer.
function agruparDesplegables(bloques) {
  const salida = []
  let abierto = null
  for (const b of bloques) {
    if (b.tipo === 'titulo' && b.nivel === 3) {
      abierto = { tipo: 'desplegable', html: b.html, bloques: [] }
      salida.push(abierto)
    } else if (abierto) {
      abierto.bloques.push(b)
    } else {
      salida.push(b)
    }
  }
  return salida
}

const secciones = computed(() => {
  const grupos = []
  let actual = null
  for (const b of bloques.value) {
    if (b.tipo === 'titulo' && b.nivel === 2) {
      const textoPlano = b.html.replace(/<[^>]+>/g, '')
      actual = { titulo: b, icono: iconoDeTitulo(textoPlano), bloques: [] }
      grupos.push(actual)
    } else if (actual) {
      actual.bloques.push(b)
    }
  }
  return grupos.map((g) => ({ ...g, bloques: agruparDesplegables(g.bloques) }))
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
      <div class="flex items-center gap-2">
        <component :is="seccion.icono" class="w-4 h-4 shrink-0" :style="{ color }" />
        <h2 class="text-base font-semibold text-neutral-900" v-html="seccion.titulo.html" />
      </div>
      <div v-if="seccion.bloques.some((b) => b.tipo === 'desplegable')" class="flex flex-col">
        <template v-for="(bloque, bi) in seccion.bloques" :key="bi">
          <details v-if="bloque.tipo === 'desplegable'" class="group border-b border-neutral-100 last:border-b-0">
            <summary class="flex items-center justify-between gap-3 py-3 cursor-pointer list-none text-sm font-medium text-neutral-900 [&::-webkit-details-marker]:hidden">
              <span v-html="bloque.html" />
              <ChevronDown class="w-4 h-4 shrink-0 text-neutral-400 transition-transform duration-150 group-open:rotate-180" />
            </summary>
            <div class="flex flex-col gap-3 pb-4">
              <BloqueMarkdown v-for="(b, di) in bloque.bloques" :key="di" :bloque="b" />
            </div>
          </details>
          <BloqueMarkdown v-else :bloque="bloque" class="mb-3" />
        </template>
      </div>
      <template v-else>
        <BloqueMarkdown v-for="(bloque, bi) in seccion.bloques" :key="bi" :bloque="bloque" />
      </template>
    </section>
  </div>
</template>
