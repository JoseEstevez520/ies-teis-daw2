// Saca el título (primer `#`) del cuerpo de un .md, para ponerlo como título
// de la página en vez de repetirlo dentro.
export function extraerTitulo(fuente) {
  const coincidencia = fuente.match(/^\s*#\s+(.+?)\s*\n+/)
  if (!coincidencia) return { titulo: '', cuerpo: fuente }
  return { titulo: coincidencia[1], cuerpo: fuente.slice(coincidencia[0].length) }
}
