# Ideas para el proyecto de fin de curso

Sitio para dejar ideas de proyectos de fin de ciclo, aunque no los vayas a hacer tú. Puede
inspirar a otro, o alguien puede sumarse.

Van de lo más concreto a lo más abierto. Antes de elegir, mira qué hay hecho:
[busca antes de construir](../open-source/#busca-antes-de-construir).

Para añadir una, ponla en su lista con el mismo formato: qué es, cómo sería a escala de PFC
y, si la sacaste de una serie o un libro, de dónde.

## Ideas

Proyectos pensados para empezarlos ya.

- **Panel del Aula Virtual** — tus entregas, notas y avisos del Aula Virtual en un solo
  sitio. Ya está en marcha como
  [herramienta de la clase](../herramientas/panel-aula-virtual/). *A escala de PFC:*
  frontend y backend, una API REST real y decisiones de arquitectura defendibles, no solo
  un CRUD de ejemplo.
- **Buscador de empresas de FCT** — empresas donde hacer la FCT, con lo que cuenta cada
  alumno que ya estuvo: qué tecnologías usaron, qué hizo allí y si la recomienda. Está en
  los [pendientes de Herramientas](../herramientas/README.md#pendientes). *A escala de
  PFC:* alcance pequeño, una fecha real encima (la FCT) y le sirve a toda la clase.
- **Wiki de un canal de YouTube** — un canal de YouTube o un pódcast convertido en wiki: la
  transcripción completa y un chat que responde citando el vídeo y el minuto exacto. *A
  escala de PFC:* transcripción, backend, RAG y frontend, contra un canal real.
- **Experiencias cercanas a la muerte** (idea sacada de la serie *The
  OA*) — [NDERF](https://www.nderf.org) ha publicado más de 16.000 relatos de personas que
  estuvieron a punto de morir. Uno a uno son historias; todos juntos, se puede buscar qué se
  repite: lo que ven, lo que sienten, en qué orden. *A escala de PFC:* recoger los relatos,
  analizarlos con un modelo para agrupar lo que se repite y enseñarlo en una web que se
  pueda explorar.
- **Personalidades que viven una vida entera** (idea sacada de *Pluto*, manga y serie, y de
  [sonder](https://www.dictionaryofobscuresorrows.com/post/23536922667/sonder)) — en vez de
  escribirle a un personaje cómo es, simularle una vida completa, de la infancia en
  adelante, y que su personalidad salga de lo que ha vivido y recuerda. Es lo que dice
  sonder: cada persona con la que te cruzas tiene una vida tan compleja como la tuya. Aquí,
  cada personaje la tendría de verdad. Referencia:
   [Generative Agents](https://arxiv.org/abs/2304.03442). *A escala de PFC:* un personaje con
  memoria que vive días simulados, una línea de su vida que se pueda recorrer y un chat para
  hablar con él.
- **Entorno interactivo que explica el código** — Jupyter deja probar trozos de código
  pequeños, ejecutarlos paso a paso y ver qué pasa, pero está atado a Python y a los
  notebooks. La idea es algo parecido, para cualquier lenguaje, donde la IA explica el código
  y además genera la interfaz que mejor lo enseña: al seleccionar un fragmento, saca un
  diagrama, un flujo de ejecución, el estado de las variables, un diff o un ejercicio. Sale
  de un `AGENTS.md` propio que ya pide explicar el código, justificar decisiones y señalar
  mejoras, y que casi siempre acaba en párrafos de texto. *A escala de PFC:* un notebook para
  escribir y ejecutar fragmentos, conectado a una IA que consulta documentación actual con
  [Context7](https://context7.com) y devuelve el visual adecuado para cada caso. La
  arquitectura debería aguantar el salto a un entorno tipo IDE que entienda el proyecto
  entero, vea las dependencias y diga qué partes se ven afectadas por un cambio.

## Campos

Un área por la que tirar si aún no tienes idea.

- **Machine learning y datos masivos** — casi cualquier tema tiene datos detrás, y
  juntarlos saca cosas que no se ven de uno en uno. Por ejemplo, las experiencias cercanas
  a la muerte, en [Ideas](#ideas). Hay miles de conjuntos de datos abiertos en
  [datos.gob.es](https://datos.gob.es). *A escala de PFC:* recoger un conjunto
  de datos real, limpiarlo, analizarlo con un modelo y enseñar los resultados en una web.
- **Hardware** — una placa (Arduino, ESP32, Raspberry Pi) con sensores, y la IA para
  entender lo que capta. Por ejemplo, un robot o un dron que recorre un sitio y construye
  un mapa. *A escala de PFC:* sensores que mandan datos a tu backend y una web que los
  enseña.
- **Generative UI** — interfaces que se generan a partir de datos en vez de pantallas
  fijas. *A escala de PFC:* un generador de formularios o paneles a partir de un JSON de
  configuración, con lo que ya dais en DIW.
- **Agentes e IA aplicada** — meter un asistente o una automatización real en una app, no
  solo un chat pegado encima (para empezar, [`../ia/`](../ia/)). *A escala de PFC:* un bot
  que resuelve una tarea concreta contra una API real.

## Tecnología

Piezas que puedes usar como motor de tu proyecto.

- [Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) — un modelo de IA
  que no genera texto, sino un valor con tipo (elección, puntuación o sí/no) y su confianza.
  Mucho más rápido que un LLM para clasificar.
- [OpenUI](https://github.com/wandb/openui) — genera interfaces a partir de una descripción
  en texto y las pinta en vivo.
- [MCP Apps](https://modelcontextprotocol.io/docs/extensions/apps) — una conexión MCP que,
  además de responder, devuelve una interfaz que se usa dentro del chat del agente. Hay
  plantillas en Vue. Por ejemplo, preguntarle a tu agente qué entregas tienes y ver el
  panel del Aula Virtual.

## Ejemplos

Proyectos que ya existen, para ver qué se está haciendo, no para copiarlos.

- [SkillNet](https://skillnet.es/) — una plataforma de cursos que se generan según el perfil
  de cada alumno.
