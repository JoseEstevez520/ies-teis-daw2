<script setup>
import { ref } from 'vue'
import { Brain, CheckCheck, Eye, Hand, RotateCw } from '@lucide/vue'

// El bucle del agente en cuatro pasos, con quién hace cada uno: el cerebro
// (modelo, violeta) o el cuerpo (harness, cian). El ejemplo va en cada paso.

const PASOS = [
  { icono: Eye, verbo: 'Mira', quien: 'cuerpo', ejemplo: 'Abre RegistroForm.vue y se lo enseña al cerebro.' },
  { icono: Brain, verbo: 'Piensa', quien: 'cerebro', ejemplo: '"No se valida el email. Hay que añadir la comprobación."' },
  { icono: Hand, verbo: 'Hace', quien: 'cuerpo', ejemplo: 'Edita el archivo con el cambio.' },
  { icono: CheckCheck, verbo: 'Comprueba', quien: 'cuerpo', ejemplo: 'Ejecuta los tests. Si fallan, vuelve a mirar.' },
]

const COLOR = { cerebro: '#7c3aed', cuerpo: '#0891b2' }
const NOMBRE = { cerebro: 'cerebro (modelo)', cuerpo: 'cuerpo (harness)' }

const elegido = ref(0)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
      <button
        v-for="(p, i) in PASOS"
        :key="p.verbo"
        type="button"
        @click="elegido = i"
        class="relative flex flex-col items-center gap-1.5 rounded-xl px-3 py-4 transition-colors duration-150"
        :style="{
          backgroundColor: elegido === i ? `color-mix(in srgb, ${COLOR[p.quien]} 14%, white)` : `color-mix(in srgb, ${COLOR[p.quien]} 5%, white)`,
        }"
      >
        <span class="text-[11px] text-neutral-400 tabular-nums">{{ i + 1 }}</span>
        <component :is="p.icono" class="w-5 h-5" :style="{ color: COLOR[p.quien] }" />
        <span class="text-sm font-semibold text-neutral-900">{{ p.verbo }}</span>
        <span class="text-[11px]" :style="{ color: COLOR[p.quien] }">{{ NOMBRE[p.quien] }}</span>
      </button>
    </div>

    <div class="flex items-start gap-3 rounded-xl bg-neutral-50 px-4 py-3">
      <RotateCw class="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
      <p class="text-sm text-neutral-700 leading-relaxed">
        <strong class="text-neutral-900">{{ elegido + 1 }}. {{ PASOS[elegido].verbo }}:</strong>
        {{ PASOS[elegido].ejemplo }}
      </p>
    </div>
  </div>
</template>
