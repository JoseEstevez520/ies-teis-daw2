<script setup>
import { AgentReplay } from 'elastic-ui'
import { Brain, Wrench } from '@lucide/vue'
import { BUSCAR, EDITAR, LEER, METODO_NUEVO, PETICION, TESTS } from './sesionTienda.js'

// La misma petición a un modelo solo y al modelo con harness, una al lado de
// la otra: uno te contesta con código para pegar, el otro hace el trabajo en
// tu proyecto. Colores: modelo violeta, harness cian, en todas las páginas de
// agentes. El ejemplo (sesionTienda.js) es inventado.

const MODELO = '#7c3aed'
const HARNESS = '#0891b2'

const SOLO_MODELO = [
  {
    kind: 'prompt',
    text: PETICION,
    note: 'La petición, a un modelo solo: el chat de ChatGPT o de Claude en la web.',
  },
  {
    kind: 'answer',
    text: 'Puedes comprobar el nombre antes de guardar. Cambia el método crear de tu controlador por este:',
    code: { file: 'ProductoController.java', code: METODO_NUEVO },
    note: 'Te contesta con texto. No ha visto tu proyecto: se imagina cómo es, y copiar, pegar y probarlo lo haces tú.',
  },
]

const CON_HARNESS = [
  {
    kind: 'prompt',
    text: PETICION,
    note: 'La misma petición, al mismo modelo con un harness: herramientas, instrucciones y permisos para trabajar en tu proyecto.',
  },
  { ...BUSCAR, note: 'Primero busca dónde se crean los productos. La búsqueda la hace el harness; el modelo solo la pide.' },
  { ...LEER, note: 'Lee el archivo entero antes de tocar nada.' },
  { ...EDITAR, note: 'El cambio: si no hay nombre, contesta 400; si lo hay, guarda y contesta 201. Nada más del archivo se mueve.' },
  { ...TESTS, note: 'Luego comprueba su propio trabajo: pasa los tests y lee lo que dicen.' },
  {
    kind: 'answer',
    text: 'Hecho. POST /productos contesta 400 si falta el nombre o está vacío, y 201 al crearlo. Los tests pasan.',
    note: 'El modelo es el mismo; el harness es lo que le deja buscar, leer, editar y probar en tu proyecto. Eso es un agente.',
  },
]
</script>

<template>
  <div class="grid gap-10 md:grid-cols-2 md:gap-8">
    <section class="flex min-w-0 flex-col gap-4">
      <h3 class="flex items-center gap-2 text-sm font-semibold text-fg">
        <Brain class="size-4 shrink-0" :style="{ color: MODELO }" />
        Solo el modelo
      </h3>
      <AgentReplay :events="SOLO_MODELO" layout="stacked" intro="Le pides un cambio a un modelo solo." />
    </section>
    <section class="flex min-w-0 flex-col gap-4">
      <h3 class="flex items-center gap-2 text-sm font-semibold text-fg">
        <Wrench class="size-4 shrink-0" :style="{ color: HARNESS }" />
        Modelo + harness
      </h3>
      <AgentReplay :events="CON_HARNESS" layout="stacked" intro="Le pides lo mismo al modelo con un harness." />
    </section>
  </div>
</template>
