import { createRouter, createWebHistory } from 'vue-router'
import { PAGINAS } from '../data/paginas.js'
import HomeView from '../views/HomeView.vue'
import ModulosView from '../views/ModulosView.vue'
import MarkdownRouteView from '../views/MarkdownRouteView.vue'
import PanelAulaVirtualView from '../views/PanelAulaVirtualView.vue'
import CalculadoraDeFaltasView from '../views/CalculadoraDeFaltasView.vue'

const rutasMarkdown = PAGINAS.map((pagina) => ({
  path: pagina.ruta,
  component: MarkdownRouteView,
  props: { pagina },
}))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/modulos', component: ModulosView },
    { path: '/extra/herramientas/panel-aula-virtual', component: PanelAulaVirtualView },
    { path: '/extra/herramientas/calculadora-de-faltas', component: CalculadoraDeFaltasView },
    ...rutasMarkdown,
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
