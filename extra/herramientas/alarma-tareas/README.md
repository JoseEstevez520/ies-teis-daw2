# Alarma de tareas

Idea: avisar solo de tareas pendientes de verdad (fecha pasada y sin entregar), sin
duplicar avisos de lo que ya tienes controlado.

Esto es documentación de diseño, sin código todavía. Ver
[`../moodle-api.md`](../moodle-api.md) para cómo sacar el token y llamar a la API.

## Datos que hacen falta

- **`core_calendar_get_action_events_by_timesort`**: cronograma completo de tareas
  pendientes de todos tus cursos en una sola llamada. Es el punto de partida.
- **`mod_assign_get_submission_status`** (por tarea): confirma si de verdad está sin
  entregar (`status: "new"`) o ya entregada, para no avisar de algo que ya hiciste.

Las dos funciones están probadas y devuelven datos reales, no es una suposición.

## El punto difícil

No es leer el cronograma, es no machacar a nadie con recordatorios de cosas que ya sabía.
Eso implica llevar algún registro de "esto ya se avisó" entre ejecuciones, no solo pedir
la lista cada vez.
