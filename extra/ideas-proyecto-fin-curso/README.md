# Ideas para el proyecto de fin de curso

Propuestas, referencias y notas sobre qué suele funcionar bien en un proyecto final:
alcance realista, qué mirar los evaluadores, ejemplos de proyectos anteriores.

Si tienes una idea de proyecto, apúntala aquí aunque no la vayas a hacer tú. Puede
inspirar a otro, o alguien puede sumarse.

## App de acompañamiento del Aula Virtual

Web estática (sin backend) que junta en una sola pantalla lo que hoy hay que ir a buscar
por separado en Moodle: tareas pendientes de verdad (con estado real de entrega), notas
nuevas por curso, y en qué asignatura llevas tiempo sin entrar.

- **Diseño**: cada usuario pega su propio token de la API en su navegador (se queda ahí,
  nunca pasa por ningún servidor). Detalles técnicos y funciones de Moodle ya probadas:
  [`../herramientas/moodle-api.md`](../herramientas/moodle-api.md).
- **Por qué sin backend**: en cuanto un servidor centraliza datos de varias personas, quien
  lo monta pasa a ser responsable de esos datos (RGPD), sea gratis o de pago. Manteniendo
  cada dato en el navegador de su propio dueño, eso no aplica.
- **Abierto, sin resolver todavía**:
  - Si el navegador puede llamar directo a la API del Aula Virtual desde una web en otro
    dominio (CORS) o hace falta algo intermedio.
  - Sin servidor, no hay forma de avisar si no tienes la página abierta. Para eso haría
    falta algo aparte corriendo por cuenta de cada uno (ver
    [`../herramientas/alarma-tareas/`](../herramientas/alarma-tareas/)).
- **Encaja bien como PFC** porque cubre frontend + consumo de una API REST real + una
  decisión de arquitectura defendible (por qué sin backend), no solo un CRUD de ejemplo.
