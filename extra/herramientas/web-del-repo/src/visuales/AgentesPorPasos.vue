<script setup>
import { AgentReplay, CodeBlock } from 'elastic-ui'
import { Bot, FileText, Search } from '@lucide/vue'
import { EDITAR, LEER, PETICION } from './sesionTienda.js'

// Los agentes de OpenCode de menos a más, como sesiones una detrás de otra:
// Build, Plan, uno tuyo (tutor) y un subagente. La misma petición a cada uno,
// para que se vea en qué cambian. Permisos según la documentación oficial de
// OpenCode; el ejemplo (sesionTienda.js) es inventado.

const pide = (note) => ({ kind: 'prompt', text: PETICION, note })

const SESIONES = [
  {
    titulo: 'Build',
    intro: 'La misma petición a Build, el agente con el que arranca OpenCode.',
    eventos: [
      pide('Build es el agente con el que arranca OpenCode. Hace lo que le pides.'),
      LEER,
      { ...EDITAR, note: 'Build puede editar y ejecutar comandos sin preguntar.' },
      {
        kind: 'answer',
        text: 'Hecho: POST /productos contesta 400 si falta el nombre.',
        note: 'En OpenCode cambias de agente con la tecla Tab.',
      },
    ],
  },
  {
    titulo: 'Plan',
    intro: 'La misma petición a Plan, el agente para pensar antes de cambiar.',
    eventos: [
      pide('Plan es para pensar antes de un cambio grande. Te dice qué haría.'),
      LEER,
      {
        ...EDITAR,
        asking: 'Quiere editar ProductoController.java',
        done: 'Sin editar: le dijiste que no',
        permission: 'ask-deny',
        note: 'Antes de editar o ejecutar nada, Plan te pregunta. Aquí le dices que no: solo querías el plan.',
      },
      {
        kind: 'answer',
        text: 'Plan: en crear, comprobar que el nombre no esté vacío, contestar 400 si lo está y 201 al guardar. Cambia a Build para hacerlo.',
        note: 'Te deja un plan para revisar y no cambia nada.',
      },
    ],
  },
  {
    titulo: 'Tu propio agente: tutor',
    intro: 'La misma petición a tutor, un agente hecho por ti que no puede editar.',
    eventos: [
      pide('tutor es un agente tuyo: tus instrucciones y tus permisos. Este no puede editar.'),
      LEER,
      {
        ...EDITAR,
        done: 'Denegado: tutor no puede editar',
        permission: 'deny',
        note: 'Sus permisos dicen edit: deny, así que el harness le niega la edición aunque el modelo lo intente.',
      },
      {
        kind: 'answer',
        text: 'No puedo cambiar el archivo, pero tú sí. ¿En qué método comprobarías que el producto tiene nombre? ¿Qué debería contestar la API si no lo tiene?',
        note: 'Sus instrucciones dicen guiar, no resolver: te hace preguntas en vez de escribir el código.',
      },
    ],
    archivo: true,
  },
  {
    titulo: 'Subagentes',
    intro: 'Un agente que le encarga una parte del trabajo a otro.',
    eventos: [
      {
        kind: 'prompt',
        text: '¿Dónde se configura la base de datos?',
        note: 'Una pregunta que obliga a mirar por todo el proyecto.',
      },
      {
        kind: 'step',
        running: 'Preguntando a Explore',
        done: 'Explore ha contestado',
        icon: Bot,
        session: [
          { kind: 'step', running: 'Buscando "datasource"', done: 'Encontrados 2 archivos', icon: Search },
          { kind: 'step', running: 'Leyendo application.properties', done: 'Leído application.properties', icon: FileText },
          { kind: 'answer', text: 'En src/main/resources/application.properties, en spring.datasource.' },
        ],
        note: 'Build le encarga la búsqueda a Explore, un subagente que solo puede leer. Trabaja aparte, en su propia sesión.',
      },
      {
        kind: 'answer',
        text: 'En src/main/resources/application.properties: las claves spring.datasource.* ponen la URL, el usuario y la contraseña.',
        note: 'Solo vuelve la respuesta de Explore, no todo lo que leyó, así que Build no se llena de contexto.',
      },
    ],
  },
]

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
  <div class="flex flex-col gap-12">
    <section v-for="s in SESIONES" :key="s.titulo" class="flex flex-col gap-4">
      <h3 class="text-sm font-semibold text-fg">{{ s.titulo }}</h3>
      <AgentReplay :events="s.eventos" :intro="s.intro" />
      <div v-if="s.archivo" class="flex flex-col gap-2">
        <p class="text-sm text-fg-secondary">Así se crea: guarda esto en tu proyecto.</p>
        <CodeBlock :code="TUTOR_MD" title=".opencode/agents/tutor.md" />
      </div>
    </section>
  </div>
</template>
