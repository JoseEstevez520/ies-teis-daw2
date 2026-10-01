<script setup>
import { CodeBlock, CodeDiff } from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import DiagramaServicio from '../../visuales/DiagramaServicio.vue'

// modulos/dwcs/servicios-e-inyeccion.md
const SERVICIO = `@Service
public class CalculosService {

    public double media(List<Integer> notas) { ... }
}`

const INYECTAR = `@Controller
public class CalculosController {

    @Autowired
    CalculosService calculosService;
}`

const INTERFAZ = `public interface CalculosService {
    double media(List<Integer> notas);
}

@Service
public class CalculosServiceImpl implements CalculosService { ... }`

const ANTES = `@Controller
public class CalculosController {

    @Autowired
    CalculosServiceImpl calculosService;   // la implementación
}`

const DESPUES = `@Controller
public class CalculosController {

    @Autowired
    CalculosService calculosService;   // la interfaz
}`
</script>

<template>
  <PlantillaPagina
    titulo="Servicios e inyección"
    entradilla="El controlador atiende la petición, pero la lógica del negocio no va en él. Va en un servicio, y Spring se lo entrega al controlador ya creado."
  >
    <h2 id="servicio">Servicio</h2>
    <p>
      Un <strong>servicio</strong> es la clase donde vive la lógica del negocio. Se marca con
      <code>@Service</code>, así que es un bean que Spring crea y maneja (ver
      <RouterLink to="/modulos/dwcs/spring-y-contenedor">Spring y el contenedor</RouterLink>). El
      controlador llama al servicio y el servicio hace el trabajo.
    </p>
    <CodeBlock :code="SERVICIO" language="java" />

    <h2 id="inyectar">Inyectar el servicio</h2>
    <p>
      El controlador no crea el servicio con <code>new</code>: lo recibe de Spring como una
      propiedad de la clase. Se le dice con <code>@Autowired</code>. Sin él, Spring no sabe que
      tiene que rellenar ese campo y lo trata como una variable local.
    </p>
    <CodeBlock :code="INYECTAR" language="java" />
    <p>
      Hay formas mejores de inyectar que esta (ver
      <RouterLink to="/modulos/dwcs/spring-y-contenedor">Spring y el contenedor</RouterLink>).
    </p>

    <h2 id="interfaz">Inyectar la interfaz, no la implementación</h2>
    <p>
      El servicio suele ser una <strong>interfaz</strong> (el contrato: qué sabe hacer) con una
      <strong>implementación</strong> aparte (cómo lo hace):
    </p>
    <CodeBlock :code="INTERFAZ" language="java" />
    <p>El controlador inyecta la interfaz, no la clase que la implementa:</p>
    <CodeDiff :before="ANTES" :after="DESPUES" file="CalculosController.java" />
    <DiagramaServicio />
    <p><strong>Si cambia la implementación, el controlador no se toca.</strong></p>

    <h2 id="varias">Varias implementaciones</h2>
    <p>
      Si hay más de una clase que implementa la interfaz, Spring no sabe cuál usar y falla. Se
      resuelve diciendo cuál manda:
    </p>
    <table>
      <thead>
        <tr><th>Anotación</th><th>Para</th></tr>
      </thead>
      <tbody>
        <tr><td><code>@Primary</code></td><td>marca la que se usa por defecto</td></tr>
        <tr><td><code>@Qualifier("nombre")</code></td><td>elige una concreta por su nombre</td></tr>
      </tbody>
    </table>

    <h2 id="redirect">Volver a una ruta</h2>
    <p>
      <code>return "redirect:/"</code> manda al usuario a <code>/</code> y limpia la ruta que
      tenía (por ejemplo <code>/voto?foto=1</code>), para que recargar no repita la última acción.
    </p>

    <h2 id="para-explorar">Para explorar</h2>
    <ul>
      <li>
        <a href="https://docs.spring.io/spring-framework/reference/core/beans/annotation-config/autowired.html" target="_blank" rel="noopener noreferrer"><code>@Autowired</code></a>
        en la documentación de Spring.
      </li>
      <li>
        <a href="https://docs.spring.io/spring-framework/reference/core/beans/annotation-config/autowired-primary.html" target="_blank" rel="noopener noreferrer">Elegir entre varias con <code>@Primary</code></a>.
      </li>
    </ul>
  </PlantillaPagina>
</template>
