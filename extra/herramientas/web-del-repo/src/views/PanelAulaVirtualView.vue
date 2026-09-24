<script setup>
import { RouterLink } from 'vue-router'
import {
  LayoutDashboard,
  CircleCheck,
  Circle,
  Server,
  MonitorSmartphone,
  ShieldCheck,
  ExternalLink,
} from '@lucide/vue'

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
  <div class="max-w-4xl flex flex-col gap-8">
    <div class="flex items-center gap-2.5">
      <LayoutDashboard class="w-5 h-5 shrink-0" style="color: #d97706" />
      <h1 class="text-2xl font-semibold text-neutral-900">Panel del Aula Virtual</h1>
    </div>

    <p class="text-sm text-neutral-700 leading-relaxed">
      Junta en una sola pantalla lo que hoy hay que ir a buscar por separado en Moodle: tareas
      pendientes de verdad (con estado real de entrega), notas nuevas por curso, y en qué
      asignatura llevas tiempo sin entrar. Detalles técnicos de la API del Aula Virtual en
      <RouterLink to="/extra/herramientas/moodle-api" class="text-neutral-900 underline decoration-neutral-300 hover:decoration-neutral-900 underline-offset-2">moodle-api</RouterLink>.
    </p>

    <!-- Estado -->
    <div class="grid sm:grid-cols-3 gap-3">
      <div class="flex items-center gap-2.5 rounded-lg border border-neutral-200 bg-white px-4 py-3">
        <CircleCheck class="w-4 h-4 text-neutral-900 shrink-0" />
        <div class="flex flex-col">
          <span class="text-sm font-medium text-neutral-900">Tareas</span>
          <span class="text-xs text-neutral-400">/api/tareas funciona</span>
        </div>
      </div>
      <div class="flex items-center gap-2.5 rounded-lg border border-neutral-200 bg-white px-4 py-3">
        <CircleCheck class="w-4 h-4 text-neutral-900 shrink-0" />
        <div class="flex flex-col">
          <span class="text-sm font-medium text-neutral-900">Notas</span>
          <span class="text-xs text-neutral-400">/api/notas funciona</span>
        </div>
      </div>
      <div class="flex items-center gap-2.5 rounded-lg border border-neutral-200 bg-white px-4 py-3">
        <Circle class="w-4 h-4 text-neutral-400 shrink-0" />
        <div class="flex flex-col">
          <span class="text-sm font-medium text-neutral-900">Actividad + frontend</span>
          <span class="text-xs text-neutral-400">sin construir</span>
        </div>
      </div>
    </div>

    <!-- Quick start -->
    <div class="flex flex-col gap-4">
      <h2 class="text-base font-semibold text-neutral-900 pb-2 border-b border-neutral-200">Arrancarlo tú mismo</h2>
      <p class="text-sm text-neutral-700">Cada uno lo corre en su propia máquina, con su propio token. Nadie más ve tus datos.</p>

      <div class="rounded-lg border border-neutral-200 overflow-hidden">
        <pre class="p-4 overflow-x-auto text-xs font-mono text-neutral-800 bg-white"><code>git clone https://github.com/JoseEstevez520/ies-teis-daw2.git
