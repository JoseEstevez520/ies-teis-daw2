<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, ArrowUpRight, FileText } from '@lucide/vue'
import { FICHAS } from '../data/fichas.js'
import { colorDeRuta } from '../lib/colorSeccion.js'

const props = defineProps({
  clave: { type: String, required: true },
  href: { type: String, required: true },
  // true si la página no existe en esta web y el enlace va al repo en GitHub.
  externo: { type: Boolean, default: false },
  descripcionHtml: { type: String, default: '' },
})

const carpeta = computed(() => props.clave.split('/').pop())
const ficha = computed(() => FICHAS[props.clave] || {})
const titulo = computed(() => ficha.value.titulo || carpeta.value)
const icono = computed(() => ficha.value.icono || FileText)
const color = computed(() => (props.externo ? '#171717' : colorDeRuta(props.href)))
</script>

<template>
  <component
    :is="externo ? 'a' : RouterLink"
    v-bind="externo ? { href, target: '_blank', rel: 'noopener noreferrer' } : { to: href }"
    class="group flex flex-col gap-4 bg-white border border-neutral-200 rounded-2xl p-5 hover:border-neutral-300 transition-colors duration-150"
  >
    <div class="flex items-start justify-between">
      <component :is="icono" class="w-5 h-5 shrink-0" :style="{ color }" />
      <component
        :is="externo ? ArrowUpRight : ArrowRight"
        class="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-[color,translate] duration-150"
        :class="externo ? 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5' : 'group-hover:translate-x-0.5'"
      />
    </div>

    <div class="flex flex-col gap-1 flex-1">
      <h3 class="text-base font-semibold text-neutral-900">{{ titulo }}</h3>
      <p
        v-if="descripcionHtml"
        class="text-sm text-neutral-700 leading-relaxed first-letter:uppercase"
        v-html="descripcionHtml"
      />
    </div>

    <span class="text-xs text-neutral-400">
      <span class="font-mono">{{ carpeta }}/</span>
      <template v-if="externo"> · en GitHub</template>
    </span>
  </component>
</template>
