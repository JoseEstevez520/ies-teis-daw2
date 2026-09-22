<script setup>
import { ref, computed } from 'vue'
import TarjetaRecurso from './TarjetaRecurso.vue'
import FiltroDesplegable from './FiltroDesplegable.vue'

const props = defineProps({
  items: { type: Array, required: true }, // { tipoTarjeta: 'campo' | 'ejemplo' | 'tecnologia', ... }
})

const OPCIONES = [
  { id: 'campo', label: 'Campos' },
  { id: 'ejemplo', label: 'Ejemplos' },
  { id: 'tecnologia', label: 'Tecnología' },
]

// Empiezan todas activas: sin filtrar, se ve todo.
const activos = ref(new Set(OPCIONES.map((o) => o.id)))

const visibles = computed(() => props.items.filter((it) => activos.value.has(it.tipoTarjeta)))
const camposVisibles = computed(() => visibles.value.filter((it) => it.tipoTarjeta === 'campo'))
const otrosVisibles = computed(() => visibles.value.filter((it) => it.tipoTarjeta !== 'campo'))
</script>

<template>
  <div class="flex flex-col gap-4">
    <FiltroDesplegable v-model="activos" :opciones="OPCIONES" />

    <div class="grid sm:grid-cols-2 gap-4">
      <div
        v-for="(item, idx) in camposVisibles"
        :key="'campo-' + idx"
        class="flex flex-col gap-1 rounded-2xl border border-neutral-200 bg-white p-4"
      >
        <span class="text-sm font-semibold text-neutral-900" v-html="item.terminoHtml" />
        <p v-if="item.descripcionHtml" class="text-sm text-neutral-700 leading-relaxed" v-html="item.descripcionHtml" />
      </div>

      <TarjetaRecurso
        v-for="(item, idx) in otrosVisibles"
        :key="'otro-' + idx"
        :href="item.href"
        :termino-html="item.terminoHtml"
        :descripcion-html="item.descripcionHtml"
        :favicon="item.favicon"
        :gradiente-inicial="item.gradiente"
      />
    </div>
  </div>
</template>
