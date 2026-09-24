<script setup>
import { computed } from 'vue'
import { FileText } from '@lucide/vue'
import { FICHAS } from '../data/fichas.js'
import { colorDeRuta } from '../lib/colorSeccion.js'
import TarjetaPagina from './TarjetaPagina.vue'

// Una página del repo en una lista de enlaces internos de un .md. Título e
// icono salen de data/fichas.js; sin ficha, el nombre de su carpeta.
const props = defineProps({
  clave: { type: String, required: true },
  href: { type: String, required: true },
  // true si la página no existe en esta web y el enlace va al repo en GitHub.
  externo: { type: Boolean, default: false },
  descripcionHtml: { type: String, default: '' },
})

const carpeta = computed(() => props.clave.split('/').pop())
const ficha = computed(() => FICHAS[props.clave] || {})
</script>

<template>
  <TarjetaPagina
    :href="href"
    :externo="externo"
    :titulo="ficha.titulo || carpeta"
    :icono="ficha.icono || FileText"
    :color="externo ? 'var(--color-fg)' : colorDeRuta(href)"
    :descripcion-html="descripcionHtml"
  >
    <span class="mt-1 text-xs text-fg-faint">
      <span class="font-mono">{{ carpeta }}/</span>
      <template v-if="externo"> · en GitHub</template>
    </span>
  </TarjetaPagina>
</template>
