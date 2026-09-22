import { BookOpen, Bot, Calendar, Home, Lightbulb, Palette, Wrench } from '@lucide/vue'

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
    etiqueta: 'Herramientas',
    ruta: '/herramientas',
    icono: Wrench,
    descripcion: 'Mini-proyectos útiles para el día a día de la clase.',
    enPortada: true,
  },
  {
    etiqueta: 'IA',
    ruta: '/ia',
    icono: Bot,
    descripcion: 'Cosas que no son temario pero ayudan a currar mejor con IA.',
    enPortada: true,
  },
  {
    etiqueta: 'Diseño web',
    ruta: '/diseno-web',
    icono: Palette,
    descripcion: 'Recursos para que un frontend no parezca hecho a última hora.',
    enPortada: true,
  },
  {
    etiqueta: 'Ideas de PFC',
    ruta: '/ideas-proyecto-fin-curso',
    icono: Lightbulb,
    descripcion: 'Propuestas y referencias para el proyecto de fin de curso.',
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
