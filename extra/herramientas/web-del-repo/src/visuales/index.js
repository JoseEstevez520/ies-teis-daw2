import AgenteEnAccion from './AgenteEnAccion.vue'
import AgentesOpencode from './AgentesOpencode.vue'
import AutoexamenAgentes from './AutoexamenAgentes.vue'

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
  'agentes-opencode': AgentesOpencode,
  'autoexamen-agentes': AutoexamenAgentes,
}
