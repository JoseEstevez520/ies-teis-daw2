import MarkdownIt from 'markdown-it'
import { resolverEnlace, resolverImagen } from './enlaces.js'

// Icono externo dibujado a mano (flecha saliendo de una esquina), para no
// depender de un componente Vue dentro de HTML que se inyecta con v-html.
const ICONO_EXTERNO =
  '<svg class="inline-block w-3 h-3 ml-0.5 -translate-y-px align-middle text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>'

const CLASE_ENLACE =
  'text-neutral-900 underline decoration-neutral-300 hover:decoration-neutral-900 underline-offset-2'

const MARCADORES = [
  { patron: /^ojo\s*:\s*/i, variante: 'aviso' },
  { patron: /^cuidado\s*:\s*/i, variante: 'aviso' },
  { patron: /^atenci[oó]n\s*:\s*/i, variante: 'aviso' },
  { patron: /^pendiente\s*:\s*/i, variante: 'aviso' },
  { patron: /^nota aparte\s*:\s*/i, variante: 'nota' },
  { patron: /^nota\s*:\s*/i, variante: 'nota' },
]

function crearMd(directorio) {
  const md = new MarkdownIt({ html: false, linkify: false })
  const pilaExterno = []

  md.renderer.rules.link_open = (tokens, idx) => {
    const token = tokens[idx]
    const i = token.attrIndex('href')
    const original = i >= 0 ? token.attrs[i][1] : ''
    const { href, externo } = resolverEnlace(original, directorio)
    if (i >= 0) token.attrs[i][1] = href
    token.attrSet('class', CLASE_ENLACE)
    if (externo) {
      token.attrSet('target', '_blank')
      token.attrSet('rel', 'noopener noreferrer')
    }
    pilaExterno.push(externo)
    return `<a${md.renderer.renderAttrs(token)}>`
  }

  md.renderer.rules.link_close = () => {
    const externo = pilaExterno.pop()
    return externo ? `${ICONO_EXTERNO}</a>` : '</a>'
  }

  md.renderer.rules.image = (tokens, idx) => {
    const token = tokens[idx]
    const i = token.attrIndex('src')
    const original = i >= 0 ? token.attrs[i][1] : ''
    const url = resolverImagen(original, directorio)
    const alt = md.utils.escapeHtml(token.content || '')
    return `<img src="${url}" alt="${alt}" class="rounded-lg border border-neutral-200 max-w-full" loading="lazy" />`
  }

  md.renderer.rules.code_inline = (tokens, idx) => {
    const token = tokens[idx]
    return `<code class="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-800 font-mono text-[0.85em]">${md.utils.escapeHtml(token.content)}</code>`
  }

  return md
}

function renderInline(md, children) {
  return md.renderer.renderInline(children || [], md.options, {})
}

function indiceCierre(tokens, i) {
  const abrir = tokens[i]
  const nivel = abrir.level
  const tipoCierre = abrir.type.replace('_open', '_close')
  for (let j = i + 1; j < tokens.length; j++) {
    if (tokens[j].level === nivel && tokens[j].type === tipoCierre) return j
  }
  return tokens.length - 1
}

function detectarMarcador(inlineToken) {
  const primero = inlineToken.children && inlineToken.children[0]
  if (!primero || primero.type !== 'text') return null
  for (const { patron, variante } of MARCADORES) {
    const coincidencia = primero.content.match(patron)
    if (coincidencia) {
      primero.content = primero.content.slice(coincidencia[0].length)
      return variante
    }
  }
  return null
}

function extraerItemsLista(tokens, i, md) {
  const cierreLista = indiceCierre(tokens, i)
  const items = []
  let j = i + 1
  while (j < cierreLista) {
    if (tokens[j].type !== 'list_item_open') {
      j += 1
      continue
    }
    const cierreItem = indiceCierre(tokens, j)
    let inlineToken = null
    let k = j + 1
    while (k < cierreItem) {
      if (tokens[k].type === 'inline') {
        inlineToken = tokens[k]
        break
      }
      if (tokens[k].type === 'bullet_list_open' || tokens[k].type === 'ordered_list_open') {
        k = indiceCierre(tokens, k)
      }
      k += 1
    }
    if (inlineToken) {
      const hijos = inlineToken.children
      // markdown-it mete un token de texto vacío antes de un `**negrita**`
      // que abre el item: hay que saltarlo para detectar el inicio real.
      let inicio = 0
      while (hijos[inicio] && hijos[inicio].type === 'text' && hijos[inicio].content === '') inicio += 1
      const primero = hijos[inicio]
      const idxCierreStrong =
        primero && primero.type === 'strong_open'
          ? hijos.findIndex((c, idx2) => idx2 > inicio && c.type === 'strong_close')
          : -1
      if (idxCierreStrong > inicio) {
        const hijosTermino = hijos.slice(inicio + 1, idxCierreStrong)
        const resto = hijos.slice(idxCierreStrong + 1)
        if (resto[0] && resto[0].type === 'text') {
          resto[0].content = resto[0].content.replace(/^\s*[:.]\s*/, '')
        }
        items.push({
          esBold: true,
          terminoHtml: renderInline(md, hijosTermino),
          descripcionHtml: renderInline(md, resto),
        })
      } else {
        items.push({ esBold: false, html: renderInline(md, inlineToken.children) })
      }
    }
    j = cierreItem + 1
  }
  return { items, siguienteIndice: cierreLista + 1 }
}

