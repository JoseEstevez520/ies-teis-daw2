# Controladores y rutas

Módulo: DWCS

Cuando el navegador pide una URL, alguien en el servidor tiene que decidir qué responder. De
eso se encarga el **controlador**: recibe las peticiones y las lleva al método que toca.

## Problema

El navegador (o Postman, para probar) manda **peticiones HTTP**: pide una dirección como
`http://localhost:8080/products/` y espera una respuesta. El servidor necesita saber qué
método ejecutar para cada dirección.

## Controlador

Un **controlador** es la clase que recibe las peticiones HTTP del cliente y decide qué hacer
con ellas. Se marca con `@Controller`, y Spring lo crea como un bean (ver
[Spring y el contenedor](spring-y-contenedor.md)).

```java
@Controller
public class HomeController { }
```

## Rutas

Una **ruta** es la dirección que atiende un método. `@GetMapping` asocia una ruta a un método
para las peticiones GET (las de abrir una página):

```java
@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "index";   // templates/index.html
    }
}
```

El método devuelve el nombre de la vista, y su archivo sale de `templates/`.

## Varias rutas en una

Dentro de la anotación caben varias direcciones entre llaves, separadas por comas. Así la
misma vista responde en `/`, en `/home` y en la raíz sin nada:

```java
@GetMapping({"/", "/home", ""})
```

## Prefijo con @RequestMapping

`@RequestMapping` sobre la clase pone un prefijo que se añade a todas sus rutas. Sirve para
agrupar y diferenciar las rutas de una parte de la aplicación:

```java
@Controller
@RequestMapping("/products")
public class ProductController {

    @GetMapping("/")             // /products/
    public String showView() { ... }

    @GetMapping("/electronics")  // /products/electronics
    public String showElectronics() { ... }
}
```

## Variable en la ruta

`@PathVariable` coge un trozo variable de la URL y lo pasa como parámetro. Ese trozo se
escribe entre llaves:

```java
@GetMapping("/products/{id}")
public String showProduct(@PathVariable Long id) { ... }
```

## Pasar datos a la vista

El controlador le entrega datos a la plantilla con un objeto `Model`. Cada dato lleva un
nombre con el que la plantilla lo usa después:

```java
@GetMapping("/saludo")
public String saludo(Model model) {
    model.addAttribute("nombre", "Ana");
    return "saludo";
}
```

## Con vista o sin vista

Según lo que devuelva, hay dos tipos de controlador:

| Anotación | Devuelve | Para |
|---|---|---|
| `@Controller` | el nombre de una vista | una página HTML (MVC) |
| `@RestController` | datos, normalmente en JSON | una API |

En MVC hay vista. En una API hay modelo y controlador, pero no hay vista: el cliente recibe
los datos y los pinta él.

## Archivos estáticos

Las imágenes, el CSS y el JavaScript que no pasan por Thymeleaf van en `static/`
(`src/main/resources/static/`).

## Para explorar

- [Mapping Requests](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-requestmapping.html)
  en la documentación de Spring.
- [Annotated Controllers](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann.html):
  cómo se declara un controlador.
