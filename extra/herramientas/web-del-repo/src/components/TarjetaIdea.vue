<script setup>
import { RouterLink } from 'vue-router'
import { Card, CardDescription, CardHeader, CardImage, CardTitle } from 'elastic-ui'
import { ArrowRight, ArrowUpRight } from '@lucide/vue'

// Tarjeta de una idea: no lleva a ningún sitio entera, porque una idea no es una
// página. Dice qué es, cómo sería a escala de PFC y, abajo, los enlaces que
// tenga (de esta web si empiezan por /, o de fuera).
defineProps({
  id: { type: String, default: undefined },
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  escala: { type: String, default: '' },
  // De dónde salió la idea, si fue de una serie, un libro o algo así.
  origen: { type: String, default: '' },
  // Mockup o dibujo de la idea, si lo tiene.
  imagen: { type: String, default: '' },
  enlaces: { type: Array, default: () => [] },
})

const externo = (href) => /^https?:/.test(href)
</script>

<template>
  <Card :id="id" size="sm" class="h-full scroll-mt-[calc(var(--page-header-height)+1rem)]">
    <CardImage v-if="imagen" :src="imagen" :alt="titulo" />
    <CardHeader class="h-full gap-3">
      <div class="flex flex-col gap-1">
        <CardTitle size="sm">{{ titulo }}</CardTitle>
        <span v-if="origen" class="text-xs text-fg-muted">{{ origen }}</span>
        <CardDescription class="leading-relaxed">{{ descripcion }}</CardDescription>
      </div>
      <p v-if="escala" class="text-sm leading-relaxed text-fg-secondary">
        <span class="font-medium text-fg">A escala de PFC:</span> {{ escala }}
      </p>
      <ul v-if="enlaces.length" class="mt-auto flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <li v-for="e in enlaces" :key="e.href">
          <component
            :is="externo(e.href) ? 'a' : RouterLink"
            v-bind="externo(e.href) ? { href: e.href, target: '_blank', rel: 'noopener noreferrer' } : { to: e.href }"
            class="inline-flex items-center gap-1 text-fg-secondary underline decoration-border-strong underline-offset-4 hover:text-fg hover:decoration-fg"
          >
            {{ e.texto }}
            <component :is="externo(e.href) ? ArrowUpRight : ArrowRight" class="size-3.5" aria-hidden="true" />
          </component>
        </li>
      </ul>
    </CardHeader>
  </Card>
</template>
