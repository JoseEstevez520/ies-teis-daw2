# Spring, Spring Boot y el contenedor

Módulo: DWCS

Java es un lenguaje de programación muy usado en aplicaciones grandes. **Spring es un framework
de Java que crea los objetos de tu aplicación y los conecta por ti.**

## Problema

En Java, cada clase crea los objetos que necesita con `new` y los usa directamente. Con dos o
tres clases no da problemas; cuando la aplicación crece, hay que montar y mantener a mano
muchísimas conexiones, y cambiar un objeto obliga a tocar todos los sitios que lo crean.

Y cuantas más clases tiene la aplicación, más conexiones hay que mantener a mano.

## Solución

**Spring se encarga de eso**: crea los objetos y decide quién recibe a quién. El control de
crearlos pasa de tu código a Spring; eso se llama **inversión de control**.

## Spring Boot

**Spring Boot es Spring con la configuración ya hecha.** Lo que aporta son los ajustes por
defecto: qué servidor usa, cómo se conecta a la base de datos, qué **dependencias** carga (las
librerías de otros que tu proyecto usa). Con Spring a secas se configura a mano; Boot lo trae
puesto.

## Maven y las dependencias

Un proyecto Java usa un **gestor de proyectos** que automatiza la compilación, las
dependencias, las pruebas y el empaquetado. Los más usados son **Maven**, **Gradle** y, el más
antiguo, **Ant**. Spring Boot usa Maven por defecto.

Las **dependencias** son librerías de otros que tu proyecto usa, para no escribir desde cero lo
que ya está hecho. Cada una se identifica con tres datos, sus **coordenadas** o **GAV**:

| Letra | Nombre | Ejemplo |
|---|---|---|
| G | groupId | `com.example` |
| A | artifactId | `myapp` |
| V | version | `1.0.0` |

Se declaran en `pom.xml`, el archivo de Maven.

## Configuración

El puerto del servidor, la conexión a la base de datos y otros ajustes se cambian en
`src/main/resources/application.properties`. Por defecto la aplicación arranca en
`localhost:8080`.

## Lombok

**Lombok genera por ti el código repetitivo**, el que en inglés se llama *boilerplate*: los
getters, los setters, `toString` y compañía. Se añade como dependencia y se marca la clase:

```java
@Data
public class Alumno {
    private String nombre;
    private int edad;
}
```

| Anotación | Genera |
|---|---|
| `@Getter` / `@Setter` | los getters / los setters |
| `@Data` | todo lo anterior, más `toString`, `equals` y `hashCode` |

## JAR y WAR

Al empaquetar, el proyecto entero se junta en un solo archivo:

- **JAR**: una aplicación Java que se ejecuta por sí sola (`java -jar app.jar`).
- **WAR**: una aplicación web que se despliega en un servidor de aplicaciones.

## Los archivos del proyecto

Un proyecto de Spring Boot tiene estas piezas, siempre en el mismo sitio:

```text
mi-proyecto/
├── pom.xml                              ← las librerías que usa
└── src/
    └── main/
        ├── java/…/                      ← el código Java
        │   └── NombreApplication.java   ← la clase que arranca (el corazón)
        └── resources/
            ├── application.properties   ← la configuración (puerto, base de datos)
            └── templates/               ← las páginas HTML que se sirven
```

## Contenedor

El **contenedor** (en Spring, `ApplicationContext`) es donde Spring guarda los objetos que ha
creado. Cuando una clase necesita uno, se lo pide al contenedor y este se lo entrega.

```text
Spring crea los objetos y los guarda aquí

Contenedor (ApplicationContext)
  HomeController · PedidoService · PedidoRepository
        ↓ entrega lo que pide
PedidoController   pide PedidoService y lo recibe ya creado
```

## Bean

Un **bean** es un objeto que Spring crea y maneja. Para que una clase sea un bean, se marca con
una anotación según su papel:

| Anotación | Para |
|---|---|
| `@Component` | una clase genérica |
| `@Service` | lógica de negocio |
| `@Repository` | acceso a datos (además traduce las excepciones de la base de datos) |
| `@Controller` / `@RestController` | entrada de peticiones HTTP |

De cara al contenedor, las cuatro registran la clase como bean.

## Una aplicación por capas

En una aplicación web, las clases se ordenan en capas, y cada una llama a la de abajo:

```text
Petición HTTP
     ↓
@Controller   recibe la petición y prepara la respuesta
     ↓
@Service      la lógica del negocio
     ↓
@Repository   lee y escribe en la base de datos
```

El controlador no habla con la base de datos ni el repositorio con el navegador: cada capa
hace lo suyo y pasa el trabajo a la siguiente.

## Instancia

Una **instancia** es un objeto concreto de una clase. De un bean, Spring puede guardar una
instancia o crear una nueva cada vez; eso lo decide el scope, que va en
[el apunte siguiente](scopes-y-estado.md).

## Inyección de dependencias

La **inyección de dependencias** es Spring entregándole a cada bean los objetos que necesita, en
vez de que los cree él. A esos objetos se les llama **dependencias**.

Hay tres formas de inyectar:

| Forma | Cómo | Cuándo |
|---|---|---|
| Constructor | parámetro del constructor | la recomendada: deja los campos `final` y se ve en los tests |
| Setter | método con `@Autowired` | cuando la dependencia es opcional |
| Campo | `@Autowired` sobre el atributo | evítala: esconde las dependencias y complica el test |

Con un solo constructor, `@Autowired` no hace falta.

## Para explorar

- [Maven: el `pom.xml`](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html).
- [Lombok](https://projectlombok.org/): qué genera y cómo se instala.
- [Probar una aplicación Spring Boot](https://docs.spring.io/spring-boot/how-to/testing.html).
