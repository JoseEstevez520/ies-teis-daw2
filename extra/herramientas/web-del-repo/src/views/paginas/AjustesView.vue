<script setup>
import { Switch } from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import { forzarAnimaciones, setForzarAnimaciones } from '../../lib/movimiento.js'

// Ajustes de esta web en este navegador. De momento solo las animaciones: la
// web respeta el "movimiento reducido" del sistema, y aquí se puede forzar.
</script>

<template>
  <PlantillaPagina titulo="Ajustes" entradilla="Cómo se comporta la web en este navegador.">
    <h2 id="animaciones">Animaciones</h2>
    <p>
      Por defecto la web anima siempre, aunque el sistema pida <strong>movimiento reducido</strong>
      (en algunos PC del aula eso deja las páginas de golpe, sin animarse). Apágalo aquí para que la
      web vuelva a hacer caso al sistema.
    </p>
    <div class="not-prose my-6">
      <Switch :model-value="forzarAnimaciones" @update:model-value="setForzarAnimaciones">
        Forzar las animaciones
      </Switch>
    </div>
    <p>Se guarda solo en este navegador. Encendido (por defecto), anima aunque el sistema pida lo contrario.</p>
  </PlantillaPagina>
</template>
