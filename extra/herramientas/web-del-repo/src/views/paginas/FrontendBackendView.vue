<script setup>
import { Steps, StepsItem } from 'elastic-ui'
import { siExpress, siMongodb, siVuedotjs } from 'simple-icons'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import Tecnologias from '../../components/Tecnologias.vue'
import DiagramaAplicacionWeb from '../../visuales/DiagramaAplicacionWeb.vue'

// modulos/diw/frontend-backend-y-base-de-datos.md
const STACK = [
  { icon: siVuedotjs, nombre: 'Vue' },
  { icon: siExpress, nombre: 'Express' },
  { icon: siMongodb, nombre: 'MongoDB' },
]

const PARADAS = [
  { titulo: 'Rellenas el formulario', texto: 'Escribes los datos del paciente y pulsas Guardar.' },
  { titulo: 'El frontend comprueba', texto: 'Revisa el DNI, el correo y el teléfono antes de enviar nada.' },
  { titulo: 'La llamada al backend', texto: 'src/api/pacientes.js manda el paciente a POST /api/pacientes.' },
  { titulo: 'El backend reparte', texto: 'El servidor reconoce una petición de pacientes y la pasa a su ruta.' },
  { titulo: 'La ruta valida y guarda', texto: 'Lo comprueba contra el modelo Paciente y lo manda a la base de datos.' },
  { titulo: 'MongoDB lo guarda', texto: 'La respuesta vuelve por el mismo camino y la tabla se refresca.' },
]

const ARCHIVOS = [
  ['src/main.js', 'arranca Vue y el router'],
  ['src/App.vue', 'cabecera, pie y el hueco donde cambia la página'],
  ['src/router/index.js', 'qué página se ve en cada dirección'],
  ['src/views/XestionPaciente.vue', 'el formulario y la lista de pacientes'],
  ['src/api/*.js', 'las llamadas al backend, con axios'],
  ['backend/server.js', 'arranca el servidor y conecta con MongoDB'],
  ['backend/rutas/pacientes.rutas.js', 'el POST y el GET de pacientes'],
  ['backend/modelos/Paciente.js', 'los campos y cuáles son obligatorios'],
  ['docker-compose.yml', 'levanta MongoDB aparte, con sus datos guardados'],
]
</script>

<template>
  <PlantillaPagina
    titulo="Frontend, backend y base de datos"
    entradilla="El navegador no puede leer la base de datos por su cuenta. En medio hay un servidor: la web le pide los datos y el servidor se los da."
  >
    <h2 id="tres-piezas">Tres piezas</h2>
    <p>
      Una página como XestionPacientes muestra una lista de pacientes y guarda los nuevos. Esos
      pacientes tienen que seguir ahí al cerrar el navegador, así que viven en una base de datos.
      Pero el navegador no puede hablar con ella: no entiende su idioma y, aunque pudiera, dejaría
      la base abierta a cualquiera. Hace falta una pieza en medio.
    </p>
    <Tecnologias :items="STACK" />
    <DiagramaAplicacionWeb />
    <p><strong>El frontend solo llama al backend; el backend es el único que toca la base de datos.</strong></p>

    <h2 id="viaje">El viaje de una petición</h2>
    <p>Guardar un paciente pasa por seis paradas, y la respuesta vuelve por el mismo camino:</p>
    <Steps static>
      <StepsItem v-for="p in PARADAS" :key="p.titulo" :title="p.titulo">
        <p>{{ p.texto }}</p>
      </StepsItem>
    </Steps>

    <h2 id="archivos">Las piezas del proyecto</h2>
    <p>Cada parte de la idea tiene su archivo en XestionPacientes:</p>
    <table>
      <thead>
        <tr><th>Archivo</th><th>Para qué</th></tr>
      </thead>
      <tbody>
        <tr v-for="a in ARCHIVOS" :key="a[0]">
          <td><code>{{ a[0] }}</code></td>
          <td>{{ a[1] }}</td>
        </tr>
      </tbody>
    </table>

    <h2 id="arrancarlo">Arrancarlo</h2>
    <p>
      <code>npm start</code> levanta a la vez el frontend (Vite) y el backend (Node). La base de
      datos va aparte, con Docker, y tiene que estar ya en marcha.
    </p>

    <h2 id="para-explorar">Para explorar</h2>
    <ul>
      <li><a href="https://vuejs.org/guide/introduction.html" target="_blank" rel="noopener noreferrer">Vue</a>.</li>
      <li><a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer">Express</a>.</li>
      <li><a href="https://www.mongodb.com/docs/" target="_blank" rel="noopener noreferrer">MongoDB</a>.</li>
    </ul>

    <p class="text-sm text-fg-muted">
      Basado en <em>XestionPacientes: How the Project Works</em> (@Greg).
    </p>
  </PlantillaPagina>
</template>
