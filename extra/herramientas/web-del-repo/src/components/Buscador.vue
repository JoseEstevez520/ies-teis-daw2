<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SearchMorph } from 'elastic-ui'
import { buscar } from '../lib/busqueda.js'
import { colorDeRuta } from '../lib/colorSeccion.js'

// La lupa de elastic-ui (se abre con "/") y, debajo, las páginas que tienen
// lo que escribes. Enter abre la primera.
const consulta = ref('')
const abierto = ref(false)
const enfocado = ref(false)
const resultados = computed(() => buscar(consulta.value))
const visible = computed(() => enfocado.value && consulta.value.trim() !== '')

const route = useRoute()
const router = useRouter()
watch(
  () => route.path,
  () => {
    consulta.value = ''
    abierto.value = false
    enfocado.value = false
  },
)

function alSalir(evento) {
  if (!evento.currentTarget.contains(evento.relatedTarget)) enfocado.value = false
}

function abrirPrimero(evento) {
  if (evento.target.tagName === 'INPUT' && resultados.value[0]) router.push(resultados.value[0].ruta)
}
</script>

<template>
  <div class="relative" @focusin="enfocado = true" @focusout="alSalir" @keydown.enter="abrirPrimero">
    <SearchMorph v-model="consulta" v-model:open="abierto" label="Buscar en la web" shortcut="/" />

    <div
      v-if="visible"
      class="absolute top-full right-0 z-30 mt-2 w-[min(22rem,calc(100vw-2rem))] origin-top-right animate-popover-in rounded-[var(--radius-lg)] bg-bg p-1 shadow-overlay"
    >
      <ul v-if="resultados.length" class="flex flex-col stagger-items">
        <li v-for="r in resultados" :key="r.ruta">
          <RouterLink
            :to="r.ruta"
            class="flex flex-col gap-0.5 rounded-[var(--radius-md)] px-3 py-2 transition-colors hover:bg-bg-muted focus-visible:bg-bg-muted focus-visible:outline-none"
          >
            <span class="flex items-center gap-2 text-sm font-medium text-fg">
              <span class="size-1.5 shrink-0 rounded-full" :style="{ backgroundColor: colorDeRuta(r.ruta) }" />
              {{ r.titulo }}
            </span>
            <span v-if="r.fragmento" class="line-clamp-2 pl-3.5 text-xs text-fg-muted">{{ r.fragmento }}</span>
          </RouterLink>
        </li>
      </ul>
      <p v-else class="px-3 py-2 text-sm text-fg-muted">Nada con "{{ consulta.trim() }}".</p>
    </div>
  </div>
</template>
