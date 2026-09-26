import { BookOpen, Bot, ClipboardList, FilePen, FileText, FlaskConical, Hammer, PencilLine, Plug, Scale, Search, ShieldCheck } from '@lucide/vue'

// Los guiones de las sesiones de agente que se reproducen en las páginas de IA
// (con AgentReplay). Son inventados, sobre la práctica de Spring de la tienda:
// el código y la salida de los tests son para explicar, no de una práctica real.

const PETICION = 'Que no se pueda crear un producto sin nombre.'

const ANTES = `@RestController
@RequestMapping("/productos")
public class ProductoController {

    private final ProductoRepository repositorio;

    public ProductoController(ProductoRepository repositorio) {
        this.repositorio = repositorio;
    }

    @GetMapping
    public List<Producto> listar() {
        return repositorio.findAll();
    }

    @PostMapping
    public Producto crear(@RequestBody Producto producto) {
        return repositorio.save(producto);
    }
}`

const METODO_NUEVO = `@PostMapping
public ResponseEntity<Producto> crear(@RequestBody Producto producto) {
    if (producto.getNombre() == null || producto.getNombre().isBlank()) {
        return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.status(HttpStatus.CREATED).body(repositorio.save(producto));
}`

const DESPUES = ANTES.replace(
  `    @PostMapping
    public Producto crear(@RequestBody Producto producto) {
        return repositorio.save(producto);
    }`,
  METODO_NUEVO.replace(/^/gm, '    '),
)

const ARCHIVO = 'ProductoController.java'

const BUSCAR = {
  kind: 'step',
  running: 'Buscando dónde se crean los productos',
  done: `Encontrado en ${ARCHIVO}`,
  icon: Search,
  output: `src/main/java/es/teis/tienda/${ARCHIVO}:17  @PostMapping`,
}

const LEER = {
  kind: 'step',
  running: `Leyendo ${ARCHIVO}`,
  done: `Leído ${ARCHIVO}`,
  icon: FileText,
  output: ANTES,
}

const EDITAR = {
  kind: 'step',
  running: `Editando ${ARCHIVO}`,
  done: `Editado ${ARCHIVO}`,
  icon: PencilLine,
  diff: { file: ARCHIVO, before: ANTES, after: DESPUES },
  duration: 1800,
}

const TESTS = {
  kind: 'step',
  running: 'Ejecutando ./mvnw test',
  done: 'Tests: 4 pasan',
  icon: FlaskConical,
  output: `[INFO] Running es.teis.tienda.ProductoControllerTest
[INFO] Tests run: 4, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS`,
}

const pide = (note) => ({ kind: 'prompt', text: PETICION, note })

