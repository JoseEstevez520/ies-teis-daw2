import { createApp } from 'vue'
import { ElasticUi } from 'elastic-ui'
import './style.css'
import App from './App.vue'

// Los textos que elastic-ui pone por su cuenta, en español.
const TEXTOS = {
  close: 'Cerrar',
  switchToLight: 'Cambiar a tema claro',
  switchToDark: 'Cambiar a tema oscuro',
  note: 'Nota',
  tip: 'Consejo',
  important: 'Importante',
  warning: 'Aviso',
  caution: 'Cuidado',
}

createApp(App).use(ElasticUi, { labels: TEXTOS }).mount('#app')
