<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
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

// Un grupo se abre al estar en su página o en una de dentro, venga de donde
// venga la navegación (barra, tarjeta, enlace de un .md). Plegarlo con el
// chevron sigue funcionando.
const route = useRoute()
const dentro = (ruta) => ruta === props.nodo.ruta || ruta.startsWith(props.nodo.ruta + '/')
const abierto = ref(dentro(route.path))
watch(
  () => route.path,
  (ruta) => dentro(ruta) && (abierto.value = true),
)
</script>

<template>
  <NavTreeGroup
    v-if="nodo.hijos.length"
    :label="titulo"
    :icon="icono"
    :value="nodo.ruta"
    :to="nodo.ruta"
    :toggle-label="`Plegar ${titulo}`"
    v-model:open="abierto"
  >
    <NodoNav v-for="hijo in nodo.hijos" :key="hijo.ruta" :nodo="hijo" />
  </NavTreeGroup>
  <NavTreeItem v-else :value="nodo.ruta" :to="nodo.ruta" :icon="icono">{{ titulo }}</NavTreeItem>
</template>
