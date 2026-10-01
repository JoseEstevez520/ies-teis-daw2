<script setup>
import { Callout, CodeBlock } from 'elastic-ui'
import { siClaudecode, siOpencode } from 'simple-icons'
import skillApuntesClaros from '../../../../../../.agents/skills/apuntes-claros/SKILL.md?raw'
import DiagramaContexto from '../../visuales/DiagramaContexto.vue'
import SesionAgente from '../../visuales/SesionAgente.vue'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import Tecnologias from '../../components/Tecnologias.vue'
import openaiLogo from '../../assets/openai.svg'

// extra/ia/contexto/README.md. Los conceptos (AGENTS.md, skills, MCP) valen
// para cualquier agente; los archivos y rutas concretos son los de OpenCode,
// que es el que usamos. Datos de https://opencode.ai/docs/ (rules, skills, mcp-servers).
// Codex es de OpenAI y su logo no está en simple-icons: es el descargado.
const APPS = [
  { icon: siOpencode, nombre: 'OpenCode' },
  { icon: siClaudecode, nombre: 'Claude Code' },
  { img: openaiLogo, mono: true, nombre: 'Codex' },
]

const AGENTS_MD = `# Práctica Spring: tienda

- Java 21 + Spring Boot + Thymeleaf + H2.
- Arrancar: \`./mvnw spring-boot:run\`
- Es una práctica de clase: no me escribas la solución. Explícame y revisa lo que
  hago yo.`

// El principio de una skill real de este repo, tal cual.
const SKILL = skillApuntesClaros.split('\n').slice(0, 8).join('\n') + '\n[...]'

const CONTEXT7 = `{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp"
    }
  }
}`
</script>

<template>
  <PlantillaPagina titulo="Darle contexto: AGENTS.md, skills y MCP">
    <p>
      <strong>Un agente solo sabe de tu proyecto lo que le das.</strong> Hay tres formas de dárselo,
      y cada una entra en un momento distinto:
    </p>
    <Tecnologias :items="APPS" />
    <table>
      <thead>
        <tr><th></th><th>Qué es</th><th>Cuándo lo usa</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>AGENTS.md</strong></td><td>las reglas de tu proyecto</td><td>siempre, al arrancar</td></tr>
        <tr><td><strong>Skills</strong></td><td>instrucciones para un tipo de tarea</td><td>solo cuando la tarea lo pide</td></tr>
        <tr><td><strong>MCP</strong></td><td>conexiones con otras aplicaciones</td><td>cuando necesita algo de ellas</td></tr>
      </tbody>
    </table>
    <p>Todo eso ocupa sitio en lo que el modelo tiene delante al trabajar. Fíjate en qué entra entero y qué no:</p>
    <DiagramaContexto />
    <p>
      <strong>Lo que usa siempre va en AGENTS.md; lo que solo usa a veces, en una skill.</strong> Así
      no le llenas la cabeza de instrucciones que no necesita.
    </p>

    <h2 id="agents-md">AGENTS.md: las reglas del proyecto</h2>
    <p>
      Un <code>.md</code> en la raíz del proyecto que el agente lee siempre al arrancar: cómo se
      arranca, qué tecnologías usa, qué no debe hacer. Es un nombre común a casi todos los agentes;
      <code>/init</code> te crea uno. Un ejemplo para una práctica:
    </p>
    <CodeBlock :code="AGENTS_MD" title="AGENTS.md" />
    <p>
      En OpenCode, si no hay <code>AGENTS.md</code> pero sí <code>CLAUDE.md</code> (el nombre que usa
      Claude Code), lee ese. Para reglas tuyas en todos tus proyectos, está
      <code>~/.config/opencode/AGENTS.md</code>.
    </p>

    <h2 id="skills">Skills: instrucciones cuando hacen falta</h2>
    <p>
      Una skill es una carpeta con un <code>SKILL.md</code>: un nombre, una descripción de cuándo
      usarla y las instrucciones. El agente ve de primeras solo el nombre y la descripción de cada
      una, y carga la entera cuando la tarea encaja. Este repo tiene las suyas en
      <code>.agents/skills/</code>. Así empieza la de escribir apuntes:
    </p>
    <CodeBlock :code="SKILL" title=".agents/skills/apuntes-claros/SKILL.md" wrap />
    <p>Fíjate en que nadie le dice que use la skill: la carga él al ver que la tarea encaja con su descripción. La sesión es un ejemplo inventado.</p>
    <SesionAgente nombre="skill" />
    <p><strong>La descripción es lo que decide cuándo se usa</strong>: tiene que decir para qué tareas sirve.</p>
    <p>
      OpenCode busca skills en <code>.opencode/skills/</code>, <code>.agents/skills/</code> y
      <code>.claude/skills/</code> de tu proyecto, y en las mismas carpetas de tu usuario.
    </p>

    <h2 id="mcp">MCP: conexiones con otras aplicaciones</h2>
    <p>
      Un MCP conecta al agente con otra aplicación: la documentación de las librerías, tu GitHub,
      una base de datos. Es una forma estándar de conectarlas, así que la misma conexión sirve
      para cualquier agente. Se añade en la configuración; por ejemplo, Context7, que busca en la
      documentación oficial de las librerías:
    </p>
    <CodeBlock :code="CONTEXT7" title="opencode.json" />
    <p>Fíjate en que responde con la documentación de ahora, no con lo que el modelo recordaba. La sesión es un ejemplo inventado.</p>
    <SesionAgente nombre="mcp" />
    <p><strong>Un MCP conecta al agente con otra aplicación, y con ella con información que no tiene.</strong></p>
    <Callout type="warning" title="Cada conexión ocupa sitio">
      <p>
        Lo que se puede hacer con cada conexión entra en lo que el modelo tiene delante, aunque no
        lo use. Conecta solo lo que necesitas: algunas, como la de GitHub, traen tantas cosas que
        llenan el contexto.
      </p>
    </Callout>
  </PlantillaPagina>
</template>
