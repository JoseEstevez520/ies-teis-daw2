# Enum

Módulo: DWCS

**Un enum es un tipo con un conjunto cerrado de valores: los únicos que existen.** Se usa
cuando algo solo puede estar en unos pocos estados.

## Problema

Un estado como el de una máquina puede ser "operando" o "averiada". Si se guarda en un `String`,
cabe cualquier texto, incluso uno mal escrito, y el error no se ve hasta que falla en tiempo de
ejecución.

## Enum

Un **enum** (enumeración) declara esos pocos valores uno a uno. Solo existen esos:

```java
public enum Estado {
    OPERANDO,
    EN_PARADA,
    AVERIADO
}
```

## Usarlo

Se usan con el nombre del tipo delante, se comparan con `==` y encajan en un `switch`:

```java
Estado estado = Estado.OPERANDO;

if (estado == Estado.OPERANDO) { ... }
```

## Por qué no un String

El compilador conoce los valores, así que avisa si escribes uno que no existe, y el editor los
sugiere. Con un `String`, un valor mal escrito compila igual y falla más tarde.

## En una plantilla

Thymeleaf compara el enum por su nombre, entre comillas. Es lo que usa
[`th:classappend`](thymeleaf.md) para marcar el estado:

```html
<p th:classappend="${estado == 'OPERANDO' ? 'focus' : ''}">...</p>
```

## Para explorar

- [Enum Types](https://docs.oracle.com/javase/tutorial/java/javaOO/enums.html), en el tutorial
  de Java.
