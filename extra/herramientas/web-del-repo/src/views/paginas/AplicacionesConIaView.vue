<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'

// extra/ia/aplicaciones-con-ia/README.md
const EXPLORAR = [
  {
    href: 'https://learn.microsoft.com/es-es/dotnet/ai/conceptual/how-genai-and-llms-work',
    titulo: 'Cómo funcionan los LLM y la IA generativa',
    texto: 'Los usos, por tipo.',
  },
  {
    href: 'https://modelcontextprotocol.io',
    titulo: 'Model Context Protocol',
    texto: 'Qué es un servidor MCP.',
  },
]
</script>

<template>
  <PlantillaPagina
    titulo="Aplicaciones con IA"
    entradilla="La IA no solo contesta: habla, crea y maneja programas. Estas son las formas que te vas a encontrar, y todas se pueden meter dentro de una aplicación."
  >
    <h2 id="chat">Chat</h2>
    <p>Le escribes y te responde, como en ChatGPT o Gemini. Es la forma más conocida y la puerta a las demás.</p>

    <h2 id="generar">Generar</h2>
    <p>
      Crear algo nuevo a partir de lo que le pides: texto, imágenes, música, vídeo o código. Cuando lo
      que genera es una pantalla entera, una interfaz, se llama <strong>generative UI</strong>.
    </p>

    <h2 id="tool-calling">Herramientas (tool calling)</h2>
    <p>
      El modelo no solo habla: puede pedir que se ejecute algo. "Lee este archivo", "manda este
      correo", "consulta esta base de datos". Es lo que convierte un chat en un agente: el modelo
      decide, la aplicación ejecuta.
    </p>

    <h2 id="mcp">Conectar tus programas (MCP)</h2>
    <p>
      Un <strong>servidor MCP</strong> expone un programa o unos datos para que la IA los use: tu
      GitHub, una base de datos, la documentación de una librería. El modelo pide, el servidor
      responde.
    </p>

    <h2 id="dentro">Dentro de tu aplicación</h2>
    <p>
      Todo esto se mete hoy en el software de siempre: un chat de ayuda, autocompletar, un buscador
      que entiende lo que escribes, un borrador que se genera solo. La IA deja de ser una web aparte
      y pasa a vivir dentro de las aplicaciones que ya usas.
    </p>
    <p><strong>Ese es el rumbo: el software nuevo lleva IA dentro, no al lado.</strong></p>

    <h2 id="para-explorar">Para explorar</h2>
    <ul>
      <li v-for="e in EXPLORAR" :key="e.href">
        <a :href="e.href" target="_blank" rel="noopener noreferrer">{{ e.titulo }}</a>: {{ e.texto }}
      </li>
    </ul>
  </PlantillaPagina>
</template>
