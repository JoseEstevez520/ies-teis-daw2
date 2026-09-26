import { computed, ref } from 'vue'

// Cuántas páginas montadas tienen índice a la derecha. Es una cuenta y no un sí
// o no porque, al cambiar de página, la nueva puede montarse antes de que la
// vieja se desmonte.
const conIndice = ref(0)

export const hayIndice = computed(() => conIndice.value > 0)

export function tieneIndice() {
  conIndice.value++
  return () => conIndice.value--
}
