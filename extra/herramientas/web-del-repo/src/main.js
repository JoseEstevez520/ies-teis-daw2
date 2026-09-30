import { createApp } from 'vue'
import { ElasticUi } from 'elastic-ui'
import App from './App.vue'
import router from './router'
import { forzarAnimaciones } from './lib/movimiento.js'
import './style.css'

// Los textos que elastic-ui pone por su cuenta (nombres para lectores de
// pantalla, títulos por defecto...), en español para toda la web.
const TEXTOS = {
  close: 'Cerrar',
  clear: 'Borrar',
  dismiss: 'Descartar',
  copy: 'Copiar',
  copied: 'Copiado',
  menu: 'Menú',
  mainNav: 'Principal',
  sections: 'Secciones',
  sidebar: 'Barra lateral',
  toggleSidebar: 'Plegar la barra lateral',
  onThisPage: 'En esta página',
  search: 'Buscar',
  searchPlaceholder: 'Buscar…',
  switchToLight: 'Cambiar a tema claro',
  switchToDark: 'Cambiar a tema oscuro',
  note: 'Nota',
  tip: 'Consejo',
  important: 'Importante',
  warning: 'Aviso',
  caution: 'Cuidado',
  breadcrumb: 'Ruta de la página',
  pagesAtThisLevel: 'Páginas de este nivel',
  next: 'Siguiente',
  back: 'Atrás',
  filter: 'Filtrar',
  filterBy: 'Filtrar por',
  removeFilter: 'Quitar filtro',
  clearFilters: 'Borrar',
  oneResult: '1 resultado',
  results: '{count} resultados',
  noResults: 'Sin resultados',
  replay: 'Repetir',
  unchangedLines: '{count} líneas sin cambios',
  addedLine: 'Añadida',
  removedLine: 'Quitada',
  play: 'Reproducir',
  pause: 'Pausar',
  previous: 'Anterior',
  restart: 'Volver a empezar',
  stepOf: 'Paso {current} de {total}',
  allow: 'Permitir',
  deny: 'Denegar',
  askingPermission: 'Esperando tu permiso',
  remove: 'Quitar',
  day: 'Día',
  creatingImage: 'Generando la imagen',
  commandPlaceholder: 'Escribe una orden o busca…',
}

// Se monta con la primera ruta ya resuelta: así la barra lateral y la página
// salen directamente como están, sin pasar antes por `/` y animar el cambio.
const app = createApp(App).use(router).use(ElasticUi, {
  labels: TEXTOS,
  // Ajustes → forzar las animaciones aunque el sistema pida movimiento reducido.
  motion: forzarAnimaciones.value ? 'full' : 'auto',
})
router.isReady().then(() => app.mount('#app'))
