// Saca un degradado de dos tonos a partir del color medio de un favicon ya
// cargado (crossOrigin="anonymous" y servido con CORS abierto, si no el
// canvas queda "contaminado" y getImageData lanza). Ignora los píxeles casi
// transparentes: muchos favicons tienen fondo transparente y contarlos
// arrastraría el promedio hacia el blanco.
export function extraerGradiente(img) {
  const TAM = 24
  const MIN_ALFA = 40
  const MIN_PIXELES_VALIDOS = TAM

  try {
    const canvas = document.createElement('canvas')
    canvas.width = TAM
    canvas.height = TAM
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, TAM, TAM)
    const { data } = ctx.getImageData(0, 0, TAM, TAM)

    let r = 0
    let g = 0
    let b = 0
    let n = 0
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < MIN_ALFA) continue
      r += data[i]
      g += data[i + 1]
      b += data[i + 2]
      n += 1
    }
    if (n < MIN_PIXELES_VALIDOS) return null

    const [h, s, l] = rgbAHsl(r / n, g / n, b / n)
    const saturacion = Math.max(s, 45)
    const claro = Math.min(l + 10, 62)
    const oscuro = Math.max(l - 18, 22)
    return `linear-gradient(135deg, hsl(${h} ${saturacion}% ${claro}%), hsl(${h} ${saturacion}% ${oscuro}%))`
  } catch {
    return null
  }
}

function rgbAHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, Math.round(l * 100)]

  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h
  switch (max) {
    case r:
      h = (g - b) / d + (g < b ? 6 : 0)
      break
    case g:
      h = (b - r) / d + 2
      break
    default:
      h = (r - g) / d + 4
  }
  return [Math.round(h * 60), Math.round(s * 100), Math.round(l * 100)]
}
