<script setup>
import { Diagram } from 'elastic-ui'
import { ClipboardList, Hammer, Search, ShieldCheck, User } from '@lucide/vue'

// Un proyecto hecho por un equipo de agentes: tú decides al principio y
// revisas al final, y entre medias cada agente hace lo suyo, en orden, con su
// skill. Colores de concepto de las páginas de agentes: los agentes (el
// harness) cian, tú gris. Tintes sobre el fondo del dibujo, sin bordes.
const HARNESS = '#0891b2'
const TU = 'var(--color-fg-muted)'

const EQUIPO = [
  { icono: Search, papel: 'Explorador', hace: 'Busca si ya existe algo hecho.', skill: 'buscar antes de construir' },
  { icono: ClipboardList, papel: 'Especificador', hace: 'Escribe qué tiene que hacer, qué no y cómo se sabe que está bien.', skill: 'cómo escribimos una especificación' },
  { icono: Hammer, papel: 'Constructor', hace: 'Lo desarrolla siguiendo la especificación.', skill: 'las reglas del proyecto (AGENTS.md)' },
  { icono: ShieldCheck, papel: 'Revisor', hace: 'Pasa los tests y busca fallos en lo que hizo el constructor.', skill: 'qué revisar antes de dar algo por bueno' },
]
</script>

<template>
  <Diagram
    class="rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6"
    label="Un proyecto con un equipo de agentes: tú decides qué quieres; el explorador busca si ya existe, el especificador escribe qué tiene que hacer, el constructor lo desarrolla y el revisor lo comprueba, cada uno con su skill; y al final tú revisas y decides."
  >
    <div class="flex flex-col items-center gap-2">
      <span class="diagram-chip diagram-in px-4 py-2.5" :style="{ '--diagram-color': TU }">
        <User class="size-5" :stroke-width="1.5" aria-hidden="true" />
        Tú <span class="font-normal text-fg-secondary">· decides qué quieres y para quién</span>
      </span>
      <span class="diagram-in text-fg-faint" aria-hidden="true">↓</span>

      <ol class="grid w-full gap-3 sm:grid-cols-2">
        <li v-for="(a, i) in EQUIPO" :key="a.papel" class="diagram-area diagram-in gap-2" :style="{ '--diagram-color': HARNESS }">
          <span class="flex items-center gap-2 text-sm font-semibold">
            <span class="tabular-nums">{{ i + 1 }}.</span>
            <component :is="a.icono" class="size-4 shrink-0" :stroke-width="1.5" aria-hidden="true" />
            {{ a.papel }}
          </span>
          <span class="text-sm text-fg-secondary">{{ a.hace }}</span>
          <span class="text-sm text-fg-secondary"><span class="font-medium text-fg">Su skill:</span> {{ a.skill }}</span>
        </li>
      </ol>

      <span class="diagram-in text-fg-faint" aria-hidden="true">↓</span>
      <span class="diagram-chip diagram-in px-4 py-2.5" :style="{ '--diagram-color': TU }">
        <User class="size-5" :stroke-width="1.5" aria-hidden="true" />
        Tú <span class="font-normal text-fg-secondary">· revisas y decides si vale</span>
      </span>
    </div>
  </Diagram>
</template>
