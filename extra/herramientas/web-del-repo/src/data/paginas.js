import { BookOpen, Bot, Calendar, Layers, Lightbulb, Palette, Wrench } from '@lucide/vue'

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
import fundamentos from '../../../../../extra/ia/fundamentos/README.md?raw'
import disenoWeb from '../../../../../extra/diseno-web/README.md?raw'
import ideasPfc from '../../../../../extra/ideas-proyecto-fin-curso/README.md?raw'

import horario from '../../../../../horario/README.md?raw'

// Cada página real del repo que se renderiza desde su .md, con la plantilla
// compartida PaginaMarkdown (ver web-del-repo/AGENTS.md). Las herramientas con
// entidad propia (panel-aula-virtual, calculadora-de-faltas) no están aquí:
// tienen su propia vista a medida.
//
// - ruta: path de la app (vue-router).
// - directorio: carpeta del repo donde vive el .md, para resolver SUS enlaces
//   e imágenes relativos.
// - claveRuta: cómo referencian a esta página los enlaces de OTROS .md
//   (carpeta sin `README.md`, o ruta sin extensión para un .md suelto).
// - icono: icono de la sección de nivel superior a la que pertenece.
export const PAGINAS = [
  {
    ruta: '/modulos/dasp',
    directorio: 'modulos/dasp',
    claveRuta: 'modulos/dasp',
    seccion: 'Módulos',
    icono: BookOpen,
    fuente: dasp,
  },
  {
    ruta: '/modulos/daw',
    directorio: 'modulos/DAW',
    claveRuta: 'modulos/DAW',
    seccion: 'Módulos',
    icono: BookOpen,
    fuente: daw,
  },
  {
    ruta: '/modulos/despregamento',
    directorio: 'modulos/despregamento',
    claveRuta: 'modulos/despregamento',
    seccion: 'Módulos',
    icono: BookOpen,
    fuente: despregamento,
  },
  {
    ruta: '/modulos/diw',
    directorio: 'modulos/diw',
    claveRuta: 'modulos/diw',
    seccion: 'Módulos',
    icono: BookOpen,
    fuente: diw,
  },
  {
    ruta: '/modulos/dwcc',
    directorio: 'modulos/dwcc',
    claveRuta: 'modulos/dwcc',
    seccion: 'Módulos',
    icono: BookOpen,
    fuente: dwcc,
  },
  {
    ruta: '/modulos/dwcs',
    directorio: 'modulos/dwcs',
    claveRuta: 'modulos/dwcs',
    seccion: 'Módulos',
    icono: BookOpen,
    fuente: dwcs,
  },
  {
    ruta: '/extra',
    directorio: 'extra',
    claveRuta: 'extra',
    seccion: 'Extra',
    icono: Layers,
    fuente: extraIndex,
  },
  {
    ruta: '/extra/herramientas',
    directorio: 'extra/herramientas',
    claveRuta: 'extra/herramientas',
    seccion: 'Herramientas',
    icono: Wrench,
    fuente: herramientasIndex,
  },
  {
    ruta: '/extra/herramientas/alarma-tareas',
    directorio: 'extra/herramientas/alarma-tareas',
    claveRuta: 'extra/herramientas/alarma-tareas',
    seccion: 'Herramientas',
    icono: Wrench,
    fuente: alarmaTareas,
  },
  {
    ruta: '/extra/herramientas/cuaderno-ia',
    directorio: 'extra/herramientas/cuaderno-ia',
    claveRuta: 'extra/herramientas/cuaderno-ia',
    seccion: 'Herramientas',
    icono: Wrench,
    fuente: cuadernoIa,
  },
  {
    ruta: '/extra/herramientas/moodle-api',
    directorio: 'extra/herramientas',
    claveRuta: 'extra/herramientas/moodle-api',
    seccion: 'Herramientas',
    icono: Wrench,
    fuente: moodleApi,
  },
  {
    ruta: '/extra/ia',
    directorio: 'extra/ia',
    claveRuta: 'extra/ia',
    seccion: 'IA',
    icono: Bot,
    fuente: ia,
  },
  {
    ruta: '/extra/ia/fundamentos',
    directorio: 'extra/ia/fundamentos',
    claveRuta: 'extra/ia/fundamentos',
    seccion: 'IA',
    icono: Bot,
    fuente: fundamentos,
  },
  {
    ruta: '/extra/ia/opencode',
    directorio: 'extra/ia/opencode',
    claveRuta: 'extra/ia/opencode',
    seccion: 'IA',
    icono: Bot,
    fuente: opencode,
  },
  {
    ruta: '/extra/diseno-web',
    directorio: 'extra/diseno-web',
    claveRuta: 'extra/diseno-web',
    seccion: 'Diseño web',
    icono: Palette,
    fuente: disenoWeb,
  },
  {
    ruta: '/extra/ideas-proyecto-fin-curso',
    directorio: 'extra/ideas-proyecto-fin-curso',
    claveRuta: 'extra/ideas-proyecto-fin-curso',
    seccion: 'Ideas de PFC',
    icono: Lightbulb,
    fuente: ideasPfc,
  },
  {
    ruta: '/horario',
    directorio: 'horario',
    claveRuta: 'horario',
    seccion: 'Horario',
    icono: Calendar,
    fuente: horario,
  },
]
