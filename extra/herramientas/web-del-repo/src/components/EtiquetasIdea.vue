<script setup>
import { Badge } from 'elastic-ui'

// Las etiquetas de una idea, bajo su título: de qué va, en una palabra o dos.
defineProps({
  idea: { type: Object, required: true },
})
</script>

<template>
  <div class="not-prose mb-6 flex flex-wrap gap-2">
    <Badge v-for="t in idea.tags" :key="t" variant="outline">{{ t }}</Badge>
  </div>
</template>
