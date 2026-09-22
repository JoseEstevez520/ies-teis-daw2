<script setup>
import { computed } from 'vue'
import { AlertTriangle, Info, Terminal } from '@lucide/vue'
import { parseMarkdown } from '../lib/markdown.js'

const props = defineProps({
  markdown: { type: String, required: true },
  directorio: { type: String, required: true },
})

const bloques = computed(() => parseMarkdown(props.markdown, { directorio: props.directorio }))
</script>

<template>
  <div class="flex flex-col gap-5">
    <template v-for="(bloque, i) in bloques" :key="i">
      <component
        :is="'h' + bloque.nivel"
        v-if="bloque.tipo === 'titulo'"
        :class="
          bloque.nivel === 2
            ? 'text-base font-semibold text-neutral-900 pb-2 border-b border-neutral-200 mt-2'
            : 'text-sm font-semibold text-neutral-900 mt-1'
        "
        v-html="bloque.html"
      />

      <p v-else-if="bloque.tipo === 'parrafo'" class="text-sm text-neutral-700 leading-relaxed" v-html="bloque.html" />

      <div v-else-if="bloque.tipo === 'aviso'" class="flex gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
        <component :is="bloque.variante === 'nota' ? Info : AlertTriangle" class="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
        <p class="text-sm text-neutral-700 leading-relaxed" v-html="bloque.html" />
      </div>

      <div v-else-if="bloque.tipo === 'codigo'" class="rounded-lg border border-neutral-200 overflow-hidden">
        <div class="flex items-center gap-2 px-4 py-2 bg-neutral-50 border-b border-neutral-200">
          <Terminal class="w-3.5 h-3.5 text-neutral-400" />
          <span class="text-xs text-neutral-400 font-mono">{{ bloque.lenguaje || 'texto' }}</span>
        </div>
        <pre class="p-4 overflow-x-auto text-xs font-mono text-neutral-800 bg-white"><code>{{ bloque.codigo }}</code></pre>
      </div>

      <ol v-else-if="bloque.tipo === 'pasos'" class="flex flex-col">
        <li v-for="(item, idx) in bloque.items" :key="idx" class="flex gap-3">
          <div class="flex flex-col items-center">
            <span
              class="flex items-center justify-center w-6 h-6 rounded-full border border-neutral-300 text-neutral-900 text-xs font-semibold shrink-0"
              >{{ idx + 1 }}</span
            >
            <span v-if="idx < bloque.items.length - 1" class="w-px flex-1 bg-neutral-200 my-1"></span>
          </div>
          <p class="text-sm text-neutral-700 leading-relaxed pb-4" v-html="item" />
        </li>
      </ol>

      <div v-else-if="bloque.tipo === 'lista-referencia'" class="flex flex-col divide-y divide-neutral-200 rounded-lg border border-neutral-200 overflow-hidden">
        <div v-for="(item, idx) in bloque.items" :key="idx" class="flex flex-col gap-1 p-4 bg-white">
          <p class="text-sm font-semibold text-neutral-900" v-html="item.terminoHtml" />
          <p v-if="item.descripcionHtml" class="text-sm text-neutral-700 leading-relaxed" v-html="item.descripcionHtml" />
        </div>
      </div>

      <ul v-else-if="bloque.tipo === 'lista'" class="flex flex-col gap-2">
        <li v-for="(item, idx) in bloque.items" :key="idx" class="flex items-start gap-2">
          <span class="mt-2 w-1 h-1 rounded-full bg-neutral-400 shrink-0"></span>
          <p class="text-sm text-neutral-700 leading-relaxed" v-html="item" />
        </li>
      </ul>

      <div v-else-if="bloque.tipo === 'tabla'" class="overflow-x-auto rounded-lg border border-neutral-200">
        <table class="w-full text-sm text-left">
          <thead class="bg-neutral-50">
            <tr>
              <th
                v-for="(c, idx) in bloque.cabeceras"
                :key="idx"
                class="px-4 py-2 font-semibold text-neutral-900 text-xs uppercase tracking-wide"
                v-html="c"
              />
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200">
            <tr v-for="(fila, fidx) in bloque.filas" :key="fidx">
              <td v-for="(c, cidx) in fila" :key="cidx" class="px-4 py-2 text-neutral-700 align-top" v-html="c" />
            </tr>
          </tbody>
        </table>
      </div>

      <hr v-else-if="bloque.tipo === 'separador'" class="border-neutral-200" />

      <div v-else-if="bloque.tipo === 'cita'" class="border-l-2 border-neutral-300 pl-4 text-neutral-600 italic text-sm" v-html="bloque.html" />
    </template>
  </div>
</template>
