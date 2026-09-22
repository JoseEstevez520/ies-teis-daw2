---
name: apuntes-claros
description: Estilo de escritura para cualquier .md de este repo (apuntes, README, extra/), conciso, escaneable y sin sonar a texto generado por IA. Aplícalo siempre que redactes o revises un apunte nuevo o un README de módulo, aunque no se pida explícitamente.
---

# Apuntes claros

Este repo lo lee gente con prisa, a mitad de clase, buscando una cosa concreta. Un apunte
que hay que releer dos veces para entenderlo no sirve, por muy completo que sea.

## Ir al grano

Empieza por lo importante, no por el contexto. Si alguien lee solo la primera frase de un
apunte, esa frase ya le tiene que servir.

- Mal: "En este apartado vamos a ver cómo funciona la validación de formularios en Vue,
  que es algo fundamental para cualquier aplicación web moderna."
- Bien: "Vue valida formularios con `v-model` + una regla en el `computed`. Ejemplo abajo."

Nada de introducciones que solo anuncian lo que viene ("en este documento veremos...") ni
cierres que resumen lo que ya se acaba de leer ("en resumen, hemos aprendido que...").

## No digas lo innecesario

Si un dato no ayuda a quien lee a entender o decidir algo, sobra — aunque sea cierto. Cada
ejemplo entre paréntesis, cada nombre propio que metes de más, le cuesta atención al lector
sin darle nada a cambio.

- Mal: "Apuntes para repasar, y herramientas reales (como un panel que junta tareas y notas
  del Aula Virtual) que cualquiera puede clonar y usar."
- Bien: "Apuntes para repasar, y herramientas reales que cualquiera puede clonar y usar."

El ejemplo concreto vive en la página de esa herramienta, no en la frase que presenta el
repo entero.

## Trocear, no amontonar

Un bloque de texto largo se salta. Usa:

- **Encabezados** por subtema, no un único párrafo gigante.
- **Listas de hasta 5 puntos.** Si tienes más, agrúpalos bajo sub-encabezados.
- **Código en bloques**, nunca descrito en prosa cuando se puede pegar directamente.

## Quita los tics de IA

Delatan que un texto lo escribió (o lo pasó a lo loco por) una IA, y estorban a la
lectura rápida:

- **Contrastes de manual**: "no es solo X, sino también Y". Di la cosa directamente.
- **Tríadas forzadas**: enumerar de tres en tres porque "queda bien". Si de verdad son
  tres cosas distintas vale; si es relleno, corta a una.
- **Palabras infladas**: fundamental, robusto, holístico, potente, clave, esencial.
  Casi siempre se pueden borrar sin perder nada.
- **Raya larga (—) como pausa explicativa a media frase** ("esto es X — que además hace Y").
  Las IA la usan mucho más que una persona al escribir. En una lista, como separador entre
  un término y su descripción, no pasa nada. El problema es meterla dentro de una frase.
- Emojis decorativos metidos como adorno.
- **Cierres tipo moraleja**: la última frase tiene que ser información, no resumen.
- **Frases de chatbot**: "¡Espero que esto te sea útil!". Esto es un apunte, no una
  respuesta de asistente.

## Antes / después

**Mal:**
> A la hora de trabajar con formularios en Vue, es importante tener en cuenta que la
> validación es un aspecto fundamental y clave para garantizar una buena experiencia de
> usuario. Existen varias formas de abordar esto, pero una de las más robustas y
> eficientes es mediante el uso de propiedades computadas.

**Bien:**
> Valida formularios con una `computed` que devuelve `true`/`false` por campo:
> ```js
> const dniValido = computed(() => /^\d{8}[A-Z]$/.test(dni.value))
> ```

## Antes de dar por terminado un apunte

- ¿La primera frase ya dice lo importante?
- ¿Hay algún párrafo que se pueda cortar a la mitad sin perder información?
- ¿Sobra alguna palabra de la lista de "infladas"?
- ¿Una lista tiene más de 5 puntos sin agrupar?
- ¿Hay un ejemplo o paréntesis que no hace falta para entender la frase?
