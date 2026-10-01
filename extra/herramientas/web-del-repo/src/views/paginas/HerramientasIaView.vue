<script setup>
import { CodeBlock } from 'elastic-ui'
import { siObsidian } from 'simple-icons'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import Tecnologias from '../../components/Tecnologias.vue'
import DiagramaHerdr from '../../visuales/DiagramaHerdr.vue'
import herdrLogo from '../../assets/herdr.png'
import herdrLanding from '../../assets/herdr-landing.png'
import obsidianLanding from '../../assets/obsidian-landing.png'

// extra/ia/herramientas/README.md. Herdr no está en simple-icons: su logo es el
// descargado de su web.
const HERRAMIENTAS = [
  { img: herdrLogo, nombre: 'Herdr' },
  { icon: siObsidian, nombre: 'Obsidian' },
]

const INSTALAR = `curl -fsSL https://herdr.dev/install.sh | sh
herdr`
</script>

<template>
  <PlantillaPagina
    titulo="Herramientas"
    entradilla="Alrededor del agente hay programas que ayudan a trabajar con él. Dos que encajan bien: uno para tenerlos corriendo (Herdr) y otro para leer y escribir lo que el agente usa (Obsidian)."
  >
    <Tecnologias :items="HERRAMIENTAS" />

    <h2 id="herdr">Herdr</h2>
    <p>
      Herdr es un <strong>multiplexor de terminal</strong>. Un multiplexor es un programa que
      guarda las terminales en un servidor en segundo plano: cierras la ventana y las terminales
      siguen ahí, listas para volver a ellas desde el mismo equipo o por SSH.
    </p>
    <p>
      Herdr hace eso mismo, pero <strong>entendiendo de agentes</strong>. Cada agente vive en su
      terminal dentro del servidor de Herdr, y Herdr lo marca según su estado:
    </p>
    <DiagramaHerdr />
    <p><strong>Con varios agentes a la vez, de un vistazo ves cuál necesita que le hagas caso.</strong></p>
    <figure>
      <img :src="herdrLanding" alt="Portada de Herdr, con el lema «Run them anywhere. Leave them running.»" />
      <figcaption>La portada de Herdr.</figcaption>
    </figure>
    <p>Se instala y se arranca con:</p>
    <CodeBlock :code="INSTALAR" language="bash" />
    <p>
      <code>ctrl+b q</code> te desengancha del servidor sin cerrarlo; <code>herdr</code> te vuelve
      a enganchar.
    </p>
    <p>
      Su gracia está en dos cosas: los agentes pueden <strong>hablar entre ellos</strong> (uno le
      abre un panel a otro, lee su salida y espera a que termine o se quede bloqueado), y las
      terminales <strong>siguen vivas</strong> aunque apagues tu ordenador, si Herdr corre en otra
      máquina o te conectas por SSH. Al volver, te reenganchas donde estabas.
    </p>

    <h2 id="obsidian">Obsidian</h2>
    <p>
      Los apuntes de este repo, el <code>AGENTS.md</code> y las skills son
      <strong>markdown</strong>: texto plano con un poco de formato. Es lo que leen los agentes y lo
      que Git guarda y compara sin líos.
    </p>
    <p>
      <strong>Obsidian es un programa para leer y escribir esos archivos.</strong> Le das una
      carpeta (un <em>vault</em>) y te muestra los <code>.md</code> como notas: las enlazas entre
      ellas, ves qué notas apuntan a cuál y buscas en todas. El archivo sigue siendo el mismo
      <code>.md</code>; Obsidian solo lo pinta, así que el agente ni se entera de con qué lo
      abriste.
    </p>
    <figure>
      <img :src="obsidianLanding" alt="Portada de Obsidian, con el lema «Sharpen your thinking.»" />
      <figcaption>La portada de Obsidian.</figcaption>
    </figure>

    <h2 id="para-explorar">Para explorar</h2>
    <ul>
      <li>
        <a href="https://herdr.dev/" target="_blank" rel="noopener noreferrer">Herdr</a> y su
        <a href="https://herdr.dev/docs/" target="_blank" rel="noopener noreferrer">documentación</a>.
      </li>
      <li><a href="https://obsidian.md/" target="_blank" rel="noopener noreferrer">Obsidian</a>.</li>
    </ul>
  </PlantillaPagina>
</template>
