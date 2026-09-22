<script setup>
import { LayoutDashboard } from '@lucide/vue'
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="min-h-screen flex bg-neutral-50">
    <Sidebar />
    <div class="flex-grow flex flex-col">
      <header class="flex items-center gap-2.5 px-8 py-5 border-b border-neutral-200 bg-white">
        <LayoutDashboard class="w-5 h-5 text-neutral-900 shrink-0" />
        <h1 class="text-lg font-semibold text-neutral-900">Panel del Aula Virtual</h1>
      </header>
      <main class="flex-grow p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
