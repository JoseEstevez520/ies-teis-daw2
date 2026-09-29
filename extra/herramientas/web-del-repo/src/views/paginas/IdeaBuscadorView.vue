<script setup>
import { computed, ref } from 'vue'
import { AnimatedList, Card, CardDescription, CardTitle, Filters } from 'elastic-ui'
import { Building2, Code, Star } from '@lucide/vue'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import EtiquetasIdea from '../../components/EtiquetasIdea.vue'
import EnlacesIdea from '../../components/EnlacesIdea.vue'
import { ideaDe } from '../../data/ideas.js'

// extra/ideas-proyecto-fin-curso/buscador-de-empresas-de-fct.md
const idea = ideaDe('buscador-de-empresas-de-fct')

// Empresas de ejemplo, para enseñar cómo funcionaría el buscador.
const EMPRESAS = [
  { id: 1, nombre: 'Mareo Software', sector: 'web', tecnologias: ['java', 'spring'], valoracion: 5, resumen: 'Backend en Java y Spring; buen ambiente y mentoría.' },
  { id: 2, nombre: 'Nube Atlántica', sector: 'datos', tecnologias: ['python', 'sql'], valoracion: 4, resumen: 'Procesan datos de sensores marinos; mucho SQL.' },
  { id: 3, nombre: 'Vigo Apps', sector: 'movil', tecnologias: ['vue', 'javascript'], valoracion: 3, resumen: 'Apps internas para empresas; ritmo alto.' },
  { id: 4, nombre: 'Estudio Pixel', sector: 'web', tecnologias: ['javascript', 'vue'], valoracion: 5, resumen: 'Webs para clientes pequeños; aprendes de todo.' },
  { id: 5, nombre: 'Taller Binario', sector: 'videojuegos', tecnologias: ['python'], valoracion: 4, resumen: 'Prototipos de juegos; herramientas propias.' },
  { id: 6, nombre: 'Redondela Cloud', sector: 'datos', tecnologias: ['sql', 'python'], valoracion: 3, resumen: 'Migraciones a la nube; trabajo repetitivo.' },
  { id: 7, nombre: 'Tres Rías', sector: 'web', tecnologias: ['java', 'spring', 'sql'], valoracion: 4, resumen: 'Gestión pública; proyectos grandes y estables.' },
  { id: 8, nombre: 'Sur Digital', sector: 'movil', tecnologias: ['javascript'], valoracion: 2, resumen: 'Apps sencillas; poca variedad.' },
]

const SECTORES = { web: 'Web', movil: 'Móvil', datos: 'Datos', videojuegos: 'Videojuegos' }
const TECNOLOGIAS = ['java', 'spring', 'vue', 'javascript', 'python', 'sql']
const capitalizar = (s) => s[0].toUpperCase() + s.slice(1)

const CATEGORIAS = [
  {
    key: 'sector',
    label: 'Sector',
    icon: Building2,
    options: Object.entries(SECTORES).map(([value, label]) => ({
      value,
      label,
      count: EMPRESAS.filter((e) => e.sector === value).length,
    })),
  },
  {
    key: 'tecnologia',
    label: 'Tecnología',
    icon: Code,
    options: TECNOLOGIAS.map((value) => ({
      value,
      label: capitalizar(value),
      count: EMPRESAS.filter((e) => e.tecnologias.includes(value)).length,
    })),
  },
  {
    key: 'valoracion',
    label: 'Valoración',
    icon: Star,
    options: [
      { value: 'alta', label: '4 o 5', count: EMPRESAS.filter((e) => e.valoracion >= 4).length },
      { value: 'media', label: '3', count: EMPRESAS.filter((e) => e.valoracion === 3).length },
      { value: 'baja', label: '2 o menos', count: EMPRESAS.filter((e) => e.valoracion <= 2).length },
    ],
  },
]

const elegidos = ref({})
const mostradas = computed(() =>
  EMPRESAS.filter(
    (e) =>
      (!elegidos.value.sector || elegidos.value.sector.includes(e.sector)) &&
      (!elegidos.value.tecnologia || elegidos.value.tecnologia.some((t) => e.tecnologias.includes(t))) &&
      (!elegidos.value.valoracion ||
        (elegidos.value.valoracion.includes('alta') && e.valoracion >= 4) ||
        (elegidos.value.valoracion.includes('media') && e.valoracion === 3) ||
        (elegidos.value.valoracion.includes('baja') && e.valoracion <= 2)),
  ),
)
</script>

<template>
  <PlantillaPagina :titulo="idea.titulo" :entradilla="idea.resumen">
    <EtiquetasIdea :idea="idea" />

    <p>{{ idea.descripcion }}</p>

    <p>Así funcionaría el buscador. Filtra como lo harías tú; las empresas son de ejemplo.</p>
    <div class="not-prose flex flex-col gap-6">
      <Filters v-model="elegidos" :categories="CATEGORIAS" :count="mostradas.length" label="Filtrar" />
      <AnimatedList
        :items="mostradas"
        :item-key="(e) => e.id"
        as="div"
        collapse="vertical"
        class="grid gap-4 sm:grid-cols-2"
      >
        <template #default="{ item }">
          <Card size="sm" class="h-full gap-1 px-4">
            <CardTitle as="h3" size="sm" class="flex items-center justify-between gap-2">
              {{ item.nombre }}
              <span class="shrink-0 text-xs font-normal text-fg-muted">{{ item.valoracion }}/5</span>
            </CardTitle>
            <CardDescription>{{ item.resumen }}</CardDescription>
          </Card>
        </template>
        <template #empty>
          <p class="py-8 text-center text-sm text-fg-muted">Ninguna empresa cumple esos filtros.</p>
        </template>
      </AnimatedList>
    </div>
    <p><strong>Eliges sector, tecnología o valoración y ves solo lo que te sirve.</strong></p>

    <p><span class="font-medium">A escala de PFC:</span> {{ idea.escala }}</p>

    <EnlacesIdea :idea="idea" />
  </PlantillaPagina>
</template>
