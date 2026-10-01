import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ModulosView from '../views/ModulosView.vue'
import PanelAulaVirtualView from '../views/PanelAulaVirtualView.vue'
import CalculadoraDeFaltasView from '../views/CalculadoraDeFaltasView.vue'
import AlarmaTareasView from '../views/paginas/AlarmaTareasView.vue'
import AjustesView from '../views/paginas/AjustesView.vue'
import AgentesView from '../views/paginas/AgentesView.vue'
import AplicacionesConIaView from '../views/paginas/AplicacionesConIaView.vue'
import ContextoView from '../views/paginas/ContextoView.vue'
import CuadernoIaView from '../views/paginas/CuadernoIaView.vue'
import DisenoView from '../views/paginas/DisenoView.vue'
import DisenoFuentesView from '../views/paginas/DisenoFuentesView.vue'
import DisenoColoresView from '../views/paginas/DisenoColoresView.vue'
import DisenoIdeaView from '../views/paginas/DisenoIdeaView.vue'
import DisenoMarcaView from '../views/paginas/DisenoMarcaView.vue'
import DisenoAiSlopView from '../views/paginas/DisenoAiSlopView.vue'
import DisenoSkillsView from '../views/paginas/DisenoSkillsView.vue'
import ExtraView from '../views/paginas/ExtraView.vue'
import EquipoView from '../views/paginas/EquipoView.vue'
import DwcsView from '../views/paginas/DwcsView.vue'
import FundamentosView from '../views/paginas/FundamentosView.vue'
import HerramientasIaView from '../views/paginas/HerramientasIaView.vue'
import HerramientasView from '../views/paginas/HerramientasView.vue'
import HorarioView from '../views/paginas/HorarioView.vue'
import IaView from '../views/paginas/IaView.vue'
import IdeasPfcView from '../views/paginas/IdeasPfcView.vue'
import IdeaPanelView from '../views/paginas/IdeaPanelView.vue'
import IdeaOportunidadesView from '../views/paginas/IdeaOportunidadesView.vue'
import IdeaWikiView from '../views/paginas/IdeaWikiView.vue'
import IdeaNderfView from '../views/paginas/IdeaNderfView.vue'
import IdeaPersonalidadesView from '../views/paginas/IdeaPersonalidadesView.vue'
import IdeaEntornoView from '../views/paginas/IdeaEntornoView.vue'
import IdeaAnalisisView from '../views/paginas/IdeaAnalisisView.vue'
import IdeaDatosVigoView from '../views/paginas/IdeaDatosVigoView.vue'
import ModuloView from '../views/paginas/ModuloView.vue'
import ModelosIaView from '../views/paginas/ModelosIaView.vue'
import MoodleApiView from '../views/paginas/MoodleApiView.vue'
import NotasDeClaseView from '../views/paginas/NotasDeClaseView.vue'
import OpenCodeView from '../views/paginas/OpenCodeView.vue'
import OpenSourceView from '../views/paginas/OpenSourceView.vue'
import QueEsLaIaView from '../views/paginas/QueEsLaIaView.vue'
import ControladoresRutasView from '../views/paginas/ControladoresRutasView.vue'
import ComponentesReactividadView from '../views/paginas/ComponentesReactividadView.vue'
import DiwView from '../views/paginas/DiwView.vue'
import EnumView from '../views/paginas/EnumView.vue'
import FrontendBackendView from '../views/paginas/FrontendBackendView.vue'
import OptionalView from '../views/paginas/OptionalView.vue'
import ScopesEstadoView from '../views/paginas/ScopesEstadoView.vue'
import ServiciosInyeccionView from '../views/paginas/ServiciosInyeccionView.vue'
import SpringContenedorView from '../views/paginas/SpringContenedorView.vue'
import ThymeleafView from '../views/paginas/ThymeleafView.vue'

// Cada página de la web es un componente compuesto a mano (ver AGENTS.md). Las
// rutas siguen las carpetas del repo; una página nueva también va en
// data/paginas.js, para que salga en las migas y en el buscador.

