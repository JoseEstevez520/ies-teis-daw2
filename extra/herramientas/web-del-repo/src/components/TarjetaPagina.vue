<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Card, CardDescription, CardHeader, CardTitle } from 'elastic-ui'
import { ArrowRight, ArrowUpRight } from '@lucide/vue'

// Tarjeta que lleva a otra página: de esta web (con `href` que empieza por /) o
// de fuera, que se abre en otra pestaña y dice a qué sitio va. En caja, con el
// borde que se marca más al pasar por encima. El icono, solo en las secciones.
// Sin `href` queda como una tarjeta normal, sin flecha ni enlace.
const props = defineProps({
  href: { type: String, default: '' },
  titulo: { type: String, required: true },
  icono: { type: [Object, Function], default: null },
  color: { type: String, default: 'var(--color-fg)' },
  descripcion: { type: String, default: '' },
  // Una línea corta de estado, como "Sin código todavía".
  nota: { type: String, default: '' },
})

const enlaza = computed(() => props.href !== '')
const externo = computed(() => /^https?:/.test(props.href))
const sitio = computed(() => (externo.value ? new URL(props.href).hostname.replace(/^www\./, '') : ''))
</script>

<template>
  <component
    :is="!enlaza ? 'div' : externo ? 'a' : RouterLink"
    v-bind="!enlaza ? {} : externo ? { href, target: '_blank', rel: 'noopener noreferrer' } : { to: href }"
    class="block h-full"
    :class="enlaza && 'group rounded-[var(--radius-xl)] focus-visible:outline-2 focus-visible:outline-accent'"
  >
    <Card
      size="sm"
      class="h-full"
      :class="enlaza && 'transition-colors duration-150 group-hover:border-border-strong'"
    >
      <CardHeader class="h-full gap-3">
        <div v-if="icono" class="flex items-start justify-between">
          <component :is="icono" class="size-5 shrink-0" :stroke-width="1.5" :style="{ color }" />
        </div>
        <div class="flex flex-1 flex-col gap-1">
          <CardTitle size="sm" class="flex items-center justify-between gap-2">
            {{ titulo }}
            <component
              :is="externo ? ArrowUpRight : ArrowRight"
              v-if="enlaza"
              class="size-4 shrink-0 text-fg-faint transition-[color,translate] duration-150 group-hover:text-fg"
              :class="externo ? 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5' : 'group-hover:translate-x-0.5'"
            />
          </CardTitle>
          <CardDescription v-if="descripcion" class="leading-relaxed">{{ descripcion }}</CardDescription>
        </div>
        <span v-if="nota || sitio" class="text-xs text-fg-muted">{{ nota || sitio }}</span>
      </CardHeader>
    </Card>
  </component>
</template>
