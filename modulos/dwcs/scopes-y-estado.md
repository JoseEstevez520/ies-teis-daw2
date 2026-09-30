# Scopes y estado

Módulo: DWCS

Un **scope** es la regla que decide cuándo Spring crea una instancia de un bean y cuánto la
reutiliza. Si no dices nada, el scope es **singleton**.

## Singleton

El scope **singleton** hace que Spring cree **una sola instancia** del bean y la comparta entre
todo el que la pida:

```text
                    ┌→ PedidoController
Una instancia ──────┼→ PedidoService
                    └→ FacturaService
```

Es el scope por defecto: `@Service` o `@Component` ya son singleton.

> [!WARNING]
> Como todos comparten la misma instancia, un bean singleton **no debe guardar estado de una
> petición en sus campos**. Si `PedidoService` guarda el usuario actual en un atributo, la
> siguiente petición lo pisa.

```java
@Service  // singleton: una instancia para toda la aplicación
public class PedidoService {
    private PedidoRepository repo;   // bien: la dependencia no cambia
    // private Usuario usuario;      // mal: lo compartirían todas las peticiones
}
```

## Prototype

El scope **prototype** hace que Spring cree **una instancia nueva cada vez** que se pide el
bean:

```java
@Component
@Scope("prototype")
public class InformeBuilder { }
```

```text
Petición → InformeBuilder A
Petición → InformeBuilder B
Petición → InformeBuilder C
```

Prototype sirve para objetos con estado propio que no quieres compartir.

## Scopes web

En una aplicación web hay más scopes, ligados a la petición y a la sesión:

| Scope | Una instancia por… | Cuándo usarlo |
|---|---|---|
| `singleton` | aplicación | por defecto |
| `prototype` | cada vez que se pide | objetos con estado propio |
| `request` | petición HTTP | datos que solo viven durante una petición |
| `session` | sesión de usuario | datos del usuario entre peticiones (carrito, login) |
| `application` | aplicación web | igual que singleton, pero solo en web |

## Sesión HTTP

Una **sesión HTTP** es la forma de que el servidor se acuerde de quién eres entre peticiones.
HTTP, por sí solo, no recuerda nada: cada petición llega sola, sin saber de las anteriores.

```text
Petición 1  POST /login
Petición 2  GET  /perfil
Petición 3  GET  /carrito
```

El servidor necesita saber que las tres son del mismo usuario. Para eso está la **sesión
HTTP**: al empezar, el servidor crea una sesión con un identificador y se lo manda al
navegador en una cookie (`JSESSIONID`). En cada petición siguiente el navegador manda la
cookie, y el servidor localiza la sesión.

```text
Navegador ──JSESSIONID=abc123──→ Servidor
                                   └── sesión abc123: { usuario: "ana" }
```

## Session scope

El scope **session** hace que cada usuario tenga su propia instancia del bean, y que se
reutilice mientras dura su sesión:

```text
Sesión de Ana  → CarritoCompra A
Sesión de Jose → CarritoCompra B
```

En Spring:

```java
@Component
@SessionScope
public class CarritoCompra { }
```

Solo existe en aplicaciones web; en una de consola no hay sesión.

## Stateful y stateless

Estos dos términos describen si la aplicación recuerda información entre peticiones.

- **Stateless:** cada petición lleva todo lo que necesita y el servidor no guarda nada del
  usuario. Ejemplo: una API con un token en cada llamada.
- **Stateful:** el servidor guarda información del usuario entre peticiones. Una sesión HTTP
  es stateful.

La regla práctica con Spring: **los beans singleton son stateless** (compartidos, sin datos de
petición en campos), y el estado de cada usuario vive en un bean de scope `request` o `session`.

## Para explorar

- [Bean scopes en la documentación de Spring](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html)
- [Web scopes y el proxy de sesión](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet/container-config.html)
