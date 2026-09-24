<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { NavTree, Sidebar } from 'elastic-ui'
import { ARBOL_NAV } from '../lib/arbolNav.js'
import NodoNav from './NodoNav.vue'

// Barra lateral de elastic-ui, variante "conectada": la página activa es una
// pestaña del propio contenido que entra en la barra. El árbol sale de las
// rutas (lib/arbolNav.js), así que una página nueva aparece sola en su sitio.
const route = useRoute()
const activa = computed(() => route.path)
</script>

<template>
  <Sidebar variant="connected" label="Navegación">
    <template #header>
      <RouterLink to="/" class="block px-2.5 text-sm font-semibold text-fg">2º DAW · IES de Teis</RouterLink>
    </template>
    <NavTree :model-value="activa" label="Páginas">
      <NodoNav v-for="seccion in ARBOL_NAV" :key="seccion.ruta" :nodo="seccion" />
    </NavTree>
  </Sidebar>
</template>
