// Páginas que se leen en orden, cada una apoyándose en la anterior. Al final de
// cada una sale la anterior y la siguiente (NavegacionSerie.vue), y la página
// de la carpeta las numera. Una página nueva de la serie va aquí, en su sitio.
export const SERIES = [
  {
    carpeta: '/modulos/dwcs',
    paginas: [
      { ruta: '/modulos/dwcs/spring-y-contenedor', titulo: 'Spring y el contenedor', descripcion: 'Cómo Spring crea tus objetos, qué es un bean y qué es la inyección de dependencias.' },
      { ruta: '/modulos/dwcs/controladores-y-rutas', titulo: 'Controladores y rutas', descripcion: 'Cómo recibe el servidor las peticiones HTTP y las lleva al método que toca.' },
      { ruta: '/modulos/dwcs/thymeleaf', titulo: 'Thymeleaf', descripcion: 'El motor de plantillas que rellena el HTML con los datos.' },
      { ruta: '/modulos/dwcs/servicios-e-inyeccion', titulo: 'Servicios e inyección', descripcion: 'La lógica del negocio en un servicio y cómo se inyecta.' },
      { ruta: '/modulos/dwcs/optional', titulo: 'Optional', descripcion: 'Un envoltorio para los valores que pueden no estar.' },
      { ruta: '/modulos/dwcs/enum', titulo: 'Enum', descripcion: 'Un tipo con un conjunto cerrado de valores.' },
      { ruta: '/modulos/dwcs/scopes-y-estado', titulo: 'Scopes y estado', descripcion: 'Cuántas instancias crea Spring de cada bean: singleton, prototype y sesión HTTP.' },
    ],
  },
  {
    carpeta: '/modulos/diw',
    paginas: [
      { ruta: '/modulos/diw/componentes-y-reactividad', titulo: 'Componentes y reactividad', descripcion: 'El archivo .vue, ref y reactive, y las directivas: v-model, v-if, v-for.' },
      { ruta: '/modulos/diw/frontend-backend-y-base-de-datos', titulo: 'Frontend, backend y base de datos', descripcion: 'Cómo se conecta la web (Vue) con el servidor y la base de datos.' },
    ],
  },
  {
    carpeta: '/extra/ia',
    paginas: [
      { ruta: '/extra/ia/fundamentos', titulo: 'Fundamentos', descripcion: 'Qué es un modelo, un harness y un agente.' },
      { ruta: '/extra/ia/opencode', titulo: 'Tu primer agente', descripcion: 'Instalar uno, arrancarlo en tu proyecto y pedirle cosas.' },
      { ruta: '/extra/ia/modelos', titulo: 'Elegir un modelo', descripcion: 'Capacidad, precio y cuándo basta el barato.' },
      { ruta: '/extra/ia/contexto', titulo: 'Darle contexto', descripcion: 'AGENTS.md, skills y MCP: cómo sabe lo que necesita.' },
      { ruta: '/extra/ia/agentes', titulo: 'Agentes y subagentes', descripcion: 'El mismo modelo con papeles distintos, y cómo crear los tuyos.' },
      { ruta: '/extra/ia/equipo', titulo: 'Un equipo de agentes', descripcion: 'Un proyecto de principio a fin, con cada agente en su papel.' },
      { ruta: '/extra/ia/herramientas', titulo: 'Herramientas', descripcion: 'Herdr, para tenerlos corriendo, y Obsidian, para editar el markdown.' },
      { ruta: '/extra/ia/que-es-la-ia', titulo: 'Qué es la IA', descripcion: 'No sigue reglas: aprende de ejemplos. De ahí salen sus aciertos y sus fallos.' },
      { ruta: '/extra/ia/aplicaciones-con-ia', titulo: 'Aplicaciones con IA', descripcion: 'Qué se puede hacer con ella: chat, generar, tool calling y MCP.' },
    ],
  },
  {
    carpeta: '/extra/diseno',
    paginas: [
      { ruta: '/extra/diseno/idea', titulo: 'La idea', descripcion: 'Decidir qué quieres transmitir y buscar referencias.' },
      { ruta: '/extra/diseno/marca', titulo: 'Marca', descripcion: 'Nombre, logo, color, tipografía y tono, que digan lo mismo.' },
      { ruta: '/extra/diseno/colores', titulo: 'Colores', descripcion: 'Paletas, contraste y temas.' },
      { ruta: '/extra/diseno/fuentes', titulo: 'Fuentes', descripcion: 'Elegir tipografías y combinarlas.' },
      { ruta: '/extra/diseno/ai-slop', titulo: 'AI slop', descripcion: 'El look genérico de IA y cómo no caer en él.' },
      { ruta: '/extra/diseno/skills', titulo: 'Skills', descripcion: 'Skills de agente que ayudan con el diseño.' },
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
