<script setup>
import { AnimatedList, Tabs, TabsContent, TabsList, TabsTrigger } from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import EtiquetasIdea from '../../components/EtiquetasIdea.vue'
import EnlacesIdea from '../../components/EnlacesIdea.vue'
import DiagramaPanelMCP from '../../visuales/DiagramaPanelMCP.vue'
import { ideaDe } from '../../data/ideas.js'

// extra/ideas-proyecto-fin-curso/panel-del-aula-virtual.md
const idea = ideaDe('panel-del-aula-virtual')

// Datos de ejemplo, para enseñar cómo se vería el panel.
const ENTREGAS = [
  { titulo: 'Práctica 3 · API de tareas', cuando: 'Entregada' },
  { titulo: 'Examen de Spring', cuando: 'Viernes' },
  { titulo: 'Apunte de Vue', cuando: 'Pendiente' },
]
const NOTAS = [
  { titulo: 'DWCS', cuando: '7,5' },
  { titulo: 'DWCC', cuando: '8,2' },
  { titulo: 'DIW', cuando: '9,0' },
]
const AVISOS = [
  { titulo: 'El examen se mueve al viernes', cuando: 'Hoy' },
  { titulo: 'Nueva práctica en el Aula Virtual', cuando: 'Ayer' },
  { titulo: 'Cambio de aula el jueves', cuando: 'Lunes' },
]
const PESTANAS = [
  { valor: 'entregas', titulo: 'Entregas', items: ENTREGAS },
  { valor: 'notas', titulo: 'Notas', items: NOTAS },
  { valor: 'avisos', titulo: 'Avisos', items: AVISOS },
]
</script>

<template>
  <PlantillaPagina :titulo="idea.titulo" :entradilla="idea.resumen">
    <EtiquetasIdea :idea="idea" />

    <p>{{ idea.descripcion }}</p>

    <h2 id="como-funciona">Cómo funciona</h2>
    <p>Así se vería el panel. Elige una pestaña; los datos son de ejemplo.</p>
    <Tabs default-value="entregas" variant="underline">
      <TabsList>
        <TabsTrigger v-for="p in PESTANAS" :key="p.valor" :value="p.valor">{{ p.titulo }}</TabsTrigger>
      </TabsList>
      <TabsContent v-for="p in PESTANAS" :key="p.valor" :value="p.valor">
        <AnimatedList :items="p.items" :item-key="(e) => e.titulo" class="flex flex-col" item-class="border-b border-border py-2.5 last:border-0">
          <template #default="{ item }">
            <div class="flex items-center justify-between gap-4 text-sm">
              <span class="text-fg">{{ item.titulo }}</span>
              <span class="shrink-0 text-fg-muted">{{ item.cuando }}</span>
            </div>
          </template>
        </AnimatedList>
      </TabsContent>
    </Tabs>
    <p><strong>Entregas, notas y avisos, en una sola pantalla.</strong></p>

    <h2 id="mas-alla">Para ir más allá</h2>
    <p>
      El panel es el principio. Con una conexión MCP, tu agente mira el Aula Virtual y te
      devuelve el panel dentro del chat: le preguntas qué te falta por entregar y te lo dice con
      tus datos. Encima se pueden montar más cosas.
    </p>
    <DiagramaPanelMCP />
    <p><strong>El agente consulta el Aula Virtual por MCP y te responde con tus datos.</strong></p>

    <p><span class="font-medium">A escala de PFC:</span> {{ idea.escala }}</p>

    <EnlacesIdea :idea="idea" />
  </PlantillaPagina>
</template>
