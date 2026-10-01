# Optional

Módulo: DWCS

**Optional es un envoltorio que dice, en el propio tipo, que un valor puede no estar.** Se usa
cuando un método quizá no encuentre lo que busca.

## Problema

Un método que busca algo puede no encontrarlo. Si devuelve `null` y quien llama se olvida de
comprobarlo, salta un `NullPointerException` en cualquier parte. El fallo no avisa por
adelantado.

## Optional

`Optional<T>` es un objeto contenedor que puede llevar un valor de tipo `T` o estar vacío. Al
devolver un `Optional`, el método avisa en su tipo de que el valor puede faltar, y obliga a
quien llama a decidir qué hacer si no está.

```java
Optional<Alumno> buscarPorDni(String dni) { ... }
```

## Crearlo

| Forma | Para |
|---|---|
| `Optional.of(valor)` | hay valor, y no puede ser `null` |
| `Optional.ofNullable(valor)` | puede haber valor o `null` |
| `Optional.empty()` | no hay valor |

## Usarlo

| Método | Qué hace |
|---|---|
| `ifPresent(...)` | si hay valor, hace algo con él; si no, nada |
| `orElse(otro)` | devuelve el valor, o `otro` si está vacío |
| `orElseThrow(...)` | devuelve el valor, o lanza una excepción si está vacío |

```java
Alumno alumno = buscarPorDni("123").orElseThrow(() -> new RuntimeException("No existe"));
```

Así no hay que comprobar `null` a mano.

## Para explorar

- [`Optional`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Optional.html)
  en la API de Java.
