import { Bot, FileText, FlaskConical, PencilLine, Search } from '@lucide/vue'

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
}
