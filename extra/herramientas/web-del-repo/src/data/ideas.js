import { Compass, Code, Database, HeartPulse, LayoutDashboard, ScanEye, UserRound, Video } from '@lucide/vue'

// Las ideas de PFC: extra/ideas-proyecto-fin-curso/<slug>.md. El índice (IdeasPfcView)
// las enseña como tarjetas que llevan a su página; cada página se compone a mano con
// las piezas que le encajan (Idea*View.vue) y de aquí saca el icono, el título, la
// línea corta, las etiquetas y los enlaces.
export const IDEAS = [
  {
    slug: 'panel-del-aula-virtual',
    titulo: 'Panel del Aula Virtual',
    icono: LayoutDashboard,
    resumen: 'Entregas, notas y avisos en un sitio.',
    tags: ['Web', 'MCP', 'Agentes'],
    descripcion: 'Tus entregas, notas y avisos del Aula Virtual en un solo sitio. Ya está en marcha como herramienta de la clase. Y da para mucho más: una conexión MCP para que tu agente consulte el Aula Virtual y te devuelva el panel dentro del chat, y agentes que te avisen de lo que se acerca, te resuman los avisos o te organicen la semana.',
    escala: 'frontend y backend, una API REST real y decisiones de arquitectura defendibles, no solo un CRUD de ejemplo. Y, si te atreves, una conexión MCP y un agente que la use.',
    enlaces: [{ texto: 'La herramienta', href: '/extra/herramientas/panel-aula-virtual' }],
  },
  {
    slug: 'oportunidades-y-trayectoria',
    titulo: 'Oportunidades y trayectoria, con agentes',
    icono: Compass,
    resumen: 'Tu trayectoria, con agentes y Markdown.',
    tags: ['Agentes', 'Markdown', 'Oportunidades'],
    descripcion: 'Las prácticas, las becas y el primer empleo se buscan en mil sitios y se deciden sin ver el conjunto. La idea es una app personal que investiga oportunidades (dónde hacer la FCT, becas, ofertas), guarda cada cosa con su fuente y ayuda a pensar la trayectoria: qué te falta y qué paso abre más opciones. Por dentro son agentes, y la memoria es un vault de Markdown que es tuyo.',
    escala: 'una app con agentes (en Python) y un vault de Markdown como memoria, con agentes de research, oportunidades y trayectoria. V1: montarlo sobre OpenCode como ejemplo, para probar rápido.',
  },
  {
    slug: 'wiki-de-un-canal-de-youtube',
    titulo: 'Wiki de un canal de YouTube',
    icono: Video,
    resumen: 'Un canal o pódcast convertido en datos.',
    tags: ['IA', 'RAG', 'Análisis'],
    descripcion: 'Un canal de YouTube o un pódcast convertido en datos: la transcripción completa de cada vídeo. Con eso salen dos cosas. Una, un chat que responde citando el vídeo y el minuto exacto. Y otra, un análisis del canal: de qué habla y cuánto, cómo cambian los temas con los años, qué preguntas se repiten, qué vídeos funcionan mejor y qué temas no ha tocado todavía. Sirve para aprender del canal o para llevar el tuyo.',
    escala: 'transcripción de todos los vídeos, backend y RAG para el chat, y estadísticas y análisis del texto (temas, tendencias, preguntas, huecos) en una web.',
  },
  {
    slug: 'experiencias-cercanas-a-la-muerte',
    titulo: 'Experiencias cercanas a la muerte',
    icono: HeartPulse,
    resumen: '16.000 relatos de casi morir, analizados.',
    tags: ['Datos masivos', 'IA', 'NDERF'],
    descripcion: 'NDERF ha publicado más de 16.000 relatos de personas que estuvieron a punto de morir. Uno a uno son historias; todos juntos, se puede analizar qué patrones se repiten (lo que ven, lo que sienten, en qué orden) y hacerse preguntas científicas: ¿cambian los relatos según el país o la época?, ¿se parecen a lo que describe la neurociencia? Todo eso, en una web informativa que se pueda explorar.',
    escala: 'recoger los relatos, analizarlos con un modelo para detectar patrones y temas, y montar una web que los enseñe y plantee esas preguntas.',
    enlaces: [{ texto: 'NDERF', href: 'https://www.nderf.org' }],
  },
  {
    slug: 'personalidades-que-viven-una-vida-entera',
    titulo: 'Personalidades que viven una vida entera',
    icono: UserRound,
    resumen: 'Un personaje con una vida simulada entera.',
    tags: ['IA', 'Simulación', 'Memoria'],
    descripcion: 'Tiene dos partes. La primera es un modelo de conducta: con lo que alguien ha vivido y la situación de ahora, predecir qué haría. La segunda son vidas enteras simuladas con ese modelo: cada personaje vive sus días, los recuerda, y de ahí salen personalidades e historias complejas, no una ficha escrita a mano. La misma idea vale para la vida de la propia IA: qué recuerda y cómo cambia con lo que vive. Es lo que dice sonder: cada persona con la que te cruzas tiene una vida tan compleja como la tuya.',
    escala: 'un modelo de conducta (predecir la reacción a una situación) y, encima, días simulados de una vida entera con memoria, que dan personalidades e historias; y una línea de la vida de la IA.',
    enlaces: [
      { texto: 'Generative Agents (el artículo de referencia)', href: 'https://arxiv.org/abs/2304.03442' },
      { texto: 'Qué es sonder', href: 'https://www.dictionaryofobscuresorrows.com/post/23536922667/sonder' },
    ],
  },
  {
    slug: 'entorno-interactivo-que-explica-el-codigo',
    titulo: 'Entorno interactivo que explica el código',
    icono: Code,
    resumen: 'Un notebook con IA para cualquier lenguaje.',
    tags: ['IA', 'GenUI', 'Herramientas de desarrollo'],
    descripcion: 'Jupyter deja probar trozos de código pequeños, ejecutarlos paso a paso y ver qué pasa, pero está atado a Python y a los notebooks. La idea es algo parecido, para cualquier lenguaje, donde la IA explica el código y además genera la interfaz que mejor lo enseña: al seleccionar un fragmento, saca un diagrama, un flujo de ejecución, el estado de las variables, un diff o un ejercicio. Sale de un AGENTS.md propio que ya pide explicar el código, justificar decisiones y señalar mejoras, y que casi siempre acaba en párrafos de texto.',
    escala: 'un notebook para escribir y ejecutar fragmentos, conectado a una IA que consulta documentación actual con Context7 y devuelve el visual adecuado para cada caso. La arquitectura debería aguantar el salto a un entorno tipo IDE que entienda el proyecto entero, vea las dependencias y diga qué partes se ven afectadas por un cambio.',
    enlaces: [{ texto: 'Context7', href: 'https://context7.com' }],
  },
  {
    slug: 'analisis-del-comportamiento-deportivo',
    titulo: 'Análisis del comportamiento deportivo con IA',
    icono: ScanEye,
    resumen: 'Vídeos de boxeo convertidos en datos y estilos.',
    tags: ['IA', 'Visión por computador', 'Machine Learning'],
    descripcion: 'Un sistema que convierte vídeos de combates de boxeo en datos: de cada combate saca golpes, desplazamientos, intercambios y defensa, y los guarda como números medibles. Con varios combates salen perfiles de comportamiento y, buscando patrones con Machine Learning, los estilos de cada deportista. El boxeo es solo el caso de estudio; la misma cadena (datos observables → features → perfiles → modelos) vale para otros deportes, videojuegos competitivos o cualquier ámbito donde una persona deje un rastro observable.',
    escala: 'un sistema de visión por computador que saca las features del vídeo, un análisis con Machine Learning encima (clasificación, clustering, reducción de dimensionalidad) y una web donde consultar estadísticas, perfiles y patrones. Los datos, anonimizados y minimizados, con identificadores anónimos y consentimiento cuando se asocian a un deportista real.',
  },
  {
    slug: 'datos-de-vigo',
    titulo: 'Un proyecto con los datos de Vigo',
    icono: Database,
    resumen: 'Datos reales de la ciudad, analizados y enseñados.',
    tags: ['Datos abiertos', 'Visualización', 'Análisis'],
    descripcion: 'Vigo publica más de 140 conjuntos de datos abiertos: movilidad, medioambiente, turismo, educación, energía, urbanismo, seguridad. La idea es coger uno o cruzar varios, entenderlos y montar algo que los haga útiles: una web que los analice y los enseñe con visualizaciones, que compare zonas o barrios, o que saque conclusiones que no se ven a simple vista.',
    escala: 'elegir un tema, descargar los datos, limpiarlos y analizarlos (estadística o un modelo) y montar una web con visualizaciones. Con los datos abiertos de Vigo de base.',
    enlaces: [
      { texto: 'Datos abiertos de Vigo', href: 'https://datos.vigo.org' },
      { texto: 'Portal de mapas', href: 'https://mapas.vigo.org' },
    ],
  },
]

export const ideaDe = (slug) => IDEAS.find((i) => i.slug === slug)
