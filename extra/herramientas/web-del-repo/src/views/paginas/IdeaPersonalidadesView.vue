<script setup>
import { AgentReplay, Callout } from 'elastic-ui'
import { Brain, CalendarDays } from '@lucide/vue'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import EtiquetasIdea from '../../components/EtiquetasIdea.vue'
import EnlacesIdea from '../../components/EnlacesIdea.vue'
import { ideaDe } from '../../data/ideas.js'

// extra/ideas-proyecto-fin-curso/personalidades-que-viven-una-vida-entera.md
const idea = ideaDe('personalidades-que-viven-una-vida-entera')

// Sesión de ejemplo, inventada: el personaje vive un día y lo recuerda.
const EVENTOS = [
  {
    kind: 'prompt',
    text: 'Vive el día 4.312 y cuéntame qué recuerdas.',
    note: 'Cada día simulado parte de lo que el personaje ya vivió.',
  },
  {
    kind: 'step',
    running: 'Viviendo el día 4.312',
    done: 'Día 4.312 vivido',
    icon: CalendarDays,
    output: `09:12  desayuno con Marta
11:40  discute con su jefe por el turno
18:05  vuelve a casa andando, llueve`,
    note: 'Un día normal: unas pocas escenas, con lo que siente en cada una.',
  },
  {
    kind: 'step',
    running: 'Guardando en memoria',
    done: 'Recuerdos guardados',
    icon: Brain,
    output: `guardados 3 recuerdos
1 con carga emocional alta (la discusión)`,
    note: 'Lo que vive se guarda, y lo que le afecta pesa más al recordarlo.',
  },
  {
    kind: 'answer',
    text: 'Hoy discutí con mi jefe por el turno. Me quedé con la sensación de que no me escucha, como la semana pasada. Mañana prefiero no hablarle.',
    note: 'Su carácter (prudente, hoy rencoroso) no está escrito en una ficha: sale de lo que ha vivido y recuerda.',
  },
]
</script>

<template>
  <PlantillaPagina :titulo="idea.titulo" :entradilla="idea.resumen">
    <EtiquetasIdea :idea="idea" />

    <p>{{ idea.descripcion }}</p>

    <p>
      La primera parte es predecir: con lo que alguien ha vivido y lo que pasa ahora, qué haría.
      Si a este personaje le ofrecen el turno de tarde, diría que no, porque recuerda la
      discusión de ayer.
    </p>

    <p>La segunda son vidas enteras. Mira la sesión; su carácter no está escrito, sale de la memoria.</p>
    <AgentReplay :events="EVENTOS" intro="El personaje vive un día y lo recuerda." />
    <p><strong>La personalidad no se escribe: emerge de lo que el personaje ha vivido.</strong></p>

    <p><span class="font-medium">A escala de PFC:</span> {{ idea.escala }}</p>

    <Callout type="note" title="De dónde sale">
      Idea sacada de <em>Pluto</em> (manga y serie) y de <em>sonder</em>.
    </Callout>

    <EnlacesIdea :idea="idea" />
  </PlantillaPagina>
</template>
