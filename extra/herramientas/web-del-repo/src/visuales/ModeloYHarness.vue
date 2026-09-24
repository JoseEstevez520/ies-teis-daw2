<script setup>
import { ref } from 'vue'
import { ArrowLeftRight, Brain, Eye, FolderOpen, Hand, Phone, User, X } from '@lucide/vue'

// Modelo = cerebro, harness = cuerpo. Sin cuerpo, el cerebro solo puede
// hablar contigo; con cuerpo, tiene ojos y manos para llegar a tu proyecto.
// Colores: modelo violeta, harness cian, en todas las páginas de agentes.

const CUERPO = [
  { icono: Eye, parte: 'Ojos', hace: 'lee tus archivos' },
  { icono: Hand, parte: 'Manos', hace: 'edita y ejecuta comandos' },
  { icono: Phone, parte: 'Teléfono', hace: 'consulta fuera (MCP)' },
]

const modo = ref('cuerpo')
</script>

<template>
  <div class="rounded-xl border border-neutral-200 bg-white overflow-hidden">
    <div class="flex border-b border-neutral-200 bg-neutral-50 p-1.5 gap-1.5">
      <button
        v-for="m in [
          { id: 'cerebro', texto: 'Solo el cerebro (modelo)' },
          { id: 'cuerpo', texto: 'Cerebro con cuerpo (modelo + harness)' },
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
        <div class="flex md:flex-col items-center justify-center gap-2 rounded-xl bg-neutral-100 px-4 py-3 md:w-24">
          <User class="w-5 h-5 text-neutral-900" />
          <span class="text-sm font-medium text-neutral-900">Tú</span>
        </div>

        <ArrowLeftRight class="w-4 h-4 text-neutral-400 self-center shrink-0 max-md:rotate-90" />

        <!-- Cuerpo (harness) con el cerebro (modelo) dentro -->
        <div
          class="flex-1 rounded-xl p-3 flex flex-col gap-3 transition-colors duration-300"
          :style="{ backgroundColor: modo === 'cuerpo' ? 'color-mix(in srgb, #0891b2 10%, white)' : 'transparent' }"
        >
          <p
            class="text-xs font-semibold transition-opacity duration-300"
            :class="modo === 'cuerpo' ? 'opacity-100' : 'opacity-0'"
            style="color: #0891b2"
          >
            Cuerpo = harness (OpenCode, Claude Code, Codex)
          </p>

          <div class="rounded-lg px-4 py-4 flex items-center gap-3" style="background-color: color-mix(in srgb, #7c3aed 12%, white)">
            <Brain class="w-6 h-6 shrink-0" style="color: #7c3aed" />
            <div class="flex flex-col">
              <span class="text-sm font-semibold" style="color: #7c3aed">Cerebro = modelo</span>
              <span class="text-xs text-neutral-600">GPT, Claude, Gemini, Qwen… Piensa y habla.</span>
            </div>
          </div>

          <div
            class="grid sm:grid-cols-3 gap-2 transition-opacity duration-300"
            :class="modo === 'cuerpo' ? 'opacity-100' : 'opacity-0'"
          >
            <div v-for="c in CUERPO" :key="c.parte" class="flex items-center gap-2.5 rounded-lg bg-white px-3 py-2.5">
              <component :is="c.icono" class="w-4 h-4 shrink-0" style="color: #0891b2" />
              <div class="flex flex-col">
                <span class="text-xs font-semibold text-neutral-900">{{ c.parte }}</span>
                <span class="text-xs text-neutral-600">{{ c.hace }}</span>
              </div>
            </div>
          </div>
        </div>

        <ArrowLeftRight
          v-if="modo === 'cuerpo'"
          class="w-4 h-4 self-center shrink-0 max-md:rotate-90"
          style="color: #0891b2"
        />
        <X v-else class="w-4 h-4 text-neutral-300 self-center shrink-0" />

        <div
          class="flex md:flex-col items-center justify-center gap-2 rounded-xl px-4 py-3 md:w-28 transition-colors duration-300"
          :class="modo === 'cuerpo' ? 'bg-neutral-100 text-neutral-900' : 'bg-neutral-50 text-neutral-300'"
        >
          <FolderOpen class="w-5 h-5" />
          <span class="text-sm font-medium text-center">Tu proyecto</span>
        </div>
      </div>

      <p class="text-sm text-neutral-700 leading-relaxed">
        <template v-if="modo === 'cerebro'">
          Un cerebro sin cuerpo solo puede hablar contigo. No ve tu proyecto ni toca nada:
          <strong class="text-neutral-900">los ojos y las manos los pones tú</strong> (copiar, pegar, ejecutar).
          Es lo que pasa en el chat de ChatGPT o Claude.
        </template>
        <template v-else>
          Con cuerpo, el cerebro ve tu proyecto y actúa en él. Cerebro y cuerpo juntos, trabajando
          hasta acabar la tarea, es un <strong class="text-neutral-900">agente</strong>.
        </template>
      </p>
    </div>
  </div>
</template>
