<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'
import { Callout } from 'elastic-ui'
import { serieDeCarpeta } from '../../data/series.js'

// extra/ia/README.md
// Las páginas en el orden en que se leen (data/series.js), numeradas.
const PAGINAS = serieDeCarpeta('/extra/ia').paginas.map((p, i) => ({
  href: p.ruta,
  titulo: `${i + 1}. ${p.titulo}`,
  descripcion: p.descripcion,
}))

// Sitios para ir más allá de las páginas, por lo que se explica en Darle
// contexto. Comprobados en septiembre de 2026: quién los mantiene va en la nota.
const RECURSOS = [
  {
    grupo: 'AGENTS.md',
    id: 'recursos-agents-md',
    sitios: [
      {
        href: 'https://agents.md',
        titulo: 'agents.md',
        descripcion: 'Qué es el formato, qué agentes lo leen y ejemplos de proyectos reales.',
        nota: 'Linux Foundation',
      },
    ],
  },
  {
    grupo: 'Skills',
    id: 'recursos-skills',
    sitios: [
      {
        href: 'https://agentskills.io',
        titulo: 'Agent Skills',
        descripcion: 'El formato de las skills: cómo se escribe una y qué agentes las usan.',
        nota: 'Estándar abierto',
      },
      {
        href: 'https://github.com/anthropics/skills',
        titulo: 'anthropics/skills',
        descripcion: 'Skills de ejemplo, para ver cómo están hechas o copiarlas y adaptarlas.',
        nota: 'Anthropic, en GitHub',
      },
      {
        href: 'https://skills.sh',
        titulo: 'skills.sh',
        descripcion: 'Un directorio de skills que publica la gente, para buscar si ya existe la que necesitas.',
        nota: 'Vercel',
      },
    ],
  },
  {
    grupo: 'MCP',
    id: 'recursos-mcp',
    sitios: [
      {
        href: 'https://modelcontextprotocol.io',
        titulo: 'Model Context Protocol',
        descripcion: 'Qué es MCP y cómo funciona una conexión, en la documentación oficial.',
        nota: 'Documentación oficial',
      },
      {
        href: 'https://registry.modelcontextprotocol.io',
        titulo: 'Registro de MCP',
        descripcion: 'El registro oficial de servidores: para buscar la conexión con la aplicación que usas.',
        nota: 'Registro oficial',
      },
      {
        href: 'https://github.com/modelcontextprotocol/servers',
        titulo: 'modelcontextprotocol/servers',
        descripcion: 'Servidores de referencia, sencillos, para ver cómo está hecho uno por dentro.',
        nota: 'En GitHub',
      },
      {
        href: 'https://context7.com',
        titulo: 'Context7',
        descripcion: 'La documentación al día de muchas librerías; el ejemplo de Darle contexto.',
        nota: 'context7.com',
      },
    ],
  },
  {
    grupo: 'Para aprender',
    id: 'recursos-aprender',
    sitios: [
      {
        href: 'https://www.youtube.com/watch?v=kzcI5F4tGiU',
        titulo: 'How I Use AI to Learn Things',
        descripcion: 'Usar la IA para aprender algo nuevo, no para que te lo resuelva.',
        nota: 'Vídeo, en inglés',
      },
    ],
  },
]
</script>

<template>
  <PlantillaPagina titulo="IA" entradilla="Cómo usar la IA mejor.">
    <RejillaTarjetas>
      <TarjetaPagina v-for="p in PAGINAS" :key="p.href" v-bind="p" />
    </RejillaTarjetas>

    <h2 id="recursos">Recursos</h2>
    <p>
      Sitios para buscar skills y conexiones que ya ha hecho otra gente, y para aprender a hacer las
      tuyas. Lo que es cada cosa, en <RouterLink to="/extra/ia/contexto">Darle contexto</RouterLink>.
    </p>
    <template v-for="r in RECURSOS" :key="r.id">
      <h3 :id="r.id">{{ r.grupo }}</h3>
      <RejillaTarjetas>
        <TarjetaPagina v-for="s in r.sitios" :key="s.href" v-bind="s" />
      </RejillaTarjetas>
    </template>
    <Callout type="warning" title="Lee antes de instalar">
      <p>
        Una skill son instrucciones que tu agente va a seguir, y un MCP es un programa que se ejecuta
        en tu ordenador con acceso a lo que le conectes. Instala solo lo que venga de alguien de
        confianza, y lee qué hace antes. Es lo mismo que al
        <RouterLink to="/extra/open-source#como-buscar">buscar un proyecto open source</RouterLink>.
      </p>
    </Callout>
    <p>
      <strong>Si haces una skill que te sirve, compártela</strong>: en este repo están en
      <code>.agents/skills/</code>, y cualquiera de la clase la puede usar y mejorar.
    </p>
  </PlantillaPagina>
</template>
