<template>
  <!-- Dos versiones de la misma pantalla: la que saca la IA sin corregirla, y una
       pensada. No es un componente de la librería: es un ejemplo a mano. -->
  <div class="not-prose grid gap-4 sm:grid-cols-2">
    <figure class="rounded-[var(--radius-xl)] bg-bg-subtle p-4">
      <figcaption class="text-xs font-medium text-fg-muted">Lo que sale sin corregirla</figcaption>
      <div class="mt-3 rounded-[var(--radius-lg)] bg-gradient-to-br from-violet-600 to-blue-500 p-4 text-center text-white">
        <span class="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">✨ Nuevo</span>
        <p class="mt-2 text-base leading-tight font-semibold">Lleva tu proyecto al siguiente nivel</p>
        <p class="mt-1 text-[11px] text-white/80">Potente y sin límites 🚀</p>
        <div class="mt-3 grid grid-cols-3 gap-1.5">
          <span v-for="i in 3" :key="i" class="rounded-md bg-white/15 p-1.5 text-[10px]">🚀</span>
        </div>
      </div>
    </figure>

    <figure class="rounded-[var(--radius-xl)] bg-bg-subtle p-4">
      <figcaption class="text-xs font-medium text-fg-muted">Lo que sale si la diriges</figcaption>
      <div class="mt-3 rounded-[var(--radius-lg)] bg-bg p-4">
        <p class="text-[11px] text-fg-muted">Herramientas</p>
        <p class="mt-1 text-base leading-tight font-semibold text-fg">Tu proyecto, ordenado</p>
        <p class="mt-1 text-[11px] text-fg-secondary">Una cosa por fila, con su borde y su aire.</p>
        <div class="mt-3 flex flex-col gap-1.5">
          <span v-for="i in 3" :key="i" class="rounded-md border border-border px-2 py-1 text-[10px] text-fg-secondary">Fila {{ i }}</span>
        </div>
      </div>
    </figure>
  </div>
</template>
