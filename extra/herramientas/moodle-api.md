# API del Aula Virtual (Moodle)

Referencia técnica compartida para cualquier herramienta que necesite datos del Aula
Virtual: qué es, cómo sacar un token y qué funciones ya probamos que funcionan.

## Qué es

El Aula Virtual tiene los web services oficiales de Moodle activados. Es el mismo mecanismo
que usa la app Moodle Mobile, no un hackeo. Cada alumno ya tiene un token generado para
el servicio "Moodle mobile web service".

## Cómo sacar tu token

1. Aula Virtual → tu perfil → Preferencias → Chaves de seguridade.
2. Busca la fila "Moodle mobile web service" y pulsa "Restabelecer".
3. **Cuidado**: si tienes la app Moodle Mobile instalada, esto la desconecta (habría que
   volver a loguearla). Si solo usas el navegador, no pasa nada.
4. Moodle enseña el token una única vez. Guárdalo en un `.env` local (nunca en el repo,
   ver [`.env.example`](../../.env.example)).

## URL base

```
https://centros.edu.xunta.gal/iesteis/aulavirtual/webservice/rest/server.php
```

Petición tipo (con `curl`):

```bash
curl -s "${MOODLE_URL}/webservice/rest/server.php" \
  --data-urlencode "wstoken=${MOODLE_TOKEN}" \
  --data-urlencode "wsfunction=NOMBRE_DE_LA_FUNCION" \
  --data-urlencode "moodlewsrestformat=json"
```

## Funciones de solo lectura ya probadas

- **`core_webservice_get_site_info`**: tu perfil + lista de funciones que tu token puede
  usar. Punto de partida para comprobar que el token funciona.
- **`core_enrol_get_users_courses`** (con `userid`): tus cursos matriculados, con su id
  de Moodle.
- **`core_calendar_get_action_events_by_timesort`**: cronograma completo de tareas
  pendientes de todos los cursos en una sola llamada.
- **`mod_assign_get_assignments`**: todas las tareas de todos los cursos con fecha,
  incluidas las ya entregadas o sin entrega.
- **`mod_assign_get_submission_status`** (con `assignid`): si una tarea concreta está
  entregada de verdad o no.
- **`core_course_get_contents`** (con `courseid`): contenido completo de un curso
  (secciones, archivos, tareas, enlaces).
- **`message_popup_get_popup_notifications`** (con `useridto`): notificaciones sin leer.

## Lo que no funciona desde una cuenta de alumno

- Funciones de profesor (ej. `mod_assign_get_submissions`, que lista entregas de todo el
  grupo) dan `accessexception`. Es lo esperado, no un fallo.
- El servicio "Attendance" (`mod_attendance`) también existe como token aparte, pero está
  pensado para la app del profesor pasando lista, no para que un alumno consulte sus
  propias faltas, y además ningún curso de este año lo tiene activado. Ver
  [`../calculadora-de-faltas/README.md`](../calculadora-de-faltas/README.md).

## Seguridad: qué no se ha probado y por qué

Moodle ha tenido antes fallos reales de comprobación de permisos en esta misma familia de
funciones (`mod/assign` externallib: saltarse fechas de entrega, asignar correctores sin
permiso, ver notas ocultas). Esta instancia corre una versión reciente (4.5.12+, build de
julio 2026), así que esos agujeros concretos casi seguro están parcheados, pero no se ha
probado en vivo si hay algo nuevo. Comprobar los límites de permisos de un token contra
el servidor del centro necesita autorización del propio centro, no solo la del alumno
dueño del token. Si algún día se quiere verificar esto en serio, hay que pedir permiso
primero.

## Marca

Moodle prohíbe usar la palabra "Moodle" en el nombre de una herramienta de terceros,
aunque sea gratuita ([Moodle Trademark Guidelines](https://moodle.com/wp-content/uploads/2024/01/Moodle-Trademark-Guidelines-2023.pdf)).
Nombra las herramientas por lo que hacen (`alarma-tareas`, no `MoodleAlarma`), y menciona
Moodle solo como descripción ("consulta el Aula Virtual (Moodle) vía su API").

## Referencias

Apps que ya hacen algo parecido, para no reinventar el diseño desde cero:

- [Muster](https://github.com/Poetrynan/Muster): dashboard de escritorio, cronograma
  unificado con estado real de entrega, resúmenes con IA.
- [Moodle-DL](https://github.com/C0D3D3V/Moodle-DL): descarga masiva de materiales de
  curso vía API oficial, maduro y muy usado.
