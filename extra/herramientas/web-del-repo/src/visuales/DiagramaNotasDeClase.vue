<script setup>
import { Diagram } from 'elastic-ui'
import { ArrowDown, Bot, GitPullRequest, Globe, Lock, MessageSquarePlus } from '@lucide/vue'

// Cómo funcionaría Notas de clase: la nota entra, se guarda en privado, un
// agente la convierte en contenido y se revisa antes de publicar. El violeta
// del agente es el mismo de las páginas de IA. Ámbar para lo privado, verde
// para lo que ya es público.
const VIOLETA = '#7c3aed'
const GRIS = '#64748b'

const PASOS = [
  {
    icono: MessageSquarePlus,
    titulo: 'La nota',
    texto: 'Se escribe en un chat o en la web. Texto libre, sin formato ni campos.',
    color: GRIS,
  },
  {
    icono: Lock,
    titulo: 'Guardada en privado',
    texto: 'Se queda en crudo, fuera del repo. Nunca toca lo público.',
    color: 'var(--color-warning)',
    etiqueta: 'privado',
  },
  {
    icono: Bot,
    titulo: 'El agente',
    texto: 'Una vez al día lee las notas nuevas, las agrupa por tema y las redacta.',
    color: VIOLETA,
  },
  {
    icono: GitPullRequest,
    titulo: 'Un PR para revisar',
    texto: 'Propone los cambios en una rama. Nada se publica sin que alguien lo mire.',
    color: GRIS,
  },
  {
    icono: Globe,
    titulo: 'Publicado',
    texto: 'Al mergear, la web se reconstruye sola.',
    color: 'var(--color-success)',
    etiqueta: 'público',
  },
]
</script>

<template>
  <Diagram
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    label="El recorrido de una nota: se escribe, se guarda en privado, un agente la redacta y abre un PR, alguien lo revisa y al mergear se publica en la web. Lo privado nunca llega a lo público sin pasar por el agente y por una persona."
  >
    <ol class="mx-auto flex max-w-md flex-col items-stretch">
      <li v-for="(paso, i) in PASOS" :key="paso.titulo">
        <div class="diagram-area diagram-in gap-1.5" :style="{ '--diagram-color': paso.color }">
          <span class="flex flex-wrap items-center gap-2 text-sm font-semibold">
            <component :is="paso.icono" class="size-4 shrink-0" :stroke-width="1.5" aria-hidden="true" />
            {{ paso.titulo }}
            <span v-if="paso.etiqueta" class="text-xs font-normal" :style="{ color: paso.color }">
              {{ paso.etiqueta }}
            </span>
          </span>
          <span class="text-sm text-fg-secondary">{{ paso.texto }}</span>
        </div>
        <div v-if="i < PASOS.length - 1" class="flex justify-center py-1.5 text-fg-faint">
          <ArrowDown class="size-4" :stroke-width="1.5" aria-hidden="true" />
        </div>
      </li>
    </ol>
  </Diagram>
</template>
