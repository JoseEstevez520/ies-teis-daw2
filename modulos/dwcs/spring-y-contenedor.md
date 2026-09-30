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
