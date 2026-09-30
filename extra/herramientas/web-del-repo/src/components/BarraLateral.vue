<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { NavTree, NavTreeItem, Sidebar } from 'elastic-ui'
import { Settings } from '@lucide/vue'
import { SECCIONES } from '../data/secciones.js'
import { colorDeRuta } from '../lib/colorSeccion.js'
import { iconoConColor } from '../lib/iconos.js'
import { seccionDe } from '../lib/migas.js'

// Barra lateral de elastic-ui, variante "conectada": la sección en la que estás
// es una pestaña del propio contenido que entra en la barra. Solo las
// secciones de primer nivel; a las páginas de dentro se llega con las migas de
// arriba (Migas.vue). Abajo del todo, Ajustes, con un NavTree de un solo item
// para que se pliegue igual que las secciones.
const route = useRoute()
const activa = computed(() => (route.path === '/ajustes' ? '' : seccionDe(route.path)))
const ajustes = computed(() => (route.path === '/ajustes' ? '/ajustes' : ''))
</script>

<template>
  <Sidebar variant="connected">
    <template #header>
      <RouterLink to="/" class="block px-2.5 text-sm font-semibold text-fg">2º DAW · IES de Teis</RouterLink>
    </template>
    <NavTree :model-value="activa">
      <NavTreeItem
        v-for="s in SECCIONES"
        :key="s.ruta"
        :value="s.ruta"
        :to="s.ruta"
        :icon="iconoConColor(s.icono, colorDeRuta(s.ruta))"
      >
        {{ s.etiqueta }}
      </NavTreeItem>
    </NavTree>
    <template #footer>
      <NavTree :model-value="ajustes" label="Ajustes">
        <NavTreeItem value="/ajustes" to="/ajustes" :icon="Settings">Ajustes</NavTreeItem>
      </NavTree>
    </template>
  </Sidebar>
</template>
