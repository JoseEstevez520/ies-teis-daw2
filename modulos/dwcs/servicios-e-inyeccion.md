# Servicios e inyección

Módulo: DWCS

El controlador atiende la petición, pero la lógica del negocio no va en él. Va en un
**servicio**, y Spring se lo entrega al controlador ya creado.

## Problema

Si el controlador calcula, consulta datos y decide, la clase se hace enorme y no se puede
reutilizar ni probar por partes. Conviene sacar esa lógica a una clase aparte.

## Servicio

Un **servicio** es la clase donde vive la lógica del negocio. Se marca con `@Service`, así que
es un bean que Spring crea y maneja (ver
[Spring y el contenedor](spring-y-contenedor.md)). El controlador llama al servicio y el
servicio hace el trabajo.

```java
@Service
public class CalculosService {

    public double media(List<Integer> notas) { ... }
}
```

## Inyectar el servicio

El controlador no crea el servicio con `new`: lo recibe de Spring como una propiedad de la
clase. Se le dice con `@Autowired`:

```java
@Controller
public class CalculosController {

    @Autowired
    CalculosService calculosService;
}
```

Sin `@Autowired`, Spring no sabe que tiene que rellenar ese campo y lo trata como una variable
local. Hay formas mejores de inyectar que esta (ver
[Spring y el contenedor](spring-y-contenedor.md)).

## Inyectar la interfaz, no la implementación

El servicio suele ser una **interfaz** (el contrato: qué sabe hacer) con una
**implementación** aparte (cómo lo hace). El controlador inyecta la interfaz, no la clase que
la implementa:

```java
public interface CalculosService {
    double media(List<Integer> notas);
}

@Service
public class CalculosServiceImpl implements CalculosService { ... }
```

```java
@Autowired
CalculosService calculosService;   // la interfaz, nunca CalculosServiceImpl
```

Así, si cambia la implementación, el controlador no se toca.

## Varias implementaciones

Si hay más de una clase que implementa la interfaz, Spring no sabe cuál usar y falla. Se
resuelve diciendo cuál manda:

| Anotación | Para |
|---|---|
| `@Primary` | marca la que se usa por defecto |
| `@Qualifier("nombre")` | elige una concreta por su nombre |

## Volver a una ruta

`return "redirect:/"` manda al usuario a `/` y limpia la ruta que tenía (por ejemplo
`/voto?foto=1`), para que recargar no repita la última acción.

## Para explorar

- [`@Autowired`](https://docs.spring.io/spring-framework/reference/core/beans/annotation-config/autowired.html)
  en la documentación de Spring.
- [Elegir entre varias con `@Primary`](https://docs.spring.io/spring-framework/reference/core/beans/annotation-config/autowired-primary.html).
