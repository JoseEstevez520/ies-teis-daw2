<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, ArrowUpRight } from '@lucide/vue'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import { ideaDe } from '../../data/ideas.js'

// Una idea de PFC (extra/ideas-proyecto-fin-curso/<slug>.md). Todas tienen la misma
// forma: qué es, a escala de PFC, de dónde salió, su mockup si lo tiene y enlaces.
// El texto vive en el .md; aquí solo se compone.
const props = defineProps({
  slug: { type: String, required: true },
})

const idea = computed(() => ideaDe(props.slug))
const externo = (href) => /^https?:/.test(href)
</script>

<template>
  <PlantillaPagina v-if="idea" :titulo="idea.titulo" :entradilla="idea.resumen">
    <p v-if="idea.origen" class="text-sm text-fg-muted">{{ idea.origen }}</p>

    <p>{{ idea.descripcion }}</p>

    <figure v-if="idea.imagen" class="not-prose">
      <img
        :src="idea.imagen"
        :alt="idea.titulo"
        class="w-full rounded-[var(--radius-md)] border border-border"
      />
      <figcaption v-if="idea.imagenPie" class="mt-2 text-sm text-fg-muted">
        {{ idea.imagenPie }}
      </figcaption>
    </figure>

    <p v-if="idea.escala">
      <span class="font-medium">A escala de PFC:</span> {{ idea.escala }}
    </p>

    <ul v-if="idea.enlaces?.length" class="not-prose flex flex-wrap gap-x-4 gap-y-1 text-sm">
      <li v-for="e in idea.enlaces" :key="e.href">
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

    <p class="not-prose mt-8 text-sm">
      <RouterLink
        to="/extra/ideas-proyecto-fin-curso"
        class="text-fg-secondary underline decoration-border-strong underline-offset-4 hover:text-fg hover:decoration-fg"
      >
        Todas las ideas
      </RouterLink>
    </p>
  </PlantillaPagina>
</template>
