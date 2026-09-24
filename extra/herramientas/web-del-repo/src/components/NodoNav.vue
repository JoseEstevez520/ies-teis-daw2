<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { NavTreeGroup, NavTreeItem } from 'elastic-ui'
import { colorDeRuta } from '../lib/colorSeccion.js'
import { iconoConColor } from '../lib/iconos.js'

// Un nodo del árbol de la barra lateral. Una página con páginas dentro es un
// grupo desplegable; como un grupo de NavTree no es un enlace, su propia
// página va como primera entrada ("Índice"). Se llama a sí mismo para los
// niveles de más abajo (Extra > Herramientas > ...).
const props = defineProps({
  nodo: { type: Object, required: true },
})

// Solo las secciones de primer nivel llevan icono (con el color de la
// sección); el resto, solo el texto.
const icono = computed(() => (props.nodo.icono ? iconoConColor(props.nodo.icono, colorDeRuta(props.nodo.ruta)) : undefined))
const titulo = computed(() => props.nodo.etiqueta || props.nodo.titulo)

// Los grupos que contienen la página de entrada ya salen abiertos. NavTree
// solo abre el grupo del elemento activo después de montar, y con animación.
const route = useRoute()
const abiertoAlCargar = route.path.startsWith(props.nodo.ruta + '/')
</script>

<template>
  <NavTreeGroup v-if="nodo.hijos.length" :label="titulo" :icon="icono" :default-open="abiertoAlCargar">
    <NavTreeItem :value="nodo.ruta" :href="nodo.ruta">Índice</NavTreeItem>
    <NodoNav v-for="hijo in nodo.hijos" :key="hijo.ruta" :nodo="hijo" />
  </NavTreeGroup>
  <NavTreeItem v-else :value="nodo.ruta" :href="nodo.ruta" :icon="icono">{{ titulo }}</NavTreeItem>
</template>
