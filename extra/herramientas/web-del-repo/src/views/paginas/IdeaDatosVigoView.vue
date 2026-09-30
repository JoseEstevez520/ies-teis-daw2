<script setup>
import { Card, CardDescription, CardTitle } from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import EtiquetasIdea from '../../components/EtiquetasIdea.vue'
import EnlacesIdea from '../../components/EnlacesIdea.vue'
import DiagramaDatos from '../../visuales/DiagramaDatos.vue'
import { ideaDe } from '../../data/ideas.js'

// extra/ideas-proyecto-fin-curso/datos-de-vigo.md
const idea = ideaDe('datos-de-vigo')

// Ejemplos de conjuntos del portal de Vigo.
const DATOS = [
  'Tráfico y cámaras en tiempo real',
  'Paradas y líneas de bus',
  'Callejero y cartografía',
  'Población y media de edad por barrio',
  'Farmacias, colegios y centros culturales',
  'Puntos de interés turístico',
]

// Qué se puede montar con los datos.
const QUE_HACER = [
  { titulo: 'Visualizar', texto: 'Un mapa o un gráfico que enseñe el dato mejor que una tabla.' },
  { titulo: 'Analizar', texto: 'Sacar patrones y comparar zonas, barrios o años.' },
  { titulo: 'Cruzar', texto: 'Juntar dos conjuntos y ver lo que no se ve en cada uno por separado.' },
  { titulo: 'Simular', texto: 'Probar un escenario sobre un mapa antes de que pase.' },
]
</script>

<template>
  <PlantillaPagina :titulo="idea.titulo" :entradilla="idea.resumen">
    <EtiquetasIdea :idea="idea" />

    <p>{{ idea.descripcion }}</p>

    <h2 id="que-datos-hay">Qué datos hay</h2>
    <p>Algunos de los conjuntos que puedes coger:</p>
    <ul>
      <li v-for="d in DATOS" :key="d">{{ d }}</li>
    </ul>

    <h2 id="como-funciona">Cómo funciona</h2>
    <p>De los datos en crudo a algo que se entiende. Fíjate en que analizar va antes de la web.</p>
    <DiagramaDatos />
    <p><strong>La parte con más trabajo no es la web, es limpiar y entender el dato.</strong></p>

    <h2 id="que-se-puede-montar">Qué se puede montar</h2>
    <p>El mismo dato da para varias cosas, según lo que quieras enseñar:</p>
    <div class="not-prose grid gap-4 sm:grid-cols-2">
      <Card v-for="q in QUE_HACER" :key="q.titulo" size="sm" class="h-full gap-1 px-4">
        <CardTitle as="h3" size="sm">{{ q.titulo }}</CardTitle>
        <CardDescription>{{ q.texto }}</CardDescription>
      </Card>
    </div>
    <p><strong>La web es la excusa para trabajar el dato: analizarlo, compararlo y enseñarlo bien.</strong></p>

    <p><span class="font-medium">A escala de PFC:</span> {{ idea.escala }}</p>

    <EnlacesIdea :idea="idea" />
  </PlantillaPagina>
</template>
