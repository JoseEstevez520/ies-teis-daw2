<script setup>
import { Callout, CodeBlock, Steps, StepsItem } from 'elastic-ui'
import { siMoodle } from 'simple-icons'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import Tecnologias from '../../components/Tecnologias.vue'
import { enGitHub } from '../../lib/repo.js'

// extra/herramientas/moodle-api.md
const MOODLE = [{ icon: siMoodle, nombre: 'Moodle' }]
const URL_BASE = 'https://centros.edu.xunta.gal/iesteis/aulavirtual/webservice/rest/server.php'
const PETICION = `curl -s "\${MOODLE_URL}/webservice/rest/server.php" \\
  --data-urlencode "wstoken=\${MOODLE_TOKEN}" \\
  --data-urlencode "wsfunction=NOMBRE_DE_LA_FUNCION" \\
  --data-urlencode "moodlewsrestformat=json"`

const FUNCIONES = [
  { nombre: 'core_webservice_get_site_info', con: '', que: 'Tu perfil y las funciones que puede usar tu token. Para comprobar que el token funciona.' },
  { nombre: 'core_enrol_get_users_courses', con: 'userid', que: 'Tus cursos, con su id de Moodle.' },
  { nombre: 'core_calendar_get_action_events_by_timesort', con: '', que: 'Las tareas pendientes de todos los cursos en una sola llamada.' },
  { nombre: 'mod_assign_get_assignments', con: '', que: 'Todas las tareas de todos los cursos con su fecha, también las entregadas.' },
  { nombre: 'mod_assign_get_submission_status', con: 'assignid', que: 'Si una tarea está entregada de verdad o no.' },
  { nombre: 'core_course_get_contents', con: 'courseid', que: 'Todo el contenido de un curso: secciones, archivos, tareas y enlaces.' },
  { nombre: 'message_popup_get_popup_notifications', con: 'useridto', que: 'Las notificaciones sin leer.' },
  { nombre: 'gradereport_user_get_grade_items', con: 'courseid y userid', que: 'Las notas de un curso en JSON. Sirve para avisar cuando sale una nota nueva.' },
  { nombre: 'core_course_get_recent_courses', con: '', que: 'Tus cursos por último acceso: en cuál llevas más tiempo sin entrar.' },
  { nombre: 'core_calendar_get_calendar_upcoming_view', con: '', que: 'Como la de tareas pendientes, con más datos por evento (actividad, icono, curso).' },
]

// Un texto con `código` entre comillas invertidas, en trozos: los impares son código.
const trozos = (texto) => texto.split('`')

const DETALLES = [
  {
    id: 'userid-calendario',
    titulo: 'El calendario con `userid` da `nopermission`',
    texto: '`core_calendar_get_action_events_by_timesort` con `userid` explícito falla aunque sea el tuyo. Quita el parámetro: Moodle lo toma del dueño del token.',
  },
  {
    id: 'instance-cmid',
    titulo: 'El `instance` de un evento no es el id de la tarea',
    texto: 'Es el `cmid` (el id del módulo de curso, el de las URLs de Moodle). El id que pide `mod_assign_get_submission_status` sale de `mod_assign_get_assignments`, no del evento.',
  },
  {
    id: 'sin-submission',
    titulo: 'Una tarea sin abrir no trae `submission`',
    texto: 'Si nunca abriste la entrega, `mod_assign_get_submission_status` no trae `lastattempt.submission`, ni siquiera con un estado "sin empezar". Trátalo igual que "sin entregar".',
  },
  {
    id: 'userid-notas',
    titulo: 'Las notas, en cambio, exigen `userid`',
    texto: '`gradereport_user_get_grade_items` sin `userid` da `nopermission`, al revés que el calendario. No hay regla general: si una función da error de permisos, pruébala con y sin `userid`.',
  },
]
</script>

