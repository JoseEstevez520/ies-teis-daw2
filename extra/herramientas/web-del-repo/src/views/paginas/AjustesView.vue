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
      La web sigue el ajuste de <strong>movimiento reducido</strong> del sistema. Si lo tienes
      activado (pasa en algunos PC del aula, sobre todo si van justos de potencia), las transiciones
      y los dibujos aparecen de golpe, sin animarse. Con esto encendido, la web anima igual aunque el
      sistema pida lo contrario.
    </p>
    <div class="not-prose my-6">
      <Switch :model-value="forzarAnimaciones" @update:model-value="setForzarAnimaciones">
        Forzar las animaciones
      </Switch>
    </div>
    <p>Se guarda solo en este navegador. Apagado, la web vuelve a hacer caso al sistema.</p>
  </PlantillaPagina>
</template>
