<script setup>
import { CodeBlock } from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import DiagramaEscalabilidad from '../../visuales/DiagramaEscalabilidad.vue'

// modulos/dwcs/spring-y-contenedor.md
const ARBOL = `mi-proyecto/
├── pom.xml                              ← las librerías que usa
└── src/
    └── main/
        ├── java/…/                      ← el código Java
        │   └── NombreApplication.java   ← la clase que arranca (el corazón)
        └── resources/
            ├── application.properties   ← la configuración (puerto, base de datos)
            └── templates/               ← las páginas HTML que se sirven`
</script>

<template>
  <PlantillaPagina
    titulo="Spring, Spring Boot y el contenedor"
    entradilla="Java es un lenguaje de programación muy usado en aplicaciones grandes. Spring es un framework de Java que crea los objetos de tu aplicación y los conecta por ti."
  >
    <h2 id="problema">Problema</h2>
    <p>
      En Java, cada clase crea los objetos que necesita con <code>new</code> y los usa
      directamente. Con dos o tres clases no da problemas; cuando la aplicación crece, hay que
      montar y mantener a mano muchísimas conexiones, y cambiar un objeto obliga a tocar todos los
      sitios que lo crean.
    </p>
    <p>Y cuantas más clases tiene la aplicación, más conexiones hay que mantener a mano:</p>
    <DiagramaEscalabilidad />
    <p><strong>A mano, ese trabajo crece con el tamaño de la aplicación; con Spring lo hace el contenedor.</strong></p>

    <h2 id="solucion">Solución</h2>
    <p>
      <strong>Spring se encarga de eso</strong>: crea los objetos y decide quién recibe a quién. El
      control de crearlos pasa de tu código a Spring; eso se llama <strong>inversión de
      control</strong>.
    </p>

    <h2 id="spring-boot">Spring Boot</h2>
    <p>
      <strong>Spring Boot es Spring con la configuración ya hecha.</strong> Lo que aporta son los
      ajustes por defecto: qué servidor usa, cómo se conecta a la base de datos, qué
      <strong>dependencias</strong> carga (las librerías de otros que tu proyecto usa). Con Spring
      a secas se configura a mano; Boot lo trae puesto.
    </p>

    <h2 id="archivos">Los archivos del proyecto</h2>
    <p>Un proyecto de Spring Boot tiene estas piezas, siempre en el mismo sitio:</p>
    <CodeBlock :code="ARBOL" title="mi-proyecto" />

    <h2 id="contenedor">Contenedor</h2>
    <p>
      El <strong>contenedor</strong> (en Spring, <code>ApplicationContext</code>) es donde Spring
      guarda los objetos que ha creado. Cuando una clase necesita uno, se lo pide al contenedor y
      este se lo entrega.
    </p>

    <h2 id="bean">Bean</h2>
    <p>
      Un <strong>bean</strong> es un objeto que Spring crea y maneja. Para que una clase sea un
      bean, se marca con una anotación según su papel:
    </p>
    <table>
      <thead>
        <tr><th>Anotación</th><th>Para</th></tr>
      </thead>
      <tbody>
        <tr><td><code>@Component</code></td><td>una clase genérica</td></tr>
        <tr><td><code>@Service</code></td><td>lógica de negocio</td></tr>
        <tr><td><code>@Repository</code></td><td>acceso a datos (además traduce las excepciones de la base de datos)</td></tr>
        <tr><td><code>@Controller</code> / <code>@RestController</code></td><td>entrada de peticiones HTTP</td></tr>
      </tbody>
    </table>
    <p>De cara al contenedor, las cuatro registran la clase como bean.</p>

    <h2 id="instancia">Instancia</h2>
    <p>
      Una <strong>instancia</strong> es un objeto concreto de una clase. De un bean, Spring puede
      guardar una instancia o crear una nueva cada vez; eso lo decide el scope:
      <RouterLink to="/modulos/dwcs/scopes-y-estado">Scopes y estado</RouterLink>.
    </p>

    <h2 id="inyeccion">Inyección de dependencias</h2>
    <p>
      La <strong>inyección de dependencias</strong> es Spring entregándole a cada bean los objetos
      que necesita, en vez de que los cree él. A esos objetos se les llama
      <strong>dependencias</strong>.
    </p>
    <p>Hay tres formas de inyectar:</p>
    <table>
      <thead>
        <tr><th>Forma</th><th>Cómo</th><th>Cuándo</th></tr>
      </thead>
      <tbody>
        <tr><td>Constructor</td><td>parámetro del constructor</td><td>la recomendada: deja los campos <code>final</code> y se ve en los tests</td></tr>
        <tr><td>Setter</td><td>método con <code>@Autowired</code></td><td>cuando la dependencia es opcional</td></tr>
        <tr><td>Campo</td><td><code>@Autowired</code> sobre el atributo</td><td>evítala: esconde las dependencias y complica el test</td></tr>
      </tbody>
    </table>
    <p>Con un solo constructor, <code>@Autowired</code> no hace falta.</p>
  </PlantillaPagina>
</template>
