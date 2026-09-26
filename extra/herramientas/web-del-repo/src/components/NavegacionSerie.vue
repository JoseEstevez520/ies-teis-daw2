<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Card } from 'elastic-ui'
import { ArrowLeft, ArrowRight } from '@lucide/vue'
import { serieDe } from '../data/series.js'

// Al final de una página que va en orden (data/series.js): la anterior y la
// siguiente, para seguir sin volver al índice.
const route = useRoute()
const posicion = computed(() => serieDe(route.path))
const anterior = computed(() => posicion.value && posicion.value.serie.paginas[posicion.value.i - 1])
const siguiente = computed(() => posicion.value && posicion.value.serie.paginas[posicion.value.i + 1])
const total = computed(() => posicion.value?.serie.paginas.length)
</script>

<template>
  <nav v-if="posicion" aria-label="Anterior y siguiente" class="not-prose mt-16 flex flex-col gap-3">
    <span class="text-xs text-fg-muted">{{ posicion.i + 1 }} de {{ total }}</span>
    <div class="grid gap-4 sm:grid-cols-2">
      <RouterLink
        v-if="anterior"
        :to="anterior.ruta"
        class="group rounded-[var(--radius-xl)] focus-visible:outline-2 focus-visible:outline-accent"
      >
        <Card size="sm" class="h-full gap-1 px-4 transition-colors duration-150 group-hover:border-border-strong">
          <span class="flex items-center gap-1.5 text-xs text-fg-muted">
            <ArrowLeft class="size-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" aria-hidden="true" />
            Anterior
          </span>
          <span class="text-sm font-semibold text-fg">{{ anterior.titulo }}</span>
        </Card>
      </RouterLink>
      <span v-else aria-hidden="true" class="max-sm:hidden" />

      <RouterLink
        v-if="siguiente"
        :to="siguiente.ruta"
        class="group rounded-[var(--radius-xl)] focus-visible:outline-2 focus-visible:outline-accent"
      >
        <Card size="sm" class="h-full items-end gap-1 px-4 text-right transition-colors duration-150 group-hover:border-border-strong">
          <span class="flex items-center gap-1.5 text-xs text-fg-muted">
            Siguiente
            <ArrowRight class="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
          <span class="text-sm font-semibold text-fg">{{ siguiente.titulo }}</span>
          <span class="text-xs text-fg-secondary">{{ siguiente.descripcion }}</span>
        </Card>
      </RouterLink>
    </div>
  </nav>
</template>
