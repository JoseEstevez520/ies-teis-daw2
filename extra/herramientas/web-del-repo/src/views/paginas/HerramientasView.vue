<script setup>
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'elastic-ui'
import { BellRing, Calculator, Globe, LayoutDashboard, NotebookPen, StickyNote } from '@lucide/vue'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'

// extra/herramientas/README.md
const HERRAMIENTAS = [
  {
    href: '/extra/herramientas/calculadora-de-faltas',
    titulo: 'Calculadora de faltas',
    icono: Calculator,
    descripcion: '% de faltas frente al máximo permitido por módulo.',
    nota: 'Funciona',
  },
  {
    href: '/extra/herramientas/panel-aula-virtual',
    titulo: 'Panel del Aula Virtual',
    icono: LayoutDashboard,
    descripcion: 'Tareas, notas y actividad de todos tus cursos en una sola pantalla.',
    nota: 'En marcha',
  },
  {
    href: '/extra/herramientas/alarma-tareas',
    titulo: 'Alarma de tareas',
    icono: BellRing,
    descripcion: 'Avisa de tareas pendientes del Aula Virtual que no tengas ya en tu calendario.',
    nota: 'Sin código todavía',
  },
  {
    href: '/extra/herramientas/cuaderno-ia',
    titulo: 'Cuaderno de IA para apuntes',
    icono: NotebookPen,
    descripcion: 'Preguntar con IA sobre el material de un módulo.',
    nota: 'Investigado, sin código',
  },
  {
    href: '/extra/herramientas/notas-de-clase',
    titulo: 'Notas de clase',
    icono: StickyNote,
    descripcion: 'Dejar notas en crudo y que un agente las convierta en apuntes y páginas.',
    nota: 'Diseño, sin código',
  },
  {
    href: 'https://github.com/JoseEstevez520/ies-teis-daw2/tree/main/extra/herramientas/web-del-repo',
    titulo: 'Web del repo',
    icono: Globe,
    descripcion: 'Esta web: el contenido del repo, navegable.',
  },
]

const PENDIENTES = [
  {
    id: 'fct',
    titulo: 'Buscador de empresas de FCT',
    texto: 'Directorio de empresas donde hacer la FCT, con lo que aporta cada alumno que ya estuvo.',
    enlace: { to: '/extra/ideas-proyecto-fin-curso/oportunidades-y-trayectoria', texto: 'La idea completa, en Ideas para el PFC' },
  },
  {
    id: 'plantillas',
    titulo: 'Plantillas de proyecto',
    texto: 'Spring (JDK 21 + Thymeleaf + H2) y Vue (Vite + ESLint + Prettier) ya montados, para no levantar el esqueleto en cada práctica.',
  },
  {
    id: 'setup',
    titulo: 'Script de preparación del PC del aula',
    texto: 'Deja listo lo necesario de una vez, en vez de averiguarlo cada vez que toca un PC nuevo.',
  },
  {
    id: 'docker',
    titulo: 'Entornos Docker de Despregamento',
    texto: 'Para practicar de verdad los exámenes de Apache y DNS, no solo en teoría.',
  },
  {
    id: 'notebooklm',
    titulo: 'Cuadernos de NotebookLM por módulo',
    texto: 'Un cuaderno compartido por módulo, alimentado desde el repo.',
  },
]
</script>

<template>
  <PlantillaPagina
    titulo="Herramientas"
    entradilla="Mini-proyectos útiles para el día a día de la clase, cada uno en su propia carpeta con su propio código."
  >
    <RejillaTarjetas>
      <TarjetaPagina v-for="h in HERRAMIENTAS" :key="h.href" v-bind="h" />
    </RejillaTarjetas>

    <h2 id="pendientes">Pendientes</h2>
    <p>Ideas de herramientas que nadie ha empezado. Si te animas con una, es tuya.</p>
    <Accordion type="multiple">
      <AccordionItem v-for="p in PENDIENTES" :key="p.id" :value="p.id">
        <AccordionTrigger>{{ p.titulo }}</AccordionTrigger>
        <AccordionContent>
          <p>{{ p.texto }}</p>
          <p v-if="p.enlace" class="mt-2">
            <RouterLink :to="p.enlace.to">{{ p.enlace.texto }}</RouterLink>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <h2 id="estilo-visual">Estilo visual</h2>
    <p>
      Para cualquier herramienta con interfaz: paleta neutra, color solo con significado, nada
      de fondos o insignias detrás de los iconos, y sin plantillas de panel genéricas: un dato
      importante lleva una forma pensada para él.
    </p>
  </PlantillaPagina>
</template>
