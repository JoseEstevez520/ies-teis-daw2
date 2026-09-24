<script setup>
import { CalendarX, Ban, Percent, Calculator, ExternalLink } from '@lucide/vue'

const DESCARTES = [
  'El Aula Virtual (Moodle) tiene un servicio de asistencia (mod_attendance), pero ninguno de los 8 cursos del curso 2026-27 lo usa (comprobado uno por uno vía API).',
  'Las faltas reales se llevan en AbalarMóvil / XADE, la app de la Xunta de Galicia, no en Moodle. No es del instituto, es infraestructura del gobierno gallego.',
  'AbalarMóvil no tiene API pública ni función de exportar datos (comprobado en su FAQ y en la documentación de la función "Faltas"). Ni siquiera la propia app calcula un %, solo lista faltas individuales con su estado.',
]

const UMBRALES = [
  { valor: '6%', etiqueta: 'faltas sin justificar', nota: 'apercibimiento' },
  { valor: '10%', etiqueta: 'faltas sin justificar', nota: 'pérdida de evaluación continua' },
  { valor: '15 / 25', etiqueta: 'días consecutivos / alternos', nota: 'baja de oficio' },
]

const FUENTES = [
  { nombre: 'Presentación de Tutoría 2ºDAW 2026-2027', nota: 'Aula Virtual, IES de Teis' },
  { nombre: 'Orde do 12 de xullo de 2011 — DOG', url: 'https://www.xunta.gal/dog/Publicados/2011/20110715/AnuncioC3F1-120711-4341_es.html', nota: 'fija el 10% como norma general de Galicia' },
  { nombre: 'Calendario escolar Galicia 2026-2027', url: 'https://www.galiciae.com/articulo/galicia/calendario-escolar-galicia-curso-2026-27-cuando-empiezan-claves-que-dias-seran-lectivos/20260825180432109165.html', nota: 'galiciae.com' },
]
</script>

<template>
  <div class="max-w-4xl flex flex-col gap-8">
    <div class="flex items-center gap-2.5">
      <CalendarX class="w-5 h-5 shrink-0" style="color: #d97706" />
      <h1 class="text-2xl font-semibold text-neutral-900">Calculadora de faltas</h1>
    </div>

    <p class="text-sm text-neutral-700 leading-relaxed">
      Mete tus faltas por módulo y ve el % frente al máximo permitido antes de perder evaluación
      continua.
    </p>

    <!-- Quick start -->
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <h2 class="text-base font-semibold text-neutral-900">Arrancarlo tú mismo</h2>
        <span class="text-xs px-2 py-0.5 rounded-full border border-neutral-200 text-neutral-400">sin backend ni token</span>
      </div>
      <div class="rounded-lg border border-neutral-200 overflow-hidden">
        <pre class="p-4 overflow-x-auto text-xs font-mono text-neutral-800 bg-white"><code>git clone https://github.com/JoseEstevez520/ies-teis-daw2.git
