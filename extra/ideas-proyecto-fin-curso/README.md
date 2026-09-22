# Ideas para el proyecto de fin de curso

Sitio para dejar ideas de proyectos de fin de ciclo interesantes, aunque no los vayas a
hacer tú. Puede inspirar a otro, o alguien puede sumarse.

## Panel del Aula Virtual

Ya está en marcha como herramienta real para la clase, no solo como idea. Diseño completo
en [`../herramientas/panel-aula-virtual/`](../herramientas/panel-aula-virtual/). También
encaja bien como PFC: frontend/backend + consumo de una API REST real + decisiones de
arquitectura defendibles, no solo un CRUD de ejemplo.

## Buscador de prácticas

Buscador de los ejercicios y prácticas que ya ha resuelto la clase, para no resolver
desde cero algo que ya hizo otro. Encaja como PFC: alcance pequeño, fecha real encima (la
FCT) y sirve a los 26. También vale como herramienta real de la clase, no solo como idea
— ver [`../herramientas/README.md`](../herramientas/README.md#pendientes).

## Wiki de un canal de YouTube

Convertir un canal de YouTube o podcast en una wiki interactiva: transcripción completa
más un chatbot que responde citando el vídeo y el minuto exacto. Alcance de PFC:
transcripción + backend + RAG + frontend, contra un canal real.

## Campos, ejemplos y tecnología

Si no tienes idea concreta: un área por la que tirar, un proyecto real que ya existe para
ver qué se está haciendo (no para copiarlo), o una pieza de tecnología que podrías usar
como motor de tu propio proyecto.

- **Generative UI**: interfaces que se generan a partir de datos en vez de pantallas fijas
  de siempre. A escala de PFC: un renderizador de formularios o dashboards a partir de un
  JSON de configuración, con lo que ya dais en DIW.
- **Agentes e IA aplicada**: integrar un asistente o automatización real en una app, no
  solo un chat pegado encima. A escala de PFC: un bot que resuelve una tarea concreta
  contra una API real (ver también [`../ia/`](../ia/)).
- [SkillNet](https://skillnet.es/) — LMS con cursos generados según el perfil de cada
  alumno.
- **Tecnología:** [Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) —
  modelo de IA que no genera texto: devuelve un valor tipado (elección, puntuación o
  sí/no) con nivel de confianza, mucho más rápido que un LLM normal para clasificar o
  rutear.
- **Tecnología:** [OpenUI](https://github.com/wandb/openui) — genera interfaces a partir
  de una descripción en texto y las renderiza en vivo.
