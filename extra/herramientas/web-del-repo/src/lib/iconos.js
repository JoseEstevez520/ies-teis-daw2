import { h } from 'vue'

// NavTree, Badge y compañía piden el icono como componente (`:icon="Bot"`), no
// ya pintado, así que el color de la sección (lib/colorSeccion.js) tiene que
// ir dentro de un componente propio. Se guardan para no crear uno nuevo en
// cada render.
const porIcono = new WeakMap()

function componente(render) {
  render.inheritAttrs = false
  return render
}

// Un icono de Lucide con el color de su sección.
export function iconoConColor(Icono, color) {
  if (!porIcono.has(Icono)) porIcono.set(Icono, new Map())
  const colores = porIcono.get(Icono)
  if (!colores.has(color)) colores.set(color, componente((_, { attrs }) => h(Icono, { ...attrs, style: { color } })))
  return colores.get(color)
}
