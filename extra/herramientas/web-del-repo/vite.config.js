import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// En GitHub Pages la web vive en https://joseestevez520.github.io/ies-teis-daw2/,
// no en la raíz; en local (dev y preview) va en `/`.
const BASE = '/ies-teis-daw2/'

// GitHub Pages no hace fallback de SPA: al recargar una ruta honda (por ejemplo
// /modulos/dwcs) daría 404. Se arregla sirviendo index.html también como
// 404.html, que es lo que Pages usa para lo que no encuentra.
function spaFallback() {
  return {
    name: 'spa-fallback',
    apply: 'build',
    closeBundle() {
      copyFileSync(resolve('dist/index.html'), resolve('dist/404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? BASE : '/',
  plugins: [vue(), tailwindcss(), spaFallback()],
}))
