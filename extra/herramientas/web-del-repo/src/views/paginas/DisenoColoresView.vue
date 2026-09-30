<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'
import PaletaEjemplo from '../../visuales/PaletaEjemplo.vue'

// extra/diseno/colores/README.md
const RECURSOS = [
  { titulo: 'uicolors.app', href: 'https://uicolors.app/generate', descripcion: 'Genera una escala de color completa (50–950) de Tailwind a partir de un color base.' },
  { titulo: 'tweakcn', href: 'https://tweakcn.com/editor/theme', descripcion: 'Editor visual de temas; saca variables CSS y de Tailwind, no componentes.' },
  { titulo: 'Refero Styles', href: 'https://styles.refero.design/', descripcion: 'Más de 2000 sistemas de diseño reales (colores, tipografía, espaciado) sacados de webs de producto.' },
  { titulo: 'Shader Gradient', href: 'https://shadergradient.co/', descripcion: 'Generador de fondos con degradado o shader; exporta a CSS.' },
  { titulo: 'Contrast Checker', href: 'https://webaim.org/resources/contrastchecker/', descripcion: 'Comprueba si un texto se lee sobre su fondo.' },
]
</script>

<template>
  <PlantillaPagina
    titulo="Colores"
    entradilla="El color en una web no es decorar: marca jerarquía y significado. Casi todo se resuelve con grises y un solo color de acento."
  >
    <h2 id="reglas">Reglas de partida</h2>
    <ul>
      <li>Grises para el texto, el fondo y los bordes; un color de acento para lo que importa.</li>
      <li>Menos colores, mejor. Si todo es de color, nada destaca.</li>
      <li>El texto y su fondo necesitan contraste suficiente (4.5:1 en el texto normal).</li>
    </ul>

    <p>Una paleta bien hecha es casi toda gris, con un solo acento:</p>
    <PaletaEjemplo />
    <p><strong>Si todo es de color, nada destaca.</strong></p>

    <h2 id="recursos">Recursos</h2>
    <RejillaTarjetas>
      <TarjetaPagina v-for="r in RECURSOS" :key="r.href" v-bind="r" />
    </RejillaTarjetas>
  </PlantillaPagina>
</template>
