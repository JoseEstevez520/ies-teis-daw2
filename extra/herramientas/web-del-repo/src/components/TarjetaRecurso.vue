<script setup>
import { ref, onMounted } from 'vue'
import { Card, CardDescription, CardTitle } from 'elastic-ui'
import { extraerGradiente } from '../lib/colorFavicon.js'

const props = defineProps({
  href: { type: String, required: true },
  terminoHtml: { type: String, required: true },
  descripcionHtml: { type: String, default: '' },
  favicon: { type: String, required: true },
  gradienteInicial: { type: String, required: true },
})

// Empieza con el degradado por hash (instantáneo, sin red) y lo sustituye
// por el color real del favicon en cuanto termina de cargar y de leerse.
const gradiente = ref(props.gradienteInicial)

onMounted(() => {
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    const real = extraerGradiente(img)
    if (real) gradiente.value = real
  }
  img.src = props.favicon
})
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="group rounded-[var(--radius-xl)] focus-visible:outline-2 focus-visible:outline-accent"
  >
    <Card size="sm" class="h-full gap-0 py-0 transition-colors duration-150 group-hover:border-border-strong">
      <div class="relative h-16 shrink-0" :style="{ backgroundImage: gradiente }">
        <div
          class="absolute -bottom-4 left-4 flex size-9 items-center justify-center overflow-hidden rounded-[var(--radius-md)] bg-bg shadow-soft"
        >
          <img :src="favicon" alt="" class="size-5" loading="lazy" decoding="async" />
        </div>
      </div>
      <div class="flex flex-col gap-1 p-4 pt-7">
        <CardTitle size="sm" as="h4" class="text-sm" v-html="terminoHtml" />
        <CardDescription v-if="descripcionHtml" class="leading-relaxed" v-html="descripcionHtml" />
      </div>
    </Card>
  </a>
</template>
