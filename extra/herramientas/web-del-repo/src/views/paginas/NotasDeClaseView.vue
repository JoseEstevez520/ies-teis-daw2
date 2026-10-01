<script setup>
import DiagramaNotasDeClase from '../../visuales/DiagramaNotasDeClase.vue'
import PlantillaPagina from '../../components/PlantillaPagina.vue'

// extra/herramientas/notas-de-clase/README.md
</script>

<template>
  <PlantillaPagina
    titulo="Notas de clase"
    entradilla="Cualquiera deja notas en crudo y un agente las convierte en apuntes y páginas de la web. Idea de clase colaborativa, sin código todavía."
  >
    <p>
      Aportar al repo pide saber git y Vue, y la mayoría no lo hace aunque tenga algo que contar.
      Aquí solo hay que dejar la nota.
    </p>

    <h2 id="como-funciona">Cómo funciona</h2>
    <p>Fíjate en la frontera: lo que entra está en privado, y solo después del agente y de una revisión llega a lo público.</p>
    <DiagramaNotasDeClase />
    <p><strong>El agente propone y una persona aprueba. Lo privado no llega a lo público sin pasar por los dos.</strong></p>

    <h2 id="en-privado">Por qué en privado</h2>
    <p>
      Las notas en crudo no pueden ir al repo público. Un borrador puede llevar nombres o datos
      de compañeros, y lo que se publica una vez ya está copiado: clones, cachés, historial de
      git. El agente tiene que ser la puerta por la que pasa, no el que limpia después.
    </p>

    <h2 id="decidir">Lo que hay que decidir</h2>
    <ul>
      <li>Por dónde entran: bot de chat o web.</li>
      <li>Si la nota es privada de cada uno o común. Lo público sería solo la síntesis del agente.</li>
      <li>
        Cuánto revisa una persona antes de publicar. El agente solo no basta: en un grupo pequeño,
        quitar un nombre no siempre anonimiza a quien escribió.
      </li>
    </ul>

    <h2 id="estado">Estado</h2>
    <p>Sin código todavía. Es el diseño, por si alguien se anima a empezarlo.</p>
  </PlantillaPagina>
</template>
