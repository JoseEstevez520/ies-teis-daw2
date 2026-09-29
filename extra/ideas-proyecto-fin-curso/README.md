# Ideas para el proyecto de fin de curso

Sitio para dejar ideas de proyectos de fin de ciclo, aunque no los vayas a hacer tú. Puede
inspirar a otro, o alguien puede sumarse.

Van de lo más concreto a lo más abierto. Antes de elegir, mira qué hay hecho:
[busca antes de construir](../open-source/#busca-antes-de-construir).

Para añadir una, ponla en su lista con el mismo formato: qué es, cómo sería a escala de PFC
y, si la sacaste de una serie o un libro, de dónde.

## Ideas

Proyectos pensados para empezarlos ya. Cada uno tiene su página, con la idea entera.

- [Panel del Aula Virtual](panel-del-aula-virtual.md) — tus entregas, notas y avisos en un
  sitio. Ya está en marcha como herramienta de la clase.
- [Oportunidades y trayectoria, con agentes](oportunidades-y-trayectoria.md) — un sistema
  personal que investiga prácticas, becas y ofertas, guarda cada cosa con su fuente y ayuda a
  decidir, sobre un vault de Markdown.
- [Wiki de un canal de YouTube](wiki-de-un-canal-de-youtube.md) — un canal o pódcast
  convertido en datos, con un chat que cita el minuto exacto y un análisis del canal.
- [Experiencias cercanas a la muerte](experiencias-cercanas-a-la-muerte.md) — 16.000 relatos
  de casi morir, analizados para detectar patrones y hacerse preguntas científicas.
- [Personalidades que viven una vida entera](personalidades-que-viven-una-vida-entera.md) —
  un personaje simulado con una vida completa y memoria.
- [Entorno interactivo que explica el código](entorno-interactivo-que-explica-el-codigo.md) —
  un notebook con IA, para cualquier lenguaje.

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
