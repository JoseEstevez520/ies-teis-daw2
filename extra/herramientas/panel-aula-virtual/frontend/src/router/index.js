import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotasView from '../views/NotasView.vue'
import TareasView from '../views/TareasView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/tareas', component: TareasView },
    { path: '/notas', component: NotasView },
  ],
})

export default router
