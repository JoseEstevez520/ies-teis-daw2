<script setup>
// Un kit de marca de ejemplo (inventado): nombre, paleta, tipografía y tono.
const PALETA = ['#14532d', '#4d7c0f', '#d9f99d', '#f5f5f4']
</script>

<template>
  <figure class="not-prose rounded-[var(--radius-xl)] bg-bg-subtle p-5 sm:p-6">
    <div class="flex flex-wrap items-start gap-x-8 gap-y-5">
      <div>
        <span class="text-xs font-medium text-fg-muted">Nombre y logo</span>
        <p class="mt-1 font-serif text-3xl leading-none text-fg">Aurea</p>
      </div>
      <div>
        <span class="text-xs font-medium text-fg-muted">Paleta</span>
        <div class="mt-1 flex gap-1.5">
          <span v-for="c in PALETA" :key="c" class="size-7 rounded-full border border-border" :style="{ background: c }" />
        </div>
      </div>
      <div>
        <span class="text-xs font-medium text-fg-muted">Tipografía</span>
        <p class="mt-1 font-serif text-2xl leading-none text-fg">Aa</p>
      </div>
    </div>
    <div class="mt-5 border-t border-border pt-3">
      <span class="text-xs font-medium text-fg-muted">Tono</span>
      <p class="mt-1 text-sm text-fg">«Cuidamos tus plantas como si fueran nuestras.»</p>
    </div>
    <figcaption class="mt-3 text-xs text-fg-muted">Todo sale del mismo sitio: el nombre, el color, la letra y cómo habla.</figcaption>
  </figure>
</template>
