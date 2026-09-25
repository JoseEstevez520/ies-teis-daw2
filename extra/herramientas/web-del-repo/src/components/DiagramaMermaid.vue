<script>
// Compartido entre todos los diagramas de la página: ids únicos, y una cola
// porque mermaid.render no aguanta varias llamadas a la vez (se pisan).
let contador = 0
let cola = Promise.resolve()

async function cargarMermaid() {
  const { default: mermaid } = await import('mermaid')
  return mermaid
}

// Mermaid necesita colores de verdad, no variables CSS: se leen de los tokens
// de elastic-ui ya resueltos para el tema que se está viendo.
function colores() {
  const estilo = getComputedStyle(document.documentElement)
  const leer = (token) => {
    const muestra = document.createElement('span')
    muestra.style.color = `var(${token})`
    document.body.appendChild(muestra)
    const color = getComputedStyle(muestra).color
    muestra.remove()
    return color || estilo.getPropertyValue(token)
  }
  return {
    fondo: leer('--color-bg'),
    sutil: leer('--color-bg-subtle'),
    texto: leer('--color-fg'),
    linea: leer('--color-fg-faint'),
    borde: leer('--color-border'),
  }
}
</script>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useTheme } from 'elastic-ui'

// Bloque ```mermaid de un .md, pintado como diagrama. GitHub hace lo mismo con
// el mismo bloque, así que el .md sigue siendo la única fuente. Mermaid pesa
// bastante: se carga solo en las páginas que tienen algún diagrama.
const props = defineProps({
  code: { type: String, required: true },
})

const svg = ref('')
const error = ref(false)
const { theme } = useTheme()

const pintar = () => (cola = cola.then(renderizar))
onMounted(pintar)
// Al cambiar de tema se vuelve a pintar con los colores nuevos.
watch(theme, () => requestAnimationFrame(pintar))

async function renderizar() {
  try {
    const mermaid = await cargarMermaid()
    const c = colores()
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      fontFamily: 'inherit',
      sequence: { mirrorActors: false },
      // Sin sombras: el tema base las pone en los nodos y chocan con design.md.
      themeCSS: '* { filter: none !important; }',
      themeVariables: {
        background: c.fondo,
        primaryColor: c.fondo,
        primaryBorderColor: c.linea,
        primaryTextColor: c.texto,
        textColor: c.texto,
        lineColor: c.linea,
        secondaryColor: c.sutil,
        tertiaryColor: c.sutil,
        clusterBkg: c.sutil,
        clusterBorder: c.borde,
        actorBkg: c.fondo,
        actorBorder: c.linea,
        actorTextColor: c.texto,
        signalColor: c.texto,
        signalTextColor: c.texto,
        noteBkgColor: c.sutil,
        noteBorderColor: c.borde,
        noteTextColor: c.texto,
        fontSize: '14px',
      },
    })
    svg.value = (await mermaid.render(`diagrama-${contador++}`, props.code)).svg
  } catch {
    error.value = true
  }
}
</script>

<template>
  <div class="overflow-x-auto rounded-[var(--radius-lg)] bg-bg-subtle p-4 scrollbar-subtle">
    <div v-if="svg" class="flex justify-center [&_svg]:h-auto [&_svg]:max-w-full" v-html="svg" />
    <pre v-else-if="error" class="font-mono text-xs text-fg-secondary"><code>{{ code }}</code></pre>
    <div v-else class="h-24" />
  </div>
</template>