// modulos/<carpeta>/README.md: nombre y la línea que lo describe.
const MODULOS = [
  { ruta: 'dasp', carpeta: 'dasp', nombre: 'DASP', descripcion: 'Digitalización' },
  { ruta: 'daw', carpeta: 'DAW', nombre: 'DAW', descripcion: 'Desenvolvemento de Aplicacións Web' },
  { ruta: 'despregamento', carpeta: 'despregamento', nombre: 'Despregamento', descripcion: 'Apache, DNS, Git' },
  { ruta: 'dwcc', carpeta: 'dwcc', nombre: 'DWCC', descripcion: 'Desarrollo web en entorno cliente' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/modulos', component: ModulosView },
    ...MODULOS.map(({ ruta, ...modulo }) => ({ path: `/modulos/${ruta}`, component: ModuloView, props: modulo })),
    { path: '/modulos/dwcs', component: DwcsView },
    { path: '/modulos/diw', component: DiwView },
    { path: '/modulos/diw/componentes-y-reactividad', component: ComponentesReactividadView },
    { path: '/modulos/diw/frontend-backend-y-base-de-datos', component: FrontendBackendView },
    { path: '/modulos/dwcs/spring-y-contenedor', component: SpringContenedorView },
    { path: '/modulos/dwcs/controladores-y-rutas', component: ControladoresRutasView },
    { path: '/modulos/dwcs/thymeleaf', component: ThymeleafView },
    { path: '/modulos/dwcs/servicios-e-inyeccion', component: ServiciosInyeccionView },
    { path: '/modulos/dwcs/optional', component: OptionalView },
    { path: '/modulos/dwcs/enum', component: EnumView },
    { path: '/modulos/dwcs/scopes-y-estado', component: ScopesEstadoView },
    { path: '/extra', component: ExtraView },
    { path: '/extra/herramientas', component: HerramientasView },
    { path: '/extra/herramientas/panel-aula-virtual', component: PanelAulaVirtualView },
    { path: '/extra/herramientas/calculadora-de-faltas', component: CalculadoraDeFaltasView },
    { path: '/extra/herramientas/alarma-tareas', component: AlarmaTareasView },
    { path: '/extra/herramientas/cuaderno-ia', component: CuadernoIaView },
    { path: '/extra/herramientas/moodle-api', component: MoodleApiView },
    { path: '/extra/herramientas/notas-de-clase', component: NotasDeClaseView },
    { path: '/extra/ia', component: IaView },
    { path: '/extra/ia/fundamentos', component: FundamentosView },
    { path: '/extra/ia/opencode', component: OpenCodeView },
    { path: '/extra/ia/modelos', component: ModelosIaView },
    { path: '/extra/ia/contexto', component: ContextoView },
    { path: '/extra/ia/agentes', component: AgentesView },
    { path: '/extra/ia/equipo', component: EquipoView },
    { path: '/extra/ia/herramientas', component: HerramientasIaView },
    { path: '/extra/ia/que-es-la-ia', component: QueEsLaIaView },
    { path: '/extra/ia/aplicaciones-con-ia', component: AplicacionesConIaView },
    { path: '/extra/diseno', component: DisenoView },
    { path: '/extra/diseno/fuentes', component: DisenoFuentesView },
    { path: '/extra/diseno/colores', component: DisenoColoresView },
    { path: '/extra/diseno/idea', component: DisenoIdeaView },
    { path: '/extra/diseno/marca', component: DisenoMarcaView },
    { path: '/extra/diseno/ai-slop', component: DisenoAiSlopView },
    { path: '/extra/diseno/skills', component: DisenoSkillsView },
    { path: '/extra/open-source', component: OpenSourceView },
    { path: '/extra/ideas-proyecto-fin-curso', component: IdeasPfcView },
    { path: '/extra/ideas-proyecto-fin-curso/panel-del-aula-virtual', component: IdeaPanelView },
    { path: '/extra/ideas-proyecto-fin-curso/oportunidades-y-trayectoria', component: IdeaOportunidadesView },
    { path: '/extra/ideas-proyecto-fin-curso/wiki-de-un-canal-de-youtube', component: IdeaWikiView },
    { path: '/extra/ideas-proyecto-fin-curso/experiencias-cercanas-a-la-muerte', component: IdeaNderfView },
    { path: '/extra/ideas-proyecto-fin-curso/personalidades-que-viven-una-vida-entera', component: IdeaPersonalidadesView },
    { path: '/extra/ideas-proyecto-fin-curso/entorno-interactivo-que-explica-el-codigo', component: IdeaEntornoView },
    { path: '/extra/ideas-proyecto-fin-curso/analisis-del-comportamiento-deportivo', component: IdeaAnalisisView },
    { path: '/extra/ideas-proyecto-fin-curso/datos-de-vigo', component: IdeaDatosVigoView },
    { path: '/horario', component: HorarioView },
    { path: '/ajustes', component: AjustesView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
