<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'

// extra/diseno/referencias/README.md
const RECURSOS = [
  { titulo: 'Mobbin', href: 'https://mobbin.com/', descripcion: 'Capturas reales de interfaces de apps y webs, ordenadas por flujo.' },
  { titulo: 'Refero', href: 'https://refero.design/', descripcion: 'Capturas de webs reales, para ver cómo resuelven pantallas concretas.' },
  { titulo: 'Dribbble', href: 'https://dribbble.com/', descripcion: 'Escaparate de diseñadores; más ideas que interfaces de verdad.' },
  { titulo: 'Awwwards', href: 'https://www.awwwards.com/', descripcion: 'Las webs mejor valoradas, para ver qué se lleva.' },
  { titulo: 'Design Minis', href: 'https://www.designminis.com/', descripcion: 'Colección de herramientas de diseño pequeñas.' },
]
</script>

<template>
  <PlantillaPagina
    titulo="Referencias"
    entradilla="Antes de diseñar (o de pedirle a la IA que diseñe), mira cómo lo han resuelto otros. No para copiar, sino para ver qué funciona."
  >
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
  </PlantillaPagina>
</template>
