import { PAGINAS } from '../data/paginas.js'
import { BESPOKE } from '../data/rutas.js'
import { FICHAS } from '../data/fichas.js'

// Índice para el buscador: todas las páginas de la web, con su título y el
// texto de su .md sin marcas. Las vistas a medida solo se buscan por título.

const sinTildes = (texto) => texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

function textoPlano(fuente) {
  return fuente
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#+\s+/gm, '')
    .replace(/[*_`>|#-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const primerH1 = (fuente) => /^#\s+(.+)$/m.exec(fuente)?.[1].trim()

const PAGINAS_BUSCABLES = [
  ...PAGINAS.map((p) => {
    const titulo = FICHAS[p.claveRuta]?.titulo ?? primerH1(p.fuente) ?? p.ruta
    const texto = textoPlano(p.fuente.replace(/^#\s+.+$/m, ''))
    return { ruta: p.ruta, titulo, texto, tituloBuscable: sinTildes(titulo), textoBuscable: sinTildes(texto) }
  }),
  ...BESPOKE.map((p) => {
    const titulo = FICHAS[p.claveRuta]?.titulo ?? p.ruta
    return { ruta: p.ruta, titulo, texto: '', tituloBuscable: sinTildes(titulo), textoBuscable: '' }
  }),
]

// Primero las que lo tienen en el título; luego las que lo tienen en el texto,
// con un trozo alrededor de la primera coincidencia.
export function buscar(consulta, limite = 8) {
  const q = sinTildes(consulta.trim())
  if (!q) return []
  const enTitulo = []
  const enTexto = []
  for (const p of PAGINAS_BUSCABLES) {
    const i = p.textoBuscable.indexOf(q)
    const fragmento = i === -1 ? '' : recortar(p.texto, i, q.length)
    if (p.tituloBuscable.includes(q)) enTitulo.push({ ruta: p.ruta, titulo: p.titulo, fragmento })
    else if (i !== -1) enTexto.push({ ruta: p.ruta, titulo: p.titulo, fragmento })
  }
  return [...enTitulo, ...enTexto].slice(0, limite)
}

function recortar(texto, i, largo) {
  const inicio = Math.max(0, i - 30)
  const fin = Math.min(texto.length, i + largo + 60)
  return (inicio > 0 ? '…' : '') + texto.slice(inicio, fin).trim() + (fin < texto.length ? '…' : '')
}
