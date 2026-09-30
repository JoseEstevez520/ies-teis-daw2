// Color de cada sección del repo, para saber en qué parte estás: icono de la
// barra lateral, de la portada, de las tarjetas y del título de la página.
// Gana el prefijo más largo, así que /extra/ia es violeta aunque /extra sea
// verde azulado.
const COLORES = [
  ['/modulos', '#2563eb'],
  ['/extra', '#0d9488'],
  ['/extra/ia', '#7c3aed'],
  ['/extra/herramientas', '#d97706'],
  ['/extra/diseno', '#c026d3'],
  ['/extra/ideas-proyecto-fin-curso', '#65a30d'],
  ['/horario', '#e11d48'],
]

export function colorDeRuta(ruta) {
  let mejor = null
  for (const [prefijo, color] of COLORES) {
    if ((ruta === prefijo || ruta.startsWith(prefijo + '/')) && (!mejor || prefijo.length > mejor[0].length)) {
      mejor = [prefijo, color]
    }
  }
  return mejor ? mejor[1] : 'var(--color-fg)'
}