cd ies-teis-daw2/extra/herramientas/calculadora-de-faltas
npm install
npm run dev</code></pre>
      </div>
      <p class="text-sm text-neutral-700">Abre la URL que te dé Vite (<code class="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-800 font-mono text-[0.85em]">http://localhost:5173</code> normalmente).</p>
    </div>

    <!-- Por qué manual -->
    <div class="flex flex-col gap-3">
      <h2 class="text-base font-semibold text-neutral-900 pb-2 border-b border-neutral-200">Por qué es de entrada manual, no automática</h2>
      <p class="text-sm text-neutral-700">Investigado y descartado el automatizarlo:</p>
      <div class="flex flex-col gap-2">
        <div v-for="d in DESCARTES" :key="d" class="flex gap-3 rounded-lg border border-neutral-200 bg-white p-4">
          <Ban class="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
          <p class="text-sm text-neutral-700 leading-relaxed">{{ d }}</p>
        </div>
      </div>
      <p class="text-sm text-neutral-700 leading-relaxed">
        No hay ninguna fuente de la que tirar el dato automáticamente: tú cuentas tus faltas en
        AbalarMóvil y metes el número, la herramienta hace el cálculo. Ese acceso a AbalarMóvil es
        individual, del propio alumno, no compartido con la familia.
      </p>
    </div>

    <!-- Umbrales -->
    <div class="flex flex-col gap-3">
      <h2 class="text-base font-semibold text-neutral-900 pb-2 border-b border-neutral-200">Los umbrales reales</h2>
      <p class="text-sm text-neutral-700">De la presentación de Tutoría de IES de Teis, más específica que la norma general. Solo cuentan las faltas sin justificar.</p>
      <div class="grid sm:grid-cols-3 gap-3">
        <div v-for="u in UMBRALES" :key="u.nota" class="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-white p-4">
          <div class="flex items-center gap-1.5">
            <Percent class="w-3.5 h-3.5 text-neutral-400" />
            <span class="text-xl font-semibold text-neutral-900">{{ u.valor }}</span>
          </div>
          <span class="text-xs text-neutral-400">{{ u.etiqueta }}</span>
          <span class="text-sm text-neutral-700 mt-1">{{ u.nota }}</span>
        </div>
      </div>
    </div>

    <!-- Fórmula -->
    <div class="flex flex-col gap-3">
      <h2 class="text-base font-semibold text-neutral-900 pb-2 border-b border-neutral-200">Fórmula</h2>
      <p class="text-sm text-neutral-700 leading-relaxed">
        Horas por módulo (contando los bloques de 50 min de <code class="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-800 font-mono text-[0.85em]">horario/README.md</code>): dwcs 8h20, diw 6h40, dwcc 5h50, daw 3h20,
        ipeii 1h40, hcle 1h40, dasp 50min, acp 50min. Semanas lectivas reales de 2º curso (hasta la
        2ª avaliación, antes de FCT): ~20,8, no las ~34,8 de un curso completo.
      </p>
      <div class="rounded-lg border border-neutral-200 overflow-hidden">
        <div class="flex items-center gap-2 px-4 py-2 bg-neutral-50 border-b border-neutral-200">
          <Calculator class="w-3.5 h-3.5 text-neutral-400" />
          <span class="text-xs text-neutral-400 font-mono">fórmula</span>
        </div>
        <pre class="p-4 overflow-x-auto text-xs font-mono text-neutral-800 bg-white"><code>horas totales módulo = horas/semana × 20,8 semanas
horas de falta = nº de faltas sin justificar × 50 min (duración de una clase)
% faltado = horas de falta / horas totales</code></pre>
      </div>
      <p class="text-sm text-neutral-700 leading-relaxed">
        Ejemplo con DWCS (8,33h/semana): ~173 horas totales. 6% ≈ 10,4h de falta (aviso), 10% ≈
        17,3h (pérdida de evaluación continua).
      </p>
    </div>

    <!-- Fuentes -->
    <div class="flex flex-col gap-3">
      <h2 class="text-base font-semibold text-neutral-900 pb-2 border-b border-neutral-200">Fuentes</h2>
      <div class="flex flex-col divide-y divide-neutral-200 rounded-lg border border-neutral-200 overflow-hidden">
        <component
          :is="f.url ? 'a' : 'div'"
          v-for="f in FUENTES"
          :key="f.nombre"
          v-bind="f.url ? { href: f.url, target: '_blank', rel: 'noopener noreferrer' } : {}"
          class="flex items-center justify-between gap-3 p-4 bg-white transition-colors duration-150"
          :class="f.url ? 'hover:bg-neutral-50' : ''"
        >
          <div class="flex flex-col gap-0.5">
            <span class="text-sm font-semibold text-neutral-900">{{ f.nombre }}</span>
            <span class="text-sm text-neutral-700">{{ f.nota }}</span>
          </div>
          <ExternalLink v-if="f.url" class="w-3.5 h-3.5 text-neutral-400 shrink-0" />
        </component>
      </div>
    </div>
  </div>
</template>
