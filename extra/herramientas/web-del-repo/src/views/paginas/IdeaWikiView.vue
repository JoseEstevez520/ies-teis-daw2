<script setup>
import { Callout, Card, CardDescription, CardTitle, ChatMessage, ChatSource, ChatSources, ChatThread, ChatTool } from 'elastic-ui'
import { Video } from '@lucide/vue'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import EtiquetasIdea from '../../components/EtiquetasIdea.vue'
import EnlacesIdea from '../../components/EnlacesIdea.vue'
import DiagramaTemas from '../../visuales/DiagramaTemas.vue'
import { ideaDe } from '../../data/ideas.js'

// extra/ideas-proyecto-fin-curso/wiki-de-un-canal-de-youtube.md
const idea = ideaDe('wiki-de-un-canal-de-youtube')

// Conversación de ejemplo, sobre un canal inventado.
const FUENTES = [
  { title: 'Vídeo 12 · Hooks, min 12:34', url: 'https://www.youtube.com' },
  { title: 'Vídeo 15 · Reglas de los hooks, min 3:02', url: 'https://www.youtube.com' },
]

// Lo que se puede sacar del texto, además de responder.
const ANALISIS = [
  { titulo: 'De qué habla', texto: 'Los temas que más trata, sacados de las transcripciones.' },
  { titulo: 'Cómo cambia', texto: 'Qué temas suben o bajan con los años.' },
  { titulo: 'Qué preguntas se repiten', texto: 'Las dudas que vuelven una y otra vez.' },
  { titulo: 'Qué funciona', texto: 'Qué vídeos se ven y se comentan más.' },
]
</script>

<template>
  <PlantillaPagina :titulo="idea.titulo" :entradilla="idea.resumen">
    <EtiquetasIdea :idea="idea" />

    <p>{{ idea.descripcion }}</p>

    <h2 id="como-funciona">Cómo funciona</h2>
    <p>Un chat sobre las transcripciones. Fíjate en que cada frase lleva su cita.</p>
    <div class="not-prose flex h-[26rem] flex-col rounded-[var(--radius-xl)] border border-border bg-bg-subtle p-4">
      <ChatThread label="Preguntas y respuestas sobre el canal">
        <ChatMessage role="user">¿Qué dijo sobre los hooks de React?</ChatMessage>
        <ChatMessage role="assistant">
          <template #before>
            <ChatTool label="Buscó en 3 vídeos" state="done" :icon="Video">
              <ChatSources>
                <ChatSource v-for="f in FUENTES" :key="f.title" v-bind="f" />
              </ChatSources>
            </ChatTool>
          </template>
          <p>
            En el <strong>vídeo 12, min 12:34</strong> explica que un hook es una función que empieza
            por <code>use</code> y guarda estado dentro del componente. Avisa de que solo se puede
            llamar en el cuerpo del componente, no dentro de un <code>if</code> ni de un bucle
            (<strong>vídeo 15, min 3:02</strong>).
          </p>
        </ChatMessage>
      </ChatThread>
    </div>
    <p><strong>Cada respuesta cita el vídeo y el minuto, así puedes ir a comprobarlo.</strong></p>

    <h2 id="mas-alla">Para ir más allá</h2>
    <p>Y, una vez tienes el texto de todos los vídeos, se puede aprender del canal. Por ejemplo, cómo cambian los temas con los años:</p>
    <DiagramaTemas />
    <p><strong>Se ve de un vistazo qué temas crecen y cuáles se dejan.</strong></p>

    <p>Y más cosas que salen del mismo texto:</p>
    <div class="not-prose grid gap-4 sm:grid-cols-2">
      <Card v-for="a in ANALISIS" :key="a.titulo" size="sm" class="h-full gap-1 px-4">
        <CardTitle as="h3" size="sm">{{ a.titulo }}</CardTitle>
        <CardDescription>{{ a.texto }}</CardDescription>
      </Card>
    </div>
    <p><strong>El mismo texto sirve para responder preguntas y para entender el canal.</strong></p>

    <p><span class="font-medium">A escala de PFC:</span> {{ idea.escala }}</p>

    <Callout type="note" title="Ejemplo inventado">
      La conversación y los vídeos son de ejemplo, para enseñar cómo se vería.
    </Callout>

    <EnlacesIdea :idea="idea" />
  </PlantillaPagina>
</template>
