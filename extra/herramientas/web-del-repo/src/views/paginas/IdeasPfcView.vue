<script setup>
import mockupEntorno from '../../../../../../extra/ideas-proyecto-fin-curso/entorno-interactivo-que-explica-el-codigo.jpg?url'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaIdea from '../../components/TarjetaIdea.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'

// extra/ideas-proyecto-fin-curso/README.md. Todo en tarjetas, para que crezca sin
// desordenarse: una idea nueva es una entrada más en su lista. Cuatro partes, de
// lo más concreto a lo más abierto. El id del buscador de FCT lo enlazan
// Herramientas y Un equipo de agentes: no cambiarlo.
const IDEAS = [
  {
    id: 'panel-del-aula-virtual',
    titulo: 'Panel del Aula Virtual',
    descripcion: 'Tus entregas, notas y avisos del Aula Virtual en un solo sitio. Ya está en marcha como herramienta de la clase.',
    escala: 'frontend y backend, una API REST real y decisiones de arquitectura defendibles, no solo un CRUD de ejemplo.',
    enlaces: [{ texto: 'La herramienta', href: '/extra/herramientas/panel-aula-virtual' }],
  },
  {
    id: 'buscador-de-empresas-de-fct',
    titulo: 'Buscador de empresas de FCT',
    descripcion: 'Empresas donde hacer la FCT, con lo que cuenta cada alumno que ya estuvo: qué tecnologías usaron, qué hizo allí y si la recomienda.',
    escala: 'alcance pequeño, una fecha real encima (la FCT) y le sirve a toda la clase.',
    enlaces: [{ texto: 'En pendientes de Herramientas', href: '/extra/herramientas#pendientes' }],
  },
  {
    id: 'wiki-de-un-canal-de-youtube',
    titulo: 'Wiki de un canal de YouTube',
    descripcion: 'Un canal de YouTube o un pódcast convertido en wiki: la transcripción completa y un chat que responde citando el vídeo y el minuto exacto.',
    escala: 'transcripción, backend, RAG y frontend, contra un canal real.',
  },
  {
    id: 'experiencias-cercanas-a-la-muerte',
    titulo: 'Experiencias cercanas a la muerte',
    origen: 'Idea sacada de la serie The OA',
    descripcion: 'NDERF ha publicado más de 16.000 relatos de personas que estuvieron a punto de morir. Uno a uno son historias; todos juntos, se puede buscar qué se repite: lo que ven, lo que sienten, en qué orden.',
    escala: 'recoger los relatos, analizarlos con un modelo para agrupar lo que se repite y enseñarlo en una web que se pueda explorar.',
    enlaces: [{ texto: 'NDERF', href: 'https://www.nderf.org' }],
  },
  {
    id: 'personalidades-que-viven-una-vida',
    titulo: 'Personalidades que viven una vida entera',
    origen: 'Idea sacada de Pluto (manga y serie) y de sonder',
    descripcion: 'En vez de escribirle a un personaje cómo es, simularle una vida completa, de la infancia en adelante, y que su personalidad salga de lo que ha vivido y recuerda. Es lo que dice sonder: cada persona con la que te cruzas tiene una vida tan compleja como la tuya. Aquí, cada personaje la tendría de verdad.',
    escala: 'un personaje con memoria que vive días simulados, una línea de su vida que se pueda recorrer y un chat para hablar con él.',
    enlaces: [
      { texto: 'Generative Agents (el artículo de referencia)', href: 'https://arxiv.org/abs/2304.03442' },
      { texto: 'Qué es sonder', href: 'https://www.dictionaryofobscuresorrows.com/post/23536922667/sonder' },
    ],
  },
  {
    id: 'entorno-interactivo-que-explica-el-codigo',
    titulo: 'Entorno interactivo que explica el código',
    descripcion: 'Jupyter deja probar trozos de código pequeños, ejecutarlos paso a paso y ver qué pasa, pero está atado a Python y a los notebooks. La idea es algo parecido, para cualquier lenguaje, donde la IA explica el código y además genera la interfaz que mejor lo enseña: al seleccionar un fragmento, saca un diagrama, un flujo de ejecución, el estado de las variables, un diff o un ejercicio. Sale de un AGENTS.md propio que ya pide explicar el código, justificar decisiones y señalar mejoras, y que casi siempre acaba en párrafos de texto.',
    escala: 'un notebook para escribir y ejecutar fragmentos, conectado a una IA que consulta documentación actual con Context7 y devuelve el visual adecuado para cada caso. La arquitectura debería aguantar el salto a un entorno tipo IDE que entienda el proyecto entero, vea las dependencias y diga qué partes se ven afectadas por un cambio.',
    imagen: mockupEntorno,
    enlaces: [{ texto: 'Context7', href: 'https://context7.com' }],
  },
]

