# Thymeleaf

Módulo: DWCS

El controlador devuelve el nombre de una vista y unos datos. **Thymeleaf es quien rellena esa
vista con los datos** y la convierte en el HTML que recibe el navegador.

## Problema

Una página HTML normal es fija: el texto está escrito y no cambia. Pero el saludo de una
página no es siempre el mismo, ni la lista de productos tampoco. Hace falta una plantilla con
huecos, que se rellenen al servir la página.

## Motor de plantillas

Un **motor de plantillas** coge un archivo con huecos y lo entrega con los huecos ya
rellenos. **Thymeleaf es el motor de plantillas de Java que va del lado del servidor**: procesa
el archivo en el servidor, antes de mandarlo, y por eso funciona con HTML, XML o JavaScript.

## th:text

Los huecos se marcan con atributos que empiezan por `th:`. El más común es `th:text`, que
sustituye el contenido de la etiqueta por un valor:

```html
<p th:text="${nombre}">Sin nombre</p>
```

`${nombre}` es una expresión de Thymeleaf: busca el dato llamado `nombre`. El texto de dentro
(`Sin nombre`) no se ve; queda solo como ejemplo para abrir el archivo sin servidor.

## De dónde sale el dato

El valor lo pone el controlador en el `Model` y la plantilla lo lee por su nombre (ver
[Controladores y rutas](controladores-y-rutas.md)):

```java
model.addAttribute("nombre", "Ana");   // en el controlador
```

```html
<p th:text="${nombre}">Sin nombre</p>   <!-- → <p>Ana</p> -->
```

## Condicionales

`th:if` muestra la etiqueta solo si se cumple la condición, y `th:unless` solo si no se cumple:

```html
<span th:if="${puntos > 0}">Aprobado</span>
<span th:unless="${puntos > 0}">Suspenso</span>
```

## Bucles

`th:each` repite la etiqueta por cada elemento de una lista. El elemento y la lista se separan
con dos puntos:

```html
<div th:each="nombre : ${nombres}">
  <p th:text="${nombre}">...</p>
</div>
```

Si la lista es de objetos, se lee cada campo por sus getters:

```html
<p th:each="producto : ${productos}" th:text="${producto.nombre}">...</p>
```

## Dónde va la plantilla

Las plantillas van en `src/main/resources/templates/`. El nombre que devuelve el controlador es
el del archivo: `return "index"` carga `templates/index.html`.

## Fragmentos

Un **fragmento** es un bloque de HTML que se guarda aparte para reutilizarlo en varias
páginas, sin copiarlo. Se marca con `th:fragment`:

```html
<!-- templates/fragmentos.html -->
<header th:fragment="cabecera">
  <h1>Mi tienda</h1>
</header>
```

Y se inserta desde otra plantilla con `th:insert`, que coge ese bloque y lo mete dentro:

```html
<div th:insert="~{fragmentos :: cabecera}"></div>
```

`th:replace` hace lo mismo, pero sustituye la etiqueta entera por el fragmento en vez de
meterlo dentro:

```html
<header th:replace="~{fragmentos :: cabecera}"></header>
```

Así, la cabecera se cambia en un solo sitio y se actualiza en todas las páginas que la usan.

## Enlaces

Para un enlace interno se usa `th:href` con `@{...}`, que le pone delante la ruta de la
aplicación (sigue funcionando si la aplicación no está en la raíz):

```html
<a th:href="@{/products}">Productos</a>
```

`@{...}` también admite variables, en la query o en la propia ruta:

```html
<a th:href="@{/products(category=${category})}">Libros</a>
<a th:href="@{/products/{id}(id=${producto.id})}">Ver</a>
```

## Cambiar clases según un valor

`th:classappend` añade una clase solo cuando se cumple una condición. Con un operador ternario
sin parte falsa, cuando es `true` añade la clase y cuando es `false` no añade nada:

```html
<p th:classappend="${estado == 'OPERANDO' ? 'focus' : ''}">...</p>
```

## Para explorar

- [Thymeleaf](https://docs.spring.io/spring-framework/reference/web/webmvc-view/mvc-thymeleaf.html)
  en la documentación de Spring.
- [Using Thymeleaf](https://www.thymeleaf.org/doc/tutorials/3.1/usingthymeleaf.html), el manual
  de la propia librería.
