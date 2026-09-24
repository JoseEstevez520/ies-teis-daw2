<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { AnimatePresence, motion } from 'motion-v'
import { Menu, X } from '@lucide/vue'
import Sidebar from './components/Sidebar.vue'

// En el móvil la barra lateral no cabe: se esconde tras un botón de menú y
// se abre como panel encima del contenido. Se cierra al cambiar de página.
const menuAbierto = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => (menuAbierto.value = false))
</script>

<template>
  <div class="h-dvh flex flex-col md:flex-row bg-neutral-50">
    <div class="hidden md:flex h-full"><Sidebar /></div>

    <header class="md:hidden flex items-center gap-2 border-b border-neutral-200 bg-white px-3 py-2">
      <button
        type="button"
        @click="menuAbierto = true"
        class="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100"
        aria-label="Abrir menú"
      >
        <Menu class="w-5 h-5" />
      </button>
      <RouterLink to="/" class="text-sm font-semibold text-neutral-900">2º DAW · IES de Teis</RouterLink>
    </header>

    <AnimatePresence>
      <motion.div
        v-if="menuAbierto"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        class="md:hidden fixed inset-0 z-40 bg-neutral-900/30"
        @click="menuAbierto = false"
      />
    </AnimatePresence>
    <AnimatePresence>
      <motion.div
        v-if="menuAbierto"
        :initial="{ x: -300 }"
        :animate="{ x: 0 }"
        :exit="{ x: -300 }"
        :transition="{ type: 'spring', stiffness: 380, damping: 36 }"
        class="md:hidden fixed inset-y-0 left-0 z-50 flex"
      >
        <Sidebar movil />
        <button
          type="button"
          @click="menuAbierto = false"
          class="absolute top-3 right-3 p-2 rounded-lg text-neutral-500 hover:bg-neutral-100"
          aria-label="Cerrar menú"
        >
          <X class="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>

    <main class="flex-1 min-h-0 flex justify-center overflow-y-auto">
      <div class="w-full min-w-0 max-w-4xl self-start px-4 py-6 pb-24 md:p-8 md:pb-24">
        <RouterView :key="$route.fullPath" />
      </div>
    </main>
  </div>
</template>
