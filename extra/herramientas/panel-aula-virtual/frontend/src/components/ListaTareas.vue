<script setup>
import { computed, ref } from 'vue'
import { ExternalLink } from '@lucide/vue'
import { useTareas } from '../composables/usePanelApi.js'
import SelectorFecha from './SelectorFecha.vue'
import SelectorFiltro from './SelectorFiltro.vue'

const { datos: tareas, cargando, error } = useTareas()

const OPCIONES_ESTADO = [
  { id: 'pendientes', label: 'Pendientes' },
  { id: 'entregadas', label: 'Entregadas' },
  { id: 'todas', label: 'Todas' },
]
const estado = ref('pendientes')

const opcionesAsignatura = computed(() => {
  const nombres = [...new Set(tareas.value.map((t) => t.cursoNombre))].sort()
  return [{ id: 'todas', label: 'Todas las asignaturas' }, ...nombres.map((n) => ({ id: n, label: n }))]
})
const asignatura = ref('todas')

const fecha = ref('todas')
const DIA = 24 * 60 * 60

function dentroDeFecha(t) {
  const ahora = Date.now() / 1000
  if (typeof fecha.value === 'number') return t.fechaLimite <= fecha.value
  if (fecha.value === 'vencidas') return t.fechaLimite < ahora
  if (fecha.value === 'semana') return t.fechaLimite >= ahora && t.fechaLimite <= ahora + 7 * DIA
  if (fecha.value === 'mes') return t.fechaLimite >= ahora && t.fechaLimite <= ahora + 30 * DIA
  return true
}

const filtradas = computed(() => {
  return tareas.value
    .filter((t) => {
      if (estado.value === 'pendientes') return !t.entregada
      if (estado.value === 'entregadas') return t.entregada
      return true
    })
    .filter((t) => asignatura.value === 'todas' || t.cursoNombre === asignatura.value)
    .filter(dentroDeFecha)
})

function formatearFecha(epochSegundos) {
  return new Date(epochSegundos * 1000).toLocaleDateString('gl-ES', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-2">
      <SelectorFiltro v-model="estado" :opciones="OPCIONES_ESTADO" />
      <SelectorFiltro v-model="asignatura" :opciones="opcionesAsignatura" />
      <SelectorFecha v-model="fecha" />
    </div>

    <p v-if="cargando" class="text-sm text-neutral-400">Cargando…</p>
    <p v-else-if="error" class="text-sm text-red-600">{{ error }}</p>
    <p v-else-if="filtradas.length === 0" class="text-sm text-neutral-400">Nada que mostrar.</p>

    <TransitionGroup v-else tag="ul" name="item" class="flex flex-col gap-2.5">
      <li
        v-for="t in filtradas"
        :key="t.id"
        class="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3"
      >
        <span class="flex flex-col gap-0.5 min-w-0 flex-grow">
          <span
            class="text-sm truncate"
            :class="t.entregada ? 'text-neutral-400 line-through' : 'text-neutral-900'"
          >
            {{ t.nombre }}
          </span>
          <span class="text-xs text-neutral-400 truncate">{{ t.cursoNombre }}</span>
        </span>
        <span class="text-xs text-neutral-400 shrink-0">{{ formatearFecha(t.fechaLimite) }}</span>
        <a
          :href="t.url"
          target="_blank"
          rel="noopener"
          class="shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors duration-150"
          aria-label="Abrir en Moodle"
        >
          <ExternalLink class="w-4 h-4" />
        </a>
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.item-enter-active {
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
}
.item-leave-active {
  transition: opacity 0.1s ease-in;
}
.item-enter-from,
.item-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
