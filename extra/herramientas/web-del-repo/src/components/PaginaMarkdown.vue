<script setup>
import { computed } from 'vue'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'elastic-ui'
import { iconoDeTitulo } from '../lib/iconoSeccion.js'
import BloqueMarkdown from './BloqueMarkdown.vue'
import SeccionPagina from './SeccionPagina.vue'

// El cuerpo de una página sacada de su .md. Los bloques los da
// parseMarkdown (lib/markdown.js); aquí se agrupan en secciones (cada `##`) y
// en desplegables (cada `###`).
const props = defineProps({
  bloques: { type: Array, required: true },
  // Color de la sección del repo (ver lib/colorSeccion.js), para los iconos.
  color: { type: String, default: 'var(--color-fg)' },
})

// Lo que va antes del primer `##` es la intro de la página.
const intro = computed(() => {
  const primerH2 = props.bloques.findIndex((b) => b.tipo === 'titulo' && b.nivel === 2)
  return primerH2 === -1 ? props.bloques : props.bloques.slice(0, primerH2)
})

// Dentro de una sección, cada `###` y lo que le sigue es un desplegable: para
// detalles que no todo el mundo necesita leer. Los seguidos van en el mismo
// Accordion.
function agruparDesplegables(bloques) {
  const salida = []
  let acordeon = null
  let abierto = null
  for (const b of bloques) {
    if (b.tipo === 'titulo' && b.nivel === 3) {
      if (!acordeon) {
        acordeon = { tipo: 'acordeon', items: [] }
        salida.push(acordeon)
      }
      abierto = { id: b.id, html: b.html, bloques: [] }
      acordeon.items.push(abierto)
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
  for (const b of props.bloques) {
    if (b.tipo === 'titulo' && b.nivel === 2) {
      actual = { titulo: b, icono: iconoDeTitulo(b.html.replace(/<[^>]+>/g, '')), bloques: [] }
      grupos.push(actual)
    } else if (actual) {
      actual.bloques.push(b)
    }
  }
  return grupos.map((g) => ({ ...g, bloques: agruparDesplegables(g.bloques) }))
})
</script>

<template>
  <div class="flex flex-col gap-12">
    <div v-if="intro.length" class="flex flex-col gap-5">
      <BloqueMarkdown v-for="(bloque, i) in intro" :key="i" :bloque="bloque" />
    </div>

    <SeccionPagina v-for="seccion in secciones" :id="seccion.titulo.id" :key="seccion.titulo.id" :icono="seccion.icono" :color="color">
      <template #titulo><span v-html="seccion.titulo.html" /></template>

      <template v-for="(bloque, bi) in seccion.bloques" :key="bi">
        <Accordion v-if="bloque.tipo === 'acordeon'" type="multiple">
          <AccordionItem v-for="item in bloque.items" :key="item.id" :value="item.id">
            <AccordionTrigger :id="item.id" class="scroll-mt-6"><span v-html="item.html" /></AccordionTrigger>
            <AccordionContent>
              <div class="flex flex-col gap-3">
                <BloqueMarkdown v-for="(b, di) in item.bloques" :key="di" :bloque="b" />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <BloqueMarkdown v-else :bloque="bloque" />
      </template>
    </SeccionPagina>
  </div>
</template>
