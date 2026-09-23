import { BellRing, CalendarX, Globe, LayoutDashboard, NotebookPen } from '@lucide/vue'

// Título e icono de las páginas del repo que salen como tarjeta en una lista
// de enlaces internos (ver `tarjetas-internas` en lib/markdown.js). Título =
// el `#` de su README; icono = el mismo que su vista a medida, si la tiene.
// Una página sin entrada aquí sale igual, con el nombre de su carpeta y un
// icono genérico.
export const FICHAS = {
  'extra/herramientas/calculadora-de-faltas': { titulo: 'Calculadora de faltas', icono: CalendarX },
  'extra/herramientas/alarma-tareas': { titulo: 'Alarma de tareas', icono: BellRing },
  'extra/herramientas/panel-aula-virtual': { titulo: 'Panel del Aula Virtual', icono: LayoutDashboard },
  'extra/herramientas/web-del-repo': { titulo: 'Web del repo', icono: Globe },
  'extra/herramientas/cuaderno-ia': { titulo: 'Cuaderno de IA para apuntes', icono: NotebookPen },
}
