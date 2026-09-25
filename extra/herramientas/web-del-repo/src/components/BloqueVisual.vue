<script setup>
import { VISUALES } from '../visuales/index.js'

// Un bloque ```visual de un .md: su contenido es el nombre de la pieza,
// registrada en visuales/index.js. Si no existe, se ve el nombre tal cual.
const props = defineProps({
  code: { type: String, required: true },
})
const pieza = VISUALES[props.code.trim()]
</script>

<template>
  <component :is="pieza" v-if="pieza" />
  <pre v-else><code>{{ code }}</code></pre>
</template>