export const SESIONES = {
  'solo-modelo': [
    pide('La petición, a un modelo solo: el chat de ChatGPT o de Claude en la web.'),
    {
      kind: 'answer',
      text: 'Puedes comprobar el nombre antes de guardar. Cambia el método crear de tu controlador por este:',
      code: { file: 'ProductoController.java', code: METODO_NUEVO },
      note: 'No ha visto tu proyecto: se imagina cómo es. Copiar, pegar y probar lo haces tú.',
    },
  ],
  'con-harness': [
    pide('La misma petición, al mismo modelo con un harness.'),
    { ...BUSCAR, note: 'Busca dónde se crean los productos. La búsqueda la hace el harness; el modelo solo la pide.' },
    { ...LEER, note: 'Lee el archivo entero antes de tocar nada.' },
    { ...EDITAR, note: 'Si no hay nombre, contesta 400; si lo hay, guarda y contesta 201.' },
    { ...TESTS, note: 'Comprueba su propio trabajo: pasa los tests y lee lo que dicen.' },
    {
      kind: 'answer',
      text: 'Hecho. POST /productos contesta 400 si falta el nombre o está vacío, y 201 al crearlo. Los tests pasan.',
      note: 'El modelo es el mismo; el harness es lo que le deja trabajar en tu proyecto.',
    },
  ],
  build: [
    pide('Build es el agente con el que arranca OpenCode.'),
    LEER,
    { ...EDITAR, note: 'Build edita y ejecuta comandos sin preguntar.' },
    { kind: 'answer', text: 'Hecho: POST /productos contesta 400 si falta el nombre.', note: 'Hace lo que le pides.' },
  ],
  plan: [
    pide('Plan es para pensar antes de un cambio grande.'),
    LEER,
    {
      ...EDITAR,
      asking: 'Quiere editar ProductoController.java',
      done: 'Sin editar: le dijiste que no',
      permission: 'ask-deny',
      note: 'Antes de editar, Plan te pregunta. Aquí le dices que no: solo querías el plan.',
    },
    {
      kind: 'answer',
      text: 'Plan: en crear, comprobar que el nombre no esté vacío, contestar 400 si lo está y 201 al guardar. Cambia a Build para hacerlo.',
      note: 'Te deja un plan para revisar y no cambia nada.',
    },
  ],
  tutor: [
    pide('tutor es un agente tuyo, con la edición denegada.'),
    LEER,
    {
      ...EDITAR,
      done: 'Denegado: tutor no puede editar',
      permission: 'deny',
      note: 'Sus permisos dicen edit: deny: el harness le niega la edición aunque el modelo lo intente.',
    },
    {
      kind: 'answer',
      text: 'No puedo cambiar el archivo, pero tú sí. ¿En qué método comprobarías que el producto tiene nombre? ¿Qué debería contestar la API si no lo tiene?',
      note: 'Sus instrucciones dicen guiar, no resolver: te pregunta en vez de escribir el código.',
    },
  ],
  subagente: [
    { kind: 'prompt', text: '¿Dónde se configura la base de datos?', note: 'Una pregunta que obliga a mirar por todo el proyecto.' },
    {
      kind: 'step',
      running: 'Preguntando a Explore',
      done: 'Explore ha contestado',
      icon: Bot,
      session: [
        { kind: 'step', running: 'Buscando "datasource"', done: 'Encontrados 2 archivos', icon: Search },
        { kind: 'step', running: 'Leyendo application.properties', done: 'Leído application.properties', icon: FileText },
        { kind: 'answer', text: 'En src/main/resources/application.properties, en spring.datasource.' },
      ],
      note: 'Build le encarga la búsqueda a Explore, un subagente que solo puede leer. Trabaja en su propia sesión.',
    },
    {
      kind: 'answer',
      text: 'En src/main/resources/application.properties: las claves spring.datasource.* ponen la URL, el usuario y la contraseña.',
      note: 'Solo vuelve la respuesta de Explore, no todo lo que leyó.',
    },
  ],
  skill: [
    {
      kind: 'prompt',
      text: 'Escribe un apunte corto de cómo validar un formulario en Vue.',
      note: 'Una petición cualquiera. No le has dicho que use ninguna skill.',
    },
    {
      kind: 'step',
      running: 'Cargando la skill apuntes-claros',
      done: 'Skill apuntes-claros cargada',
      icon: BookOpen,
      output: `---
name: apuntes-claros
description: Estilo de escritura para cualquier .md de este repo (apuntes, README,
  extra/), conciso, escaneable y sin sonar a texto generado por IA. [...]
---

# Apuntes claros
[...]`,
      note: 'Solo tenía el nombre y la descripción de cada skill. La descripción encaja con "escribir un apunte", así que la carga entera.',
    },
    {
      kind: 'step',
      running: 'Escribiendo modulos/diw/validar-formularios.md',
      done: 'Escrito modulos/diw/validar-formularios.md',
      icon: FilePen,
      output: `# Validar formularios en Vue

Vue valida un campo con una computed que devuelve true o false:

\`\`\`js
const nombreValido = computed(() => nombre.value.trim() !== '')
\`\`\`
[...]`,
      note: 'Escribe siguiendo la skill: empieza por lo importante y enseña el código.',
    },
    {
      kind: 'answer',
      text: 'Hecho: modulos/diw/validar-formularios.md, con el estilo de apuntes-claros.',
      note: 'Las instrucciones de la skill solo entraron cuando hicieron falta.',
    },
  ],
  mcp: [
    {
      kind: 'prompt',
      text: '¿Cómo se usa defineModel en Vue 3.5? use context7',
      note: 'Context7 es un MCP: conecta al agente con la documentación oficial de las librerías. "use context7" le dice que lo use.',
    },
    {
      kind: 'step',
      running: 'Buscando "vue" en Context7',
      done: 'Encontrada la documentación de Vue',
      icon: Plug,
      note: 'Esto no lo trae el agente: lo hace a través de la conexión con Context7.',
    },
    {
      kind: 'step',
      running: 'Leyendo la documentación de defineModel',
      done: 'Leída la documentación de defineModel',
      icon: Search,
      note: 'Lee la documentación de ahora, no lo que recordaba el modelo de cuando lo entrenaron.',
    },
    {
      kind: 'answer',
      text: 'defineModel() declara de una vez la prop y el evento que la actualiza. En el hijo, const nombre = defineModel(); en el padre, <Hijo v-model="texto" />.',
      code: {
        file: 'Hijo.vue',
        code: `<script setup>
const nombre = defineModel()
</script>

<template>
  <input v-model="nombre" />
</template>`,
      },
      note: 'La respuesta sale de la documentación que acaba de leer.',
    },
  ],
  buscar: [
    {
      kind: 'prompt',
      text: 'Quiero que un texto se anime al cambiar de valor en Vue, como un contador que pasa de 3 a 4. Antes de hacerlo, ¿hay algo hecho que pueda usar?',
      note: 'Le pides que busque antes de construir, y le dices para qué lo quieres.',
    },
    {
      kind: 'step',
      running: 'Buscando en GitHub',
      done: 'Encontrados varios proyectos',
      icon: Search,
      output: `$ gh search repos "text morph animation" --sort stars
lochie/torph                    Dependency-free animated text component.   MIT
svgdotjs/svg.textmorph.js       text morphing for svg.js                    MIT
Text-Morph-Animation            (sin descripción)                           sin licencia
...`,
      note: 'Sale de todo: proyectos cuidados y pruebas de alguien sin licencia.',
    },
    {
      kind: 'step',
      running: 'Mirando si están vivos y su licencia',
      done: 'Comprobados torph y svg.textmorph.js',
      icon: Scale,
      output: `lochie/torph            último cambio: este mes    licencia: MIT    trae versión para Vue
svg.textmorph.js        solo para svg.js                              licencia: MIT
Text-Morph-Animation    sin licencia: no se puede usar su código`,
      note: 'Lo importante no son las estrellas: que se mantenga, que tenga licencia y que encaje con lo que usas.',
    },
    {
      kind: 'answer',
      text: 'Usa torph: hace justo eso, tiene versión para Vue (torph/vue), se sigue manteniendo y su licencia MIT te deja usarlo en tu proyecto. Se instala con npm install torph.',
      note: 'Había algo maduro que hace lo que necesitas: úsalo en vez de construirlo.',
    },
  ],
  equipo: [
    {
      kind: 'prompt',
      text: 'Quiero un buscador de empresas donde hacer la FCT: qué tecnologías usan, qué hizo allí cada alumno y si la recomienda. Para toda la clase.',
      note: 'Lo pides una vez, en palabras normales. Lo que importa es que digas qué quieres y para quién.',
    },
    {
      kind: 'step',
      running: 'El explorador busca si ya existe',
      done: 'El explorador: nada hecho para la FCT de un centro',
      icon: Search,
      session: [
        { kind: 'step', running: 'Buscando directorios de empresas de FCT', done: 'Encontrados portales de empleo genéricos', icon: Search },
        { kind: 'answer', text: 'No hay nada para la FCT de un centro. Los portales de empleo no guardan qué hizo allí cada alumno.' },
      ],
      note: 'Primero, buscar antes de construir. Aquí no hay nada maduro: toca construirlo.',
    },
    {
      kind: 'step',
      running: 'El que especifica escribe qué tiene que hacer',
      done: 'Especificación escrita en SPEC.md',
      icon: ClipboardList,
      output: `# Buscador de empresas de FCT

- Cada empresa: nombre, ciudad y tecnologías.
- Cada alumno que estuvo: qué hizo y si la recomienda.
- Buscar por tecnología o por ciudad.
- Fuera, de momento: cuentas de usuario.`,
      note: 'Qué hace, qué no y cómo se sabrá que está bien. Es lo primero que revisas tú.',
    },
    {
      kind: 'step',
      running: 'El constructor desarrolla',
      done: 'El constructor: proyecto hecho y con tests',
      icon: Hammer,
      session: [
        { kind: 'step', running: 'Leyendo SPEC.md y AGENTS.md', done: 'Leídos SPEC.md y AGENTS.md', icon: FileText },
        { kind: 'step', running: 'Creando el proyecto con Spring Boot', done: 'Creado el proyecto', icon: FilePen },
        { kind: 'step', running: 'Escribiendo los tests de la búsqueda', done: 'Tests escritos', icon: FlaskConical },
        { kind: 'answer', text: 'Hecho: empresas, opiniones de alumnos y búsqueda por tecnología y ciudad.' },
      ],
      note: 'Construye siguiendo la especificación y las reglas del proyecto (AGENTS.md y sus skills).',
    },
    {
      kind: 'step',
      running: 'El revisor comprueba',
      done: 'El revisor: 1 fallo encontrado',
      icon: ShieldCheck,
      output: `✔ busca por tecnología
✔ busca por ciudad
✘ una empresa sin opiniones sale como "no recomendada"`,
      note: 'Otro agente, con otro papel, revisa lo que hizo el primero. Encuentra lo que se le pasó.',
    },
    {
      kind: 'answer',
      text: 'Listo para que lo revises: el buscador funciona y hay un fallo apuntado, una empresa sin opiniones no debería salir como "no recomendada". ¿Lo arreglo?',
      note: 'Al final vuelve a ti: revisas y decides. El trabajo lo hicieron ellos; la última palabra es tuya.',
    },
  ],
}
