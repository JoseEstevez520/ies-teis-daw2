import dasp from '../../../../../modulos/dasp/README.md?raw'
import daw from '../../../../../modulos/DAW/README.md?raw'
import despregamento from '../../../../../modulos/despregamento/README.md?raw'
import diw from '../../../../../modulos/diw/README.md?raw'
import dwcc from '../../../../../modulos/dwcc/README.md?raw'
import dwcs from '../../../../../modulos/dwcs/README.md?raw'

import extraIndex from '../../../../../extra/README.md?raw'
import herramientasIndex from '../../../../../extra/herramientas/README.md?raw'
import alarmaTareas from '../../../../../extra/herramientas/alarma-tareas/README.md?raw'
import cuadernoIa from '../../../../../extra/herramientas/cuaderno-ia/README.md?raw'
import moodleApi from '../../../../../extra/herramientas/moodle-api.md?raw'

import ia from '../../../../../extra/ia/README.md?raw'
import opencode from '../../../../../extra/ia/opencode/README.md?raw'
import contexto from '../../../../../extra/ia/contexto/README.md?raw'
import agentes from '../../../../../extra/ia/agentes/README.md?raw'
import fundamentos from '../../../../../extra/ia/fundamentos/README.md?raw'
import consejos from '../../../../../extra/ia/consejos/README.md?raw'
import disenoWeb from '../../../../../extra/diseno-web/README.md?raw'
import openSource from '../../../../../extra/open-source/README.md?raw'
import ideasPfc from '../../../../../extra/ideas-proyecto-fin-curso/README.md?raw'

import horario from '../../../../../horario/README.md?raw'

// Las páginas del repo con su .md: de aquí salen el árbol de las migas y el
// buscador (título y texto del .md). Cada página se pinta con su propio
// componente (router/index.js); el .md es la versión de GitHub. Las vistas
// sin .md propio (panel-aula-virtual, calculadora-de-faltas) están en rutas.js.
//
// - ruta: path de la app (vue-router).
// - claveRuta: la carpeta del repo (sin README.md), o la ruta sin .md de un .md suelto.
export const PAGINAS = [
  {
    ruta: '/modulos/dasp',
    claveRuta: 'modulos/dasp',
    seccion: 'Módulos',
    fuente: dasp,
  },
  {
    ruta: '/modulos/daw',
    claveRuta: 'modulos/DAW',
    seccion: 'Módulos',
    fuente: daw,
  },
  {
    ruta: '/modulos/despregamento',
    claveRuta: 'modulos/despregamento',
    seccion: 'Módulos',
    fuente: despregamento,
  },
  {
    ruta: '/modulos/diw',
    claveRuta: 'modulos/diw',
    seccion: 'Módulos',
    fuente: diw,
  },
  {
    ruta: '/modulos/dwcc',
    claveRuta: 'modulos/dwcc',
    seccion: 'Módulos',
    fuente: dwcc,
  },
  {
    ruta: '/modulos/dwcs',
    claveRuta: 'modulos/dwcs',
    seccion: 'Módulos',
    fuente: dwcs,
  },
  {
    ruta: '/extra',
    claveRuta: 'extra',
    seccion: 'Extra',
    fuente: extraIndex,
  },
  {
    ruta: '/extra/herramientas',
    claveRuta: 'extra/herramientas',
    seccion: 'Herramientas',
    fuente: herramientasIndex,
  },
  {
    ruta: '/extra/herramientas/alarma-tareas',
    claveRuta: 'extra/herramientas/alarma-tareas',
    seccion: 'Herramientas',
    fuente: alarmaTareas,
  },
  {
    ruta: '/extra/herramientas/cuaderno-ia',
    claveRuta: 'extra/herramientas/cuaderno-ia',
    seccion: 'Herramientas',
    fuente: cuadernoIa,
  },
  {
    ruta: '/extra/herramientas/moodle-api',
    claveRuta: 'extra/herramientas/moodle-api',
    seccion: 'Herramientas',
    fuente: moodleApi,
  },
  {
    ruta: '/extra/ia',
    claveRuta: 'extra/ia',
    seccion: 'IA',
    fuente: ia,
  },
  {
    ruta: '/extra/ia/consejos',
    claveRuta: 'extra/ia/consejos',
    seccion: 'IA',
    fuente: consejos,
  },
  {
    ruta: '/extra/ia/fundamentos',
    claveRuta: 'extra/ia/fundamentos',
    seccion: 'IA',
    fuente: fundamentos,
  },
  {
    ruta: '/extra/ia/opencode',
    claveRuta: 'extra/ia/opencode',
    seccion: 'IA',
    fuente: opencode,
  },
  {
    ruta: '/extra/ia/contexto',
    claveRuta: 'extra/ia/contexto',
    seccion: 'IA',
    fuente: contexto,
  },
  {
    ruta: '/extra/ia/agentes',
    claveRuta: 'extra/ia/agentes',
    seccion: 'IA',
    fuente: agentes,
  },
  {
    ruta: '/extra/diseno-web',
    claveRuta: 'extra/diseno-web',
    seccion: 'Diseño web',
    fuente: disenoWeb,
  },
  {
    ruta: '/extra/open-source',
    claveRuta: 'extra/open-source',
    seccion: 'Diseño web',
    fuente: openSource,
  },
  {
    ruta: '/extra/ideas-proyecto-fin-curso',
    claveRuta: 'extra/ideas-proyecto-fin-curso',
    seccion: 'Ideas de PFC',
    fuente: ideasPfc,
  },
  {
    ruta: '/horario',
    claveRuta: 'horario',
    seccion: 'Horario',
    fuente: horario,
  },
]
