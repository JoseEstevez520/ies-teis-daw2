---
name: apuntes-claros
description: Guía de estilo para escribir o editar cualquier archivo markdown de este repo (apuntes, README de módulo, contenido de extra/, HORARIO.md...) para que se lea claro y rápido, sin sonar a texto generado por IA. Actívate siempre que vayas a redactar un apunte nuevo, revisar uno existente, o escribir un README dentro de modulos/ o extra/ — no hace falta que el usuario lo pida explícitamente, aplícalo por defecto en este repo.
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

Nada de introducciones que solo anuncian lo que viene ("en este documento veremos..."),
ni cierres que resumen lo que ya se acaba de leer ("en resumen, hemos aprendido que...").
Si el título ya lo dice, no hace falta repetirlo en la primera línea.

## Trocear, no amontonar

Un bloque de texto largo se salta. Usa:

- **Encabezados** por subtema, no un único párrafo gigante.
- **Listas de hasta 5 puntos.** Si tienes más, agrúpalos bajo sub-encabezados en vez de
  hacer una lista de 12 ítems — nadie retiene el noveno punto de una lista.
- **Código en bloques**, nunca descrito en prosa ("la función recibe un parámetro
  llamado...") cuando se puede simplemente pegar el código.

## Quita los tics de IA

Estas cosas delatan que un texto lo escribió (o lo revisó a lo loco) una IA, y además
estorban a la lectura rápida — quítalas:

- **Contrastes de manual**: "no es solo X, sino también Y". Di la cosa directamente.
- **Tríadas forzadas**: enumerar de tres en tres porque "queda bien" ("rápido, eficiente y
  fiable"). Si de verdad son tres cosas distintas, vale; si es relleno, corta a una.
- **Palabras infladas**: fundamental, robusto, holístico, potente, clave, esencial. Casi
  siempre se pueden borrar sin perder nada.
- **Raya larga (—) a cada dos frases** y emojis decorativos (✅ 🚀 💡) metidos como adorno.
  Úsalos solo si aportan algo de verdad, no como muletilla visual.
- **Cierres tipo moraleja**: una última frase que resume "la lección" del apunte. El
  apunte no necesita moraleja, necesita que la última frase sea información, no relleno.
- **Frases de chatbot**: "¡Espero que esto te sea útil!", "no dudes en preguntar si...".
  Esto es un apunte de clase, no una respuesta de asistente.

## Antes / después

**Mal:**
> A la hora de trabajar con formularios en Vue, es importante tener en cuenta que la
> validación es un aspecto fundamental y clave para garantizar una buena experiencia de
> usuario. Existen varias formas de abordar esto, pero una de las más robustas y eficientes
> es mediante el uso de propiedades computadas.

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
