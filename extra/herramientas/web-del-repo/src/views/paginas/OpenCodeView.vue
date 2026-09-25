<script setup>
import { Steps, StepsItem, TerminalReplay } from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'

// extra/ia/opencode/README.md. Explica cómo se empieza a usar un agente; OpenCode
// es el ejemplo porque es el que se usa en clase (y es gratis), no el tema.
const INSTALAR = [
  { comment: 'Instalar OpenCode (o: npm install -g opencode-ai)', command: 'curl -fsSL https://opencode.ai/install | bash' },
  { comment: 'Arrancarlo en la carpeta de tu proyecto', command: 'cd practica-tienda && opencode' },
]

const PETICIONES = [
  'Explícame qué hace ProductoController.',
  'Añade que no se pueda guardar un producto sin nombre.',
  '¿Por qué falla el test de crear producto?',
]

const SIGUIENTE = [
  {
    href: '/extra/ia/contexto',
    titulo: 'Darle contexto',
    descripcion: 'AGENTS.md, skills y MCP: cómo sabe lo que necesita de tu proyecto y de fuera.',
  },
  {
    href: '/extra/ia/agentes',
    titulo: 'Agentes y subagentes',
    descripcion: 'El mismo modelo con papeles distintos: uno construye, otro planifica, otro explica.',
  },
]
</script>

<template>
  <PlantillaPagina titulo="Tu primer agente">
    <p>
      Para trabajar con un agente no montas tú el harness: instalas una aplicación que ya lo trae,
      la abres en tu proyecto y le pides cosas. Si no sabes qué es un harness, empieza por los
      <RouterLink to="/extra/ia/fundamentos">fundamentos</RouterLink>.
    </p>
    <p>
      Aquí se ve con <a href="https://opencode.ai/" target="_blank" rel="noopener noreferrer">OpenCode</a>,
      que es el que usamos porque es gratis. Claude Code y Codex funcionan igual.
    </p>

    <h2 id="instalar">Instalar y arrancar</h2>
    <TerminalReplay :entries="INSTALAR" title="~" />
    <Steps static>
      <StepsItem title="Conecta un modelo">
        <p>Escribe <code>/connect</code> y elige <strong>OpenCode Zen</strong>, que tiene modelos gratis.</p>
      </StepsItem>
      <StepsItem title="Deja que conozca tu proyecto">
        <p>
          Escribe <code>/init</code>: lee el proyecto y te crea un <code>AGENTS.md</code> con lo que
          ha entendido de él. Qué es, en <RouterLink to="/extra/ia/contexto#agents-md">Darle contexto</RouterLink>.
        </p>
      </StepsItem>
    </Steps>

    <h2 id="pidele-algo">Pídele algo</h2>
    <p>Escríbele en palabras normales, como a un compañero que tiene tu proyecto delante. Por ejemplo:</p>
    <ul>
      <li v-for="p in PETICIONES" :key="p">{{ p }}</li>
    </ul>
    <p>
      Mientras trabaja ves cada paso: qué busca, qué lee, qué cambia y qué ejecuta.
      <strong>Revisa lo que cambia antes de darlo por bueno</strong>, igual que revisarías el código
      de otro.
    </p>

    <h2 id="siguiente">Siguiente</h2>
    <RejillaTarjetas>
      <TarjetaPagina v-for="s in SIGUIENTE" :key="s.href" v-bind="s" />
    </RejillaTarjetas>
  </PlantillaPagina>
</template>
