<script setup>
import { computed, ref } from 'vue'
import { AnimatedList, Card, CardDescription, CardTitle, Tabs, TabsList, TabsTrigger } from 'elastic-ui'
import TarjetaRecurso from './TarjetaRecurso.vue'

const props = defineProps({
  items: { type: Array, required: true }, // { tipoTarjeta: 'campo' | 'ejemplo' | 'tecnologia', ... }
})

const TIPOS = [
  { id: 'todo', label: 'Todo' },
  { id: 'campo', label: 'Campos' },
  { id: 'ejemplo', label: 'Ejemplos' },
  { id: 'tecnologia', label: 'Tecnología' },
]

// Solo las pestañas que tienen algo; "Todo" siempre.
const opciones = computed(() =>
  TIPOS.map((t) => ({
    ...t,
    total: t.id === 'todo' ? props.items.length : props.items.filter((it) => it.tipoTarjeta === t.id).length,
  })).filter((t) => t.total > 0),
)

const filtro = ref('todo')
// Campos primero, como en el .md; al filtrar, las tarjetas que quedan se
// deslizan a su sitio (AnimatedList) en vez de saltar.
const visibles = computed(() =>
  props.items
    .filter((it) => filtro.value === 'todo' || it.tipoTarjeta === filtro.value)
    .sort((a, b) => (a.tipoTarjeta === 'campo' ? 0 : 1) - (b.tipoTarjeta === 'campo' ? 0 : 1)),
)
const clave = (it) => it.href || it.terminoHtml
</script>

<template>
  <div class="flex flex-col gap-4">
    <Tabs v-model="filtro">
      <TabsList aria-label="Filtrar tarjetas">
        <TabsTrigger v-for="o in opciones" :key="o.id" :value="o.id">
          {{ o.label }}<span class="ml-1.5 text-fg-faint tabular-nums">{{ o.total }}</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>

    <AnimatedList :items="visibles" :item-key="clave" as="div" class="grid gap-4 sm:grid-cols-2">
      <template #default="{ item }">
        <Card v-if="item.tipoTarjeta === 'campo'" size="sm" class="h-full gap-1 px-4">
          <CardTitle as="h4" size="sm" class="text-sm" v-html="item.terminoHtml" />
          <CardDescription v-if="item.descripcionHtml" class="leading-relaxed" v-html="item.descripcionHtml" />
        </Card>
        <TarjetaRecurso
          v-else
          :href="item.href"
          :termino-html="item.terminoHtml"
          :descripcion-html="item.descripcionHtml"
          :favicon="item.favicon"
          :gradiente-inicial="item.gradiente"
          class="block h-full"
        />
      </template>
    </AnimatedList>
  </div>
</template>
