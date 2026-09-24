import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// Se monta con la primera ruta ya resuelta: así la barra lateral y la página
// salen directamente como están, sin pasar antes por `/` y animar el cambio.
const app = createApp(App).use(router)
router.isReady().then(() => app.mount('#app'))
