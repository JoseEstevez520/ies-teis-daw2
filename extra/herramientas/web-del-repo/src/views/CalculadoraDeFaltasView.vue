<script setup>
import { CodeBlock } from 'elastic-ui'
import PlantillaPagina from '../components/PlantillaPagina.vue'


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

</script>

<template>
  <PlantillaPagina titulo="Calculadora de faltas">
    <p>
      Mete tus faltas por módulo y ve el % frente al máximo permitido antes de perder evaluación
      continua.
    </p>

    <h2 id="arrancarlo">Arrancarlo tú mismo</h2>
    <p>Sin backend ni token: solo Node.</p>
    <CodeBlock :code="ARRANQUE" language="bash" />
    <p>Abre la URL que te dé Vite (<code>http://localhost:5173</code> normalmente).</p>

    <h2 id="por-que-manual">Por qué es de entrada manual, no automática</h2>
    <p>Investigado y descartado el automatizarlo:</p>
    <ul>
      <li v-for="d in DESCARTES" :key="d">{{ d }}</li>
    </ul>
    <p>
      No hay ninguna fuente de la que sacar el dato automáticamente: tú cuentas tus faltas en
      AbalarMóvil y metes el número, la herramienta hace el cálculo. Ese acceso a AbalarMóvil es
      individual, del propio alumno, no compartido con la familia.
    </p>

    <h2 id="umbrales">Los umbrales reales</h2>
    <p>
      De la presentación de Tutoría de IES de Teis, más específica que la norma general. Solo
      cuentan las faltas sin justificar.
    </p>
    <table>
      <thead>
        <tr><th>Umbral</th><th>Qué cuenta</th><th>Qué pasa</th></tr>
      </thead>
      <tbody>
        <tr v-for="u in UMBRALES" :key="u.nota">
          <td class="font-semibold text-fg tabular-nums">{{ u.valor }}</td>
          <td>{{ u.etiqueta }}</td>
          <td>{{ u.nota }}</td>
        </tr>
      </tbody>
    </table>

    <h2 id="formula">Fórmula</h2>
    <p>
      Horas por módulo, contando los bloques de 50 min de <code>horario/README.md</code>: DWCS 8h20,
      DIW 6h40, DWCC 6h40, DAW 3h20, IPEII 1h40, HCLE 1h40, DASP 50 min, ACP 50 min. Semanas
      lectivas reales de 2º (hasta la 2ª avaliación, antes de la FCT): unas 20,8, no las 34,8 de un
      curso completo.
    </p>
    <CodeBlock :code="FORMULA" title="fórmula" />
    <p>
      Ejemplo con DWCS (8,33 h/semana): unas 173 horas en total. El 6 % son unas 10,4 h de falta
      (aviso) y el 10 %, unas 17,3 h (pérdida de evaluación continua).
    </p>

    <h2 id="fuentes">Fuentes</h2>
    <ul>
      <li v-for="f in FUENTES" :key="f.nombre">
        <a v-if="f.url" :href="f.url" target="_blank" rel="noopener noreferrer">{{ f.nombre }}</a>
        <template v-else>{{ f.nombre }}</template>: {{ f.nota }}.
      </li>
    </ul>
  </PlantillaPagina>
</template>
