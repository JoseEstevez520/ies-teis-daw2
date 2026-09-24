<script setup>
import { RouterLink } from 'vue-router'
import { Badge, Callout, CodeBlock } from 'elastic-ui'
import { LayoutDashboard, CircleCheck, Circle, Server, MonitorSmartphone, ShieldCheck } from '@lucide/vue'
import { colorDeRuta } from '../lib/colorSeccion.js'
import ListaEnlaces from '../components/ListaEnlaces.vue'
import PlantillaPagina from '../components/PlantillaPagina.vue'
import SeccionPagina from '../components/SeccionPagina.vue'

const color = colorDeRuta('/extra/herramientas/panel-aula-virtual')

const INDICE = [
  { id: 'arrancarlo', label: 'Arrancarlo tú mismo', level: 2 },
  { id: 'fases', label: 'Fases', level: 2 },
  { id: 'stack', label: 'Stack', level: 2 },
  { id: 'legal', label: 'Legal', level: 2 },
  { id: 'referencias', label: 'Referencias', level: 2 },
]

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
  <PlantillaPagina titulo="Panel del Aula Virtual" :icono="LayoutDashboard" :color="color" :indice="INDICE">
    <p class="text-sm leading-relaxed text-fg-secondary">
      Junta en una sola pantalla lo que hoy hay que ir a buscar por separado en Moodle: tareas
      pendientes de verdad (con estado real de entrega), notas nuevas por curso, y en qué
      asignatura llevas tiempo sin entrar. Detalles técnicos de la API del Aula Virtual en
      <RouterLink
        to="/extra/herramientas/moodle-api"
        class="text-fg underline decoration-border-strong underline-offset-2 transition-[text-decoration-color] duration-150 hover:decoration-fg"
        >moodle-api</RouterLink
      >.
    </p>

    <ul class="grid gap-4 sm:grid-cols-3">
      <li v-for="e in ESTADO" :key="e.nombre" class="flex items-center gap-2.5">
        <component :is="e.hecho ? CircleCheck : Circle" class="size-4 shrink-0" :class="e.hecho ? 'text-fg' : 'text-fg-faint'" />
        <div class="flex flex-col">
          <span class="text-sm font-medium text-fg">{{ e.nombre }}</span>
          <span class="text-xs text-fg-muted">{{ e.nota }}</span>
        </div>
      </li>
    </ul>

    <div class="flex flex-col gap-12">
      <SeccionPagina id="arrancarlo">
        <template #titulo>Arrancarlo tú mismo</template>
        <p class="text-sm text-fg-secondary">Cada uno lo corre en su propia máquina, con su propio token. Nadie más ve tus datos.</p>
        <CodeBlock :code="CLONAR" language="bash" />

        <ol class="flex flex-col">
          <li v-for="(paso, idx) in PASOS" :key="paso.titulo" class="flex gap-3">
            <div class="flex flex-col items-center">
              <span class="flex size-6 shrink-0 items-center justify-center rounded-full bg-bg-muted text-xs font-semibold text-fg tabular-nums">{{ idx + 1 }}</span>
              <span v-if="idx < PASOS.length - 1" class="my-1 w-px flex-1 bg-border"></span>
            </div>
            <div class="flex min-w-0 flex-1 flex-col gap-2 pb-5">
              <p class="text-sm leading-relaxed text-fg-secondary">
                <strong class="font-medium text-fg">{{ paso.titulo }}</strong>: {{ paso.texto }}
              </p>
              <CodeBlock v-if="paso.codigo" :code="paso.codigo" />
            </div>
          </li>
        </ol>

        <p class="text-sm text-fg-secondary">
          Abre la URL que te dé Vite (<code class="rounded-[var(--radius-sm)] bg-bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-fg">http://localhost:5173</code> normalmente).
        </p>
      </SeccionPagina>

      <SeccionPagina id="fases">
        <template #titulo>Fases</template>
        <div class="flex flex-col">
          <div v-for="(fase, idx) in FASES" :key="fase.numero" class="flex gap-4">
            <div class="flex flex-col items-center">
              <span
                class="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                :class="fase.estado === 'en marcha' ? 'bg-fg text-bg' : 'bg-bg-muted text-fg-muted'"
                >{{ fase.numero }}</span
              >
              <span v-if="idx < FASES.length - 1" class="my-1 w-px flex-1 bg-border"></span>
            </div>
            <div class="flex flex-1 flex-col gap-2 pb-8">
              <div class="flex flex-wrap items-center gap-2">
                <h3 class="text-sm font-semibold text-fg">{{ fase.titulo }}</h3>
                <Badge variant="outline" size="sm">{{ fase.estado }}</Badge>
              </div>
              <p class="text-sm text-fg-secondary">{{ fase.resumen }}</p>
              <ul class="mt-1 flex flex-col gap-2">
                <li v-for="punto in fase.puntos" :key="punto" class="flex items-start gap-2">
                  <span class="mt-2 size-1 shrink-0 rounded-full bg-fg-faint"></span>
                  <p class="text-sm leading-relaxed text-fg-secondary">{{ punto }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </SeccionPagina>

      <SeccionPagina id="stack">
        <template #titulo>Stack</template>
        <div class="grid gap-6 sm:grid-cols-2">
          <div class="flex gap-3">
            <MonitorSmartphone class="mt-0.5 size-4 shrink-0 text-fg" />
            <div class="flex flex-col gap-1">
              <span class="text-sm font-semibold text-fg">Frontend</span>
              <span class="text-sm text-fg-secondary">Vue 3 + Vite + Tailwind. Animaciones con Motion (motion-v).</span>
            </div>
          </div>
          <div class="flex gap-3">
            <Server class="mt-0.5 size-4 shrink-0 text-fg" />
            <div class="flex flex-col gap-1">
              <span class="text-sm font-semibold text-fg">Backend</span>
              <span class="text-sm text-fg-secondary">Spring Boot, módulo Web (REST). En Fase 2 se añade JPA para persistir el token de cada uno.</span>
            </div>
          </div>
        </div>
      </SeccionPagina>

      <SeccionPagina id="legal">
        <template #titulo>Legal</template>
        <Callout type="note" title="Consentimiento" :icon="ShieldCheck">
          <p>
            El consentimiento de cada compañero es base legal suficiente para la Fase 2 (art. 6.1.a
            RGPD), pero no elimina la responsabilidad de quien hospeda: sigue teniendo que cumplir
            seguridad adecuada y las peticiones de borrado. El nombre de la herramienta no lleva
            "Moodle" por política de marca.
          </p>
        </Callout>
      </SeccionPagina>

      <SeccionPagina id="referencias">
        <template #titulo>Referencias</template>
        <ListaEnlaces :items="REFERENCIAS" />
      </SeccionPagina>
    </div>

    <p class="text-xs text-fg-muted">
      También vale como proyecto de fin de curso: frontend/backend + consumo de una API REST real +
      una decisión de arquitectura defendible, no solo un CRUD de ejemplo.
    </p>
  </PlantillaPagina>
</template>
