<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'

// extra/diseno-web/README.md, agrupado por para qué sirve cada herramienta.
const GRUPOS = [
  {
    id: 'color-y-temas',
    titulo: 'Color y temas',
    herramientas: [
      { titulo: 'uicolors.app', href: 'https://uicolors.app/generate', descripcion: 'Genera una escala de color completa (50–950) de Tailwind a partir de un color base.' },
      { titulo: 'tweakcn', href: 'https://tweakcn.com/editor/theme', descripcion: 'Editor visual de temas: saca variables CSS y de Tailwind, no componentes.' },
      { titulo: 'Refero Styles', href: 'https://styles.refero.design/', descripcion: 'Más de 2000 sistemas de diseño reales (colores, tipografía, espaciado) sacados de webs de producto.' },
      { titulo: 'Shader Gradient', href: 'https://shadergradient.co/', descripcion: 'Generador de fondos con degradado o shader; exporta a CSS.' },
    ],
  },
  {
    id: 'tipografia-y-referencias',
    titulo: 'Tipografía y referencias',
    herramientas: [
      { titulo: 'WhatTheFont', href: 'https://www.myfonts.com/es/pages/whatthefont', descripcion: 'Identifica una tipografía a partir de una imagen.' },
      { titulo: 'Mobbin', href: 'https://mobbin.com/', descripcion: 'Capturas reales de interfaces de apps y webs, para tomar referencia.' },
      { titulo: 'Design Minis', href: 'https://www.designminis.com/', descripcion: 'Colección de herramientas de diseño pequeñas.' },
    ],
  },
  {
    id: 'movimiento',
    titulo: 'Movimiento',
    herramientas: [
      { titulo: 'Dropdown menu morph', href: 'https://transitions.dev/detail.html?t=dropdown-menu-morph', descripcion: 'Patrones de transición CSS/JS explicados paso a paso.' },
      { titulo: 'Motion Prompts', href: 'https://motionprompts.dev/', descripcion: 'Animaciones con GSAP listas para copiar.' },
      { titulo: 'ASCII Magic', href: 'https://www.ascii-magic.com/', descripcion: 'Convierte imágenes y vídeos a arte ASCII.' },
    ],
  },
]
</script>

<template>
  <PlantillaPagina titulo="Diseño web" entradilla="Herramientas externas para paletas de color, tipografías y referencias de interfaz.">
    <template v-for="g in GRUPOS" :key="g.id">
      <h2 :id="g.id">{{ g.titulo }}</h2>
      <RejillaTarjetas>
        <TarjetaPagina v-for="h in g.herramientas" :key="h.href" v-bind="h" />
      </RejillaTarjetas>
    </template>
  </PlantillaPagina>
</template>
