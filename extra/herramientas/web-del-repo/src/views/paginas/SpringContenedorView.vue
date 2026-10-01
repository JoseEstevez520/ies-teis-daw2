<script setup>
import {
  CodeBlock,
  DescriptionItem,
  DescriptionList,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import Tecnologias from '../../components/Tecnologias.vue'
import DiagramaEscalabilidad from '../../visuales/DiagramaEscalabilidad.vue'
import DiagramaCapas from '../../visuales/DiagramaCapas.vue'
import DiagramaContenedor from '../../visuales/DiagramaContenedor.vue'
import { siApacheant, siApachemaven, siGradle } from 'simple-icons'

// modulos/dwcs/spring-y-contenedor.md
const GESTORES = [
  { icon: siApachemaven, nombre: 'Maven' },
  { icon: siGradle, nombre: 'Gradle' },
  { icon: siApacheant, nombre: 'Ant' },
]

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

const LOMBOK = `@Data
public class Alumno {
    private String nombre;
    private int edad;
}`

const INY_CONSTRUCTOR = `@Service
public class PedidoService {

    private final PedidoRepository repo;

    public PedidoService(PedidoRepository repo) {   // con un solo constructor, @Autowired sobra
        this.repo = repo;
    }
}`

const INY_SETTER = `@Autowired
public void setRepo(PedidoRepository repo) {
    this.repo = repo;
}`

const INY_CAMPO = `@Autowired
private PedidoRepository repo;   // evítala: esconde la dependencia`
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

    <h2 id="maven">Maven y las dependencias</h2>
    <p>
      Un proyecto Java usa un <strong>gestor de proyectos</strong> que automatiza la compilación,
      las dependencias, las pruebas y el empaquetado. Los más usados son <strong>Maven</strong>,
      <strong>Gradle</strong> y, el más antiguo, <strong>Ant</strong>. Spring Boot usa Maven por
      defecto.
    </p>
    <Tecnologias :items="GESTORES" />
    <p>
      Las <strong>dependencias</strong> son librerías de otros que tu proyecto usa, para no
      escribir desde cero lo que ya está hecho. Cada una se identifica con tres datos, sus
      <strong>coordenadas</strong> o <strong>GAV</strong>, y se declaran en <code>pom.xml</code>,
      el archivo de Maven:
    </p>
    <DescriptionList divided>
      <DescriptionItem term="G · groupId"><code>com.example</code></DescriptionItem>
      <DescriptionItem term="A · artifactId"><code>myapp</code></DescriptionItem>
      <DescriptionItem term="V · version"><code>1.0.0</code></DescriptionItem>
    </DescriptionList>

    <h2 id="configuracion">Configuración</h2>
    <p>
      El puerto del servidor, la conexión a la base de datos y otros ajustes se cambian en
      <code>src/main/resources/application.properties</code>. Por defecto la aplicación arranca en
      <code>localhost:8080</code>.
    </p>

    <h2 id="lombok">Lombok</h2>
    <p>
      <strong>Lombok genera por ti el código repetitivo</strong>, el que en inglés se llama
      <em>boilerplate</em>: los getters, los setters, <code>toString</code> y compañía. Se añade
      como dependencia y se marca la clase:
    </p>
    <CodeBlock :code="LOMBOK" language="java" />
    <table>
      <thead>
        <tr><th>Anotación</th><th>Genera</th></tr>
      </thead>
      <tbody>
        <tr><td><code>@Getter</code> / <code>@Setter</code></td><td>los getters / los setters</td></tr>
        <tr><td><code>@Data</code></td><td>todo lo anterior, más <code>toString</code>, <code>equals</code> y <code>hashCode</code></td></tr>
      </tbody>
    </table>

    <h2 id="jar-war">JAR y WAR</h2>
    <p>Al empaquetar, el proyecto entero se junta en un solo archivo:</p>
    <ul>
      <li><strong>JAR</strong>: una aplicación Java que se ejecuta por sí sola (<code>java -jar app.jar</code>).</li>
      <li><strong>WAR</strong>: una aplicación web que se despliega en un servidor de aplicaciones.</li>
    </ul>

    <h2 id="archivos">Los archivos del proyecto</h2>
    <p>Un proyecto de Spring Boot tiene estas piezas, siempre en el mismo sitio:</p>
    <CodeBlock :code="ARBOL" title="mi-proyecto" />

    <h2 id="contenedor">Contenedor</h2>
    <p>
      El <strong>contenedor</strong> (en Spring, <code>ApplicationContext</code>) es donde Spring
      guarda los objetos que ha creado. Cuando una clase necesita uno, se lo pide al contenedor y
      este se lo entrega.
    </p>
    <DiagramaContenedor />
    <p><strong>La clase no crea lo que necesita: se lo pide al contenedor y lo recibe hecho.</strong></p>

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

    <h2 id="capas">Una aplicación por capas</h2>
    <p>En una aplicación web, las clases se ordenan en capas, y cada una llama a la de abajo:</p>
    <DiagramaCapas />
    <p><strong>Cada capa hace lo suyo y pasa el trabajo a la siguiente.</strong></p>

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
    <Tabs default-value="constructor" variant="underline">
      <TabsList>
        <TabsTrigger value="constructor">Constructor</TabsTrigger>
        <TabsTrigger value="setter">Setter</TabsTrigger>
        <TabsTrigger value="campo">Campo</TabsTrigger>
      </TabsList>
      <TabsContent value="constructor">
        <p>La recomendada: deja los campos <code>final</code> y se ve en los tests. Con un solo constructor, <code>@Autowired</code> no hace falta.</p>
        <CodeBlock :code="INY_CONSTRUCTOR" language="java" />
      </TabsContent>
      <TabsContent value="setter">
        <p>Para cuando la dependencia es opcional.</p>
        <CodeBlock :code="INY_SETTER" language="java" />
      </TabsContent>
      <TabsContent value="campo">
        <p>Mejor evitarla: esconde las dependencias y complica el test.</p>
        <CodeBlock :code="INY_CAMPO" language="java" />
      </TabsContent>
    </Tabs>

    <h2 id="para-explorar">Para explorar</h2>
    <ul>
      <li>
        <a href="https://maven.apache.org/guides/introduction/introduction-to-the-pom.html" target="_blank" rel="noopener noreferrer">Maven: el <code>pom.xml</code></a>.
      </li>
      <li>
        <a href="https://projectlombok.org/" target="_blank" rel="noopener noreferrer">Lombok</a>:
        qué genera y cómo se instala.
      </li>
      <li>
        <a href="https://docs.spring.io/spring-boot/how-to/testing.html" target="_blank" rel="noopener noreferrer">Probar una aplicación Spring Boot</a>.
      </li>
    </ul>
  </PlantillaPagina>
</template>
