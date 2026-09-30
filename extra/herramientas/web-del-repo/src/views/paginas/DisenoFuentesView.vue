<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'
import MuestraFuentes from '../../visuales/MuestraFuentes.vue'

// extra/diseno/fuentes/README.md
const RECURSOS = [
  { titulo: 'Google Fonts', href: 'https://fonts.google.com/', descripcion: 'Miles de fuentes libres, con la licencia incluida. El punto de partida.' },
  { titulo: 'Fontshare', href: 'https://www.fontshare.com/', descripcion: 'Fuentes de calidad, gratis también para uso comercial.' },
  { titulo: 'WhatTheFont', href: 'https://www.myfonts.com/es/pages/whatthefont', descripcion: 'Identifica una tipografía a partir de una imagen.' },
  { titulo: 'Typescale', href: 'https://typescale.com/', descripcion: 'Calcula la escala de tamaños: la proporción entre título, texto y pie.' },
]
</script>

<template>
  <PlantillaPagina
    titulo="Fuentes"
    entradilla="La tipografía decide más de lo que parece: con la misma maqueta, una fuente la hace seria y otra la arruina."
  >
    <h2 id="como-elegir">Cómo elegir</h2>
    <ul>
      <li>Una fuente para todo suele bastar. Si usas dos, que se diferencien (una de texto y una de titulares), no dos parecidas.</li>
      <li>Mira las letras que la delatan: la <code>a</code>, la <code>g</code>, la <code>R</code> y los números.</li>
      <li>Prueba con el texto real de tu web, no con "Lorem ipsum".</li>
      <li>El contraste lo dan el tamaño y el peso, no mezclar fuentes.</li>
    </ul>

    <h2 id="las-de-siempre">Las de siempre</h2>
    <p>
      Inter, Roboto, Arial o las del sistema salen en casi todo lo que hace la IA, y no son
      malas: son neutras y se leen bien. El problema es que, al usarlas todos, todo se parece.
      Si quieres que lo tuyo destaque, busca una con carácter (una serif, una grotesca con
      personalidad, una mono) y resérvala para los títulos.
    </p>
    <MuestraFuentes />
    <p><strong>Cambiar de fuente cambia el tono, sin tocar el texto.</strong></p>

    <h2 id="recursos">Recursos</h2>
    <RejillaTarjetas>
      <TarjetaPagina v-for="r in RECURSOS" :key="r.href" v-bind="r" />
    </RejillaTarjetas>
  </PlantillaPagina>
</template>
