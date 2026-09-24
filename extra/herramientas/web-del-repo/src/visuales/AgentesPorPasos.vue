<script setup>
import { Button, Card, CodeBlock, Collapsible, CollapsibleContent, CollapsibleTrigger } from 'elastic-ui'
import { ArrowRight, Check, ChevronRight, CircleHelp, X } from '@lucide/vue'
import { ref } from 'vue'

// Los agentes de OpenCode de menos a más, como pasos numerados unidos por una
// línea que se va rellenando: 1) Build y Plan, 2) uno tuyo, 3) subagentes. El
// paso abierto se despliega en su sitio; los demás quedan como título.
// Permisos según la documentación oficial de OpenCode.

const BUILD = { nombre: 'Build', que: 'Hace los cambios que le pides. Viene activado.', editar: 'si', comandos: 'si' }
const PLAN = { nombre: 'Plan', que: 'Te dice qué cambiaría. Úsalo antes de un cambio grande.', editar: 'pregunta', comandos: 'pregunta' }
const TUTOR = {
  nombre: 'tutor',
  tuyo: true,
  que: 'Te explica las prácticas, pero no puede resolverlas por ti.',
  editar: 'no',
  comandos: 'no',
}

const PASOS = [
  { titulo: 'Build y Plan', texto: 'OpenCode trae dos agentes. Cambias de uno a otro con la tecla Tab.' },
  {
    titulo: 'Tu propio agente',
    texto: 'Puedes crear otro con tus instrucciones y tus permisos. Este tutor no puede editar aunque se lo pidas.',
  },
  {
    titulo: 'Subagentes',
    texto: 'Un agente puede encargarle una parte a otro. El otro trabaja aparte y le devuelve solo la respuesta.',
  },
]

// Verde / ámbar / rojo para sí / con condiciones / no (skill apuntes-web), con
// los tokens de la librería para que se lean en los dos temas.
const ESTADO = {
  si: { icono: Check, texto: 'sí', color: 'var(--color-success)' },
  pregunta: { icono: CircleHelp, texto: 'te pregunta', color: 'var(--color-warning)' },
  no: { icono: X, texto: 'no', color: 'var(--color-danger)' },
}

const PERMISOS = [
  { clave: 'editar', etiqueta: 'Edita' },
  { clave: 'comandos', etiqueta: 'Comandos' },
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

// Un encargo de ida y vuelta a un subagente.
const ENCARGO = [
  { quien: 'Build', que: '"¿Dónde se configura la base de datos?"' },
  { quien: 'Explore', que: 'busca por el proyecto, solo leyendo' },
  { quien: 'Build recibe', que: 'application.properties', codigo: true },
]

// Un paso abierto cada vez. Cerrar el abierto no deja ninguno: se queda.
const paso = ref(0)
const abrir = (i, abierto) => abierto && (paso.value = i)
</script>

<template>
  <ol class="flex flex-col">
    <li v-for="(p, i) in PASOS" :key="p.titulo" class="grid grid-cols-[1.75rem_1fr] gap-x-4">
      <!-- El número y, debajo, el tramo de línea hasta el siguiente paso, que se
           rellena al pasar de él. -->
      <div class="flex flex-col items-center">
        <span
          class="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums transition-colors duration-300"
          :class="i <= paso ? 'bg-fg text-bg' : 'bg-bg-muted text-fg-muted'"
        >
          {{ i + 1 }}
        </span>
        <span v-if="i < PASOS.length - 1" class="relative my-1.5 w-px flex-1 bg-border">
          <span
            class="absolute inset-0 origin-top bg-fg transition-transform duration-[450ms] ease-emphasized motion-reduce:transition-none"
            :class="i < paso ? 'scale-y-100' : 'scale-y-0'"
          />
        </span>
      </div>

      <Collapsible :open="paso === i" class="min-w-0 pb-6" @update:open="abrir(i, $event)">
        <CollapsibleTrigger
          :chevron="false"
          class="min-h-7 py-0.5 text-sm transition-colors duration-150"
          :class="paso === i ? 'text-fg' : 'text-fg-muted hover:text-fg'"
        >
          {{ p.titulo }}
        </CollapsibleTrigger>

        <CollapsibleContent class="flex flex-col gap-4 pt-2 pb-0">
          <p class="text-sm leading-relaxed">{{ p.texto }}</p>

          <!-- Paso 1: los dos que trae; paso 2: el tuyo, y cómo se crea. -->
          <div v-if="i < 2" class="grid gap-3 sm:grid-cols-2">
            <Card v-for="a in i === 0 ? [BUILD, PLAN] : [TUTOR]" :key="a.nombre" size="sm" class="gap-3 px-4">
              <div class="flex items-baseline justify-between gap-2">
                <span class="text-base font-semibold text-fg" :class="a.tuyo && 'font-mono'">{{ a.nombre }}</span>
                <span v-if="a.tuyo" class="text-xs text-fg-muted">hecho por ti</span>
              </div>
              <p class="text-sm leading-snug text-fg-secondary">{{ a.que }}</p>
              <dl class="mt-auto flex flex-col gap-1 text-[13px] whitespace-nowrap">
                <div v-for="perm in PERMISOS" :key="perm.clave" class="flex items-center gap-1.5">
                  <component :is="ESTADO[a[perm.clave]].icono" class="size-3.5 shrink-0" :style="{ color: ESTADO[a[perm.clave]].color }" />
                  <dt class="text-fg-secondary">{{ perm.etiqueta }}:</dt>
                  <dd :style="{ color: ESTADO[a[perm.clave]].color }">{{ ESTADO[a[perm.clave]].texto }}</dd>
                </div>
              </dl>
            </Card>
          </div>

          <template v-if="i === 1">
            <p class="text-sm">Así se crea: guarda esto en tu proyecto.</p>
            <CodeBlock :code="TUTOR_MD" title=".opencode/agents/tutor.md" />
          </template>

          <!-- Paso 3: un encargo de ida y vuelta. -->
          <div v-if="i === 2" class="grid items-center gap-3 text-sm sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <template v-for="(e, n) in ENCARGO" :key="e.quien">
              <div class="flex flex-col gap-0.5">
                <span class="font-semibold text-fg">{{ e.quien }}</span>
                <span :class="e.codigo ? 'font-mono text-xs text-fg' : 'text-fg-secondary'">{{ e.que }}</span>
              </div>
              <ArrowRight v-if="n < ENCARGO.length - 1" aria-hidden="true" class="size-4 text-fg-faint max-sm:rotate-90" />
            </template>
          </div>

          <Button v-if="i < PASOS.length - 1" variant="ghost" size="sm" class="-ml-3 self-start" @click="paso = i + 1">
            Siguiente
            <ChevronRight class="size-4" aria-hidden="true" />
          </Button>
        </CollapsibleContent>
      </Collapsible>
    </li>
  </ol>
</template>
