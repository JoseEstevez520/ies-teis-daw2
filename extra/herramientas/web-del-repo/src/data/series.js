// Páginas que se leen en orden, cada una apoyándose en la anterior. Al final de
// cada una sale la anterior y la siguiente (NavegacionSerie.vue), y la página
// de la carpeta las numera. Una página nueva de la serie va aquí, en su sitio.
export const SERIES = [
  {
    carpeta: '/extra/ia',
    paginas: [
      { ruta: '/extra/ia/fundamentos', titulo: 'Fundamentos', descripcion: 'Qué es un modelo, un harness y un agente.' },
      { ruta: '/extra/ia/opencode', titulo: 'Tu primer agente', descripcion: 'Instalar uno, arrancarlo en tu proyecto y pedirle cosas.' },
      { ruta: '/extra/ia/contexto', titulo: 'Darle contexto', descripcion: 'AGENTS.md, skills y MCP: cómo sabe lo que necesita.' },
      { ruta: '/extra/ia/agentes', titulo: 'Agentes y subagentes', descripcion: 'El mismo modelo con papeles distintos, y cómo crear los tuyos.' },
      { ruta: '/extra/ia/equipo', titulo: 'Un equipo de agentes', descripcion: 'Un proyecto de principio a fin, con cada agente en su papel.' },
      { ruta: '/extra/ia/consejos', titulo: 'Consejos', descripcion: 'Cómo sacarle partido sin que te resuelva las prácticas.' },
    ],
  },
]

// La serie en la que está una página, y su posición en ella.
export function serieDe(ruta) {
  for (const serie of SERIES) {
    const i = serie.paginas.findIndex((p) => p.ruta === ruta)
    if (i !== -1) return { serie, i }
  }
  return null
}

export const serieDeCarpeta = (carpeta) => SERIES.find((s) => s.carpeta === carpeta)
