import { h } from 'vue'
import DiagramaHarness from './DiagramaHarness.vue'
import HorarioModulos from './HorarioModulos.vue'
import HorarioSemanal from './HorarioSemanal.vue'
import SesionAgente from './SesionAgente.vue'
import { SESIONES } from './sesiones.js'

// Piezas visuales que un .md mete con un bloque:
//
//   ```visual
//   modelo-y-harness
//   ```
//
// Para lo que se entiende mejor viéndolo o tocándolo. El resto de la página
// sigue saliendo del .md normal. Cada sesión de sesiones.js es una pieza
// `sesion-<nombre>`.
const sesiones = Object.fromEntries(
  Object.keys(SESIONES).map((nombre) => [`sesion-${nombre}`, () => h(SesionAgente, { nombre })]),
)

export const VISUALES = {
  'modelo-y-harness': DiagramaHarness,
  'horario-modulos': HorarioModulos,
  'horario-semanal': HorarioSemanal,
  ...sesiones,
}
