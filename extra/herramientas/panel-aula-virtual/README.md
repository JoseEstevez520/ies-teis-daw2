# Panel del Aula Virtual

Junta en una sola pantalla lo que hoy hay que ir a buscar por separado en Moodle: tareas
pendientes de verdad (con estado real de entrega), notas nuevas por curso, y en qué
asignatura llevas tiempo sin entrar. Detalles técnicos y funciones de Moodle ya probadas:
[`../moodle-api.md`](../moodle-api.md).

Backend empezado en [`backend/`](backend/): `/api/tareas` y `/api/notas` ya funcionan de
extremo a extremo. Actividad y todo el frontend siguen sin construir.

## Fase 1: versión personal autoalojada (la primera a construir)

Cada uno la corre en su propia máquina/servidor, con su propio token.

- **Por qué con backend propio y no solo una web estática**: un backend propio resuelve
  dos límites que tendría una web sin servidor: llamar a la API sin problemas de CORS
  (la petición la hace tu servidor, no el navegador desde otro dominio), y poder avisar
  de verdad aunque no tengas la página abierta (con un cron + Telegram/email).
- **Datos**: solo los tuyos, en tu propia máquina. No hay ningún RGPD que gestionar: es
  uso personal, cae en la excepción de actividad doméstica (art. 2.2.c RGPD).
- **Coste**: cero si lo corres en tu propio ordenador o un free tier (GitHub Actions +
  Telegram, por ejemplo).

## Fase 2 (futuro, sin decidir todavía): hospedado para quien no tenga dónde ponerlo

No todos van a tener manera de autoalojar la Fase 1. Si se quiere ofrecer una versión
hospedada por alguien (con el consentimiento de cada uno, todos mayores de edad):

- **Un VPS + un contenedor Docker por persona**, no una app compartida con una base de
  datos común. Cada contenedor solo conoce los datos de su dueño, así que un fallo de la app no
  puede mezclar los datos de dos personas, porque cada una vive en su propia caja.
- **Solución ya hecha para esto**: [ShinyProxy](https://www.shinyproxy.io/), pensado
  exactamente para "un contenedor aislado por usuario, detrás de un login", funciona con
  cualquier imagen Docker. Su modo de autenticación "simple" (usuario+contraseña por
  persona en un archivo de configuración) encaja con un grupo pequeño y conocido como una
  clase. Ojo: esas contraseñas quedan en texto plano en el servidor según su propia
  documentación, así que deben ser contraseñas nuevas, nunca las del Aula Virtual.
- **Lo que esto NO resuelve solo con Docker**: si el servidor entero se compromete (no el
  contenedor de uno, la máquina), todos los contenedores quedan expuestos. Docker aísla
  fallos de la aplicación, no sustituye la seguridad del servidor.
- **Responsabilidad real de quien lo hospeda**: el token de cada uno es una credencial (la
  llave de su cuenta de Moodle), no un dato cualquiera. Guardar tokens de otras personas
  en un servidor propio exige tomárselo en serio: cifrado en la base de datos, solo
  funciones de lectura habilitadas (nunca las de entrega), y un aviso claro a cada uno de
  qué se guarda y que pueden pedir borrado cuando quieran.

## Stack

**Frontend**: Vue 3 + Vite + Tailwind. Para las animaciones,
**[Motion](https://motion.dev/docs/vue)** (`motion-v`, el paquete oficial de Motion para
Vue): hay varias vistas y listas que cambian, suficiente complejidad para justificarlo.
Estilo visual: ver [`../README.md`](../README.md#estilo-visual).

**Backend**: Spring Boot, módulo Web (REST), el frontend en Vue habla con él por API. En
Fase 2, con varios usuarios, se añade JPA para persistir el token de cada uno.

## Ideas para automatizar (sin construir todavía)

- Generar el propio `.ics` desde los datos ya obtenidos (el export de calendario de
  Moodle está bloqueado por el clasificador de seguridad, pero el resultado se puede
  construir a mano con lo que ya se saca de la API).
- Resumen semanal por Telegram (domingo noche) en vez de avisos sueltos.
- Detectar contenido nuevo del profesor comparando `core_course_get_contents` entre
  ejecuciones del cron, no solo tareas.
- Cruzar con las fechas de evaluación del curso (1ª, 2ª, final) sacadas del PDF de
  Tutoría, no solo con las entregas sueltas.

## Legal

- El consentimiento de cada compañero es base legal suficiente para la Fase 2 (art. 6.1.a
  RGPD), pero no elimina la responsabilidad de quien hospeda: sigue teniendo que cumplir
  seguridad adecuada y las peticiones de borrado.
- Nombre sin "Moodle" (política de marca, ver [`../moodle-api.md`](../moodle-api.md)).

## Referencias

- [Muster](https://github.com/Poetrynan/Muster): experiencia de usuario de referencia.
- [Moodle-DL](https://github.com/C0D3D3V/Moodle-DL): mismo tipo de descarga vía API,
  maduro.
- [ShinyProxy](https://www.shinyproxy.io/): la pieza de "contenedor por usuario" de la
  Fase 2, ya construida.

## También vale como proyecto de fin de curso

Cubre frontend/backend + consumo de una API REST real + una decisión de arquitectura
defendible (por qué cada fase está diseñada así), no solo un CRUD de ejemplo.
