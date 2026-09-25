import { PAGINAS } from './paginas.js'

// Herramientas con página a medida (no salen de su .md), pero otros
// .md sí enlazan a ellas, así que también necesitan una entrada aquí para que
// esos enlaces se resuelvan dentro de la app en vez de caer al fallback de GitHub.
export const BESPOKE = [
  { claveRuta: 'extra/herramientas/panel-aula-virtual', ruta: '/extra/herramientas/panel-aula-virtual' },
  { claveRuta: 'extra/herramientas/calculadora-de-faltas', ruta: '/extra/herramientas/calculadora-de-faltas' },
]

export const RUTAS = Object.fromEntries(
  [...PAGINAS, ...BESPOKE].map((p) => [p.claveRuta, p.ruta])
)
