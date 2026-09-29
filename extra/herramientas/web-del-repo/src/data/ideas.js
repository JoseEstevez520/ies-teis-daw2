import {
  Bot,
  Brain,
  CalendarDays,
  Code,
  Database,
  FileText,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  Layers,
  MessageCircle,
  Play,
  Search,
  Server,
  UserRound,
  Video,
} from '@lucide/vue'
import mockupEntorno from '../../../../../extra/ideas-proyecto-fin-curso/entorno-interactivo-que-explica-el-codigo.jpg?url'

// Las ideas de PFC: extra/ideas-proyecto-fin-curso/<slug>.md. El índice las enseña
// como tarjetas que llevan a su página (IdeaView), y de aquí sale todo lo que esa
// página necesita: la línea corta de la tarjeta (`resumen`), las etiquetas, el
// flujo del diagrama, el plan a escala de PFC, el mockup si lo tiene y los enlaces.
export const IDEAS = [
  {
    slug: 'panel-del-aula-virtual',
    titulo: 'Panel del Aula Virtual',
    resumen: 'Entregas, notas y avisos en un sitio.',
    tags: ['Web', 'API REST', 'Aula Virtual'],
    descripcion: 'Tus entregas, notas y avisos del Aula Virtual en un solo sitio. Ya está en marcha como herramienta de la clase.',
    diagramaLabel: 'El Aula Virtual y tu backend alimentan un panel con tus entregas, notas y avisos.',
    flujo: [
      { texto: 'Aula Virtual', detalle: 'entregas, notas, avisos', icono: GraduationCap },
      { texto: 'Tu backend', detalle: 'una API REST', icono: Server },
      { texto: 'Panel', detalle: 'todo en un sitio', icono: LayoutDashboard },
    ],
    plan: [
      { titulo: 'Frontend y backend', texto: 'Una app de verdad, no un CRUD de ejemplo.' },
      { titulo: 'Una API REST real', texto: 'Conectar con los datos del Aula Virtual.' },
      { titulo: 'Arquitectura defendible', texto: 'Decisiones que puedas explicar en la defensa.' },
    ],
    enlaces: [{ texto: 'La herramienta', href: '/extra/herramientas/panel-aula-virtual' }],
  },
  {
    slug: 'buscador-de-empresas-de-fct',
    titulo: 'Buscador de empresas de FCT',
    resumen: 'Empresas de FCT y lo que cuenta el alumnado.',
    tags: ['Web', 'Base de datos', 'FCT'],
    descripcion: 'Empresas donde hacer la FCT, con lo que cuenta cada alumno que ya estuvo: qué tecnologías usaron, qué hizo allí y si la recomienda.',
    diagramaLabel: 'El alumnado deja fichas de las empresas de FCT y un buscador las filtra.',
    flujo: [
      { texto: 'Alumnado', detalle: 'lo que ya estuvo', icono: UserRound },
      { texto: 'Fichas', detalle: 'tecnologías y valoración', icono: Database },
      { texto: 'Buscador', detalle: 'filtra por lo que importa', icono: Search },
    ],
    plan: [
      { titulo: 'Fichas de empresa', texto: 'Cada alumno deja qué tecnologías vio y si la recomienda.' },
      { titulo: 'Buscador', texto: 'Filtrar por tecnología, valoración o sector.' },
      { titulo: 'Fecha real', texto: 'Sirve para la FCT de este curso.' },
    ],
    enlaces: [{ texto: 'En pendientes de Herramientas', href: '/extra/herramientas#pendientes' }],
  },
  {
    slug: 'wiki-de-un-canal-de-youtube',
    titulo: 'Wiki de un canal de YouTube',
    resumen: 'Un canal o pódcast convertido en wiki.',
    tags: ['IA', 'RAG', 'Vídeo'],
    descripcion: 'Un canal de YouTube o un pódcast convertido en wiki: la transcripción completa y un chat que responde citando el vídeo y el minuto exacto.',
    diagramaLabel: 'Los vídeos de un canal se transcriben y un chat responde citando el minuto.',
    flujo: [
      { texto: 'Vídeo', detalle: 'un canal o pódcast', icono: Video },
      { texto: 'Transcripción', detalle: 'el texto completo', icono: FileText },
      { texto: 'Chat', detalle: 'cita vídeo y minuto', icono: MessageCircle },
    ],
    plan: [
      { titulo: 'Transcripción', texto: 'Sacar el texto completo de cada vídeo.' },
      { titulo: 'Backend y RAG', texto: 'Indexar y recuperar los fragmentos que responden.' },
      { titulo: 'Chat con citas', texto: 'Responder citando el vídeo y el minuto.' },
    ],
  },
  {
    slug: 'experiencias-cercanas-a-la-muerte',
    titulo: 'Experiencias cercanas a la muerte',
    origen: 'Idea sacada de la serie The OA',
    resumen: '16.000 relatos de casi morir, agrupados.',
    tags: ['Datos masivos', 'IA', 'NDERF'],
    descripcion: 'NDERF ha publicado más de 16.000 relatos de personas que estuvieron a punto de morir. Uno a uno son historias; todos juntos, se puede buscar qué se repite: lo que ven, lo que sienten, en qué orden.',
    diagramaLabel: 'Miles de relatos de casi morir pasan por un modelo que agrupa lo que se repite.',
    flujo: [
      { texto: '16.000 relatos', detalle: 'de casi morir', icono: HeartPulse },
      { texto: 'Modelo', detalle: 'agrupa lo que se repite', icono: Brain },
      { texto: 'Temas', detalle: 'qué ven, qué sienten', icono: Layers },
    ],
    plan: [
      { titulo: 'Recoger los relatos', texto: 'Miles de historias publicadas en NDERF.' },
      { titulo: 'Analizar con un modelo', texto: 'Agrupar lo que se repite.' },
      { titulo: 'Web para explorar', texto: 'Buscar por temas: lo que ven, lo que sienten, en qué orden.' },
    ],
    enlaces: [{ texto: 'NDERF', href: 'https://www.nderf.org' }],
  },
  {
    slug: 'personalidades-que-viven-una-vida-entera',
    titulo: 'Personalidades que viven una vida entera',
    origen: 'Idea sacada de Pluto (manga y serie) y de sonder',
    resumen: 'Un personaje con una vida simulada entera.',
    tags: ['IA', 'Simulación', 'Memoria'],
    descripcion: 'En vez de escribirle a un personaje cómo es, simularle una vida completa, de la infancia en adelante, y que su personalidad salga de lo que ha vivido y recuerda. Es lo que dice sonder: cada persona con la que te cruzas tiene una vida tan compleja como la tuya. Aquí, cada personaje la tendría de verdad.',
    diagramaLabel: 'Un personaje vive días simulados, los recuerda y su personalidad sale de esa historia.',
    flujo: [
      { texto: 'Días vividos', detalle: 'una vida simulada', icono: CalendarDays },
      { texto: 'Memoria', detalle: 'lo que recuerda', icono: Brain },
      { texto: 'Personalidad', detalle: 'sale de su historia', icono: UserRound },
    ],
    plan: [
      { titulo: 'Días simulados', texto: 'Un personaje que vive día a día, desde la infancia.' },
      { titulo: 'Memoria', texto: 'Recuerda lo que ha vivido y lo que siente.' },
      { titulo: 'Personalidad emergente', texto: 'Su carácter sale de su historia, no de una ficha.' },
    ],
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
    diagramaLabel: 'El código se ejecuta, la IA lo mira con su contexto y genera la interfaz que mejor lo explica.',
    flujo: [
      { texto: 'Código', detalle: 'lo que escribes', icono: Code },
      { texto: 'Ejecución', detalle: 'qué pasa al correrlo', icono: Play },
      { texto: 'IA', detalle: 'código, contexto y docs', icono: Bot },
      { texto: 'Interfaz', detalle: 'el visual que lo explica', icono: LayoutDashboard },
    ],
    plan: [
      { titulo: 'Escribir y ejecutar', texto: 'Fragmentos pequeños, paso a paso.' },
      { titulo: 'IA con contexto', texto: 'El código, su ejecución y la documentación al día.' },
      { titulo: 'Interfaz generada', texto: 'Diagrama, flujo, estado, diff o ejercicio, según el caso.' },
    ],
    imagen: mockupEntorno,
    imagenPie: 'Cómo se vería: un editor con el flujo de ejecución, las dependencias, el estado de las variables y la explicación, generados a partir del código.',
    enlaces: [{ texto: 'Context7', href: 'https://context7.com' }],
  },
]

export const ideaDe = (slug) => IDEAS.find((i) => i.slug === slug)
