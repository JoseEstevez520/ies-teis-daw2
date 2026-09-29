// Las ideas de PFC: extra/ideas-proyecto-fin-curso/<slug>.md. El índice (IdeasPfcView)
// las enseña como tarjetas que llevan a su página; cada página se compone a mano con
// las piezas que le encajan (Idea*View.vue) y de aquí saca el título, la línea corta,
// las etiquetas y los enlaces.
export const IDEAS = [
  {
    slug: 'panel-del-aula-virtual',
    titulo: 'Panel del Aula Virtual',
    resumen: 'Entregas, notas y avisos en un sitio.',
    tags: ['Web', 'API REST', 'Aula Virtual'],
    descripcion: 'Tus entregas, notas y avisos del Aula Virtual en un solo sitio. Ya está en marcha como herramienta de la clase.',
    escala: 'frontend y backend, una API REST real y decisiones de arquitectura defendibles, no solo un CRUD de ejemplo.',
    enlaces: [{ texto: 'La herramienta', href: '/extra/herramientas/panel-aula-virtual' }],
  },
  {
    slug: 'oportunidades-y-trayectoria',
    titulo: 'Oportunidades y trayectoria, con agentes',
    resumen: 'Tu trayectoria, con agentes y Markdown.',
    tags: ['Agentes', 'Markdown', 'Oportunidades'],
    descripcion: 'Las prácticas, las becas y el primer empleo se buscan en mil sitios y se deciden sin ver el conjunto. La idea es un sistema personal, hecho con agentes y Markdown, que investiga oportunidades (dónde hacer la FCT, becas, ofertas), guarda cada cosa con su fuente y ayuda a pensar la trayectoria: qué te falta y qué paso abre más opciones. Todo vive en un vault de Markdown que es tuyo, y se usa desde OpenCode.',
    escala: 'OpenCode como motor, agentes de research, oportunidades y trayectoria (cada uno lee el vault antes de responder) y skills de investigación y verificación de fuentes. V1 simple: el vault se abre en Obsidian, sin base de datos.',
  },
  {
    slug: 'wiki-de-un-canal-de-youtube',
    titulo: 'Wiki de un canal de YouTube',
    resumen: 'Un canal o pódcast convertido en datos.',
    tags: ['IA', 'RAG', 'Análisis'],
    descripcion: 'Un canal de YouTube o un pódcast convertido en datos: la transcripción completa de cada vídeo. Con eso, un chat que responde citando el vídeo y el minuto exacto, y un análisis del canal: de qué habla, cómo cambian los temas con el tiempo, qué preguntas se repiten y qué vídeos funcionan mejor. Sirve para aprender del canal o para llevar el tuyo.',
    escala: 'transcripción, backend y RAG; además, estadísticas y análisis del texto (temas, tendencias, preguntas frecuentes) y una web para explorarlo.',
  },
  {
    slug: 'experiencias-cercanas-a-la-muerte',
    titulo: 'Experiencias cercanas a la muerte',
    resumen: '16.000 relatos de casi morir, analizados.',
    tags: ['Datos masivos', 'IA', 'NDERF'],
    descripcion: 'NDERF ha publicado más de 16.000 relatos de personas que estuvieron a punto de morir. Uno a uno son historias; todos juntos, se puede analizar qué patrones se repiten (lo que ven, lo que sienten, en qué orden) y hacerse preguntas científicas: ¿cambian los relatos según el país o la época?, ¿se parecen a lo que describe la neurociencia? Todo eso, en una web informativa que se pueda explorar.',
    escala: 'recoger los relatos, analizarlos con un modelo para detectar patrones y temas, y montar una web que los enseñe y plantee esas preguntas.',
    enlaces: [{ texto: 'NDERF', href: 'https://www.nderf.org' }],
  },
  {
    slug: 'personalidades-que-viven-una-vida-entera',
    titulo: 'Personalidades que viven una vida entera',
    resumen: 'Un personaje con una vida simulada entera.',
    tags: ['IA', 'Simulación', 'Memoria'],
    descripcion: 'En vez de escribirle a un personaje cómo es, simularle una vida completa, de la infancia en adelante, y que su personalidad salga de lo que ha vivido y recuerda. Es lo que dice sonder: cada persona con la que te cruzas tiene una vida tan compleja como la tuya. Aquí, cada personaje la tendría de verdad.',
    escala: 'un personaje con memoria que vive días simulados, una línea de su vida que se pueda recorrer y un chat para hablar con él.',
    enlaces: [
      { texto: 'Generative Agents (el artículo de referencia)', href: 'https://arxiv.org/abs/2304.03442' },
      { texto: 'Qué es sonder', href: 'https://www.dictionaryofobscuresorrows.com/post/23536922667/sonder' },
    ],
  },
  {
    slug: 'entorno-interactivo-que-explica-el-codigo',
    titulo: 'Entorno interactivo que explica el código',
    resumen: 'Un notebook con IA para cualquier lenguaje.',
    tags: ['IA', 'GenUI', 'Herramientas de desarrollo'],
    descripcion: 'Jupyter deja probar trozos de código pequeños, ejecutarlos paso a paso y ver qué pasa, pero está atado a Python y a los notebooks. La idea es algo parecido, para cualquier lenguaje, donde la IA explica el código y además genera la interfaz que mejor lo enseña: al seleccionar un fragmento, saca un diagrama, un flujo de ejecución, el estado de las variables, un diff o un ejercicio. Sale de un AGENTS.md propio que ya pide explicar el código, justificar decisiones y señalar mejoras, y que casi siempre acaba en párrafos de texto.',
    escala: 'un notebook para escribir y ejecutar fragmentos, conectado a una IA que consulta documentación actual con Context7 y devuelve el visual adecuado para cada caso. La arquitectura debería aguantar el salto a un entorno tipo IDE que entienda el proyecto entero, vea las dependencias y diga qué partes se ven afectadas por un cambio.',
    enlaces: [{ texto: 'Context7', href: 'https://context7.com' }],
  },
]

export const ideaDe = (slug) => IDEAS.find((i) => i.slug === slug)
