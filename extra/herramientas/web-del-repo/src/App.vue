<script setup>
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="h-screen flex bg-neutral-50">
    <Sidebar />
    <main class="flex-grow flex justify-center overflow-y-auto">
      <div class="w-full max-w-4xl self-start p-8 pb-24">
        <RouterView :key="$route.fullPath" />
      </div>
    </main>
  </div>
</template>
