<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'

// extra/diseno/README.md. Las páginas, en orden, y los recursos sueltos.
const PAGINAS = [
  { href: '/extra/diseno/fuentes', titulo: '1. Fuentes', descripcion: 'Elegir tipografías y combinarlas sin liarla.' },
  { href: '/extra/diseno/colores', titulo: '2. Colores', descripcion: 'Paletas, contraste y temas.' },
  { href: '/extra/diseno/referencias', titulo: '3. Referencias', descripcion: 'Dónde mirar antes de diseñar (Pinterest, Mobbin...).' },
  { href: '/extra/diseno/ai-slop', titulo: '4. AI slop', descripcion: 'El look genérico de IA y cómo no caer en él.' },
  { href: '/extra/diseno/skills', titulo: '5. Skills', descripcion: 'Skills de agente que ayudan con el diseño.' },
]

const RECURSOS = [
  {
    grupo: 'Movimiento',
    id: 'movimiento',
    sitios: [
      { titulo: 'Dropdown menu morph', href: 'https://transitions.dev/detail.html?t=dropdown-menu-morph', descripcion: 'Patrones de transición CSS/JS explicados paso a paso.' },
      { titulo: 'Motion Prompts', href: 'https://motionprompts.dev/', descripcion: 'Animaciones con GSAP listas para copiar.' },
    ],
  },
  {
    grupo: 'Otros',
    id: 'otros',
    sitios: [
      { titulo: 'ASCII Magic', href: 'https://www.ascii-magic.com/', descripcion: 'Convierte imágenes y vídeos a arte ASCII.' },
    ],
  },
]
</script>

<template>
  <PlantillaPagina
    titulo="Diseño"
    entradilla="Diseño de interfaz y de marca: cómo elegir tipografía y color, dónde mirar referencias y cómo evitar que todo parezca hecho con IA."
  >
    <RejillaTarjetas>
      <TarjetaPagina v-for="p in PAGINAS" :key="p.href" v-bind="p" />
    </RejillaTarjetas>

    <h2 id="recursos">Recursos</h2>
    <p>Herramientas sueltas que no van a ninguna de las páginas.</p>
    <template v-for="r in RECURSOS" :key="r.id">
      <h3 :id="r.id">{{ r.grupo }}</h3>
      <RejillaTarjetas>
        <TarjetaPagina v-for="s in r.sitios" :key="s.href" v-bind="s" />
      </RejillaTarjetas>
    </template>
  </PlantillaPagina>
</template>
