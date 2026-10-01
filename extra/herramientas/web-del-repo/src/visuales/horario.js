// Datos del horario de 2º DAW, compartidos por HorarioSemanal y
// HorarioModulos.

export const MODULOS = {
  DWCS: { profe: 'Patricia', color: '#e11d48', ruta: '/modulos/dwcs' },
  DWCC: { profe: 'Soledad', color: '#4f46e5', ruta: '/modulos/dwcc' },
  DIW: { profe: 'Juan Carlos', color: '#0d9488', ruta: '/modulos/diw' },
  DAW: { profe: 'Marta', color: '#ca8a04', ruta: '/modulos/daw' },
  IPEII: { profe: 'Adelina (FOL)', color: '#16a34a' },
  HCLE: { profe: 'Elvira (Inglés)', color: '#2563eb' },
  DASP: { profe: 'Marcos', color: '#65a30d', ruta: '/modulos/dasp' },
  ACP: { profe: 'Iago', color: '#ea580c' },
}

// [día, módulo, primera sesión, nº de sesiones]
export const CLASES = [
  [0, 'IPEII', 0, 2], [0, 'DAW', 2, 2], [0, 'DIW', 4, 2], [0, 'DASP', 6, 1],
  [1, 'DWCC', 0, 3], [1, 'DIW', 3, 1], [1, 'DIW', 4, 1], [1, 'DWCS', 5, 2],
  [2, 'DIW', 0, 2], [2, 'DWCS', 2, 2], [2, 'DWCS', 4, 1], [2, 'DAW', 5, 2],
  [3, 'DWCC', 0, 2], [3, 'DIW', 2, 2], [3, 'ACP', 4, 1], [3, 'HCLE', 5, 1], [3, 'DWCS', 6, 2],
  [4, 'DWCS', 0, 3], [4, 'HCLE', 3, 1], [4, 'DWCC', 4, 3],
]

// Sesiones de 50 min por semana de cada módulo, de más a menos.
export const RESUMEN = Object.entries(MODULOS)
  .map(([codigo, m]) => ({
    codigo,
    ...m,
    sesiones: CLASES.filter((c) => c[1] === codigo).reduce((t, c) => t + c[3], 0),
  }))
  .sort((a, b) => b.sesiones - a.sesiones)
