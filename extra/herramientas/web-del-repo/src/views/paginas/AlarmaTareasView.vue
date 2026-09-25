<script setup>
import { Callout } from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'

// extra/herramientas/alarma-tareas/README.md
</script>

<template>
  <PlantillaPagina
    titulo="Alarma de tareas"
    entradilla="Avisar solo de las tareas pendientes de verdad (con la fecha pasada y sin entregar), sin repetir avisos de lo que ya tienes controlado."
  >
    <Callout type="note" title="Sin código todavía">
      <p>
        Es un documento de diseño. Para sacar el token y llamar a la API, mira
        <RouterLink to="/extra/herramientas/moodle-api">la API del Aula Virtual</RouterLink>.
      </p>
    </Callout>

    <h2 id="datos">Datos que hacen falta</h2>
    <table>
      <thead>
        <tr><th>Función</th><th>Para qué</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><code>core_calendar_get_action_events_by_timesort</code></td>
          <td>Todas las tareas pendientes de todos tus cursos en una sola llamada. Es el punto de partida.</td>
        </tr>
        <tr>
          <td><code>mod_assign_get_submission_status</code></td>
          <td>Por cada tarea: si de verdad está sin entregar (<code>status: "new"</code>), para no avisar de algo que ya hiciste.</td>
        </tr>
      </tbody>
    </table>
    <p>Las dos están probadas contra el Aula Virtual y devuelven datos reales.</p>

    <h2 id="el-punto-dificil">El punto difícil</h2>
    <p>
      <strong>No es leer las tareas, es no avisar de más.</strong> Hay que guardar entre una
      ejecución y otra qué se avisó ya, no solo pedir la lista cada vez.
    </p>
  </PlantillaPagina>
</template>
