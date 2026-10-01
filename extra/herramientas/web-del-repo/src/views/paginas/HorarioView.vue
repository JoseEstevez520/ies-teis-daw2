<script setup>
import HorarioModulos from '../../visuales/HorarioModulos.vue'
import HorarioSemanal from '../../visuales/HorarioSemanal.vue'
import PlantillaPagina from '../../components/PlantillaPagina.vue'

// horario/README.md
</script>

<template>
  <PlantillaPagina titulo="Horario de CSDAW 2º">
    <p>
      Sesiones de 50 min. Los jueves se acaba a las 15:20; el resto de días, a las 14:30.
    </p>
    <HorarioSemanal />

    <h2 id="modulos">Módulos y profes</h2>
    <HorarioModulos />
  </PlantillaPagina>
</template>