const CAMPOS = [
  {
    titulo: 'Machine learning y datos masivos',
    descripcion: 'Casi cualquier tema tiene datos detrás, y juntarlos saca cosas que no se ven de uno en uno. Por ejemplo, las experiencias cercanas a la muerte, en Ideas.',
    escala: 'recoger un conjunto de datos real, limpiarlo, analizarlo con un modelo y enseñar los resultados en una web.',
    enlaces: [{ texto: 'Datos abiertos (datos.gob.es)', href: 'https://datos.gob.es' }],
  },
  {
    titulo: 'Hardware',
    descripcion: 'Una placa (Arduino, ESP32, Raspberry Pi) con sensores, y la IA para entender lo que capta. Por ejemplo, un robot o un dron que recorre un sitio y construye un mapa.',
    escala: 'sensores que mandan datos a tu backend y una web que los enseña.',
  },
  {
    titulo: 'Generative UI',
    descripcion: 'Interfaces que se generan a partir de datos en vez de pantallas fijas.',
    escala: 'un generador de formularios o paneles a partir de un JSON de configuración, con lo que ya dais en DIW.',
  },
  {
    titulo: 'Agentes e IA aplicada',
    descripcion: 'Meter un asistente o una automatización real en una app, no solo un chat pegado encima.',
    escala: 'un bot que resuelve una tarea concreta contra una API real.',
    enlaces: [{ texto: 'IA aplicada', href: '/extra/ia' }],
  },
]

const TECNOLOGIA = [
  {
    href: 'https://typesafe.ai/blog/introducing-system-one-models-and-jev',
    titulo: 'Jev',
    descripcion: 'Un modelo de IA que no genera texto, sino un valor con tipo (elección, puntuación o sí/no) y su confianza. Mucho más rápido que un LLM para clasificar.',
  },
  {
    href: 'https://github.com/wandb/openui',
    titulo: 'OpenUI',
    descripcion: 'Genera interfaces a partir de una descripción en texto y las pinta en vivo.',
  },
  {
    href: 'https://modelcontextprotocol.io/docs/extensions/apps',
    titulo: 'MCP Apps',
    descripcion: 'Una conexión MCP que, además de responder, devuelve una interfaz que se usa dentro del chat del agente. Por ejemplo, preguntar qué entregas tienes y ver el panel del Aula Virtual.',
  },
]

const EJEMPLOS = [
  {
    href: 'https://skillnet.es/',
    titulo: 'SkillNet',
    descripcion: 'Una plataforma de cursos que se generan según el perfil de cada alumno.',
  },
]
</script>

<template>
  <PlantillaPagina
    titulo="Ideas para el proyecto de fin de curso"
    entradilla="Ideas de proyectos de fin de ciclo, aunque no los vayas a hacer tú: pueden inspirar a otro, o alguien puede sumarse."
  >
    <p>
      Van de lo más concreto a lo más abierto. Antes de elegir, mira qué hay hecho:
      <RouterLink to="/extra/open-source#busca-antes">busca antes de construir</RouterLink>. Para añadir
      una, ponla en su lista con el mismo formato: qué es, cómo sería a escala de PFC y, si
      la sacaste de una serie o un libro, de dónde.
    </p>

    <h2 id="ideas">Ideas</h2>
    <p>Proyectos pensados para empezarlos ya.</p>
    <RejillaTarjetas>
      <TarjetaIdea v-for="i in IDEAS" :key="i.titulo" v-bind="i" />
    </RejillaTarjetas>

    <h2 id="campos">Campos</h2>
    <p>Un área por la que tirar si aún no tienes idea.</p>
    <RejillaTarjetas>
      <TarjetaIdea v-for="c in CAMPOS" :key="c.titulo" v-bind="c" />
    </RejillaTarjetas>

    <h2 id="tecnologia">Tecnología</h2>
    <p>Piezas que puedes usar como motor de tu proyecto.</p>
    <RejillaTarjetas>
      <TarjetaPagina v-for="t in TECNOLOGIA" :key="t.href" v-bind="t" />
    </RejillaTarjetas>

    <h2 id="ejemplos">Ejemplos</h2>
    <p>Proyectos que ya existen, para ver qué se está haciendo, no para copiarlos.</p>
    <RejillaTarjetas>
      <TarjetaPagina v-for="e in EJEMPLOS" :key="e.href" v-bind="e" />
    </RejillaTarjetas>
  </PlantillaPagina>
</template>
