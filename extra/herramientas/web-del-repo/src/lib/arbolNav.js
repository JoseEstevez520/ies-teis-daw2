import { PAGINAS } from '../data/paginas.js'
import { BESPOKE } from '../data/rutas.js'
import { FICHAS } from '../data/fichas.js'
import { SECCIONES } from '../data/secciones.js'

// Desplegables de la barra lateral, sacados de las rutas: como las rutas
// siguen las carpetas del repo, el árbol también. Así una página nueva
// registrada en paginas.js aparece sola en su sitio, sin tocar el Sidebar.

function primerH1(fuente) {
  const m = /^#\s+(.+)$/m.exec(fuente || '')
  return m ? m[1].trim() : null
}

const PAGINAS_NAV = [
  ...PAGINAS.map((p) => ({ ruta: p.ruta, claveRuta: p.claveRuta, titulo: primerH1(p.fuente) })),
  ...BESPOKE.map((p) => ({ ruta: p.ruta, claveRuta: p.claveRuta, titulo: null })),
].map((p) => ({
  ruta: p.ruta,
  titulo: FICHAS[p.claveRuta]?.titulo ?? p.titulo ?? p.ruta.split('/').pop(),
}))

function hijosDe(ruta) {
  const prefijo = ruta + '/'
  return PAGINAS_NAV.filter((p) => p.ruta.startsWith(prefijo) && !p.ruta.slice(prefijo.length).includes('/'))
    .sort((a, b) => a.titulo.localeCompare(b.titulo, 'es'))
    .map((p) => ({ ...p, hijos: hijosDe(p.ruta) }))
}

export const ARBOL_NAV = SECCIONES.map((s) => ({
  ...s,
  hijos: s.ruta === '/' ? [] : hijosDe(s.ruta),
}))
