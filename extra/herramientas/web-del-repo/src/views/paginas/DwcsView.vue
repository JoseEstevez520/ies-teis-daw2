<script setup>
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'

// modulos/dwcs/README.md. Cuando el módulo tiene apuntes deja de compartir
// ModuloView (ver design.md).
const APUNTES = [
  {
    ruta: '/modulos/dwcs/spring-y-contenedor',
    titulo: 'Spring, Spring Boot y el contenedor',
    descripcion: 'Cómo Spring crea tus objetos, qué es un bean y qué es la inyección de dependencias.',
  },
  {
    ruta: '/modulos/dwcs/scopes-y-estado',
    titulo: 'Scopes y estado',
    descripcion: 'Cuántas instancias de cada bean crea Spring: singleton, prototype y sesión HTTP.',
  },
]
</script>

<template>
  <PlantillaPagina titulo="DWCS" entradilla="Spring Boot + Thymeleaf + JPA">
    <p>Apuntes y recursos del módulo.</p>

    <h2 id="apuntes">Apuntes</h2>
    <div class="not-prose grid gap-4 sm:grid-cols-2">
      <TarjetaPagina
        v-for="apunte in APUNTES"
        :key="apunte.ruta"
        :href="apunte.ruta"
        :titulo="apunte.titulo"
        :descripcion="apunte.descripcion"
      />
    </div>
  </PlantillaPagina>
</template>
