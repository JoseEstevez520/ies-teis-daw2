<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'

// extra/ideas-proyecto-fin-curso/README.md
</script>

<template>
  <PlantillaPagina
    titulo="Ideas para el proyecto de fin de curso"
    entradilla="Ideas de proyectos de fin de ciclo, aunque no los vayas a hacer tú: pueden inspirar a otro, o alguien puede sumarse."
  >
    <h2 id="panel-del-aula-virtual">Panel del Aula Virtual</h2>
    <p>
      Ya está en marcha como
      <RouterLink to="/extra/herramientas/panel-aula-virtual">herramienta real para la clase</RouterLink>,
      no solo como idea. También encaja bien como PFC: frontend y backend, consumo de una API REST
      real y decisiones de arquitectura defendibles, no solo un CRUD de ejemplo.
    </p>

    <h2 id="buscador-de-empresas-de-fct">Buscador de empresas de FCT</h2>
    <p>
      Un directorio de empresas donde hacer la FCT, con lo que aporta cada alumno que ya estuvo:
      qué tecnologías usaron, qué hizo allí y si la recomienda. Encaja como PFC porque el alcance
      es pequeño, tiene una fecha real encima (la FCT) y le sirve a toda la clase. También vale como
      herramienta de la clase: está en los
      <RouterLink to="/extra/herramientas#pendientes">pendientes de Herramientas</RouterLink>.
    </p>

    <h2 id="wiki-de-un-canal-de-youtube">Wiki de un canal de YouTube</h2>
    <p>
      Convertir un canal de YouTube o un pódcast en una wiki interactiva: la transcripción
      completa y un chat que responde citando el vídeo y el minuto exacto. A escala de PFC:
      transcripción, backend, RAG y frontend, contra un canal real.
    </p>

    <h2 id="campos-ejemplos-y-tecnologia">Campos, ejemplos y tecnología</h2>
    <p>
      Si no tienes una idea concreta: un área por la que tirar, un proyecto que ya existe para ver
      qué se está haciendo (no para copiarlo), o una tecnología que podrías usar como motor de tu
      propio proyecto. Antes de elegir, mira qué hay hecho: <RouterLink to="/extra/open-source#busca-antes">busca antes de construir</RouterLink>.
    </p>

    <h3 id="campos">Campos</h3>
    <dl>
      <dt><strong>Generative UI</strong></dt>
      <dd>
        Interfaces que se generan a partir de datos en vez de pantallas fijas. A escala de PFC: un
        generador de formularios o paneles a partir de un JSON de configuración, con lo que ya dais
        en DIW.
      </dd>
      <dt><strong>Agentes e IA aplicada</strong></dt>
      <dd>
        Meter un asistente o una automatización real en una app, no solo un chat pegado encima. A
        escala de PFC: un bot que resuelve una tarea concreta contra una API real. Para empezar,
        <RouterLink to="/extra/ia">IA aplicada</RouterLink>.
      </dd>
    </dl>

    <h3 id="ejemplos-y-tecnologia">Ejemplos y tecnología</h3>
    <RejillaTarjetas>
      <TarjetaPagina href="https://skillnet.es/" titulo="SkillNet" descripcion="Ejemplo: una plataforma de cursos que se generan según el perfil de cada alumno." />
      <TarjetaPagina
        href="https://typesafe.ai/blog/introducing-system-one-models-and-jev"
        titulo="Jev"
        descripcion="Tecnología: un modelo de IA que no genera texto, sino un valor con tipo (elección, puntuación o sí/no) y su confianza. Mucho más rápido que un LLM para clasificar."
      />
      <TarjetaPagina href="https://github.com/wandb/openui" titulo="OpenUI" descripcion="Tecnología: genera interfaces a partir de una descripción en texto y las pinta en vivo." />
      <TarjetaPagina
        href="https://modelcontextprotocol.io/docs/extensions/apps"
        titulo="MCP Apps"
        descripcion="Tecnología: una conexión MCP que, además de responder, devuelve una interfaz que se usa dentro del chat del agente. Por ejemplo, preguntar qué entregas tienes y ver el panel del Aula Virtual."
      />
    </RejillaTarjetas>
  </PlantillaPagina>
</template>