function extraerTabla(tokens, i, md) {
  const cierreTabla = indiceCierre(tokens, i)
  const cabeceras = []
  const filas = []
  let j = i + 1
  while (j < cierreTabla) {
    const tok = tokens[j]
    if (tok.type === 'th_open') {
      cabeceras.push(renderInline(md, tokens[j + 1].children))
      j += 3
      continue
    }
    if (tok.type === 'tr_open' && tokens[j + 1] && tokens[j + 1].type === 'td_open') {
      const fila = []
      let k = j + 1
      while (tokens[k] && tokens[k].type !== 'tr_close') {
        if (tokens[k].type === 'td_open') {
          fila.push(renderInline(md, tokens[k + 1].children))
          k += 3
          continue
        }
        k += 1
      }
      filas.push(fila)
      j = k + 1
      continue
    }
    j += 1
  }
  return { tabla: { cabeceras, filas }, siguienteIndice: cierreTabla + 1 }
}

function extraerBlockquote(tokens, i, md) {
  const cierre = indiceCierre(tokens, i)
  let html = ''
  let j = i + 1
  while (j < cierre) {
    if (tokens[j].type === 'inline') {
      html += `<p>${renderInline(md, tokens[j].children)}</p>`
    }
    j += 1
  }
  return { html, siguienteIndice: cierre + 1 }
}

// Convierte el .md en bloques tipados que PaginaMarkdown puede renderizar con
// componentes reales (iconos, tarjetas, pasos numerados...), no en un único
// HTML crudo. Ver web-del-repo/design.md para el porqué de cada tipo de bloque.
export function parseMarkdown(fuente, { directorio }) {
  const md = crearMd(directorio)
  const tokens = md.parse(fuente, {})
  const bloques = []
  let i = 0

  while (i < tokens.length) {
    const t = tokens[i]

    if (t.type === 'heading_open') {
      const inline = tokens[i + 1]
      bloques.push({ tipo: 'titulo', nivel: Number(t.tag.slice(1)), html: renderInline(md, inline.children) })
      i += 3
      continue
    }

    if (t.type === 'paragraph_open') {
      const inline = tokens[i + 1]
      const variante = detectarMarcador(inline)
      if (variante) {
        bloques.push({ tipo: 'aviso', variante, html: renderInline(md, inline.children) })
      } else {
        bloques.push({ tipo: 'parrafo', html: renderInline(md, inline.children) })
      }
      i += 3
      continue
    }

    if (t.type === 'fence' || t.type === 'code_block') {
      bloques.push({ tipo: 'codigo', lenguaje: (t.info || '').trim(), codigo: t.content.replace(/\n$/, '') })
      i += 1
      continue
    }

    if (t.type === 'bullet_list_open') {
      const { items, siguienteIndice } = extraerItemsLista(tokens, i, md)
      const conBold = items.filter((it) => it.esBold).length
      if (items.length > 0 && conBold >= Math.ceil(items.length * 0.6)) {
        bloques.push({
          tipo: 'lista-referencia',
          items: items.map((it) => ({
            terminoHtml: it.esBold ? it.terminoHtml : it.html,
            descripcionHtml: it.esBold ? it.descripcionHtml : '',
          })),
        })
      } else {
        bloques.push({ tipo: 'lista', items: items.map((it) => (it.esBold ? `<strong>${it.terminoHtml}</strong>: ${it.descripcionHtml}` : it.html)) })
      }
      i = siguienteIndice
      continue
    }

    if (t.type === 'ordered_list_open') {
      const { items, siguienteIndice } = extraerItemsLista(tokens, i, md)
      bloques.push({
        tipo: 'pasos',
        items: items.map((it) => (it.esBold ? `<strong>${it.terminoHtml}</strong>: ${it.descripcionHtml}` : it.html)),
      })
      i = siguienteIndice
      continue
    }

    if (t.type === 'table_open') {
      const { tabla, siguienteIndice } = extraerTabla(tokens, i, md)
      bloques.push({ tipo: 'tabla', ...tabla })
      i = siguienteIndice
      continue
    }

    if (t.type === 'hr') {
      bloques.push({ tipo: 'separador' })
      i += 1
      continue
    }

    if (t.type === 'blockquote_open') {
      const { html, siguienteIndice } = extraerBlockquote(tokens, i, md)
      bloques.push({ tipo: 'cita', html })
      i = siguienteIndice
      continue
    }

    i += 1
  }

  return bloques
}

// Saca el título (primer `#`) del cuerpo, para usarlo en la cabecera de la
// página en vez de repetirlo también dentro de PaginaMarkdown.
export function extraerTitulo(fuente) {
  const coincidencia = fuente.match(/^\s*#\s+(.+?)\s*\n+/)
  if (!coincidencia) return { titulo: '', cuerpo: fuente }
  return { titulo: coincidencia[1], cuerpo: fuente.slice(coincidencia[0].length) }
}
