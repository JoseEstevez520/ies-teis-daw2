import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ModulosView from '../views/ModulosView.vue'
import PanelAulaVirtualView from '../views/PanelAulaVirtualView.vue'
import CalculadoraDeFaltasView from '../views/CalculadoraDeFaltasView.vue'
import AlarmaTareasView from '../views/paginas/AlarmaTareasView.vue'
import AgentesView from '../views/paginas/AgentesView.vue'
import ConsejosView from '../views/paginas/ConsejosView.vue'
import ContextoView from '../views/paginas/ContextoView.vue'
import CuadernoIaView from '../views/paginas/CuadernoIaView.vue'
import DisenoWebView from '../views/paginas/DisenoWebView.vue'
import ExtraView from '../views/paginas/ExtraView.vue'
import EquipoView from '../views/paginas/EquipoView.vue'
import FundamentosView from '../views/paginas/FundamentosView.vue'
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
import ModuloView from '../views/paginas/ModuloView.vue'
import MoodleApiView from '../views/paginas/MoodleApiView.vue'
import OpenCodeView from '../views/paginas/OpenCodeView.vue'
import OpenSourceView from '../views/paginas/OpenSourceView.vue'

// Cada página de la web es un componente compuesto a mano (ver AGENTS.md). Las
// rutas siguen las carpetas del repo; una página nueva también va en
// data/paginas.js, para que salga en las migas y en el buscador.

// modulos/<carpeta>/README.md: nombre y la línea que lo describe.
const MODULOS = [
  { ruta: 'dasp', carpeta: 'dasp', nombre: 'dasp', descripcion: 'Digitalización' },
  { ruta: 'daw', carpeta: 'DAW', nombre: 'DAW', descripcion: 'Desenvolvemento de Aplicacións Web' },
  { ruta: 'despregamento', carpeta: 'despregamento', nombre: 'despregamento', descripcion: 'Apache, DNS, Git' },
  { ruta: 'diw', carpeta: 'diw', nombre: 'diw', descripcion: 'Vue 3 + Vite' },
  { ruta: 'dwcc', carpeta: 'dwcc', nombre: 'dwcc', descripcion: 'Desarrollo web en entorno cliente' },
  { ruta: 'dwcs', carpeta: 'dwcs', nombre: 'dwcs', descripcion: 'Spring Boot + Thymeleaf + JPA' },
]

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/modulos', component: ModulosView },
    ...MODULOS.map(({ ruta, ...modulo }) => ({ path: `/modulos/${ruta}`, component: ModuloView, props: modulo })),
    { path: '/extra', component: ExtraView },
    { path: '/extra/herramientas', component: HerramientasView },
    { path: '/extra/herramientas/panel-aula-virtual', component: PanelAulaVirtualView },
    { path: '/extra/herramientas/calculadora-de-faltas', component: CalculadoraDeFaltasView },
    { path: '/extra/herramientas/alarma-tareas', component: AlarmaTareasView },
    { path: '/extra/herramientas/cuaderno-ia', component: CuadernoIaView },
    { path: '/extra/herramientas/moodle-api', component: MoodleApiView },
    { path: '/extra/ia', component: IaView },
    { path: '/extra/ia/fundamentos', component: FundamentosView },
    { path: '/extra/ia/opencode', component: OpenCodeView },
    { path: '/extra/ia/contexto', component: ContextoView },
    { path: '/extra/ia/agentes', component: AgentesView },
    { path: '/extra/ia/equipo', component: EquipoView },
    { path: '/extra/ia/consejos', component: ConsejosView },
    { path: '/extra/diseno-web', component: DisenoWebView },
    { path: '/extra/open-source', component: OpenSourceView },
    { path: '/extra/ideas-proyecto-fin-curso', component: IdeasPfcView },
    { path: '/extra/ideas-proyecto-fin-curso/panel-del-aula-virtual', component: IdeaPanelView },
    { path: '/extra/ideas-proyecto-fin-curso/oportunidades-y-trayectoria', component: IdeaOportunidadesView },
    { path: '/extra/ideas-proyecto-fin-curso/wiki-de-un-canal-de-youtube', component: IdeaWikiView },
    { path: '/extra/ideas-proyecto-fin-curso/experiencias-cercanas-a-la-muerte', component: IdeaNderfView },
    { path: '/extra/ideas-proyecto-fin-curso/personalidades-que-viven-una-vida-entera', component: IdeaPersonalidadesView },
    { path: '/extra/ideas-proyecto-fin-curso/entorno-interactivo-que-explica-el-codigo', component: IdeaEntornoView },
    { path: '/extra/ideas-proyecto-fin-curso/analisis-del-comportamiento-deportivo', component: IdeaAnalisisView },
    { path: '/horario', component: HorarioView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
