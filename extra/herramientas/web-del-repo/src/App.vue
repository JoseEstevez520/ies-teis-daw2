<script setup>
import { ref } from 'vue'
import { PageTransition, ScrollIndicator, SidebarLayout, SidebarLayoutHeader, ThemeToggle } from 'elastic-ui'
import BarraLateral from './components/BarraLateral.vue'
import Buscador from './components/Buscador.vue'
import Migas from './components/Migas.vue'

// La estructura de elastic-ui (USAGE 12, 13 y 15): barra lateral con las
// secciones, cabecera fija con las migas, el buscador y el tema, y entre
// páginas solo cambia el contenido. La rayita de scroll se asoma en cada
// página nueva.
const indicador = ref(null)
</script>

<template>
  <SidebarLayout>
    <BarraLateral />

    <div class="min-w-0 flex-1">
      <SidebarLayoutHeader toggle-label="Abrir el menú">
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
  <ScrollIndicator ref="indicador" />
</template>
