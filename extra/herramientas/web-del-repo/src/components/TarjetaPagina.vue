<script setup>
import { RouterLink } from 'vue-router'
import { Card, CardDescription, CardHeader, CardTitle } from 'elastic-ui'
import { ArrowRight, ArrowUpRight } from '@lucide/vue'

// Tarjeta que lleva a otra página: la de la portada, la de cada módulo y la de
// las listas de enlaces internos de un .md (TarjetaInterna). En caja, con el
// borde que se marca más al pasar por encima (ver design.md).
defineProps({
  href: { type: String, required: true },
  // true si va fuera de esta web (al repo en GitHub).
  externo: { type: Boolean, default: false },
  titulo: { type: String, required: true },
  icono: { type: [Object, Function], default: null },
  color: { type: String, default: 'var(--color-fg)' },
  descripcion: { type: String, default: '' },
  // Para descripciones que salen del .md, ya en HTML.
  descripcionHtml: { type: String, default: '' },
})
</script>

<template>
  <component
    :is="externo ? 'a' : RouterLink"
    v-bind="externo ? { href, target: '_blank', rel: 'noopener noreferrer' } : { to: href }"
    class="group rounded-[var(--radius-xl)] focus-visible:outline-2 focus-visible:outline-accent"
  >
    <Card size="sm" class="h-full transition-colors duration-150 group-hover:border-border-strong">
      <CardHeader class="gap-3">
        <div class="flex items-start justify-between">
          <component :is="icono" v-if="icono" class="size-5 shrink-0" :style="{ color }" />
          <component
            :is="externo ? ArrowUpRight : ArrowRight"
            class="ml-auto size-4 text-fg-faint transition-[color,translate] duration-150 group-hover:text-fg"
            :class="externo ? 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5' : 'group-hover:translate-x-0.5'"
          />
        </div>
        <div class="flex flex-col gap-1">
          <CardTitle size="sm">{{ titulo }}</CardTitle>
          <CardDescription v-if="descripcionHtml" class="leading-relaxed first-letter:uppercase" v-html="descripcionHtml" />
          <CardDescription v-else-if="descripcion" class="leading-relaxed">{{ descripcion }}</CardDescription>
          <slot />
        </div>
      </CardHeader>
    </Card>
  </component>
</template>
