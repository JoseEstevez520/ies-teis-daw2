<script setup>
import { RouterLink } from 'vue-router'
import { Card, CardDescription, CardHeader, CardTitle } from 'elastic-ui'
import { ArrowRight } from '@lucide/vue'

// Tarjeta que lleva a otra página (portada y módulos): en caja, con el borde
// que se marca más al pasar por encima. El icono, solo en las secciones.
defineProps({
  href: { type: String, required: true },
  titulo: { type: String, required: true },
  icono: { type: [Object, Function], default: null },
  color: { type: String, default: 'var(--color-fg)' },
  descripcion: { type: String, default: '' },
})
</script>

<template>
  <RouterLink :to="href" class="group rounded-[var(--radius-xl)] focus-visible:outline-2 focus-visible:outline-accent">
    <Card size="sm" class="h-full transition-colors duration-150 group-hover:border-border-strong">
      <CardHeader class="gap-3">
        <div class="flex items-start justify-between">
          <component :is="icono" v-if="icono" class="size-5 shrink-0" :stroke-width="1.5" :style="{ color }" />
          <ArrowRight
            class="ml-auto size-4 text-fg-faint transition-[color,translate] duration-150 group-hover:translate-x-0.5 group-hover:text-fg"
          />
        </div>
        <div class="flex flex-col gap-1">
          <CardTitle size="sm">{{ titulo }}</CardTitle>
          <CardDescription v-if="descripcion" class="leading-relaxed">{{ descripcion }}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  </RouterLink>
</template>
