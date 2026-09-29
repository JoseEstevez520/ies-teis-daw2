<script setup>
import { Card, CardDescription, CardHeader, CardImage, CardTitle } from 'elastic-ui'
import { ArrowUpRight } from '@lucide/vue'

// De dónde sale una idea: una tarjeta con su imagen que lleva fuera. La imagen va
// con `fade`, como en el ejemplo de Card de la librería, y todo el bloque es el
// enlace. Sin imagen, queda la tarjeta con el título y el texto.
defineProps({
  href: { type: String, required: true },
  titulo: { type: String, required: true },
  imagen: { type: String, default: '' },
  texto: { type: String, default: '' },
})
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="group block h-full rounded-[var(--radius-xl)] focus-visible:outline-2 focus-visible:outline-accent"
  >
    <Card size="sm" class="h-full transition-colors duration-150 group-hover:border-border-strong">
      <CardImage v-if="imagen" :src="imagen" :alt="titulo" fade class="aspect-video" />
      <CardHeader class="gap-1">
        <CardTitle size="sm" class="flex items-center justify-between gap-2">
          {{ titulo }}
          <ArrowUpRight class="size-4 shrink-0 text-fg-faint transition-colors duration-150 group-hover:text-fg" aria-hidden="true" />
        </CardTitle>
        <CardDescription v-if="texto">{{ texto }}</CardDescription>
      </CardHeader>
    </Card>
  </a>
</template>
