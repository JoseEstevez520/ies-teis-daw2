<script setup>
import { Callout } from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'

// extra/diseno/skills/README.md
const ANTI_SLOP = [
  { titulo: 'frontend-design', href: 'https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md', descripcion: 'La oficial de Anthropic, para Claude Code. La referencia.' },
  { titulo: 'kill-ai-slop', href: 'https://github.com/yetone/kill-ai-slop', descripcion: 'Escanea tu proyecto y quita los "tells" de slop; trae una guía de 33.' },
  { titulo: 'unslop-ui-skill', href: 'https://github.com/claudiusararu/unslop-ui-skill', descripcion: 'Un catálogo de casi 100 "tells" de diseño de IA, cada uno con su arreglo.' },
  { titulo: 'no-slop-ui', href: 'https://github.com/LeoStehlik/no-slop-ui', descripcion: 'Reglas para Codex, Claude Code y compañía, con checklist de revisión.' },
  { titulo: 'anti-slop-design', href: 'https://github.com/Ferousco-dev/anti-slop-design', descripcion: 'Evita el degradado morado, Inter y las tres tarjetas.' },
  { titulo: 'design-slop', href: 'https://github.com/wpgaurav/design-slop', descripcion: 'Detectar y quitar el look genérico en webs, dashboards y componentes.' },
  { titulo: 'web-ai-slop', href: 'https://github.com/sahilkargutkar/web-ai-slop', descripcion: 'Filtra patrones de diseño, clichés de texto y "tells" de código.' },
]

const OTRAS = [
  'Accesibilidad: contraste, tamaño de los toques, foco visible.',
  'Un sistema: paleta, escala de tipos, espaciado.',
  'De una captura a código: pasar una referencia a una maqueta.',
]

const DONDE = [
  { titulo: 'skills.sh', href: 'https://skills.sh', descripcion: 'Directorio de skills que publica la gente.' },
  { titulo: 'anthropics/skills', href: 'https://github.com/anthropics/skills', descripcion: 'Skills de ejemplo, para ver cómo están hechas.' },
]
</script>

<template>
  <PlantillaPagina
    titulo="Skills de diseño"
    entradilla="Instrucciones que tu agente sigue para una tarea de diseño. Las más famosas son para no sacar el look de IA."
  >
    <h2 id="anti-slop">Contra el AI slop</h2>
    <p>Las más famosas son justo para esto: que el agente no saque el look genérico (ver <RouterLink to="/extra/diseno/ai-slop">AI slop</RouterLink>).</p>
    <RejillaTarjetas>
      <TarjetaPagina v-for="s in ANTI_SLOP" :key="s.href" v-bind="s" />
    </RejillaTarjetas>

    <h2 id="otras">Otras</h2>
    <ul>
      <li v-for="o in OTRAS" :key="o">{{ o }}</li>
    </ul>

    <h2 id="donde">Dónde encontrarlas</h2>
    <RejillaTarjetas>
      <TarjetaPagina v-for="d in DONDE" :key="d.href" v-bind="d" />
    </RejillaTarjetas>

    <Callout type="warning" title="Lee antes de instalar">
      Una skill son instrucciones que tu agente va a seguir. Instala solo lo que venga de alguien
      de confianza y léela antes, como cualquier cosa que le des a ejecutar.
    </Callout>
  </PlantillaPagina>
</template>
