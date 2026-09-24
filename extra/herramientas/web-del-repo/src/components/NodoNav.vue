<script setup>
import { computed } from 'vue'
import { NavTreeGroup, NavTreeItem } from 'elastic-ui'
import { colorDeRuta } from '../lib/colorSeccion.js'
import { iconoConColor } from '../lib/iconos.js'

// Un nodo del árbol de la barra lateral. Una página con páginas dentro es un
// grupo que también es página: su nombre lleva a ella y el chevron lo pliega.
// Se llama a sí mismo para los niveles de más abajo (Extra > Herramientas > ...).
const props = defineProps({
  nodo: { type: Object, required: true },
})

// Solo las secciones de primer nivel llevan icono (con el color de la
// sección); el resto, solo el texto.
const icono = computed(() => (props.nodo.icono ? iconoConColor(props.nodo.icono, colorDeRuta(props.nodo.ruta)) : undefined))
const titulo = computed(() => props.nodo.etiqueta || props.nodo.titulo)
</script>

<template>
  <NavTreeGroup
    v-if="nodo.hijos.length"
    :label="titulo"
    :icon="icono"
    :value="nodo.ruta"
    :to="nodo.ruta"
    :toggle-label="`Plegar ${titulo}`"
  >
    <NodoNav v-for="hijo in nodo.hijos" :key="hijo.ruta" :nodo="hijo" />
  </NavTreeGroup>
  <NavTreeItem v-else :value="nodo.ruta" :to="nodo.ruta" :icon="icono">{{ titulo }}</NavTreeItem>
</template>
