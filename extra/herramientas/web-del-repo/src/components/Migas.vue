<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Breadcrumbs } from 'elastic-ui'
import { migasDe } from '../lib/migas.js'

// Dónde está la página, arriba de todo. El chevron entre migas abre las demás
// páginas de ese nivel, y la miga que cambia pasa a su nombre nuevo.
const route = useRoute()
const migas = computed(() => migasDe(route.path))
</script>

<template>
  <Breadcrumbs :items="migas" />
</template>