<template>
  <PlantillaPagina
    titulo="API del Aula Virtual (Moodle)"
    entradilla="Referencia para cualquier herramienta que necesite datos del Aula Virtual: qué es, cómo sacar un token y qué funciones ya están probadas."
  >
    <h2 id="que-es">Qué es</h2>
    <p>
      El Aula Virtual tiene activados los servicios web oficiales de Moodle, los mismos que usa la
      app Moodle Mobile: no es un truco. Cada alumno ya tiene un token para el servicio "Moodle
      mobile web service".
    </p>
    <Tecnologias :items="MOODLE" />

    <h2 id="como-sacar-tu-token">Cómo sacar tu token</h2>
    <Steps static>
      <StepsItem title="Ve a tus claves">
        <p>Aula Virtual → tu perfil → Preferencias → Chaves de seguridade.</p>
      </StepsItem>
      <StepsItem title="Restablece el token">
        <p>En la fila "Moodle mobile web service", pulsa "Restabelecer".</p>
      </StepsItem>
      <StepsItem title="Guárdalo">
        <p>
          Moodle lo enseña una sola vez. Guárdalo en un <code>.env</code> en tu ordenador, nunca en
          el repo (mira <a :href="enGitHub('.env.example')" target="_blank" rel="noopener noreferrer">.env.example</a>).
        </p>
      </StepsItem>
    </Steps>
    <Callout type="warning" title="Si usas la app Moodle Mobile">
      <p>Restablecer el token la desconecta y tendrás que volver a iniciar sesión. Si solo usas el navegador, no pasa nada.</p>
    </Callout>

    <h2 id="peticiones">Cómo se llama</h2>
    <p>Todas las funciones van a la misma dirección:</p>
    <CodeBlock :code="URL_BASE" title="URL base" />
    <p>Una petición cualquiera, con <code>curl</code>:</p>
    <CodeBlock :code="PETICION" language="bash" />

    <h2 id="funciones">Funciones de solo lectura probadas</h2>
    <table>
      <thead>
        <tr><th>Función</th><th>Qué da</th></tr>
      </thead>
      <tbody>
        <tr v-for="f in FUNCIONES" :key="f.nombre">
          <td>
            <code>{{ f.nombre }}</code>
            <span v-if="f.con" class="block text-sm text-fg-muted">con {{ f.con }}</span>
          </td>
          <td>{{ f.que }}</td>
        </tr>
      </tbody>
    </table>
    <Callout type="caution" title="Una trampa con las notas">
      <p>
        <code>core_grades_get_gradeitems</code> parece igual que
        <code>gradereport_user_get_grade_items</code>, pero nunca trae la nota, solo el nombre del
        ítem. Usa la segunda.
      </p>
    </Callout>
    <p>
      También probadas, pero sin datos porque este año no se usan: los foros
      (<code>mod_forum_get_forums_by_courses</code>), las insignias
      (<code>core_badges_get_user_badges</code>) y el seguimiento de finalización
      (<code>core_completion_get_activities_completion_status</code>).
    </p>
    <p>
      <code>core_calendar_get_calendar_export_token</code> daría una URL de calendario para
      suscribirse desde Google o Apple Calendar sin construir nada, pero genera un token nuevo y
      está pendiente de decidir si se usa.
    </p>

    <h2 id="detalles">Detalles que no son obvios</h2>
    <p>Encontrados construyendo el backend del <RouterLink to="/extra/herramientas/panel-aula-virtual">panel</RouterLink>, contra el Aula Virtual real:</p>
    <template v-for="d in DETALLES" :key="d.id">
      <h3 :id="d.id"><template v-for="(t, i) in trozos(d.titulo)" :key="i"><code v-if="i % 2">{{ t }}</code><template v-else>{{ t }}</template></template></h3>
      <p><template v-for="(t, i) in trozos(d.texto)" :key="i"><code v-if="i % 2">{{ t }}</code><template v-else>{{ t }}</template></template></p>
    </template>

    <h2 id="lo-que-no-funciona">Lo que no funciona desde una cuenta de alumno</h2>
    <ul>
      <li>
        Las funciones de profesor (por ejemplo <code>mod_assign_get_submissions</code>, que lista las
        entregas de todo el grupo) dan <code>accessexception</code>. Es lo esperado.
      </li>
      <li>
        El servicio de asistencia (<code>mod_attendance</code>) está pensado para el profesor pasando
        lista, y ningún curso de este año lo tiene activado. Por eso la
        <RouterLink to="/extra/herramientas/calculadora-de-faltas">calculadora de faltas</RouterLink>
        es manual.
      </li>
    </ul>

    <h2 id="seguridad">Seguridad: qué no se ha probado</h2>
    <p>
      Moodle ha tenido fallos de permisos en esta familia de funciones (saltarse fechas de entrega,
      ver notas ocultas). Esta instancia corre una versión reciente (4.5.12+, de julio de 2026), así
      que esos fallos casi seguro están corregidos, pero no se ha comprobado en vivo.
      <strong>Probar los límites de un token contra el servidor del centro necesita permiso del
      centro</strong>, no solo el del alumno dueño del token.
    </p>

    <h2 id="marca">Marca</h2>
    <p>
      Moodle no deja usar su nombre en herramientas de terceros, aunque sean gratis
      (<a href="https://moodle.com/wp-content/uploads/2024/01/Moodle-Trademark-Guidelines-2023.pdf" target="_blank" rel="noopener noreferrer">normas de marca</a>).
      Nombra las herramientas por lo que hacen (<code>alarma-tareas</code>, no
      <code>MoodleAlarma</code>) y menciona Moodle solo al describirlas.
    </p>

    <h2 id="referencias">Referencias</h2>
    <ul>
      <li><a href="https://github.com/Poetrynan/Muster" target="_blank" rel="noopener noreferrer">Muster</a>: aplicación de escritorio con todas las tareas y su estado real de entrega, y resúmenes con IA.</li>
      <li><a href="https://github.com/C0D3D3V/Moodle-DL" target="_blank" rel="noopener noreferrer">Moodle-DL</a>: descarga los materiales de los cursos por la API oficial. Madura y muy usada.</li>
    </ul>
  </PlantillaPagina>
</template>
