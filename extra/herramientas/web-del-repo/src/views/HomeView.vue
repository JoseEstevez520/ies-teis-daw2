<script setup>
import { RouterLink } from 'vue-router'
import { SECCIONES } from '../data/secciones.js'

const tarjetas = SECCIONES.filter((s) => s.enPortada)
</script>

<template>
  <div class="flex flex-col gap-8">
    <p class="text-sm text-neutral-700">
      Todo el contenido del repo de 2º DAW, navegable sin bucear por carpetas de GitHub.
    </p>

    <div class="grid sm:grid-cols-2 gap-5">
      <RouterLink
        v-for="seccion in tarjetas"
        :key="seccion.ruta"
        :to="seccion.ruta"
        class="flex flex-col gap-3 bg-white border border-neutral-200 rounded-2xl p-6 hover:border-neutral-300 transition-colors duration-150"
      >
        <component :is="seccion.icono" class="w-5 h-5 text-neutral-900 shrink-0" />
        <div class="flex flex-col gap-1">
          <h2 class="text-base font-semibold text-neutral-900">{{ seccion.etiqueta }}</h2>
          <p class="text-sm text-neutral-700">{{ seccion.descripcion }}</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
