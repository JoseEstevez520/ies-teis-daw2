<script setup>
import { siVite, siVuedotjs } from 'simple-icons'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'
import Tecnologias from '../../components/Tecnologias.vue'

// modulos/diw/README.md. Cuando el módulo tiene apuntes deja de compartir
// ModuloView (ver design.md).
const STACK = [
  { icon: siVuedotjs, nombre: 'Vue' },
  { icon: siVite, nombre: 'Vite' },
]

const APUNTES = [
  {
    ruta: '/modulos/diw/componentes-y-reactividad',
    titulo: 'Componentes y reactividad',
    descripcion: 'El archivo .vue, ref y reactive, y las directivas: v-model, v-if, v-for.',
  },
  {
    ruta: '/modulos/diw/frontend-backend-y-base-de-datos',
    titulo: 'Frontend, backend y base de datos',
    descripcion: 'Cómo se conecta la web (Vue) con el servidor y la base de datos, con XestionPacientes de ejemplo.',
  },
]
</script>

<template>
  <PlantillaPagina titulo="DIW" entradilla="Vue 3 + Vite">
    <p>Apuntes y recursos del módulo.</p>
    <Tecnologias :items="STACK" />

    <h2 id="apuntes">Apuntes</h2>
    <div class="not-prose grid gap-4 sm:grid-cols-2">
      <TarjetaPagina
        v-for="apunte in APUNTES"
        :key="apunte.ruta"
        :href="apunte.ruta"
        :titulo="apunte.titulo"
        :descripcion="apunte.descripcion"
      />
    </div>
  </PlantillaPagina>
</template>
