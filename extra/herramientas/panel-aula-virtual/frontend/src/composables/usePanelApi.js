import { ref } from 'vue'

const BASE_URL = 'http://localhost:8080/api'

function crearRecurso(recurso) {
  const datos = ref([])
  const cargando = ref(true)
  const error = ref(null)
  let cargado = false

  function cargar() {
    cargando.value = true
    error.value = null
    fetch(`${BASE_URL}/${recurso}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((json) => (datos.value = json))
      .catch(() => (error.value = 'No se pudo conectar con el backend.'))
      .finally(() => (cargando.value = false))
  }

  return {
    datos,
    cargando,
    error,
    // Solo hace la petición la primera vez que alguna vista lo pide, aunque
    // varias vistas (Inicio, Tareas...) usen el mismo recurso.
    asegurarCargado() {
      if (!cargado) {
        cargado = true
        cargar()
      }
    },
  }
}

// Módulo cargado una sola vez: este estado se comparte entre todas las
// vistas que lo importen, en vez de que cada una tenga su propia copia.
const tareas = crearRecurso('tareas')
const notas = crearRecurso('notas')

export function useTareas() {
  tareas.asegurarCargado()
  return tareas
}

export function useNotas() {
  notas.asegurarCargado()
  return notas
}
