import { RUTAS } from '../data/rutas.js'
import horarioJpg from '../../../../../horario/horario.jpg?url'

// Imágenes referenciadas desde algún .md del repo, con ruta relativa a la
// carpeta de ese .md. Una entrada por imagen real (no hay tantas todavía).
const IMAGENES = {
  'horario/horario.jpg': horarioJpg,
}

const URL_REPO = 'https://github.com/JoseEstevez520/ies-teis-daw2/blob/main'

// Resuelve un href relativo (tal y como aparece en el .md) contra la carpeta
// del .md que lo contiene, usando el mismo algoritmo para enlaces e imágenes.
function normalizar(directorio, ref) {
  const limpio = ref.split('#')[0].split('?')[0]
  if (!limpio) return directorio
  const partes = limpio.split('/')
  const pila = limpio.startsWith('/') ? [] : directorio.split('/').filter(Boolean)
  for (const parte of partes) {
    if (parte === '' || parte === '.') continue
    if (parte === '..') {
      pila.pop()
      continue
    }
    pila.push(parte)
  }
  return pila.join('/')
}

function quitarSufijos(ruta) {
  if (ruta.endsWith('/README.md')) return ruta.slice(0, -'/README.md'.length)
  if (ruta.endsWith('.md')) return ruta.slice(0, -'.md'.length)
  if (ruta.endsWith('/')) return ruta.slice(0, -1)
  return ruta
}

const ES_EXTERNO = /^(https?:)?\/\//i

// Ruta del repo a la que apunta un enlace relativo, sin `README.md` ni `.md`
// (el mismo formato que `claveRuta` en data/paginas.js).
export function claveDeEnlace(href, directorio) {
  return quitarSufijos(normalizar(directorio, href))
}

export function resolverEnlace(href, directorio) {
  if (!href) return { href: '#', externo: false }
  if (ES_EXTERNO.test(href) || href.startsWith('mailto:')) {
    return { href, externo: true }
  }
  const rutaCompleta = normalizar(directorio, href)
  const clave = quitarSufijos(rutaCompleta)
  if (RUTAS[clave]) {
    return { href: RUTAS[clave], externo: false }
  }
  // No es una página de esta web: se manda al archivo real en GitHub en vez
  // de a un 404 interno.
  return { href: `${URL_REPO}/${rutaCompleta}`, externo: true }
}

export function resolverImagen(src, directorio) {
  if (ES_EXTERNO.test(src) || src.startsWith('data:')) return src
  const ruta = normalizar(directorio, src)
  return IMAGENES[ruta] || src
}
