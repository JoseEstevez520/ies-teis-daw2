<script setup>
import { computed, ref, watch } from 'vue'
import { AnimatedList, Button, Card, CodeBlock, Tabs, TabsList, TabsTrigger, TextMorph } from 'elastic-ui'
import { ArrowRight, Check, ChevronLeft, ChevronRight, CircleHelp, X } from '@lucide/vue'

// Los agentes de OpenCode de menos a más: cada paso añade algo a lo que ya
// estaba. 1) Build y Plan, 2) uno tuyo, 3) subagentes. Permisos según la
// documentación oficial de OpenCode.

const AGENTES = [
  { nombre: 'Build', que: 'Hace los cambios que le pides. Viene activado.', editar: 'si', comandos: 'si' },
  { nombre: 'Plan', que: 'Te dice qué cambiaría. Úsalo antes de un cambio grande.', editar: 'pregunta', comandos: 'pregunta' },
  { nombre: 'tutor', tuyo: true, que: 'Te explica las prácticas, pero no puede resolverlas por ti.', editar: 'no', comandos: 'no' },
]

const PASOS = [
  { titulo: 'Build y Plan', texto: 'OpenCode trae dos agentes. Cambias de uno a otro con la tecla Tab.', agentes: 2 },
  {
    titulo: 'Tu propio agente',
    texto: 'Puedes crear otro con tus instrucciones y tus permisos. Este tutor no puede editar aunque se lo pidas.',
    agentes: 3,
  },
  {
    titulo: 'Subagentes',
    texto: 'Un agente puede encargarle una parte a otro. El otro trabaja aparte y le devuelve solo la respuesta.',
    agentes: 3,
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

// Tabs trabaja con cadenas.
const pestana = ref('0')
const paso = computed(() => Number(pestana.value))
const actual = computed(() => PASOS[paso.value])
const siguiente = computed(() => PASOS[paso.value + 1])
const visibles = computed(() => AGENTES.slice(0, actual.value.agentes))

const cambiado = ref(false)
watch(pestana, () => (cambiado.value = true))
const entra = computed(() => cambiado.value && 'animate-[blur-in_0.45s_var(--ease-soft)] motion-reduce:animate-none')
</script>

<template>
  <div class="flex flex-col gap-5">
    <Tabs v-model="pestana" variant="pill">
      <TabsList aria-label="Pasos">
        <TabsTrigger v-for="(p, i) in PASOS" :key="p.titulo" :value="String(i)">
          <span class="mr-1.5 text-fg-faint tabular-nums">{{ i + 1 }}</span>{{ p.titulo }}
        </TabsTrigger>
      </TabsList>
    </Tabs>

    <p :key="paso" class="text-sm leading-relaxed text-fg-secondary" :class="entra">
      <strong class="font-semibold text-fg">{{ actual.titulo }}.</strong> {{ actual.texto }}
    </p>

    <!-- El tutor llega a su sitio en el paso 2; las que ya estaban no se mueven. -->
    <AnimatedList :items="visibles" :item-key="(a) => a.nombre" as="div" class="grid gap-3 sm:grid-cols-3">
      <template #default="{ item: a }">
        <Card size="sm" class="h-full gap-3 px-4">
          <div class="flex items-baseline justify-between gap-2">
            <span class="text-base font-semibold text-fg" :class="a.tuyo && 'font-mono'">{{ a.nombre }}</span>
            <span v-if="a.tuyo" class="text-xs text-fg-muted">hecho por ti</span>
          </div>
          <p class="text-sm leading-snug text-fg-secondary">{{ a.que }}</p>
          <dl class="mt-auto flex flex-col gap-1 text-[13px] whitespace-nowrap">
            <div v-for="p in PERMISOS" :key="p.clave" class="flex items-center gap-1.5">
              <component :is="ESTADO[a[p.clave]].icono" class="size-3.5 shrink-0" :style="{ color: ESTADO[a[p.clave]].color }" />
              <dt class="text-fg-secondary">{{ p.etiqueta }}:</dt>
              <dd :style="{ color: ESTADO[a[p.clave]].color }">{{ ESTADO[a[p.clave]].texto }}</dd>
            </div>
          </dl>
        </Card>
      </template>
    </AnimatedList>

    <div v-if="paso === 1" class="flex flex-col gap-2" :class="cambiado && 'stagger-children'">
      <p class="text-sm text-fg-secondary">Así se crea: guarda esto en tu proyecto.</p>
      <CodeBlock :code="TUTOR_MD" title=".opencode/agents/tutor.md" />
    </div>

    <ol
      v-if="paso === 2"
      class="grid items-center gap-3 text-sm sm:grid-cols-[1fr_auto_1fr_auto_1fr]"
      :class="cambiado && 'stagger-items'"
    >
      <template v-for="(e, i) in ENCARGO" :key="e.quien">
        <li class="flex flex-col gap-0.5">
          <span class="font-semibold text-fg">{{ e.quien }}</span>
          <span :class="e.codigo ? 'font-mono text-xs text-fg' : 'text-fg-secondary'">{{ e.que }}</span>
        </li>
        <li v-if="i < ENCARGO.length - 1" aria-hidden="true" class="justify-self-start sm:justify-self-center">
          <ArrowRight class="size-4 text-fg-faint max-sm:rotate-90" />
        </li>
      </template>
    </ol>

    <div class="flex items-center justify-between">
      <Button
        variant="ghost"
        size="sm"
        :icon="ChevronLeft"
        :class="paso === 0 && 'invisible'"
        @click="pestana = String(paso - 1)"
      >
        Anterior
      </Button>
      <!-- El botón no desaparece al cambiar de paso: su texto pasa al del siguiente. -->
      <Button v-if="siguiente" size="sm" @click="pestana = String(paso + 1)">
        <TextMorph :text="siguiente.titulo" />
        <ChevronRight class="size-4" aria-hidden="true" />
      </Button>
    </div>
  </div>
</template>
