<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Badge, Callout, Steps, StepsItem } from 'elastic-ui'
import { ArrowRight, ArrowUpRight } from '@lucide/vue'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import DiagramaFlujo from '../../visuales/DiagramaFlujo.vue'
import { ideaDe } from '../../data/ideas.js'
import { colorDeRuta } from '../../lib/colorSeccion.js'

// Una idea de PFC (extra/ideas-proyecto-fin-curso/<slug>.md). Todas tienen la misma
// forma: qué es, su flujo en un diagrama, de dónde salió, el plan a escala de PFC
// en pasos, el mockup si lo tiene y enlaces. El texto vive en el .md; aquí solo se
// compone, con las piezas de la librería.
const props = defineProps({
  slug: { type: String, required: true },
})

const idea = computed(() => ideaDe(props.slug))
const color = colorDeRuta('/extra/ideas-proyecto-fin-curso')
const externo = (href) => /^https?:/.test(href)
</script>

<template>
  <PlantillaPagina v-if="idea" :titulo="idea.titulo" :entradilla="idea.resumen">
    <div class="not-prose mb-6 flex flex-wrap gap-2">
      <Badge v-for="t in idea.tags" :key="t" :color="color">{{ t }}</Badge>
    </div>

    <p>{{ idea.descripcion }}</p>

    <DiagramaFlujo
      :label="idea.diagramaLabel"
      :pasos="idea.flujo"
      :color="color"
    />

    <Callout v-if="idea.origen" type="note" title="De dónde sale">
      {{ idea.origen }}
    </Callout>

    <h2 id="a-escala-de-pfc">A escala de PFC</h2>
    <Steps static>
      <StepsItem v-for="p in idea.plan" :key="p.titulo" :title="p.titulo">
        {{ p.texto }}
      </StepsItem>
    </Steps>

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

    <h2 v-if="idea.enlaces?.length" id="enlaces">Enlaces</h2>
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
