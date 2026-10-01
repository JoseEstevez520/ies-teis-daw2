<script setup>
import { siApachemaven, siSpringboot, siThymeleaf } from 'simple-icons'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'
import Tecnologias from '../../components/Tecnologias.vue'

// modulos/dwcs/README.md. Cuando el módulo tiene apuntes deja de compartir
// ModuloView (ver design.md).
const STACK = [
  { icon: siSpringboot, nombre: 'Spring Boot' },
  { icon: siThymeleaf, nombre: 'Thymeleaf' },
  { icon: siApachemaven, nombre: 'Maven' },
]
const APUNTES = [
  {
    ruta: '/modulos/dwcs/spring-y-contenedor',
    titulo: 'Spring, Spring Boot y el contenedor',
    descripcion: 'Cómo Spring crea tus objetos, qué es un bean y qué es la inyección de dependencias.',
  },
  {
    ruta: '/modulos/dwcs/controladores-y-rutas',
    titulo: 'Controladores y rutas',
    descripcion: 'Cómo recibe el servidor las peticiones HTTP: controlador, @GetMapping, @RequestMapping y @PathVariable.',
  },
  {
    ruta: '/modulos/dwcs/thymeleaf',
    titulo: 'Thymeleaf',
    descripcion: 'El motor de plantillas que rellena el HTML con los datos: th:text, fragmentos y th:classappend.',
  },
  {
    ruta: '/modulos/dwcs/servicios-e-inyeccion',
    titulo: 'Servicios e inyección',
    descripcion: 'La lógica del negocio en un servicio, cómo inyectarlo y por qué se inyecta la interfaz.',
  },
  {
    ruta: '/modulos/dwcs/optional',
    titulo: 'Optional',
    descripcion: 'Un envoltorio que avisa de que un valor puede no estar y evita los null sueltos.',
  },
  {
    ruta: '/modulos/dwcs/enum',
    titulo: 'Enum',
    descripcion: 'Un tipo con un conjunto cerrado de valores, para lo que solo puede estar en unos pocos estados.',
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
    <Tecnologias :items="STACK" />

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
