<script setup>
import { Badge, CodeBlock } from 'elastic-ui'
import { CalendarX, Ban, Server } from '@lucide/vue'
import { colorDeRuta } from '../lib/colorSeccion.js'
import ListaEnlaces from '../components/ListaEnlaces.vue'
import PlantillaPagina from '../components/PlantillaPagina.vue'
import SeccionPagina from '../components/SeccionPagina.vue'

const color = colorDeRuta('/extra/herramientas/calculadora-de-faltas')

const INDICE = [
  { id: 'arrancarlo', label: 'Arrancarlo tú mismo', level: 2 },
  { id: 'por-que-manual', label: 'Por qué es de entrada manual', level: 2 },
  { id: 'umbrales', label: 'Los umbrales reales', level: 2 },
  { id: 'formula', label: 'Fórmula', level: 2 },
  { id: 'fuentes', label: 'Fuentes', level: 2 },
]

const ARRANQUE = `git clone https://github.com/JoseEstevez520/ies-teis-daw2.git
cd ies-teis-daw2/extra/herramientas/calculadora-de-faltas
npm install
npm run dev`

const FORMULA = `horas totales módulo = horas/semana × 20,8 semanas
horas de falta = nº de faltas sin justificar × 50 min (duración de una clase)
% faltado = horas de falta / horas totales`

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
  { nombre: 'Orde do 12 de xullo de 2011 (DOG)', url: 'https://www.xunta.gal/dog/Publicados/2011/20110715/AnuncioC3F1-120711-4341_es.html', nota: 'fija el 10% como norma general de Galicia' },
  { nombre: 'Calendario escolar Galicia 2026-2027', url: 'https://www.galiciae.com/articulo/galicia/calendario-escolar-galicia-curso-2026-27-cuando-empiezan-claves-que-dias-seran-lectivos/20260825180432109165.html', nota: 'galiciae.com' },
]

const CODIGO = 'rounded-[var(--radius-sm)] bg-bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-fg'
</script>

<template>
  <PlantillaPagina titulo="Calculadora de faltas" :icono="CalendarX" :color="color" :indice="INDICE">
    <p class="text-sm leading-relaxed text-fg-secondary">
      Mete tus faltas por módulo y ve el % frente al máximo permitido antes de perder evaluación
      continua.
    </p>

    <div class="flex flex-col gap-12">
      <SeccionPagina id="arrancarlo">
        <template #titulo>Arrancarlo tú mismo</template>
        <Badge variant="outline" :icon="Server" class="self-start">sin backend ni token</Badge>
        <CodeBlock :code="ARRANQUE" language="bash" />
        <p class="text-sm text-fg-secondary">
          Abre la URL que te dé Vite (<code :class="CODIGO">http://localhost:5173</code> normalmente).
        </p>
      </SeccionPagina>

      <SeccionPagina id="por-que-manual">
        <template #titulo>Por qué es de entrada manual, no automática</template>
        <p class="text-sm text-fg-secondary">Investigado y descartado el automatizarlo:</p>
        <ul class="flex flex-col gap-3">
          <li v-for="d in DESCARTES" :key="d" class="flex gap-3">
            <Ban class="mt-0.5 size-4 shrink-0 text-fg-faint" />
            <p class="text-sm leading-relaxed text-fg-secondary">{{ d }}</p>
          </li>
        </ul>
        <p class="text-sm leading-relaxed text-fg-secondary">
          No hay ninguna fuente de la que tirar el dato automáticamente: tú cuentas tus faltas en
          AbalarMóvil y metes el número, la herramienta hace el cálculo. Ese acceso a AbalarMóvil es
          individual, del propio alumno, no compartido con la familia.
        </p>
      </SeccionPagina>

      <SeccionPagina id="umbrales">
        <template #titulo>Los umbrales reales</template>
        <p class="text-sm text-fg-secondary">
          De la presentación de Tutoría de IES de Teis, más específica que la norma general. Solo
          cuentan las faltas sin justificar.
        </p>
        <dl class="grid gap-6 sm:grid-cols-3">
          <div v-for="u in UMBRALES" :key="u.nota" class="flex flex-col gap-1">
            <dt class="order-2 text-xs text-fg-muted">{{ u.etiqueta }}</dt>
            <dd class="order-1 text-2xl font-semibold tracking-tight text-fg tabular-nums">{{ u.valor }}</dd>
            <dd class="order-3 text-sm text-fg-secondary">{{ u.nota }}</dd>
          </div>
        </dl>
      </SeccionPagina>

      <SeccionPagina id="formula">
        <template #titulo>Fórmula</template>
        <p class="text-sm leading-relaxed text-fg-secondary">
          Horas por módulo (contando los bloques de 50 min de <code :class="CODIGO">horario/README.md</code>):
          dwcs 8h20, diw 6h40, dwcc 5h50, daw 3h20, ipeii 1h40, hcle 1h40, dasp 50min, acp 50min.
          Semanas lectivas reales de 2º curso (hasta la 2ª avaliación, antes de FCT): ~20,8, no las
          ~34,8 de un curso completo.
        </p>
        <CodeBlock :code="FORMULA" title="fórmula" />
        <p class="text-sm leading-relaxed text-fg-secondary">
          Ejemplo con DWCS (8,33h/semana): ~173 horas totales. 6% ≈ 10,4h de falta (aviso), 10% ≈
          17,3h (pérdida de evaluación continua).
        </p>
      </SeccionPagina>

      <SeccionPagina id="fuentes">
        <template #titulo>Fuentes</template>
        <ListaEnlaces :items="FUENTES" />
      </SeccionPagina>
    </div>
  </PlantillaPagina>
</template>
