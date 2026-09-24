import AgenteEnAccion from './AgenteEnAccion.vue'
import AgentesPorPasos from './AgentesPorPasos.vue'
import HorarioModulos from './HorarioModulos.vue'
import HorarioSemanal from './HorarioSemanal.vue'
import ModeloYHarness from './ModeloYHarness.vue'

// Piezas visuales interactivas que un .md mete con un bloque:
//
//   ```visual
//   agente-en-accion
//   ```
//
// Para lo que se entiende mejor tocándolo que leyéndolo. El resto de la
// página sigue saliendo del .md normal.
export const VISUALES = {
  'agente-en-accion': AgenteEnAccion,
  'agentes-por-pasos': AgentesPorPasos,
  'horario-modulos': HorarioModulos,
  'horario-semanal': HorarioSemanal,
  'modelo-y-harness': ModeloYHarness,
}
