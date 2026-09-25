<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ScrollIndicator, SidebarLayout, SidebarToggle, ThemeToggle } from 'elastic-ui'
import BarraLateral from './components/BarraLateral.vue'
import Migas from './components/Migas.vue'
import Buscador from './components/Buscador.vue'

const route = useRoute()
const router = useRouter()

// Los enlaces internos que salen del .md (con v-html) son <a href="/...">
// normales, no RouterLink: se pasan por el router para no recargar la página.
function alHacerClic(evento) {
  if (evento.defaultPrevented || evento.button !== 0) return
  if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return
  const enlace = evento.target.closest?.('a[href]')
  if (!enlace || enlace.target || enlace.hasAttribute('download')) return
  const href = enlace.getAttribute('href')
  if (!href.startsWith('/') || href.startsWith('//')) return
  evento.preventDefault()
  router.push(href)
}
onMounted(() => document.addEventListener('click', alHacerClic))
onBeforeUnmount(() => document.removeEventListener('click', alHacerClic))

// Lo que ya está al cargar simplemente se muestra; al cambiar de página, la
// nueva entra enfocándose (el `blur-in` de elastic-ui).
const primeraCarga = ref(true)
// La rayita de scroll de la página se asoma un momento en cada página nueva,
// para que se vea cuánto hay.
const indicador = ref(null)
watch(
  () => route.path,
  () => {
    primeraCarga.value = false
    requestAnimationFrame(() => indicador.value?.flash())
  },
)
</script>

<template>
  <SidebarLayout>
    <BarraLateral />

    <div class="flex min-w-0 flex-1 flex-col">
      <header class="flex h-14 shrink-0 items-center gap-2 px-4 md:px-8">
        <SidebarToggle class="md:hidden" label="Abrir el menú" />
        <Migas class="flex-1" />
        <div class="flex shrink-0 items-center gap-1">
          <Buscador />
          <ThemeToggle />
        </div>
      </header>

      <main class="flex-1 px-4 pt-2 pb-24 md:px-8">
        <div
          :key="route.path"
          :class="primeraCarga ? '' : 'animate-[blur-in_0.45s_var(--ease-soft)] motion-reduce:animate-none'"
        >
          <RouterView />
        </div>
      </main>
    </div>
  </SidebarLayout>
  <ScrollIndicator ref="indicador" />
</template>
