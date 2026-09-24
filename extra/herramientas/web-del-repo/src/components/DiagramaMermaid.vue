<script>
// Compartido entre todos los diagramas de la página: ids únicos, y una cola
// porque mermaid.render no aguanta varias llamadas a la vez (se pisan).
let contador = 0
let cola = Promise.resolve()

async function cargarMermaid() {
  const { default: mermaid } = await import('mermaid')
  return mermaid
}
</script>

<script setup>
import { onMounted, ref } from 'vue'

// Bloque ```mermaid de un .md, pintado como diagrama. GitHub hace lo mismo con
// el mismo bloque, así que el .md sigue siendo la única fuente. Mermaid pesa
// bastante: se carga solo en las páginas que tienen algún diagrama.
const props = defineProps({
  codigo: { type: String, required: true },
})

const svg = ref('')
const error = ref(false)
onMounted(() => {
  cola = cola.then(renderizar)
})

async function renderizar() {
  try {
    const mermaid = await cargarMermaid()
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      fontFamily: 'inherit',
      sequence: { mirrorActors: false },
      themeVariables: {
        primaryColor: '#ffffff',
        primaryBorderColor: '#a3a3a3',
        primaryTextColor: '#171717',
        lineColor: '#a3a3a3',
        secondaryColor: '#fafafa',
        tertiaryColor: '#fafafa',
        clusterBkg: '#fafafa',
        clusterBorder: '#e5e5e5',
        actorBkg: '#ffffff',
        actorBorder: '#a3a3a3',
        noteBkgColor: '#fafafa',
        noteBorderColor: '#e5e5e5',
        fontSize: '14px',
      },
    })
    svg.value = (await mermaid.render(`diagrama-${contador++}`, props.codigo)).svg
  } catch {
    error.value = true
  }
}
</script>

<template>
  <div class="rounded-lg border border-neutral-200 bg-white p-4 overflow-x-auto">
    <div v-if="svg" class="flex justify-center [&_svg]:max-w-full [&_svg]:h-auto" v-html="svg" />
    <pre v-else-if="error" class="text-xs font-mono text-neutral-800"><code>{{ codigo }}</code></pre>
    <div v-else class="h-24" />
  </div>
</template>
