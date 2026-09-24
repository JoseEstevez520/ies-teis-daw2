<script setup>
// Un `##` de la página: su título, con el icono en el color de la sección, y
// lo que va debajo. Sin tarjeta alrededor: separa el espacio, no una caja.
defineProps({
  id: { type: String, required: true },
  icono: { type: [Object, Function], default: null },
  color: { type: String, default: 'var(--color-fg)' },
})
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2 :id="id" class="flex scroll-mt-6 items-center gap-2 text-lg font-semibold tracking-tight text-fg">
      <component :is="icono" v-if="icono" class="size-4 shrink-0" :style="{ color }" />
      <span><slot name="titulo" /></span>
    </h2>
    <slot />
  </section>
</template>
