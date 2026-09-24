import { BookOpen, Calendar, Home, Layers } from '@lucide/vue'

// Una entrada por sección de nivel superior del repo. Sirve tanto para la
// barra lateral como para la rejilla de tarjetas de la portada (ver design.md).
export const SECCIONES = [
  {
    etiqueta: 'Inicio',
    ruta: '/',
    icono: Home,
    descripcion: 'La portada de esta web.',
    enPortada: false,
  },
  {
    etiqueta: 'Módulos',
    ruta: '/modulos',
    icono: BookOpen,
    descripcion: 'Apuntes del temario, por módulo.',
    enPortada: true,
  },
  {
    etiqueta: 'Extra',
    ruta: '/extra',
    icono: Layers,
    descripcion: 'Lo que no es temario pero ayuda en el curso.',
    enPortada: true,
  },
  {
    etiqueta: 'Horario',
    ruta: '/horario',
    icono: Calendar,
    descripcion: 'Horario semanal de la clase.',
    enPortada: true,
  },
]
