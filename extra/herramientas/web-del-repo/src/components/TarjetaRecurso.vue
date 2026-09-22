<script setup>
import { ref, onMounted } from 'vue'
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
    class="flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:border-neutral-300 transition-colors duration-150"
  >
    <div class="h-16 relative shrink-0" :style="{ backgroundImage: gradiente }">
      <div
        class="absolute -bottom-4 left-4 w-9 h-9 rounded-lg bg-white border border-neutral-200 shadow-sm flex items-center justify-center overflow-hidden"
      >
        <img :src="favicon" alt="" class="w-5 h-5" loading="lazy" />
      </div>
    </div>
    <div class="flex flex-col gap-1 p-4 pt-6">
      <span class="text-sm font-semibold text-neutral-900" v-html="terminoHtml" />
      <p v-if="descripcionHtml" class="text-sm text-neutral-700 leading-relaxed" v-html="descripcionHtml" />
    </div>
  </a>
</template>
