<script setup>
import { Callout, CodeBlock } from 'elastic-ui'
import DiagramaMermaid from './DiagramaMermaid.vue'
import TarjetaInterna from './TarjetaInterna.vue'
import { VISUALES } from '../visuales/index.js'
import TarjetaRecurso from './TarjetaRecurso.vue'
import TarjetasMixtas from './TarjetasMixtas.vue'

// Un bloque de lib/markdown.js pintado con su componente: código con
// CodeBlock, avisos con Callout, listas de enlaces como tarjetas...
defineProps({
  bloque: { type: Object, required: true },
})
</script>

<template>
  <component
    :is="'h' + bloque.nivel"
    v-if="bloque.tipo === 'titulo'"
    :id="bloque.id"
    class="scroll-mt-6 text-sm font-semibold text-fg"
    v-html="bloque.html"
  />

  <p v-else-if="bloque.tipo === 'parrafo'" class="text-sm leading-relaxed text-fg-secondary" v-html="bloque.html" />

  <Callout v-else-if="bloque.tipo === 'aviso'" :type="bloque.variante" :title="bloque.titulo">
    <BloqueMarkdown v-for="(b, i) in bloque.bloques" :key="i" :bloque="b" />
  </Callout>

  <component
    :is="VISUALES[bloque.codigo.trim()]"
    v-else-if="bloque.tipo === 'codigo' && bloque.lenguaje === 'visual' && VISUALES[bloque.codigo.trim()]"
  />

  <DiagramaMermaid v-else-if="bloque.tipo === 'codigo' && bloque.lenguaje === 'mermaid'" :codigo="bloque.codigo" />

  <CodeBlock v-else-if="bloque.tipo === 'codigo'" :code="bloque.codigo" :language="bloque.lenguaje || undefined" />

  <ol v-else-if="bloque.tipo === 'pasos'" class="flex flex-col">
    <li v-for="(item, idx) in bloque.items" :key="idx" class="flex gap-3">
      <div class="flex flex-col items-center">
        <span
          class="flex size-6 shrink-0 items-center justify-center rounded-full bg-bg-muted text-xs font-semibold text-fg tabular-nums"
          >{{ idx + 1 }}</span
        >
        <span v-if="idx < bloque.items.length - 1" class="my-1 w-px flex-1 bg-border"></span>
      </div>
      <p class="pb-4 text-sm leading-relaxed text-fg-secondary" v-html="item" />
    </li>
  </ol>

  <TarjetasMixtas v-else-if="bloque.tipo === 'tarjetas-mixtas'" :items="bloque.items" />

  <div v-else-if="bloque.tipo === 'tarjetas-recursos'" class="grid gap-4 sm:grid-cols-2">
    <TarjetaRecurso
      v-for="(item, idx) in bloque.items"
      :key="idx"
      :href="item.href"
      :termino-html="item.terminoHtml"
      :descripcion-html="item.descripcionHtml"
      :favicon="item.favicon"
      :gradiente-inicial="item.gradiente"
    />
  </div>

  <div v-else-if="bloque.tipo === 'tarjetas-internas'" class="grid gap-4 sm:grid-cols-2">
    <TarjetaInterna
      v-for="item in bloque.items"
      :key="item.clave"
      :clave="item.clave"
      :href="item.href"
      :externo="item.externo"
      :descripcion-html="item.descripcionHtml"
    />
  </div>

  <dl v-else-if="bloque.tipo === 'lista-referencia'" class="flex flex-col gap-3">
    <div v-for="(item, idx) in bloque.items" :key="idx" class="flex flex-col gap-0.5">
      <dt class="text-sm font-semibold text-fg" v-html="item.terminoHtml.replace(/:\s*$/, '')" />
      <dd
        v-if="item.descripcionHtml"
        class="text-sm leading-relaxed text-fg-secondary first-letter:uppercase"
        v-html="item.descripcionHtml"
      />
    </div>
  </dl>

  <ul v-else-if="bloque.tipo === 'lista'" class="flex flex-col gap-2">
    <li v-for="(item, idx) in bloque.items" :key="idx" class="flex items-start gap-2">
      <span class="mt-2 size-1 shrink-0 rounded-full bg-fg-faint"></span>
      <p class="text-sm leading-relaxed text-fg-secondary" v-html="item" />
    </li>
  </ul>

  <!-- Sin caja alrededor: solo las líneas entre filas (ver design.md). -->
  <div v-else-if="bloque.tipo === 'tabla'" class="overflow-x-auto scrollbar-subtle">
    <table class="w-full text-left text-sm">
      <thead>
        <tr class="border-b border-border-strong">
          <th
            v-for="(c, idx) in bloque.cabeceras"
            :key="idx"
            class="px-3 py-2 text-xs font-medium text-fg-muted first:pl-0"
            v-html="c"
          />
        </tr>
      </thead>
      <tbody class="divide-y divide-border">
        <tr v-for="(fila, fidx) in bloque.filas" :key="fidx">
          <td v-for="(c, cidx) in fila" :key="cidx" class="px-3 py-2.5 align-top text-fg-secondary first:pl-0" v-html="c" />
        </tr>
      </tbody>
    </table>
  </div>

  <hr v-else-if="bloque.tipo === 'separador'" class="border-border" />

  <blockquote
    v-else-if="bloque.tipo === 'cita'"
    class="border-l-2 border-border-strong pl-4 text-sm text-fg-secondary italic [&>p+p]:mt-2"
    v-html="bloque.html"
  />
</template>
