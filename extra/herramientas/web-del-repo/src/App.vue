<script setup>
import { ref } from 'vue'
import { Menu } from '@lucide/vue'
import Sidebar from './components/Sidebar.vue'

const abierta = ref(true)
</script>

<template>
  <div class="min-h-screen flex bg-neutral-50">
    <Sidebar :abierta="abierta" />
    <main class="flex-grow flex flex-col min-w-0">
      <header class="flex items-center px-4 py-3 border-b border-neutral-200 bg-white">
        <button
          type="button"
          @click="abierta = !abierta"
          class="p-1.5 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors duration-150"
          aria-label="Mostrar u ocultar la barra lateral"
        >
          <Menu class="w-4 h-4" />
        </button>
      </header>
      <div class="flex-grow flex justify-center overflow-y-auto">
        <div class="w-full max-w-4xl p-8">
          <RouterView :key="$route.fullPath" />
        </div>
      </div>
    </main>
  </div>
</template>
