<script setup>
// Un logo de marca o tecnología, desde simple-icons. Va en el color del texto
// para que se lea en claro y en oscuro; las marcas muy oscuras (Gradle) no se
// verían en su color propio.
defineProps({
  icon: { type: Object, required: true },
  size: { type: Number, default: 24 },
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    role="img"
    :aria-label="icon.title"
    fill="currentColor"
  >
    <path :d="icon.path" />
  </svg>
</template>
