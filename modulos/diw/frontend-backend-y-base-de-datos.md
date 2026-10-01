# Frontend, backend y base de datos

Módulo: DIW

El navegador no puede leer la base de datos por su cuenta. En medio hay un servidor: la web le
pide los datos y el servidor se los da.

## Problema

Una página como XestionPacientes muestra una lista de pacientes y guarda los nuevos. Esos
pacientes tienen que seguir ahí al cerrar el navegador, así que viven en una base de datos. Pero
el navegador no puede hablar con ella: no entiende su idioma y, aunque pudiera, dejaría la base
abierta a cualquiera. Hace falta una pieza en medio.

## Tres piezas

Una aplicación web con datos se separa en tres partes:

| Pieza | Qué hace | En XestionPacientes |
|---|---|---|
| Frontend | lo que se ve en el navegador | Vue + Vite (`src/`) |
| Backend | recibe las peticiones y decide | Express (`backend/`) |
| Base de datos | guarda los datos | MongoDB (`docker-compose.yml`) |

El frontend no sabe nada de la base de datos: solo llama al backend. El backend es el único que
habla con MongoDB.

## El viaje de una petición

Guardar un paciente pasa por seis paradas, y la respuesta vuelve por el mismo camino:

1. Rellenas el formulario y pulsas Guardar.
2. El frontend comprueba el DNI, el correo y el teléfono.
3. `src/api/pacientes.js` manda el paciente al backend, como `POST /api/pacientes`.
4. El backend lo pasa a la ruta de pacientes.
5. La ruta lo valida contra el modelo `Paciente` y lo guarda.
6. MongoDB lo almacena; la respuesta vuelve y la tabla se refresca.

## Las piezas del proyecto

| Archivo | Para qué |
|---|---|
| `src/main.js` | arranca Vue y el router |
| `src/App.vue` | cabecera, pie y el hueco donde cambia la página |
| `src/router/index.js` | qué página se ve en cada dirección |
| `src/views/XestionPaciente.vue` | el formulario y la lista de pacientes |
| `src/api/*.js` | las llamadas al backend, con `axios` |
| `backend/server.js` | arranca el servidor y conecta con MongoDB |
| `backend/rutas/pacientes.rutas.js` | el `POST` y el `GET` de pacientes |
| `backend/modelos/Paciente.js` | los campos y cuáles son obligatorios |
| `docker-compose.yml` | levanta MongoDB aparte, con sus datos guardados |

## Arrancarlo

`npm start` levanta a la vez el frontend (Vite) y el backend (Node). La base de datos va aparte,
con Docker, y tiene que estar ya en marcha.

## Para explorar

- [Vue](https://vuejs.org/guide/introduction.html).
- [Express](https://expressjs.com/).
- [MongoDB](https://www.mongodb.com/docs/).

---

Basado en *XestionPacientes: How the Project Works* (@Greg).
