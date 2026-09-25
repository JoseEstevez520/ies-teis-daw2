<script setup>
import { CodeBlock } from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'

// extra/ia/consejos/README.md. El ejemplo de "Dale contexto" es inventado.
const SIN_CONTEXTO = '¿Por qué falla esto?'
const CON_CONTEXTO = `Al arrancar mi práctica de Spring con ./mvnw spring-boot:run sale esto:

  Field repositorio in ProductoController required a bean
  of type 'ProductoRepository' that could not be found.

Quería inyectar el repositorio en el controlador. ¿Qué me falta?`
</script>

<template>
  <PlantillaPagina titulo="Consejos para usar la IA">
    <p>
      <strong>Arranca y pregúntale a la propia IA.</strong> No hace falta saber cómo se hace algo
      antes de empezar: pregúntale cómo se hace, pruébalo y vuelve a preguntar. Así vas
      aprendiendo.
    </p>

    <h2 id="que-te-explique">Pídele que te explique, no la solución</h2>
    <p>
      Si te da el código directo, no vas a poder defenderlo en un examen ni en una entrevista.
      Pídele que te explique el concepto o que revise lo que has hecho tú.
    </p>

    <h2 id="dale-contexto">Dale contexto</h2>
    <p>La misma duda, preguntada de dos formas. La segunda lleva el error completo y qué intentabas hacer:</p>
    <div class="side-by-side not-prose">
      <CodeBlock :code="SIN_CONTEXTO" title="Sin contexto" wrap />
      <CodeBlock :code="CON_CONTEXTO" title="Con contexto" wrap />
    </div>
    <p><strong>Con el error y lo que querías hacer, la respuesta va al grano.</strong> Sin eso, adivina.</p>

    <h2 id="agents-md">Ponle reglas con AGENTS.md</h2>
    <p>
      Un archivo <code>AGENTS.md</code> en tu proyecto le dice cómo quieres que trabaje. Por
      ejemplo: "no edites código, solo explica". Cómo se usa, en
      <RouterLink to="/extra/ia/opencode#agents-md">Agentes con OpenCode</RouterLink>.
    </p>

    <h2 id="lo-tedioso">Úsala para lo tedioso</h2>
    <p>
      Documentación, montar un proyecto nuevo, buscar en la documentación oficial: ahí ahorra
      tiempo de verdad.
    </p>
  </PlantillaPagina>
</template>
