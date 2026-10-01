<script setup>
import { CodeBlock } from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import DiagramaPeticion from '../../visuales/DiagramaPeticion.vue'

// modulos/dwcs/controladores-y-rutas.md
const CONTROLADOR = `@Controller
public class HomeController { }`

const RUTA = `@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "index";   // templates/index.html
    }
}`

const VARIAS = `@GetMapping({"/", "/home", ""})`

const PREFIJO = `@Controller
@RequestMapping("/products")
public class ProductController {

    @GetMapping("/")             // /products/
    public String showView() { ... }

    @GetMapping("/electronics")  // /products/electronics
    public String showElectronics() { ... }
}`

const PATH_VARIABLE = `@GetMapping("/products/{id}")
public String showProduct(@PathVariable Long id) { ... }`

const QUERY = `@GetMapping("/products")
public String list(@RequestParam String category, Model model) { ... }`

const QUERY_OPCIONAL = `@RequestParam(required = false, defaultValue = "todos") String category`

const QUERY_OPTIONAL = `@RequestParam Optional<String> category   // category.orElse("todos")`

const MODEL = `@GetMapping("/saludo")
public String saludo(Model model) {
    model.addAttribute("nombre", "Ana");
    return "saludo";
}`
</script>

<template>
  <PlantillaPagina
    titulo="Controladores y rutas"
    entradilla="Cuando el navegador pide una URL, alguien en el servidor tiene que decidir qué responder. De eso se encarga el controlador: recibe las peticiones y las lleva al método que toca."
  >
    <h2 id="controlador">Controlador</h2>
    <p>
      Un <strong>controlador</strong> es la clase que recibe las peticiones HTTP del cliente y
      decide qué hacer con ellas. Se marca con <code>@Controller</code>, y Spring lo crea como un
      bean (ver <RouterLink to="/modulos/dwcs/spring-y-contenedor">Spring y el contenedor</RouterLink>).
    </p>
    <CodeBlock :code="CONTROLADOR" language="java" />
    <DiagramaPeticion />
    <p><strong>La misma petición acaba en una vista HTML o en datos JSON, según el controlador.</strong></p>

    <h2 id="rutas">Rutas</h2>
    <p>
      Una <strong>ruta</strong> es la dirección que atiende un método. <code>@GetMapping</code>
      asocia una ruta a un método para las peticiones GET (las de abrir una página). El método
      devuelve el nombre de la vista, y su archivo sale de <code>templates/</code>:
    </p>
    <CodeBlock :code="RUTA" language="java" />

    <h2 id="varias-rutas">Varias rutas en una</h2>
    <p>
      Dentro de la anotación caben varias direcciones entre llaves, separadas por comas. Así la
      misma vista responde en <code>/</code>, en <code>/home</code> y en la raíz sin nada:
    </p>
    <CodeBlock :code="VARIAS" language="java" />

    <h2 id="prefijo">Prefijo con @RequestMapping</h2>
    <p>
      <code>@RequestMapping</code> sobre la clase pone un prefijo que se añade a todas sus rutas.
      Sirve para agrupar y diferenciar las rutas de una parte de la aplicación:
    </p>
    <CodeBlock :code="PREFIJO" language="java" />

    <h2 id="path-variable">Variable en la ruta</h2>
    <p>
      <code>@PathVariable</code> coge un trozo variable de la URL y lo pasa como parámetro. Ese
      trozo se escribe entre llaves:
    </p>
    <CodeBlock :code="PATH_VARIABLE" language="java" />

    <h2 id="query">Parámetro en la query</h2>
    <p>
      Un trozo de la ruta va con <code>@PathVariable</code>. Lo que va después del
      <code>?</code> va con <code>@RequestParam</code>:
    </p>
    <CodeBlock :code="QUERY" language="java" />
    <p>
      Con esa ruta, <code>/products?category=libros</code> deja <code>category</code> con el valor
      <code>libros</code>.
    </p>
    <table>
      <thead>
        <tr><th>Se escribe</th><th>Se lee con</th><th>Ejemplo</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>en la ruta: <code>/products/{id}</code></td>
          <td><code>@PathVariable</code></td>
          <td><code>/products/5</code></td>
        </tr>
        <tr>
          <td>tras el <code>?</code>: <code>?category=libros</code></td>
          <td><code>@RequestParam</code></td>
          <td><code>/products?category=libros</code></td>
        </tr>
      </tbody>
    </table>
    <p>Si el parámetro puede no venir, no lo dejes obligatorio, o el método responde con un 400:</p>
    <CodeBlock :code="QUERY_OPCIONAL" language="java" />
    <p>Con <code>Optional</code> lo recibes como un valor que puede faltar y decides tú:</p>
    <CodeBlock :code="QUERY_OPTIONAL" language="java" />

    <h2 id="model">Pasar datos a la vista</h2>
    <p>
      El controlador le entrega datos a la plantilla con un objeto <code>Model</code>. Cada dato
      lleva un nombre con el que la plantilla lo usa después:
    </p>
    <CodeBlock :code="MODEL" language="java" />

    <h2 id="vista-o-api">Con vista o sin vista</h2>
    <p>Según lo que devuelva, hay dos tipos de controlador:</p>
    <table>
      <thead>
        <tr><th>Anotación</th><th>Devuelve</th><th>Para</th></tr>
      </thead>
      <tbody>
        <tr><td><code>@Controller</code></td><td>el nombre de una vista</td><td>una página HTML (MVC)</td></tr>
        <tr><td><code>@RestController</code></td><td>datos, normalmente en JSON</td><td>una API</td></tr>
      </tbody>
    </table>
    <p>
      En MVC hay vista. En una API hay modelo y controlador, pero no hay vista: el cliente recibe
      los datos y los pinta él.
    </p>

    <h2 id="estaticos">Archivos estáticos</h2>
    <p>
      Las imágenes, el CSS y el JavaScript que no pasan por Thymeleaf van en
      <code>static/</code> (<code>src/main/resources/static/</code>).
    </p>

    <h2 id="para-explorar">Para explorar</h2>
    <ul>
      <li>
        <a href="https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-requestmapping.html" target="_blank" rel="noopener noreferrer">Mapping Requests</a>
        en la documentación de Spring.
      </li>
      <li>
        <a href="https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann.html" target="_blank" rel="noopener noreferrer">Annotated Controllers</a>:
        cómo se declara un controlador.
      </li>
    </ul>
  </PlantillaPagina>
</template>
