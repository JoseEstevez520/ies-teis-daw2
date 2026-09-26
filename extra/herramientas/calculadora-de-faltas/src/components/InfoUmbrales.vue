<script setup>
import { Button, DialogMorph, DialogMorphClose, DialogMorphDescription, DialogMorphTitle } from 'elastic-ui'

// Qué significa cada umbral, en un diálogo que crece desde su botón.
const UMBRALES = [
  { valor: '6 %', titulo: 'Apercibimiento', texto: 'Queda constancia en secretaría.', color: 'var(--color-warning)' },
  { valor: '10 %', titulo: 'Pérdida de evaluación continua', texto: 'El módulo solo se aprueba con el examen final.', color: 'var(--color-danger)' },
]
</script>

<template>
  <DialogMorph>
    <template #trigger>Qué significa</template>
    <DialogMorphTitle>Faltas en FP</DialogMorphTitle>
    <DialogMorphDescription>Solo cuentan las faltas sin justificar, las que ves en AbalarMóvil.</DialogMorphDescription>
    <ul class="mt-5 flex flex-col gap-4">
      <li v-for="u in UMBRALES" :key="u.valor" class="flex gap-3">
        <span class="mt-1.5 size-2.5 shrink-0 rounded-full" :style="{ backgroundColor: u.color }" aria-hidden="true" />
        <div class="flex flex-col gap-0.5">
          <span class="text-sm font-semibold text-fg">{{ u.titulo }} · {{ u.valor }}</span>
          <span class="text-sm text-fg-secondary">{{ u.texto }}</span>
        </div>
      </li>
    </ul>
    <div class="mt-6 flex justify-end">
      <DialogMorphClose as-child><Button variant="ghost">Entendido</Button></DialogMorphClose>
    </div>
  </DialogMorph>
</template>
