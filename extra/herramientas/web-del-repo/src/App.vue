<script setup>
import { ref } from 'vue'
import { PageTransition, ScrollIndicator, SidebarLayout, SidebarLayoutHeader, ThemeToggle } from 'elastic-ui'
import { MotionConfig } from 'motion-v'
import BarraLateral from './components/BarraLateral.vue'
import Buscador from './components/Buscador.vue'
import Migas from './components/Migas.vue'
import { hayIndice } from './lib/indicePagina.js'
import { forzarAnimaciones } from './lib/movimiento.js'

// La estructura de elastic-ui (USAGE 12, 13 y 15): barra lateral con las
// secciones, cabecera fija con las migas, el buscador y el tema, y entre
// páginas solo cambia el contenido. La rayita de scroll se asoma en cada
// página nueva, salvo donde la página muestra su índice a la derecha (en
// pantallas 2xl), que ya marca por dónde vas. Se esconde en vez de quitarse: la
// librería oculta la barra nativa mientras está montada.
const indicador = ref(null)
</script>

<template>
  <MotionConfig :reduced-motion="forzarAnimaciones ? 'never' : 'user'">
    <SidebarLayout>
      <BarraLateral />

      <div class="min-w-0 flex-1">
        <!-- Sin la línea que la librería pone debajo al hacer scroll. -->
        <SidebarLayoutHeader toggle-label="Abrir el menú" class="shadow-none">
          <Migas />
          <template #end>
            <Buscador />
            <ThemeToggle />
          </template>
        </SidebarLayoutHeader>

        <main class="pt-4 pb-24">
          <RouterView v-slot="{ Component, route }">
            <PageTransition :page="route.path" @changed="indicador?.flash()">
              <component :is="Component" />
            </PageTransition>
          </RouterView>
        </main>
      </div>
    </SidebarLayout>
    <ScrollIndicator ref="indicador" :class="hayIndice && '2xl:hidden'" />
  </MotionConfig>
</template>
