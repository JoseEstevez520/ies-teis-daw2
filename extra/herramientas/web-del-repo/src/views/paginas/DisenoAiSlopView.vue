<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'
import TarjetaReferencia from '../../components/TarjetaReferencia.vue'
import SlopComparacion from '../../visuales/SlopComparacion.vue'

// extra/diseno/ai-slop/README.md
const DELATA = [
  { titulo: 'Degradados morados', texto: 'y azules, y fondos con "aurora". El color por defecto de la IA.' },
  { titulo: 'Inter', texto: '(o Roboto, Arial) para todo.' },
  { titulo: 'Cristal esmerilado', texto: '(glassmorphism) sin motivo.' },
  { titulo: 'Emojis', texto: 'como iconos y como adorno de los títulos.' },
  { titulo: 'Tres tarjetas iguales', texto: 'con un icono, un título y dos líneas.' },
  { titulo: 'Píldora sobre el hero', texto: 'y todo centrado, sin retícula.' },
  { titulo: 'Texto gris claro', texto: 'de bajo contraste.' },
  { titulo: 'Guiones largos', texto: 'en cada frase y "fade-up" al hacer scroll.' },
  { titulo: 'Textos inflados', texto: '"potente", "sin límites", "lleva tu proyecto al siguiente nivel".' },
]

const EVITARLO = [
  'Un color de acento, no un degradado. El resto, grises.',
  'Una fuente con carácter, no Inter.',
  'Menos sombras y menos esquinas redondeadas: separa con el borde y el espaciado.',
  'Iconos de verdad (una librería), no emojis.',
  'Texto concreto: qué hace, para quién y qué problema resuelve.',
  'Parte de referencias reales, no de la nada.',
]

const RECURSOS = [
  { titulo: 'Improving frontend design through Skills', href: 'https://claude.com/blog/improving-frontend-design-through-skills', descripcion: 'Anthropic explica por qué la IA cae en el look genérico y cómo evitarlo con una skill.' },
  { titulo: 'Frontend Design', href: 'https://claude.com/plugins/frontend-design', descripcion: 'La skill oficial de Claude Code para diseño con carácter.' },
  { titulo: 'AI Design Slop', href: 'https://smoothui.dev/blog/ai-design-slop', descripcion: 'Por qué la interfaz generada por IA se ve genérica.' },
  { titulo: 'AI Slop Web Design', href: 'https://www.925studios.co/blog/ai-slop-web-design-guide', descripcion: 'Guía para detectarlo y arreglarlo.' },
  { titulo: 'Made, Not Generated', href: 'https://agentfactory.panaversity.org/docs/website-design-crash-course', descripcion: 'Curso corto de diseño de webs con IA.' },
]

// Dónde ver el slop de verdad, con ejemplos e imágenes.
const EJEMPLOS = [
  {
    titulo: 'slopless.design',
    href: 'https://slopless.design/',
    imagen: 'https://slopless.design/img/heroimg.png',
    texto: 'Una galería de slop: degradados morados, formas "blobby", cajas con iconos dentro de cajas...',
  },
  {
    titulo: 'kill-ai-slop',
    href: 'https://killaislop.com',
    imagen: 'https://killaislop.com/og.png',
    texto: '33 "tells" de slop, cada uno con un antes y un después. Y una skill que los limpia de tu proyecto.',
  },
  {
    titulo: 'Unslop',
    href: 'https://unslopai.com/examples',
    imagen: 'https://unslopai.com/og',
    texto: 'Ejemplos de antes y después: el texto que sobra, tachado, y lo que se escribe en su lugar.',
  },
]
</script>

<template>
  <PlantillaPagina
    titulo="AI slop"
    entradilla="El aspecto que sale cuando dejas que la IA diseñe sin corregirla. Se reconoce a la legua y hace que todo parezca lo mismo."
  >
    <p>
      No es que la IA diseñe mal: aprende de millones de webs, así que da lo más común, y lo más
      común es el término medio. Anthropic lo admite en su propia skill de diseño, que lista los
      tres looks en los que cae la IA cuando nadie la frena.
    </p>

    <h2 id="que-lo-delata">Qué lo delata</h2>
    <ul>
      <li v-for="d in DELATA" :key="d.titulo"><strong>{{ d.titulo }}</strong> {{ d.texto }}</li>
    </ul>

    <h2 id="como-evitarlo">Cómo evitarlo</h2>
    <ul>
      <li v-for="e in EVITARLO" :key="e">{{ e }}</li>
    </ul>

    <p>La misma pantalla, sin corregirla y dirigida:</p>
    <SlopComparacion />
    <p><strong>No hace falta más color ni más efectos, sino decidir.</strong></p>

    <h2 id="ver-ejemplos">Ver ejemplos</h2>
    <p>Dónde ver el slop de verdad y su arreglo, con imágenes:</p>
    <div class="not-prose grid gap-4 sm:grid-cols-3">
      <TarjetaReferencia v-for="e in EJEMPLOS" :key="e.titulo" v-bind="e" />
    </div>

    <h2 id="recursos">Recursos</h2>
    <RejillaTarjetas>
      <TarjetaPagina v-for="r in RECURSOS" :key="r.href" v-bind="r" />
    </RejillaTarjetas>
  </PlantillaPagina>
</template>
