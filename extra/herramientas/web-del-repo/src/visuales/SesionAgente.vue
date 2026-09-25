<script setup>
import { AgentReplay } from 'elastic-ui'
import { SESIONES } from './sesiones.js'

// Una sesión de agente de sesiones.js, reproducida con AgentReplay. Cada una
// va en su .md bajo su propio título, una detrás de otra (USAGE 9).
const props = defineProps({
  nombre: { type: String, required: true },
})
</script>

<template>
  <AgentReplay :events="SESIONES[props.nombre]" layout="stacked" />
</template>
