<script setup>
import { CodeWalkthrough, CodeWalkthroughStep } from 'elastic-ui'
import mockupEntorno from '../../../../../../extra/ideas-proyecto-fin-curso/entorno-interactivo-que-explica-el-codigo.jpg?url'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import EtiquetasIdea from '../../components/EtiquetasIdea.vue'
import EnlacesIdea from '../../components/EnlacesIdea.vue'
import { ideaDe } from '../../data/ideas.js'

// extra/ideas-proyecto-fin-curso/entorno-interactivo-que-explica-el-codigo.md
const idea = ideaDe('entorno-interactivo-que-explica-el-codigo')

const CODIGO = `async function cargarUsuario(id) {
  const res = await fetch(\`/api/usuarios/\${id}\`)
  if (!res.ok) throw new Error('No se pudo cargar')
  return res.json()
}`

const MEJORADO = `async function cargarUsuario(id) {
  const res = await fetch(\`/api/usuarios/\${id}\`)
  if (!res.ok) throw new Error(\`Usuario \${id}: \${res.status}\`)
  return res.json()
}`
</script>

<template>
  <PlantillaPagina :titulo="idea.titulo" :entradilla="idea.resumen">
    <EtiquetasIdea :idea="idea" />

    <p>{{ idea.descripcion }}</p>

    <p>Lee la explicación: el código se queda al lado y va señalando de qué habla cada paso.</p>
    <CodeWalkthrough>
      <CodeWalkthroughStep title="Qué hace" file="api.js" :code="CODIGO" highlight="1-4">
        <p>Pide un usuario a la API y devuelve el JSON. Es <code>async</code> porque espera a la red.</p>
      </CodeWalkthroughStep>
      <CodeWalkthroughStep title="Dónde puede fallar" file="api.js" :code="CODIGO" highlight="3">
        <p>Si la respuesta no es correcta, lanza un error en vez de devolver datos a medias.</p>
      </CodeWalkthroughStep>
      <CodeWalkthroughStep title="La mejora" file="api.js" :code="MEJORADO" highlight="3">
        <p>El entorno no se queda en explicarlo: propone el cambio y lo deja listo para aplicar.</p>
      </CodeWalkthroughStep>
    </CodeWalkthrough>
    <p><strong>La IA no solo explica el código: genera la interfaz que mejor lo enseña.</strong></p>

    <p>Así se vería, con el flujo, las dependencias y el estado de las variables al lado:</p>
    <figure class="not-prose">
      <img
        :src="mockupEntorno"
        :alt="idea.titulo"
        class="w-full rounded-[var(--radius-md)] border border-border"
      />
      <figcaption class="mt-2 text-sm text-fg-muted">
        Mockup: un editor con el flujo de ejecución, las dependencias, el estado de las variables y
        la explicación, generados a partir del código.
      </figcaption>
    </figure>

    <p><span class="font-medium">A escala de PFC:</span> {{ idea.escala }}</p>

    <EnlacesIdea :idea="idea" />
  </PlantillaPagina>
</template>
