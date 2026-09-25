import { FileText, FlaskConical, PencilLine, Search } from '@lucide/vue'

// Una sesión de agente de ejemplo sobre la práctica de Spring de la tienda,
// compartida por ModeloYHarness y AgentesPorPasos. Es inventada: el código y
// la salida de los tests son para explicar, no de una práctica real.

export const PETICION = 'Que no se pueda crear un producto sin nombre.'

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

export const METODO_NUEVO = `@PostMapping
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

export const BUSCAR = {
  kind: 'step',
  running: 'Buscando dónde se crean los productos',
  done: `Encontrado en ${ARCHIVO}`,
  icon: Search,
  output: `src/main/java/es/teis/tienda/${ARCHIVO}:17  @PostMapping`,
}

export const LEER = {
  kind: 'step',
  running: `Leyendo ${ARCHIVO}`,
  done: `Leído ${ARCHIVO}`,
  icon: FileText,
  output: ANTES,
}

export const EDITAR = {
  kind: 'step',
  running: `Editando ${ARCHIVO}`,
  done: `Editado ${ARCHIVO}`,
  icon: PencilLine,
  diff: { file: ARCHIVO, before: ANTES, after: DESPUES },
  duration: 1800,
}

export const TESTS = {
  kind: 'step',
  running: 'Ejecutando ./mvnw test',
  done: 'Tests: 4 pasan',
  icon: FlaskConical,
  output: `[INFO] Running es.teis.tienda.ProductoControllerTest
[INFO] Tests run: 4, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS`,
}
