<script setup>
import { siClaudecode, siOpencode } from 'simple-icons'
import DiagramaHarness from '../../visuales/DiagramaHarness.vue'
import SesionAgente from '../../visuales/SesionAgente.vue'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import Tecnologias from '../../components/Tecnologias.vue'
import openaiLogo from '../../assets/openai.svg'

// extra/ia/fundamentos/README.md. Codex es de OpenAI y su logo no está en
// simple-icons: es el descargado.
const APPS = [
  { icon: siOpencode, nombre: 'OpenCode' },
  { icon: siClaudecode, nombre: 'Claude Code' },
  { img: openaiLogo, mono: true, nombre: 'Codex' },
]
</script>

<template>
  <PlantillaPagina titulo="Fundamentos: modelo, harness y agente">
    <p><strong>Un agente es un modelo con un harness.</strong> El modelo es el cerebro; el harness le da herramientas.</p>

    <h2 id="modelo-y-harness">Modelo y harness</h2>
    <ul>
      <li><strong>Modelo:</strong> la IA que piensa, como la que hay detrás de ChatGPT. Solo recibe texto y devuelve texto.</li>
      <li>
        <strong>Harness:</strong> lo que le das al modelo para que pueda trabajar. Sobre todo
        herramientas (leer tus archivos, editarlos, ejecutar comandos), y también instrucciones y
        permisos. No lo tienes que montar tú: hay aplicaciones que lo traen ya montado, como Claude
        Code.
      </li>
      <li><strong>Agente:</strong> modelo + harness.</li>
    </ul>
    <DiagramaHarness />

    <h2 id="la-misma-peticion">La misma petición, dos veces</h2>
    <p>
      Pídele a un modelo solo que no deje crear productos sin nombre en la práctica de la tienda.
      No ha visto tu proyecto, así que te contesta con código para pegar. Las sesiones son un
      ejemplo inventado.
    </p>
    <SesionAgente nombre="solo-modelo" />
    <p><strong>Solo, el modelo te dice qué hacer, pero lo haces tú.</strong></p>

    <p>Ahora, el mismo modelo con un harness alrededor. Fíjate en que busca, lee, edita y pasa los tests antes de contestar.</p>
    <SesionAgente nombre="con-harness" />
    <p><strong>Con un harness, lo hace él en tu proyecto, y ves cada paso.</strong></p>

    <h2 id="aplicaciones">Aplicaciones que traen el harness montado</h2>
    <p>Se instalan en tu ordenador y se usan desde la terminal.</p>
    <Tecnologias :items="APPS" />
    <table>
      <thead>
        <tr><th>Aplicación</th><th>Qué necesitas</th></tr>
      </thead>
      <tbody>
        <tr><td>OpenCode</td><td>nada, es gratis</td></tr>
        <tr><td>Claude Code</td><td>pagar Claude</td></tr>
        <tr><td>Codex</td><td>pagar ChatGPT</td></tr>
      </tbody>
    </table>
  </PlantillaPagina>
</template>
