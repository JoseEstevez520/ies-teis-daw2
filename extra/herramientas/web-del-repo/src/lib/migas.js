import { ARBOL_NAV } from './arbolNav.js'

// La ruta de migas de una página (Inicio › Extra › IA › Fundamentos),
// sacada del mismo árbol que sigue las carpetas del repo. Cada miga lleva sus
// hermanas (las demás páginas de su nivel), que el chevron de Breadcrumbs
// abre para saltar de una a otra sin volver atrás.

const pagina = (nodo) => ({ label: nodo.etiqueta || nodo.titulo, to: nodo.ruta })

const INICIO = ARBOL_NAV.find((s) => s.ruta === '/')
const SECCIONES = ARBOL_NAV.filter((s) => s.ruta !== '/')

export function migasDe(ruta) {
  const migas = [pagina(INICIO)]
  let nivel = SECCIONES
  for (;;) {
    const nodo = nivel.find((n) => ruta === n.ruta || ruta.startsWith(n.ruta + '/'))
    if (!nodo) break
    migas.push({ ...pagina(nodo), siblings: nivel.length > 1 ? nivel.map(pagina) : undefined })
    if (nodo.ruta === ruta) break
    nivel = nodo.hijos
  }
  return migas
}

// La sección de primer nivel en la que estás, para marcarla en la barra lateral.
export function seccionDe(ruta) {
  return SECCIONES.find((s) => ruta === s.ruta || ruta.startsWith(s.ruta + '/'))?.ruta ?? '/'
}
