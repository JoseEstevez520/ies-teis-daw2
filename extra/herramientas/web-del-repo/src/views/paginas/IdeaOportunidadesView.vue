<script setup>
import { Callout, CodeBlock } from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import EtiquetasIdea from '../../components/EtiquetasIdea.vue'
import EnlacesIdea from '../../components/EnlacesIdea.vue'
import DiagramaSenda from '../../visuales/DiagramaSenda.vue'
import { ideaDe } from '../../data/ideas.js'

// extra/ideas-proyecto-fin-curso/oportunidades-y-trayectoria.md
const idea = ideaDe('oportunidades-y-trayectoria')

// Una nota de ejemplo del vault, para enseñar cómo se guardaría.
const NOTA = `---
tipo: oportunidad
empresa: Mareo Software
fuente: https://mareo.example/ofertas
estado: por contactar
---

# Mareo Software

Backend en Java y Spring. Piden prácticas de 3 meses.

- Tecnologías: [[Java]], [[Spring]]
- Encaja con: [[FCT 2027]]
- Preguntar por: horario y tutor`
</script>

<template>
  <PlantillaPagina :titulo="idea.titulo" :entradilla="idea.resumen">
    <EtiquetasIdea :idea="idea" />

    <p>{{ idea.descripcion }}</p>

    <h2 id="como-funciona">Cómo funciona</h2>
    <p>Una app con agentes sobre un vault de Markdown, sin base de datos.</p>
    <DiagramaSenda />
    <p><strong>Los agentes leen el vault antes de responder, y lo que averiguan se queda en él.</strong></p>

    <h2 id="un-ejemplo">Un ejemplo</h2>
    <p>Cada oportunidad es una nota de Markdown con su fuente. Una, por ejemplo:</p>
    <CodeBlock :code="NOTA" title="vault/oportunidades/mareo-software.md" />

    <Callout type="note" title="Para empezar">
      OpenCode no es el motor: es un atajo para la primera versión, que ya trae agentes. Lo suyo
      es una app propia con los agentes en Python.
    </Callout>

    <p><span class="font-medium">A escala de PFC:</span> {{ idea.escala }}</p>

    <EnlacesIdea :idea="idea" />
  </PlantillaPagina>
</template>
