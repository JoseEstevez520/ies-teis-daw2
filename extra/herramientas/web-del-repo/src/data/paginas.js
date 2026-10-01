import dasp from '../../../../../modulos/dasp/README.md?raw'
import daw from '../../../../../modulos/DAW/README.md?raw'
import despregamento from '../../../../../modulos/despregamento/README.md?raw'
import diw from '../../../../../modulos/diw/README.md?raw'
import dwcc from '../../../../../modulos/dwcc/README.md?raw'
import dwcs from '../../../../../modulos/dwcs/README.md?raw'
import springContenedor from '../../../../../modulos/dwcs/spring-y-contenedor.md?raw'
import controladoresRutas from '../../../../../modulos/dwcs/controladores-y-rutas.md?raw'
import thymeleaf from '../../../../../modulos/dwcs/thymeleaf.md?raw'
import serviciosInyeccion from '../../../../../modulos/dwcs/servicios-e-inyeccion.md?raw'
import optional from '../../../../../modulos/dwcs/optional.md?raw'
import dwcsEnum from '../../../../../modulos/dwcs/enum.md?raw'
import scopesEstado from '../../../../../modulos/dwcs/scopes-y-estado.md?raw'

import frontendBackend from '../../../../../modulos/diw/frontend-backend-y-base-de-datos.md?raw'
import componentesReactividad from '../../../../../modulos/diw/componentes-y-reactividad.md?raw'

import extraIndex from '../../../../../extra/README.md?raw'
import herramientasIndex from '../../../../../extra/herramientas/README.md?raw'
import alarmaTareas from '../../../../../extra/herramientas/alarma-tareas/README.md?raw'
import cuadernoIa from '../../../../../extra/herramientas/cuaderno-ia/README.md?raw'
import moodleApi from '../../../../../extra/herramientas/moodle-api.md?raw'
import notasDeClase from '../../../../../extra/herramientas/notas-de-clase/README.md?raw'

