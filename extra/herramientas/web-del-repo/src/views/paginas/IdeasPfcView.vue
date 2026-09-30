<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'
import { IDEAS } from '../../data/ideas.js'

// extra/ideas-proyecto-fin-curso/README.md. Cuatro partes, de lo más concreto a lo
// más abierto. Cada idea tiene su propia página (Idea*View): aquí va su tarjeta, que
// lleva a ella. Campos, Tecnología y Ejemplos son tarjetas de una lista.
const CAMPOS = [
  {
    href: 'https://datos.gob.es',
    titulo: 'Machine learning y datos masivos',
    descripcion: 'Casi cualquier tema tiene datos detrás, y juntarlos saca cosas que no se ven de uno en uno. A escala de PFC: recoger un conjunto de datos real, limpiarlo, analizarlo con un modelo y enseñar los resultados en una web.',
  },
  {
    titulo: 'Hardware',
    descripcion: 'Una placa (Arduino, ESP32, Raspberry Pi) con sensores, y la IA para entender lo que capta. A escala de PFC: sensores que mandan datos a tu backend y una web que los enseña.',
  },
  {
    titulo: 'Generative UI',
    descripcion: 'Interfaces que se generan a partir de datos en vez de pantallas fijas. A escala de PFC: un generador de formularios o paneles a partir de un JSON de configuración, con lo que ya dais en DIW.',
  },
  {
    href: '/extra/ia',
    titulo: 'Agentes e IA aplicada',
    descripcion: 'Meter un asistente o una automatización real en una app, no solo un chat pegado encima. A escala de PFC: un bot que resuelve una tarea concreta contra una API real.',
  },
  {
    href: 'https://datos.vigo.org',
    titulo: 'Ciudades y datos urbanos (Smart Cities)',
    descripcion: 'Datos, sensores, mapas e IA para entender cómo funciona una ciudad y probar cambios antes de hacerlos en la calle. Vigo tiene más de 140 conjuntos de datos abiertos, un portal de mapas y un gemelo digital 3D. Por dónde tirar: movilidad, medioambiente, urbanismo, IA urbana, gemelos digitales, ciudadanía e IoT en tiempo real.',
  },
]

const TECNOLOGIA = [
  {
    href: 'https://typesafe.ai/blog/introducing-system-one-models-and-jev',
    titulo: 'Jev',
    descripcion: 'Un modelo de IA que no genera texto, sino un valor con tipo (elección, puntuación o sí/no) y su confianza. Mucho más rápido que un LLM para clasificar.',
  },
  {
    href: 'https://github.com/wandb/openui',
    titulo: 'OpenUI',
    descripcion: 'Genera interfaces a partir de una descripción en texto y las pinta en vivo.',
  },
  {
    href: 'https://modelcontextprotocol.io/docs/extensions/apps',
    titulo: 'MCP Apps',
    descripcion: 'Una conexión MCP que, además de responder, devuelve una interfaz que se usa dentro del chat del agente. Por ejemplo, preguntar qué entregas tienes y ver el panel del Aula Virtual.',
  },
]

const EJEMPLOS = [
  {
    href: 'https://skillnet.es/',
    titulo: 'SkillNet',
    descripcion: 'Una plataforma de cursos que se generan según el perfil de cada alumno.',
  },
]
</script>

<template>
  <PlantillaPagina
    titulo="Ideas para el proyecto de fin de curso"
    entradilla="Ideas de proyectos de fin de ciclo, aunque no los vayas a hacer tú: pueden inspirar a otro, o alguien puede sumarse."
  >
    <h2 id="ideas">Ideas</h2>
    <p>Proyectos pensados para empezarlos ya. Cada uno tiene su página.</p>
    <RejillaTarjetas>
      <TarjetaPagina
        v-for="i in IDEAS"
        :key="i.slug"
        :href="`/extra/ideas-proyecto-fin-curso/${i.slug}`"
        :icono="i.icono"
        :titulo="i.titulo"
        :descripcion="i.resumen"
      />
    </RejillaTarjetas>

    <h2 id="campos">Campos</h2>
    <p>Un área por la que tirar si aún no tienes idea.</p>
    <RejillaTarjetas>
      <TarjetaPagina v-for="c in CAMPOS" :key="c.titulo" v-bind="c" />
    </RejillaTarjetas>

    <h2 id="tecnologia">Tecnología</h2>
    <p>Piezas que puedes usar como motor de tu proyecto.</p>
    <RejillaTarjetas>
      <TarjetaPagina v-for="t in TECNOLOGIA" :key="t.href" v-bind="t" />
    </RejillaTarjetas>

    <h2 id="ejemplos">Ejemplos</h2>
    <p>Proyectos que ya existen, para ver qué se está haciendo, no para copiarlos.</p>
    <RejillaTarjetas>
      <TarjetaPagina v-for="e in EJEMPLOS" :key="e.href" v-bind="e" />
    </RejillaTarjetas>
  </PlantillaPagina>
</template>
