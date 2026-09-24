<script setup>
import { ref } from 'vue'
import { ArrowLeftRight, Brain, FileCode, FilePen, Plug, SquareTerminal, User, X } from '@lucide/vue'

// Modelo y harness como cajas: sin harness, el modelo solo habla contigo y tu
// proyecto le queda fuera; con harness, el modelo va dentro de una caja más
// grande que sí tiene manos para llegar a tu proyecto.
// Colores: modelo violeta, harness cian, en toda la página.

const HERRAMIENTAS = [
  { icono: FileCode, texto: 'Lee archivos' },
  { icono: FilePen, texto: 'Edita' },
  { icono: SquareTerminal, texto: 'Ejecuta comandos' },
  { icono: Plug, texto: 'MCP' },
]

const modo = ref('harness')
</script>

<template>
  <div class="rounded-xl border border-neutral-200 bg-white overflow-hidden">
    <div class="flex border-b border-neutral-200 bg-neutral-50 p-1.5 gap-1.5">
      <button
        v-for="m in [
          { id: 'modelo', texto: 'Solo el modelo' },
          { id: 'harness', texto: 'Modelo dentro de un harness' },
        ]"
        :key="m.id"
        type="button"
        @click="modo = m.id"
        class="flex-1 rounded-lg px-3 py-2 text-sm transition-colors duration-150"
        :class="modo === m.id ? 'bg-white border border-neutral-200 text-neutral-900 font-medium' : 'text-neutral-500 hover:text-neutral-900'"
      >
        {{ m.texto }}
      </button>
    </div>

    <div class="p-6 flex flex-col gap-6">
      <div class="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <!-- Tú -->
        <div class="flex md:flex-col items-center justify-center gap-2 rounded-xl bg-neutral-100 px-4 py-3 md:w-24">
          <User class="w-5 h-5 text-neutral-900" />
          <span class="text-sm font-medium text-neutral-900">Tú</span>
        </div>

        <ArrowLeftRight class="w-4 h-4 text-neutral-400 self-center shrink-0 max-md:rotate-90" />

        <!-- Harness (o nada) con el modelo dentro -->
        <div
          class="flex-1 rounded-xl p-3 flex flex-col gap-3 transition-colors duration-300"
          :style="{ backgroundColor: modo === 'harness' ? 'color-mix(in srgb, #0891b2 10%, white)' : 'transparent' }"
        >
          <p
            class="text-xs font-semibold transition-opacity duration-300"
            :class="modo === 'harness' ? 'opacity-100' : 'opacity-0'"
            style="color: #0891b2"
          >
            Harness · OpenCode, Claude Code, Codex
          </p>

          <div class="rounded-lg px-4 py-4 flex items-center gap-3" style="background-color: color-mix(in srgb, #7c3aed 12%, white)">
            <Brain class="w-5 h-5 shrink-0" style="color: #7c3aed" />
            <div class="flex flex-col">
              <span class="text-sm font-semibold" style="color: #7c3aed">Modelo</span>
              <span class="text-xs text-neutral-600">GPT, Claude, Gemini, Qwen…</span>
            </div>
          </div>

          <div
            class="grid grid-cols-2 gap-2 transition-opacity duration-300"
            :class="modo === 'harness' ? 'opacity-100' : 'opacity-0'"
          >
            <div
              v-for="h in HERRAMIENTAS"
              :key="h.texto"
              class="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs text-neutral-800"
            >
              <component :is="h.icono" class="w-3.5 h-3.5 shrink-0" style="color: #0891b2" />
              {{ h.texto }}
            </div>
          </div>
        </div>

        <!-- Conexión con el proyecto -->
        <ArrowLeftRight
          v-if="modo === 'harness'"
          class="w-4 h-4 self-center shrink-0 max-md:rotate-90"
          style="color: #0891b2"
        />
        <X v-else class="w-4 h-4 text-neutral-300 self-center shrink-0" />

        <!-- Tu proyecto -->
        <div
          class="flex md:flex-col items-center justify-center gap-2 rounded-xl px-4 py-3 md:w-28 transition-colors duration-300"
          :class="modo === 'harness' ? 'bg-neutral-100 text-neutral-900' : 'bg-neutral-50 text-neutral-300'"
        >
          <FileCode class="w-5 h-5" />
          <span class="text-sm font-medium text-center">Tu proyecto</span>
        </div>
      </div>

      <p class="text-sm text-neutral-700 leading-relaxed">
        <template v-if="modo === 'modelo'">
          El modelo no llega a tu proyecto: <strong class="text-neutral-900">las manos las pones tú</strong>
          (copiar, pegar, ejecutar).
        </template>
        <template v-else>
          <span class="font-medium" style="color: #7c3aed">El modelo decide</span>,
          <span class="font-medium" style="color: #0891b2">el harness lo hace</span>, y repiten hasta acabar: eso
          es un <strong class="text-neutral-900">agente</strong>.
        </template>
      </p>
    </div>
  </div>
</template>
