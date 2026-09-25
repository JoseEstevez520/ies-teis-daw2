<script setup>
import { RESUMEN } from './horario.js'

// Los módulos del horario con su profesor y sus sesiones por semana. El
// punto es el color del módulo en el horario de arriba: hace de leyenda. Los
// que tienen página en la web llevan a ella.
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Módulo</th>
        <th>Profesor</th>
        <th>Sesiones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="m in RESUMEN" :key="m.codigo">
        <td>
          <span class="inline-flex items-center gap-2">
            <span class="size-2 shrink-0 rounded-full" :style="{ backgroundColor: m.color }" aria-hidden="true" />
            <RouterLink v-if="m.ruta" :to="m.ruta">{{ m.codigo }}</RouterLink>
            <template v-else>{{ m.codigo }}</template>
          </span>
        </td>
        <td>{{ m.profe }}</td>
        <td class="tabular-nums">{{ m.sesiones }}</td>
      </tr>
    </tbody>
  </table>
</template>
