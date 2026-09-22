import { LayoutDashboard, Search, Video, Compass, Bot, Palette, Lightbulb } from '@lucide/vue'

// Icono por palabra clave del título de la sección (H2), para no tener que
// declararlo a mano en cada .md. Lightbulb es el genérico de esta carpeta.
const PALABRAS_CLAVE = [
  { patron: /panel|dashboard/i, icono: LayoutDashboard },
  { patron: /buscador/i, icono: Search },
  { patron: /youtube|v[ií]deo|wiki/i, icono: Video },
  { patron: /campo|ejemplo|tecnolog[ií]a/i, icono: Compass },
  { patron: /agente|ia\b|ai\b/i, icono: Bot },
  { patron: /dise[ñn]o|estilo/i, icono: Palette },
]

export function iconoDeTitulo(textoPlano) {
  const coincidencia = PALABRAS_CLAVE.find(({ patron }) => patron.test(textoPlano))
  return coincidencia ? coincidencia.icono : Lightbulb
}
