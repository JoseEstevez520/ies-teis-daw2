<script setup>
import { AgentReplay } from 'elastic-ui'
import { Brain, CalendarDays } from '@lucide/vue'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import EtiquetasIdea from '../../components/EtiquetasIdea.vue'
import EnlacesIdea from '../../components/EnlacesIdea.vue'
import TarjetaReferencia from '../../components/TarjetaReferencia.vue'
import DiagramaConducta from '../../visuales/DiagramaConducta.vue'
import { ideaDe } from '../../data/ideas.js'

// extra/ideas-proyecto-fin-curso/personalidades-que-viven-una-vida-entera.md
const idea = ideaDe('personalidades-que-viven-una-vida-entera')

// De dónde sale la idea, con su imagen y su enlace.
const REFERENCIAS = [
  {
    titulo: 'Pluto',
    href: 'https://en.wikipedia.org/wiki/Pluto_(manga)',
    imagen: 'https://pluto-anime.com/assets/images/ogp.jpg',
    texto: 'El manga y la serie de Naoki Urasawa: robots con vida interior y una memoria que los cambia.',
  },
  {
    titulo: 'sonder',
    href: 'https://www.dictionaryofobscuresorrows.com/post/23536922667/sonder',
    imagen: 'https://images.unsplash.com/photo-1721230306879-80c97f3eadba?fm=jpg&q=60&w=1200&auto=format&fit=crop',
    texto: 'La palabra de John Koenig: cada persona con la que te cruzas vive una vida tan compleja como la tuya.',
  },
]

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

    <h2 id="como-funciona">Cómo funciona</h2>
    <p>
      Entran lo que alguien ha vivido y la situación de ahora, y sale qué haría. La misma persona
      reacciona distinto según lo que recuerda.
    </p>
    <DiagramaConducta />
    <p>
      Si a este personaje le ofrecen el turno de tarde, diría que no, porque recuerda la discusión
      de ayer.
    </p>
    <p><strong>Con la memoria y la situación, el modelo dice qué haría, no una ficha fija.</strong></p>

    <h2 id="un-ejemplo">Un ejemplo</h2>
    <p>Un día en la vida del personaje. Mira la sesión; su carácter no está escrito, sale de la memoria.</p>
    <AgentReplay :events="EVENTOS" intro="El personaje vive un día y lo recuerda." />
    <p><strong>La personalidad no se escribe: emerge de lo que el personaje ha vivido.</strong></p>

    <p><span class="font-medium">A escala de PFC:</span> {{ idea.escala }}</p>

    <h2 id="de-donde-sale">De dónde sale</h2>
    <p>La idea parte de <em>Pluto</em> (manga y serie) y de <em>sonder</em>:</p>
    <div class="not-prose grid gap-4 sm:grid-cols-2">
      <TarjetaReferencia v-for="r in REFERENCIAS" :key="r.titulo" v-bind="r" />
    </div>

    <EnlacesIdea :idea="idea" />
  </PlantillaPagina>
</template>
