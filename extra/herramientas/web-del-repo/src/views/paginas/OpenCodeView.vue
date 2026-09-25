<script setup>
import { CodeBlock, Steps, StepsItem, TerminalReplay } from 'elastic-ui'
import SesionAgente from '../../visuales/SesionAgente.vue'
import PlantillaPagina from '../../components/PlantillaPagina.vue'

// extra/ia/opencode/README.md. Las sesiones (visuales/sesiones.js) son inventadas.
const INSTALAR = [
  { comment: 'Instalar OpenCode (o: npm install -g opencode-ai)', command: 'curl -fsSL https://opencode.ai/install | bash' },
  { comment: 'Arrancarlo en la carpeta de tu proyecto', command: 'cd practica-tienda && opencode' },
]

const TUTOR_MD = `---
description: Explica y guía sin escribir la solución
mode: primary
permission:
  edit: deny
  bash: deny
---

Explícame el concepto y hazme preguntas.
No me des el código de la práctica.`

const AGENTS_MD = `# Práctica Spring: tienda

- Java 21 + Spring Boot + Thymeleaf + H2.
- Arrancar: \`./mvnw spring-boot:run\`
- Es una práctica de clase: no me escribas la solución. Explícame y revisa lo que
  hago yo.`

const EXPLORAR = [
  {
    titulo: 'Skills',
    texto: 'Instrucciones que el agente carga solo cuando le hacen falta. Este repo tiene una en .agents/skills/apuntes-claros/.',
    href: 'https://opencode.ai/docs/skills/',
  },
  {
    titulo: 'MCP',
    texto: 'Conecta al agente con cosas de fuera de tu proyecto, como la documentación de una librería.',
    href: 'https://opencode.ai/docs/mcp-servers/',
  },
  { titulo: 'Más agentes', texto: 'Crear los tuyos y los subagentes.', href: 'https://opencode.ai/docs/agents/' },
]
</script>

<template>
  <PlantillaPagina titulo="Agentes de IA con OpenCode">
    <p>
      <a href="https://opencode.ai/" target="_blank" rel="noopener noreferrer">OpenCode</a> es una
      aplicación para la terminal que trae el harness ya montado: le pides algo y el modelo trabaja
      en tu proyecto. Si no sabes qué es un harness, empieza por los
      <RouterLink to="/extra/ia/fundamentos">fundamentos</RouterLink>.
    </p>
    <p>
      Explicamos OpenCode porque es gratis, sencillo y está bien hecho. Lo que aprendas aquí vale
      igual para Claude Code o Codex.
    </p>

    <h2 id="instalar">Instalar y arrancar</h2>
    <TerminalReplay :entries="INSTALAR" title="~" />
    <Steps static>
      <StepsItem title="Conecta un modelo">
        <p>Escribe <code>/connect</code> y elige <strong>OpenCode Zen</strong>, que tiene modelos gratis.</p>
      </StepsItem>
      <StepsItem title="Deja que conozca tu proyecto">
        <p>Escribe <code>/init</code>: analiza el proyecto y te crea un <code>AGENTS.md</code>.</p>
      </StepsItem>
    </Steps>

    <h2 id="agentes">Agentes</h2>
    <p>
      OpenCode trae dos agentes, Build y Plan, y cambias de uno a otro con la tecla Tab. Aquí les
      haces a todos la misma petición, para ver en qué cambian.
    </p>

    <h3 id="build">Build</h3>
    <p>El agente con el que arranca. Fíjate en que edita sin preguntarte.</p>
    <SesionAgente nombre="build" />
    <p><strong>Build hace el cambio directamente.</strong></p>

    <h3 id="plan">Plan</h3>
    <p>Para pensar antes de un cambio grande. Fíjate en que se para y te pide permiso antes de editar.</p>
    <SesionAgente nombre="plan" />
    <p><strong>Plan te deja un plan y no cambia nada sin tu permiso.</strong></p>

    <h3 id="tu-propio-agente">Tu propio agente</h3>
    <p>
      Puedes crear otro con tus instrucciones y tus permisos. Este tutor tiene la edición
      denegada, así que no puede resolverte la práctica aunque se lo pidas.
    </p>
    <SesionAgente nombre="tutor" />
    <p><strong>Sus permisos mandan: aunque el modelo quiera editar, el harness no le deja.</strong></p>
    <p>Así se crea: guarda esto en tu proyecto.</p>
    <CodeBlock :code="TUTOR_MD" title=".opencode/agents/tutor.md" />

    <h3 id="subagentes">Subagentes</h3>
    <p>Un agente puede encargarle una parte a otro, que trabaja aparte. Fíjate en lo que vuelve.</p>
    <SesionAgente nombre="subagente" />
    <p><strong>Del subagente solo vuelve la respuesta, no todo lo que leyó.</strong></p>

    <h2 id="agents-md">AGENTS.md: las reglas del proyecto</h2>
    <p>Un <code>.md</code> en la raíz del proyecto que el agente lee siempre al arrancar. Ejemplo para una práctica:</p>
    <CodeBlock :code="AGENTS_MD" title="AGENTS.md" />
    <p>
      Si no hay <code>AGENTS.md</code> pero sí <code>CLAUDE.md</code>, lee ese. Para reglas tuyas en
      todos los proyectos está <code>~/.config/opencode/AGENTS.md</code>.
    </p>

    <h2 id="para-explorar">Para explorar</h2>
    <p>Cuando ya te manejes, hay más. Pregúntale al propio agente o mira la documentación:</p>
    <ul>
      <li v-for="e in EXPLORAR" :key="e.titulo">
        <strong>{{ e.titulo }}:</strong> {{ e.texto }}
        <a :href="e.href" target="_blank" rel="noopener noreferrer">Documentación</a>
      </li>
    </ul>
  </PlantillaPagina>
</template>