cd ies-teis-daw2</code></pre>
      </div>

      <ol class="flex flex-col">
        <li v-for="(paso, idx) in PASOS" :key="paso.titulo" class="flex gap-3">
          <div class="flex flex-col items-center">
            <span class="flex items-center justify-center w-6 h-6 rounded-full border border-neutral-300 text-neutral-900 text-xs font-semibold shrink-0">{{ idx + 1 }}</span>
            <span v-if="idx < PASOS.length - 1" class="w-px flex-1 bg-neutral-200 my-1"></span>
          </div>
          <div class="flex flex-col gap-2 pb-4">
            <p class="text-sm text-neutral-700 leading-relaxed">
              <strong class="text-neutral-900 font-medium">{{ paso.titulo }}</strong>: {{ paso.texto }}
            </p>
            <pre v-if="paso.codigo" class="rounded-lg border border-neutral-200 p-3 overflow-x-auto text-xs font-mono text-neutral-800 bg-white"><code>{{ paso.codigo }}</code></pre>
          </div>
        </li>
      </ol>

      <p class="text-sm text-neutral-700">Abre la URL que te dé Vite (<code class="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-800 font-mono text-[0.85em]">http://localhost:5173</code> normalmente).</p>
    </div>

    <!-- Fases -->
    <div class="flex flex-col gap-4">
      <h2 class="text-base font-semibold text-neutral-900 pb-2 border-b border-neutral-200">Fases</h2>

      <div class="flex flex-col">
        <div v-for="(fase, idx) in FASES" :key="fase.numero" class="flex gap-4">
          <div class="flex flex-col items-center">
            <span
              class="flex items-center justify-center w-8 h-8 rounded-full border text-xs font-semibold shrink-0"
              :class="fase.estado === 'en marcha' ? 'border-neutral-900 text-neutral-900' : 'border-neutral-300 text-neutral-400'"
              >{{ fase.numero }}</span
            >
            <span v-if="idx < FASES.length - 1" class="w-px flex-1 bg-neutral-200 my-1"></span>
          </div>
          <div class="flex flex-col gap-2 pb-8 flex-1">
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-semibold text-neutral-900">{{ fase.titulo }}</h3>
              <span class="text-xs px-2 py-0.5 rounded-full border border-neutral-200 text-neutral-400">{{ fase.estado }}</span>
            </div>
            <p class="text-sm text-neutral-700">{{ fase.resumen }}</p>
            <ul class="flex flex-col gap-2 mt-1">
              <li v-for="punto in fase.puntos" :key="punto" class="flex items-start gap-2">
                <span class="mt-2 w-1 h-1 rounded-full bg-neutral-400 shrink-0"></span>
                <p class="text-sm text-neutral-700 leading-relaxed">{{ punto }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Stack -->
    <div class="flex flex-col gap-4">
      <h2 class="text-base font-semibold text-neutral-900 pb-2 border-b border-neutral-200">Stack</h2>
      <div class="grid sm:grid-cols-2 gap-3">
        <div class="flex gap-3 rounded-lg border border-neutral-200 bg-white p-4">
          <MonitorSmartphone class="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
          <div class="flex flex-col gap-1">
            <span class="text-sm font-semibold text-neutral-900">Frontend</span>
            <span class="text-sm text-neutral-700">Vue 3 + Vite + Tailwind. Animaciones con Motion (motion-v).</span>
          </div>
        </div>
        <div class="flex gap-3 rounded-lg border border-neutral-200 bg-white p-4">
          <Server class="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
          <div class="flex flex-col gap-1">
            <span class="text-sm font-semibold text-neutral-900">Backend</span>
            <span class="text-sm text-neutral-700">Spring Boot, módulo Web (REST). En Fase 2 se añade JPA para persistir el token de cada uno.</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Legal -->
    <div class="flex flex-col gap-3">
      <h2 class="text-base font-semibold text-neutral-900 pb-2 border-b border-neutral-200">Legal</h2>
      <div class="flex gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
        <ShieldCheck class="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
        <p class="text-sm text-neutral-700 leading-relaxed">
          El consentimiento de cada compañero es base legal suficiente para la Fase 2 (art. 6.1.a
          RGPD), pero no elimina la responsabilidad de quien hospeda: sigue teniendo que cumplir
          seguridad adecuada y las peticiones de borrado. El nombre de la herramienta no lleva
          "Moodle" por política de marca.
        </p>
      </div>
    </div>

    <!-- Referencias -->
    <div class="flex flex-col gap-3">
      <h2 class="text-base font-semibold text-neutral-900 pb-2 border-b border-neutral-200">Referencias</h2>
      <div class="flex flex-col divide-y divide-neutral-200 rounded-lg border border-neutral-200 overflow-hidden">
        <a
          v-for="ref in REFERENCIAS"
          :key="ref.url"
          :href="ref.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-between gap-3 p-4 bg-white hover:bg-neutral-50 transition-colors duration-150"
        >
          <div class="flex flex-col gap-0.5">
            <span class="text-sm font-semibold text-neutral-900">{{ ref.nombre }}</span>
            <span class="text-sm text-neutral-700">{{ ref.nota }}</span>
          </div>
          <ExternalLink class="w-3.5 h-3.5 text-neutral-400 shrink-0" />
        </a>
      </div>
    </div>

    <p class="text-xs text-neutral-400">
      También vale como proyecto de fin de curso: frontend/backend + consumo de una API REST real +
      una decisión de arquitectura defendible, no solo un CRUD de ejemplo.
    </p>
  </div>
</template>
