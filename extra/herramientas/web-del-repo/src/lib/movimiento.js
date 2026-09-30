import { ref } from 'vue'
import { setMotionPreference } from 'elastic-ui'

// Si la web fuerza las animaciones aunque el sistema pida movimiento reducido
// (página de Ajustes). Se guarda en localStorage y se aplica en los dos sitios
// que miran la preferencia: `setMotionPreference` (las animaciones por JS de la
// librería) y `data-motion` en `<html>` (las reglas CSS `motion-reduce:`).
const CLAVE = 'web.motion'

function leer() {
  try {
    return localStorage.getItem(CLAVE) === 'full'
  } catch {
    return false
  }
}

export const forzarAnimaciones = ref(leer())

export function setForzarAnimaciones(valor) {
  forzarAnimaciones.value = valor
  setMotionPreference(valor ? 'full' : 'auto')
  try {
    localStorage.setItem(CLAVE, valor ? 'full' : 'auto')
  } catch {}
}
