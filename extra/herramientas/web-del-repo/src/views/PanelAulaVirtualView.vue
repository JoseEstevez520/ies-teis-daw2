<script setup>
import { RouterLink } from 'vue-router'
import { Callout, CodeBlock } from 'elastic-ui'
import PlantillaPagina from '../components/PlantillaPagina.vue'


const ESTADO = [
  { nombre: 'Tareas', nota: '/api/tareas funciona', hecho: true },
  { nombre: 'Notas', nota: '/api/notas funciona', hecho: true },
  { nombre: 'Actividad + frontend', nota: 'sin construir', hecho: false },
]

const CLONAR = `git clone https://github.com/JoseEstevez520/ies-teis-daw2.git
cd ies-teis-daw2`

const PASOS = [
  {
    titulo: 'Saca tu token',
    texto:
      'Aula Virtual → tu perfil → Preferencias → Chaves de seguridade → "Moodle mobile web service" → Restabelecer.',
  },
  {
    titulo: 'Crea tu .env',
    texto: 'En la raíz del repo, copiando .env.example, y pega ahí tu MOODLE_TOKEN. Nunca se sube: ya está en .gitignore.',
  },
  {
    titulo: 'Arranca el backend',
    texto: 'Java 21, no hace falta instalar Maven (ya trae mvnw).',
    codigo: 'set -a; source .env; set +a\ncd extra/herramientas/panel-aula-virtual/backend\n./mvnw spring-boot:run',
  },
  {
    titulo: 'Arranca el frontend',
    texto: 'En otra terminal, con Node.',
    codigo: 'cd extra/herramientas/panel-aula-virtual/frontend\nnpm install\nnpm run dev',
  },
]

const FASES = [
  {
    numero: 1,
    estado: 'en marcha',
    titulo: 'Versión personal autoalojada',
    resumen: 'Cada uno la corre en su propia máquina o servidor, con su propio token.',
    puntos: [
      'Backend propio en vez de una web estática: resuelve CORS (la petición la hace tu servidor, no el navegador) y permite avisar aunque no tengas la página abierta, con un cron + Telegram/email.',
      'Datos: solo los tuyos, en tu propia máquina. Uso personal, cae en la excepción de actividad doméstica del RGPD (art. 2.2.c).',
      'Coste: cero si lo corres en tu propio ordenador o un free tier (GitHub Actions + Telegram, por ejemplo).',
    ],
  },
  {
    numero: 2,
    estado: 'futuro, sin decidir',
    titulo: 'Hospedado para quien no tenga dónde ponerlo',
    resumen: 'Si se ofrece una versión hospedada, con el consentimiento de cada uno.',
    puntos: [
      'Un VPS + un contenedor Docker por persona, no una app compartida con una base de datos común: un fallo de la app no puede mezclar los datos de dos personas.',
      'Solución ya hecha para esto: ShinyProxy, pensado para "un contenedor aislado por usuario, detrás de un login". Su modo simple (usuario+contraseña por persona) guarda esas contraseñas en texto plano, así que tienen que ser nuevas, nunca las del Aula Virtual.',
      'Lo que esto no resuelve solo con Docker: si el servidor entero se compromete (no el contenedor de uno), todos los contenedores quedan expuestos.',
      'Responsabilidad de quien hospeda: el token de cada uno es una credencial. Exige cifrado en la base de datos, solo funciones de lectura habilitadas, y avisar de qué se guarda y que se puede pedir el borrado.',
    ],
  },
]

const REFERENCIAS = [
  { nombre: 'Muster', url: 'https://github.com/Poetrynan/Muster', nota: 'experiencia de usuario de referencia' },
  { nombre: 'Moodle-DL', url: 'https://github.com/C0D3D3V/Moodle-DL', nota: 'mismo tipo de descarga vía API, maduro' },
  { nombre: 'ShinyProxy', url: 'https://www.shinyproxy.io/', nota: 'la pieza de "contenedor por usuario" de la Fase 2' },
]
</script>

<template>
  <PlantillaPagina titulo="Panel del Aula Virtual">
    <p>
      Junta en una sola pantalla lo que hoy hay que ir a buscar por separado en Moodle: tareas
      pendientes de verdad (con estado real de entrega), notas nuevas por curso, y en qué
      asignatura llevas tiempo sin entrar. Detalles técnicos de la API del Aula Virtual en
      <RouterLink to="/extra/herramientas/moodle-api">moodle-api</RouterLink>.
    </p>
    <ul>
      <li v-for="e in ESTADO" :key="e.nombre">
        <strong>{{ e.nombre }}</strong>: {{ e.nota }}{{ e.hecho ? '.' : ' todavía.' }}
      </li>
    </ul>

    <h2 id="arrancarlo">Arrancarlo tú mismo</h2>
    <p>Cada uno lo arranca en su propia máquina, con su propio token. Nadie más ve tus datos.</p>
    <CodeBlock :code="CLONAR" language="bash" />
    <ol>
      <li v-for="paso in PASOS" :key="paso.titulo">
        <strong>{{ paso.titulo }}</strong>: {{ paso.texto }}
        <CodeBlock v-if="paso.codigo" :code="paso.codigo" language="bash" class="mt-3" />
      </li>
    </ol>
    <p>Abre la URL que te dé Vite (<code>http://localhost:5173</code> normalmente).</p>

    <h2 id="fases">Fases</h2>
    <template v-for="fase in FASES" :key="fase.numero">
      <h3 :id="`fase-${fase.numero}`">Fase {{ fase.numero }}: {{ fase.titulo }} ({{ fase.estado }})</h3>
      <p>{{ fase.resumen }}</p>
      <ul>
        <li v-for="punto in fase.puntos" :key="punto">{{ punto }}</li>
      </ul>
    </template>

    <h2 id="stack">Stack</h2>
    <ul>
      <li><strong>Frontend</strong>: Vue 3 + Vite + Tailwind. Animaciones con Motion (motion-v).</li>
      <li>
        <strong>Backend</strong>: Spring Boot, módulo Web (REST). En la fase 2 se añade JPA para
        guardar el token de cada uno.
      </li>
    </ul>

    <h2 id="legal">Legal</h2>
    <Callout type="important" title="Consentimiento">
      <p>
        El consentimiento de cada compañero es base legal suficiente para la fase 2 (art. 6.1.a
        RGPD), pero no quita la responsabilidad de quien hospeda: tiene que cumplir con una
        seguridad adecuada y con las peticiones de borrado. El nombre de la herramienta no lleva
        "Moodle" por política de marca.
      </p>
    </Callout>

    <h2 id="referencias">Referencias</h2>
    <ul>
      <li v-for="r in REFERENCIAS" :key="r.url">
        <a :href="r.url" target="_blank" rel="noopener noreferrer">{{ r.nombre }}</a>: {{ r.nota }}.
      </li>
    </ul>

    <p>
      También vale como proyecto de fin de curso: frontend y backend, consumo de una API REST real
      y una decisión de arquitectura defendible, no solo un CRUD de ejemplo.
    </p>
  </PlantillaPagina>
</template>
