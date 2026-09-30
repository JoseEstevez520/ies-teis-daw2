<script setup>
// La misma pantalla en tres direcciones, para ver que la idea cambia todo.
const DIRECCIONES = [
  {
    nombre: 'Minimalista',
    caja: 'rounded-lg border border-border bg-bg p-4',
    titulo: 'text-sm font-medium text-fg',
    texto: 'mt-1 text-xs text-fg-muted',
    boton: 'mt-3 inline-block rounded-md bg-fg px-2 py-1 text-[10px] text-bg',
  },
  {
    nombre: 'Editorial',
    caja: 'border-t-2 border-fg bg-bg p-4',
    titulo: 'font-serif text-lg leading-tight text-fg',
    texto: 'mt-1 text-xs text-fg-muted',
    boton: 'mt-3 inline-block border-b border-fg text-[10px] text-fg',
  },
  {
    nombre: 'Neobrutalista',
    caja: 'border-2 border-fg bg-[#fde68a] p-4 shadow-[4px_4px_0_0_var(--color-fg)]',
    titulo: 'text-sm font-extrabold tracking-tight text-fg uppercase',
    texto: 'mt-1 text-xs text-fg',
    boton: 'mt-3 inline-block border-2 border-fg bg-bg px-2 py-1 text-[10px] font-bold text-fg',
  },
]
</script>

<template>
  <div class="not-prose grid gap-4 sm:grid-cols-3">
    <figure v-for="d in DIRECCIONES" :key="d.nombre">
      <figcaption class="mb-2 text-xs font-medium text-fg-muted">{{ d.nombre }}</figcaption>
      <div :class="d.caja">
        <p :class="d.titulo">Tu proyecto</p>
        <p :class="d.texto">Una línea de qué hace.</p>
        <span :class="d.boton">Empezar</span>
      </div>
    </figure>
  </div>
</template>
