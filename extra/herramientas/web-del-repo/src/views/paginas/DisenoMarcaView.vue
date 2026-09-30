<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaReferencia from '../../components/TarjetaReferencia.vue'
import MarcaKit from '../../visuales/MarcaKit.vue'

// extra/diseno/marca/README.md
const RECURSOS = [
  {
    titulo: 'Fonts In Use',
    href: 'https://fontsinuse.com/in/2/formats/9/branding-identity',
    imagen: 'https://cards.fontsinuse.com/cardshot?s=twitter&t=gallery&url=https://fontsinuse.com/in/2/formats/9/branding-identity&k=3982089ec0fa7a2f88c4cada9c91a2ec&v=657723b4',
    texto: 'Cómo se usa la tipografía en marcas reales, con el detalle de cada fuente.',
  },
  {
    titulo: 'LogoLounge',
    href: 'https://www.logolounge.com/',
    imagen: 'https://www.logolounge.com/wp-content/uploads/2024/07/ll_share.png',
    texto: 'Archivo de logos, ordenado por sector y por año, para ver tendencias.',
  },
  {
    titulo: 'Behance',
    href: 'https://www.behance.net/search/projects/brand%20identity',
    texto: 'Miles de identidades de marca, para ver cómo se monta una de principio a fin.',
  },
  {
    titulo: 'Brand New',
    href: 'https://www.underconsideration.com/brandnew/',
    texto: 'Críticas de rediseños de marcas conocidas: qué cambió y por qué.',
  },
]

const PARTES = [
  ['Nombre', 'cómo se llama y cómo se escribe (¿todo junto, con mayúscula?).'],
  ['Logo', 'la marca gráfica; puede ser solo el nombre (logotipo) o un símbolo aparte.'],
  ['Paleta', 'los colores de la marca, pocos y con uno principal.'],
  ['Tipografía', 'la fuente o fuentes con las que habla.'],
  ['Tono', 'cómo escribe: cercano, formal, con humor...'],
]
</script>

<template>
  <PlantillaPagina
    titulo="Marca"
    entradilla="Una marca no es solo un logo. Es el nombre, cómo habla, sus colores y su tipografía, y que todo se sostenga junto."
  >
    <h2 id="que-la-forma">Qué la forma</h2>
    <ul>
      <li v-for="[titulo, texto] in PARTES" :key="titulo"><strong>{{ titulo }}:</strong> {{ texto }}</li>
    </ul>

    <h2 id="un-ejemplo">Un ejemplo</h2>
    <p>Un kit de marca (inventado) tiene esto, y todo sale del mismo sitio:</p>
    <MarcaKit />
    <p><strong>Si el logo, el color y el tono dicen lo mismo, la marca se reconoce.</strong></p>

    <h2 id="recursos">Recursos</h2>
    <RejillaTarjetas>
      <TarjetaReferencia v-for="r in RECURSOS" :key="r.href" v-bind="r" />
    </RejillaTarjetas>
  </PlantillaPagina>
</template>
