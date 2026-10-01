<script setup>
import { Steps, StepsItem, TerminalReplay } from 'elastic-ui'
import { siClaudecode, siOpencode } from 'simple-icons'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import Tecnologias from '../../components/Tecnologias.vue'
import openaiLogo from '../../assets/openai.svg'

// extra/ia/opencode/README.md. Explica cómo se empieza a usar un agente; OpenCode
// es el ejemplo porque es el que se usa en clase (y es gratis), no el tema.
// Codex es de OpenAI y su logo no está en simple-icons: es el descargado.
const APPS = [
  { icon: siOpencode, nombre: 'OpenCode' },
  { icon: siClaudecode, nombre: 'Claude Code' },
  { img: openaiLogo, mono: true, nombre: 'Codex' },
]

const INSTALAR = [
  { comment: 'Instalar OpenCode (o: npm install -g opencode-ai)', command: 'curl -fsSL https://opencode.ai/install | bash' },
  { comment: 'Arrancarlo en la carpeta de tu proyecto', command: 'cd practica-tienda && opencode' },
]

const PETICIONES = [
  'Explícame qué hace ProductoController.',
  'Añade que no se pueda guardar un producto sin nombre.',
  '¿Por qué falla el test de crear producto?',
]

const CONTINUAR = [
  { comment: 'Retomar la última sesión de esta carpeta', command: 'opencode --continue' },
  { comment: 'Verlas todas, con su id', command: 'opencode session list' },
  { comment: 'Retomar una concreta', command: 'opencode --session abc123' },
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
    <Tecnologias :items="APPS" />

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

    <h2 id="continuar">Continuar una sesión</h2>
    <p>
      Al cerrar el terminal no pierdes la conversación: OpenCode guarda las sesiones, por
      proyecto. Cuando vuelvas a la carpeta, la retomas con un comando.
    </p>
    <TerminalReplay :entries="CONTINUAR" title="~" />
    <p>
      <code>--continue</code> (o <code>-c</code>) retoma la última. Con <code>--fork</code>
      copias la sesión en vez de seguirla, para probar algo sin tocar la original.
    </p>
  </PlantillaPagina>
</template>
