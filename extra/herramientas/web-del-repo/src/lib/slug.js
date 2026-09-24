// id de un título para enlazarlo desde el índice de la página
// (TableOfContents): minúsculas, sin tildes y con guiones.
export function slug(texto) {
  return texto
    .replace(/<[^>]+>/g, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Varios títulos iguales en la misma página: el segundo lleva "-2", etc.
export function crearSlugger() {
  const vistos = new Map()
  return (texto) => {
    const base = slug(texto) || 'seccion'
    const n = (vistos.get(base) || 0) + 1
    vistos.set(base, n)
    return n === 1 ? base : `${base}-${n}`
  }
}

// El texto de un trozo de HTML de markdown-it (sin etiquetas ni entidades),
// para donde solo cabe texto: el índice de la página.
export function textoDeHtml(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
}
