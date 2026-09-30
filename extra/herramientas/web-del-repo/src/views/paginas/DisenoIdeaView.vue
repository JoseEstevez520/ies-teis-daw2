<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'
import TarjetaReferencia from '../../components/TarjetaReferencia.vue'
import Direcciones from '../../visuales/Direcciones.vue'

// extra/diseno/idea/README.md
const RECURSOS = [
  { titulo: 'Mobbin', href: 'https://mobbin.com/', descripcion: 'Capturas reales de interfaces de apps y webs, ordenadas por flujo.' },
  { titulo: 'Refero', href: 'https://refero.design/', descripcion: 'Capturas de webs reales, para ver cómo resuelven pantallas concretas.' },
  { titulo: 'Lapa Ninja', href: 'https://www.lapa.ninja/', descripcion: 'Galería de landings, actualizada cada día.' },
  { titulo: 'Dribbble', href: 'https://dribbble.com/', descripcion: 'Escaparate de diseñadores; más ideas que interfaces de verdad.' },
  { titulo: 'Awwwards', href: 'https://www.awwwards.com/', descripcion: 'Las webs mejor valoradas, para ver qué se lleva.' },
  { titulo: 'Design Minis', href: 'https://www.designminis.com/', descripcion: 'Colección de herramientas de diseño pequeñas.' },
]

// Estilos que puede seguir la idea, para verlos hechos.
const ESTILOS = [
  {
    titulo: 'Neobrutalismo',
    href: 'https://www.nngroup.com/articles/neobrutalism',
    imagen: 'https://media.nngroup.com/media/articles/opengraph_images/Social-Card-Neobrutalism-opengraph.jpg',
    texto: 'Bordes gruesos, sombras duras y colores fuertes. Nada de degradados ni sombras suaves.',
  },
  {
    titulo: 'Brutalismo web',
    href: 'https://blog.readymag.com/web-brutalism',
    imagen: 'https://storage.ghost.io/c/1f/41/1f41087a-8641-463c-b659-5db65bc9e833/content/images/size/w1200/2023/07/bru1.gif',
    texto: 'HTML desnudo, sin adornos: la forma la decide el contenido. Craigslist es el ejemplo clásico.',
  },
]
</script>

<template>
  <PlantillaPagina
    titulo="La idea"
    entradilla="Antes de tocar color o fuente, decide qué quieres que transmita. De ahí salen las decisiones."
  >
    <p>
      Dos webs con los mismos colores pueden no parecerse en nada, según la idea que hay detrás.
      Serio, cercano, editorial, técnico... Elige la dirección antes de ponerte.
    </p>

    <h2 id="un-ejemplo">Un ejemplo</h2>
    <p>La misma pantalla, la misma frase, tres direcciones distintas:</p>
    <Direcciones />
    <p><strong>El contenido es el mismo; lo que cambia es la idea.</strong></p>

    <h2 id="buscar-referencias">Buscar referencias</h2>
    <p>No hace falta inventarla de cero. Mira cómo lo han resuelto otros:</p>
    <ul>
      <li>Si no tienes ninguna referencia, búscala.</li>
      <li>Aunque tengas una, busca más parecidas: así ves qué se repite y qué es propio de esa web.</li>
    </ul>

    <h2 id="pinterest">Pinterest</h2>
    <p>
      Pinterest es la referencia para todo. Buscas lo que sea y te salen cientos de ejemplos.
      Busca en inglés ("web design", "dashboard ui", "packaging", "brand identity"...) y guarda
      lo que te guste en un tablero. Cuando tengas unas cuantas, míralas juntas: si se parecen,
      ese es tu estilo; si no, aún no tienes uno. Vale para cualquier cosa, no solo para webs.
    </p>

    <h2 id="donde-mas">Dónde más mirar</h2>
    <RejillaTarjetas>
      <TarjetaPagina v-for="r in RECURSOS" :key="r.href" v-bind="r" />
    </RejillaTarjetas>

    <h2 id="estilos">Estilos para inspirarte</h2>
    <p>Un par de direcciones que se salen de lo de siempre:</p>
    <div class="not-prose grid gap-4 sm:grid-cols-2">
      <TarjetaReferencia v-for="e in ESTILOS" :key="e.titulo" v-bind="e" />
    </div>
  </PlantillaPagina>
</template>
