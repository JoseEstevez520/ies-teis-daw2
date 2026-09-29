<script setup>
import { RouterLink } from 'vue-router'
import { ArrowRight, ArrowUpRight } from '@lucide/vue'

// El pie de una idea: sus enlaces y la vuelta al índice. El mismo en las seis.
defineProps({
  idea: { type: Object, required: true },
})

const externo = (href) => /^https?:/.test(href)
</script>

<template>
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
</template>
