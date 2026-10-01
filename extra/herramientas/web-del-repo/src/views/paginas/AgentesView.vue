<script setup>
import { CodeBlock } from 'elastic-ui'
import { siOpencode } from 'simple-icons'
import DiagramaAgentes from '../../visuales/DiagramaAgentes.vue'
import SesionAgente from '../../visuales/SesionAgente.vue'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import Tecnologias from '../../components/Tecnologias.vue'

const APP = [{ icon: siOpencode, nombre: 'OpenCode' }]

// extra/ia/agentes/README.md. El concepto (un agente es el modelo con un papel)
// vale para cualquier aplicación; Build, Plan y el formato del archivo son los
// de OpenCode, que es el que usamos. Las sesiones (visuales/sesiones.js) son
// inventadas. Datos de https://opencode.ai/docs/agents/.
const TUTOR_MD = `---
description: Explica y guía sin escribir la solución
mode: primary
permission:
  edit: deny
  bash: deny
---

Explícame el concepto y hazme preguntas.
No me des el código de la práctica.`
</script>

<template>
  <PlantillaPagina titulo="Agentes y subagentes">
    <p>
      Un agente es el modelo con un papel: unas instrucciones que dicen qué hace y unos permisos
      que dicen qué puede tocar. Con papeles distintos tienes agentes distintos, como en un equipo:
      uno construye, otro planifica, otro explica.
    </p>
    <DiagramaAgentes />
    <p><strong>Lo que cambia de un agente a otro no es el modelo, son sus instrucciones y sus permisos.</strong></p>
    <p>
      Las aplicaciones traen algunos hechos (OpenCode trae Build y Plan, y cambias de uno a otro con
      la tecla Tab) y puedes crear los tuyos. Abajo, la misma petición a cada uno, para verlos
      trabajar. Las sesiones son un ejemplo inventado.
    </p>
    <Tecnologias :items="APP" />

    <h2 id="constructor">El constructor</h2>
    <p>El que hace el trabajo; en OpenCode, Build, con el que arranca. Fíjate en que edita sin preguntarte.</p>
    <SesionAgente nombre="build" />
    <p><strong>El constructor hace el cambio directamente.</strong></p>

    <h2 id="planificador">El planificador</h2>
    <p>Para pensar antes de un cambio grande; en OpenCode, Plan. Fíjate en que se para y te pide permiso antes de editar.</p>
    <SesionAgente nombre="plan" />
    <p><strong>El planificador te deja un plan y no cambia nada sin tu permiso.</strong></p>

    <h2 id="uno-tuyo">Uno tuyo: el tutor</h2>
    <p>
      Un agente creado por ti, con tus instrucciones y tus permisos. Este tutor tiene la edición
      denegada, así que no puede resolverte la práctica aunque se lo pidas.
    </p>
    <SesionAgente nombre="tutor" />
    <p><strong>Sus permisos mandan: aunque el modelo quiera editar, el harness no le deja.</strong></p>
    <p>En OpenCode se crea con un archivo como este en tu proyecto:</p>
    <CodeBlock :code="TUTOR_MD" title=".opencode/agents/tutor.md" />

    <h2 id="subagentes">Subagentes: el explorador</h2>
    <p>
      Un agente puede encargarle una parte del trabajo a otro, que trabaja aparte, en su propia
      sesión. Fíjate en lo que vuelve.
    </p>
    <SesionAgente nombre="subagente" />
    <p><strong>Del subagente solo vuelve la respuesta, no todo lo que leyó</strong>, así que el agente principal no se llena de contexto.</p>

    <h2 id="para-explorar">Para explorar</h2>
    <p>
      Crear agentes y subagentes, con todas sus opciones, en la
      <a href="https://opencode.ai/docs/agents/" target="_blank" rel="noopener noreferrer">documentación de OpenCode</a>.
    </p>
  </PlantillaPagina>
</template>
