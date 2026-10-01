<script setup>
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'elastic-ui'
import { siGooglegemini, siNotebooklm } from 'simple-icons'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import Tecnologias from '../../components/Tecnologias.vue'

// extra/herramientas/cuaderno-ia/README.md
const MARCAS = [
  { icon: siNotebooklm, nombre: 'NotebookLM' },
  { icon: siGooglegemini, nombre: 'Google Gemini' },
]
</script>

<template>
  <PlantillaPagina
    titulo="Cuaderno de IA para apuntes"
    entradilla="Preguntar con IA sobre el material de un módulo (PDFs, transcripciones) en vez de buscarlo a mano. Investigado, sin código todavía."
  >
    <Tecnologias :items="MARCAS" />

    <h2 id="opciones">Tres opciones</h2>
    <table>
      <thead>
        <tr><th>Opción</th><th>Qué es</th><th>Estado</th></tr>
      </thead>
      <tbody>
        <tr><td>A mano</td><td>Subir el material a NotebookLM desde la web</td><td>Vale hoy</td></tr>
        <tr><td><code>notebooklm-py</code></td><td>Automatizar NotebookLM con tus cookies de sesión</td><td>Descartada</td></tr>
        <tr><td>Gemini API</td><td>Montar algo propio con la API oficial</td><td>La vía limpia para automatizar</td></tr>
      </tbody>
    </table>

    <h2 id="detalle">En detalle</h2>
    <Accordion type="multiple">
      <AccordionItem value="a-mano">
        <AccordionTrigger>A mano, con NotebookLM</AccordionTrigger>
        <AccordionContent>
          <p>
            Subir el material a NotebookLM desde la web, sin automatizar nada: un cuaderno por módulo,
            y solo cuando ya haya material real que meter. Con el plan gratuito de estudiante de
            Google (Google AI Pro/Plus, que cubre la FP en España) no hay límite de materiales.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="notebooklm-py">
        <AccordionTrigger>Automatizar con notebooklm-py (descartada)</AccordionTrigger>
        <AccordionContent>
          <p>
            <a href="https://github.com/teng-lin/notebooklm-py" target="_blank" rel="noopener noreferrer">notebooklm-py</a>
            automatiza NotebookLM, pero funciona <strong>usando las cookies de sesión de tu cuenta de
            Google</strong> para llamar a funciones internas sin documentar. Sus propios autores avisan
            de que Google puede marcar la cuenta. No lo uses con una cuenta real.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="gemini">
        <AccordionTrigger>Algo propio con la Gemini API</AccordionTrigger>
        <AccordionContent>
          <p>
            En vez de automatizar NotebookLM, usar la
            <a href="https://ai.google.dev/gemini-api/docs/google-ai-plans" target="_blank" rel="noopener noreferrer">Gemini API oficial</a>,
            documentada y pensada para desarrolladores: subes tus documentos y preguntas sobre ellos,
            sin cookies ajenas de por medio. El plan de estudiante incluye 10 $ al mes en créditos de
            Google Cloud, que sirven para esta API.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </PlantillaPagina>
</template>