import ia from '../../../../../extra/ia/README.md?raw'
import opencode from '../../../../../extra/ia/opencode/README.md?raw'
import modelos from '../../../../../extra/ia/modelos/README.md?raw'
import contexto from '../../../../../extra/ia/contexto/README.md?raw'
import agentes from '../../../../../extra/ia/agentes/README.md?raw'
import equipo from '../../../../../extra/ia/equipo/README.md?raw'
import iaHerramientas from '../../../../../extra/ia/herramientas/README.md?raw'
import fundamentos from '../../../../../extra/ia/fundamentos/README.md?raw'
import queEsLaIa from '../../../../../extra/ia/que-es-la-ia/README.md?raw'
import aplicacionesConIa from '../../../../../extra/ia/aplicaciones-con-ia/README.md?raw'
import diseno from '../../../../../extra/diseno/README.md?raw'
import disenoFuentes from '../../../../../extra/diseno/fuentes/README.md?raw'
import disenoColores from '../../../../../extra/diseno/colores/README.md?raw'
import disenoIdea from '../../../../../extra/diseno/idea/README.md?raw'
import disenoMarca from '../../../../../extra/diseno/marca/README.md?raw'
import disenoAiSlop from '../../../../../extra/diseno/ai-slop/README.md?raw'
import disenoSkills from '../../../../../extra/diseno/skills/README.md?raw'
import openSource from '../../../../../extra/open-source/README.md?raw'
import ideasPfc from '../../../../../extra/ideas-proyecto-fin-curso/README.md?raw'
import ideaPanel from '../../../../../extra/ideas-proyecto-fin-curso/panel-del-aula-virtual.md?raw'
import ideaOportunidades from '../../../../../extra/ideas-proyecto-fin-curso/oportunidades-y-trayectoria.md?raw'
import ideaWiki from '../../../../../extra/ideas-proyecto-fin-curso/wiki-de-un-canal-de-youtube.md?raw'
import ideaExperiencias from '../../../../../extra/ideas-proyecto-fin-curso/experiencias-cercanas-a-la-muerte.md?raw'
import ideaPersonalidades from '../../../../../extra/ideas-proyecto-fin-curso/personalidades-que-viven-una-vida-entera.md?raw'
import ideaEntorno from '../../../../../extra/ideas-proyecto-fin-curso/entorno-interactivo-que-explica-el-codigo.md?raw'
import ideaAnalisis from '../../../../../extra/ideas-proyecto-fin-curso/analisis-del-comportamiento-deportivo.md?raw'
import ideaDatosVigo from '../../../../../extra/ideas-proyecto-fin-curso/datos-de-vigo.md?raw'

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
    ruta: '/modulos/dwcs/spring-y-contenedor',
    claveRuta: 'modulos/dwcs/spring-y-contenedor',
    seccion: 'Módulos',
    fuente: springContenedor,
  },
  {
    ruta: '/modulos/dwcs/controladores-y-rutas',
    claveRuta: 'modulos/dwcs/controladores-y-rutas',
    seccion: 'Módulos',
    fuente: controladoresRutas,
  },
  {
    ruta: '/modulos/dwcs/thymeleaf',
    claveRuta: 'modulos/dwcs/thymeleaf',
    seccion: 'Módulos',
    fuente: thymeleaf,
  },
  {
    ruta: '/modulos/dwcs/servicios-e-inyeccion',
    claveRuta: 'modulos/dwcs/servicios-e-inyeccion',
    seccion: 'Módulos',
    fuente: serviciosInyeccion,
  },
  {
    ruta: '/modulos/dwcs/optional',
    claveRuta: 'modulos/dwcs/optional',
    seccion: 'Módulos',
    fuente: optional,
  },
  {
    ruta: '/modulos/dwcs/enum',
    claveRuta: 'modulos/dwcs/enum',
    seccion: 'Módulos',
    fuente: dwcsEnum,
  },
  {
    ruta: '/modulos/dwcs/scopes-y-estado',
    claveRuta: 'modulos/dwcs/scopes-y-estado',
    seccion: 'Módulos',
    fuente: scopesEstado,
  },
  {
    ruta: '/modulos/diw/frontend-backend-y-base-de-datos',
    claveRuta: 'modulos/diw/frontend-backend-y-base-de-datos',
    seccion: 'Módulos',
    fuente: frontendBackend,
  },
  {
    ruta: '/modulos/diw/componentes-y-reactividad',
    claveRuta: 'modulos/diw/componentes-y-reactividad',
    seccion: 'Módulos',
    fuente: componentesReactividad,
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
    ruta: '/extra/herramientas/notas-de-clase',
    claveRuta: 'extra/herramientas/notas-de-clase',
    seccion: 'Herramientas',
    fuente: notasDeClase,
  },
  {
    ruta: '/extra/ia',
    claveRuta: 'extra/ia',
    seccion: 'IA',
    fuente: ia,
  },
  {
    ruta: '/extra/ia/que-es-la-ia',
    claveRuta: 'extra/ia/que-es-la-ia',
    seccion: 'IA',
    fuente: queEsLaIa,
  },
  {
    ruta: '/extra/ia/aplicaciones-con-ia',
    claveRuta: 'extra/ia/aplicaciones-con-ia',
    seccion: 'IA',
    fuente: aplicacionesConIa,
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
    ruta: '/extra/ia/modelos',
    claveRuta: 'extra/ia/modelos',
    seccion: 'IA',
    fuente: modelos,
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
    ruta: '/extra/ia/equipo',
    claveRuta: 'extra/ia/equipo',
    seccion: 'IA',
    fuente: equipo,
  },
  {
    ruta: '/extra/ia/herramientas',
    claveRuta: 'extra/ia/herramientas',
    seccion: 'IA',
    fuente: iaHerramientas,
  },
  {
    ruta: '/extra/diseno',
    claveRuta: 'extra/diseno',
    seccion: 'Diseño',
    fuente: diseno,
  },
  {
    ruta: '/extra/diseno/fuentes',
    claveRuta: 'extra/diseno/fuentes',
    seccion: 'Diseño',
    fuente: disenoFuentes,
  },
  {
    ruta: '/extra/diseno/colores',
    claveRuta: 'extra/diseno/colores',
    seccion: 'Diseño',
    fuente: disenoColores,
  },
  {
    ruta: '/extra/diseno/idea',
    claveRuta: 'extra/diseno/idea',
    seccion: 'Diseño',
    fuente: disenoIdea,
  },
  {
    ruta: '/extra/diseno/marca',
    claveRuta: 'extra/diseno/marca',
    seccion: 'Diseño',
    fuente: disenoMarca,
  },
  {
    ruta: '/extra/diseno/ai-slop',
    claveRuta: 'extra/diseno/ai-slop',
    seccion: 'Diseño',
    fuente: disenoAiSlop,
  },
  {
    ruta: '/extra/diseno/skills',
    claveRuta: 'extra/diseno/skills',
    seccion: 'Diseño',
    fuente: disenoSkills,
  },
  {
    ruta: '/extra/open-source',
    claveRuta: 'extra/open-source',
    seccion: 'Diseño',
    fuente: openSource,
  },
  {
    ruta: '/extra/ideas-proyecto-fin-curso',
    claveRuta: 'extra/ideas-proyecto-fin-curso',
    seccion: 'Ideas de PFC',
    fuente: ideasPfc,
  },
  {
    ruta: '/extra/ideas-proyecto-fin-curso/panel-del-aula-virtual',
    claveRuta: 'extra/ideas-proyecto-fin-curso/panel-del-aula-virtual',
    seccion: 'Ideas de PFC',
    fuente: ideaPanel,
  },
  {
    ruta: '/extra/ideas-proyecto-fin-curso/oportunidades-y-trayectoria',
    claveRuta: 'extra/ideas-proyecto-fin-curso/oportunidades-y-trayectoria',
    seccion: 'Ideas de PFC',
    fuente: ideaOportunidades,
  },
  {
    ruta: '/extra/ideas-proyecto-fin-curso/wiki-de-un-canal-de-youtube',
    claveRuta: 'extra/ideas-proyecto-fin-curso/wiki-de-un-canal-de-youtube',
    seccion: 'Ideas de PFC',
    fuente: ideaWiki,
  },
  {
    ruta: '/extra/ideas-proyecto-fin-curso/experiencias-cercanas-a-la-muerte',
    claveRuta: 'extra/ideas-proyecto-fin-curso/experiencias-cercanas-a-la-muerte',
    seccion: 'Ideas de PFC',
    fuente: ideaExperiencias,
  },
  {
    ruta: '/extra/ideas-proyecto-fin-curso/personalidades-que-viven-una-vida-entera',
    claveRuta: 'extra/ideas-proyecto-fin-curso/personalidades-que-viven-una-vida-entera',
    seccion: 'Ideas de PFC',
    fuente: ideaPersonalidades,
  },
  {
    ruta: '/extra/ideas-proyecto-fin-curso/entorno-interactivo-que-explica-el-codigo',
    claveRuta: 'extra/ideas-proyecto-fin-curso/entorno-interactivo-que-explica-el-codigo',
    seccion: 'Ideas de PFC',
    fuente: ideaEntorno,
  },
  {
    ruta: '/extra/ideas-proyecto-fin-curso/analisis-del-comportamiento-deportivo',
    claveRuta: 'extra/ideas-proyecto-fin-curso/analisis-del-comportamiento-deportivo',
    seccion: 'Ideas de PFC',
    fuente: ideaAnalisis,
  },
  {
    ruta: '/extra/ideas-proyecto-fin-curso/datos-de-vigo',
    claveRuta: 'extra/ideas-proyecto-fin-curso/datos-de-vigo',
    seccion: 'Ideas de PFC',
    fuente: ideaDatosVigo,
  },
  {
    ruta: '/horario',
    claveRuta: 'horario',
    seccion: 'Horario',
    fuente: horario,
  },
]
