<script setup>
import { Callout, Card, CardDescription, CardTitle } from 'elastic-ui'
import { Boxes, Gamepad2, GraduationCap, MonitorSmartphone, PersonStanding } from '@lucide/vue'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import EtiquetasIdea from '../../components/EtiquetasIdea.vue'
import EnlacesIdea from '../../components/EnlacesIdea.vue'
import DiagramaComportamiento from '../../visuales/DiagramaComportamiento.vue'
import { ideaDe } from '../../data/ideas.js'

// extra/ideas-proyecto-fin-curso/analisis-del-comportamiento-deportivo.md
const idea = ideaDe('analisis-del-comportamiento-deportivo')

// El perfil que sale de analizar los combates de un deportista, de ejemplo.
const PERFIL = [
  { valor: '7', texto: 'asaltos analizados' },
  { valor: '512 / 198', texto: 'golpes lanzados / conectados (39 %)' },
  { valor: '3,8 km', texto: 'distancia recorrida en el ring' },
  { valor: '4,2', texto: 'intercambios por asalto' },
]

// El boxeo es el caso de estudio; la metodología vale para más sitios.
const OTROS = [
  { icono: PersonStanding, titulo: 'Otros deportes', texto: 'Donde haya movimiento, hay features.' },
  { icono: Gamepad2, titulo: 'Videojuegos competitivos', texto: 'Partidas y decisiones de juego.' },
  { icono: Boxes, titulo: 'Rendimiento', texto: 'Comparar y seguir la evolución de una persona.' },
  { icono: GraduationCap, titulo: 'Educación', texto: 'Cómo se aprende y se participa.' },
  { icono: MonitorSmartphone, titulo: 'Interacción humano-computadora', texto: 'Cómo se usa una interfaz.' },
]
</script>

<template>
  <PlantillaPagina :titulo="idea.titulo" :entradilla="idea.resumen">
    <EtiquetasIdea :idea="idea" />

    <p>{{ idea.descripcion }}</p>

    <h2 id="como-funciona">Cómo funciona</h2>
    <p>Cada etapa se apoya en lo que produce la anterior.</p>
    <DiagramaComportamiento />
    <p><strong>El sistema no cuenta golpes: convierte el combate en datos y busca patrones en ellos.</strong></p>

    <h2 id="un-ejemplo">Un ejemplo</h2>
    <p>El perfil de un deportista tras analizar sus combates. A partir de aquí, sus números se comparan con los de otro.</p>
    <div class="not-prose grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Card v-for="p in PERFIL" :key="p.texto" size="sm" class="h-full gap-1 px-4">
        <span class="text-lg font-semibold">{{ p.valor }}</span>
        <CardDescription>{{ p.texto }}</CardDescription>
      </Card>
    </div>
    <p><strong>Dos deportistas se comparan y se agrupan por estilo; el estilo no se etiqueta a mano, sale del análisis.</strong></p>

    <h2 id="mas-alla">Para ir más allá</h2>
    <p>
      El boxeo es solo el caso de estudio. La misma cadena vale para cualquier ámbito donde
      alguien deje un rastro observable.
    </p>
    <div class="not-prose grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card v-for="o in OTROS" :key="o.titulo" size="sm" class="h-full gap-1 px-4">
        <CardTitle as="h3" size="sm" class="flex items-center gap-2">
          <component :is="o.icono" class="text-fg-muted size-4" :stroke-width="1.5" aria-hidden="true" />
          {{ o.titulo }}
        </CardTitle>
        <CardDescription>{{ o.texto }}</CardDescription>
      </Card>
    </div>

    <Callout type="note" title="Datos anonimizados">
      Los datos se tratan de forma anonimizada y minimizada. Cuando hay que asociar un análisis
      a un deportista real, se usan identificadores anónimos y su consentimiento.
    </Callout>

    <p><span class="font-medium">A escala de PFC:</span> {{ idea.escala }}</p>

    <EnlacesIdea :idea="idea" />
  </PlantillaPagina>
</template>
