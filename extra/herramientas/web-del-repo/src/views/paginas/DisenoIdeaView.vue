<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'

// extra/diseno/idea/README.md
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
    titulo="La idea"
    entradilla="Antes de tocar color o fuente, decide qué quieres que transmita. De ahí salen las decisiones."
  >
    <p>
      Dos webs con los mismos colores pueden no parecerse en nada, según la idea que hay detrás.
      Serio, cercano, editorial, técnico... Elige la dirección antes de ponerte.
    </p>

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
  </PlantillaPagina>
</template>
