import { resolverEnlace, resolverImagen } from './enlaces.js'

// Prepara un .md del repo para el Markdown de elastic-ui. Los enlaces y las
// imágenes del .md son relativos a su carpeta, como en GitHub; aquí pasan a
// una ruta de esta web o, si la página no está en la web, a GitHub. El código
// (bloques y `en línea`) se deja tal cual.
export function prepararMarkdown(fuente, directorio) {
  return fuente
    .split(/(^```[\s\S]*?^```)/m)
    .map((trozo, i) => (i % 2 ? trozo : reescribir(trozo, directorio)))
    .join('')
}

function reescribir(texto, directorio) {
  return texto
    .split(/(`[^`\n]*`)/)
    .map((trozo, i) =>
      i % 2
        ? trozo
        : trozo
            .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, src) => `![${alt}](${resolverImagen(src, directorio)})`)
            .replace(/(?<!!)\[([^\]]+)\]\(([^)\s]+)\)/g, (_, texto, href) => `[${texto}](${enlace(href, directorio)})`),
    )
    .join('')
}

// La ruta de la web (o de GitHub) para un enlace del .md, conservando su
// `#ancla`: los ids de los títulos son los mismos en la web que en GitHub.
function enlace(href, directorio) {
  if (href.startsWith('#') || /^[a-z][a-z\d+.-]*:/i.test(href)) return href
  const ancla = href.includes('#') ? href.slice(href.indexOf('#')) : ''
  return resolverEnlace(href, directorio).href + ancla
}
