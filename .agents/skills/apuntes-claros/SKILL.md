---
name: apuntes-claros
description: Estilo de escritura y de explicación para cualquier .md de este repo (apuntes, README, extra/): conciso, escaneable, problema primero y con cada concepto definido en una frase. Aplícalo siempre que redactes o revises un apunte nuevo o un README de módulo, aunque no se pida explícitamente.
---

# Apuntes claros

Este repo lo lee gente con prisa, a mitad de clase, buscando una cosa concreta. Un apunte
que hay que releer dos veces para entenderlo no sirve, por muy completo que sea, y lo que
sobra no es neutro: cada frase de más es tiempo que le quitas a quien solo quería la
respuesta.

## Ir al grano

Empieza por lo importante, no por el contexto. Si alguien lee solo la primera frase de un
apunte, esa frase ya le tiene que servir.

- Mal: "En este apartado vamos a ver cómo funciona la validación de formularios en Vue,
  que es algo fundamental para cualquier aplicación web moderna."
- Bien: "Vue valida formularios con `v-model` + una regla en el `computed`. Ejemplo abajo."

Nada de introducciones que solo anuncian lo que viene ("en este documento veremos...") ni
cierres que resumen lo que ya se acaba de leer ("en resumen, hemos aprendido que...").

Antes de decir qué es algo, di para qué hace falta. Si no, es una definición suelta que nadie
sabe dónde encaja.

- Mal: "Un bean es un objeto gestionado por Spring."
- Bien: "En Java, cada objeto se crea con `new`. Spring los crea y los conecta por ti; a cada
  uno lo llama **bean**."

## Escribe para quien no sabe nada

Quien lee puede no haber oído nunca el término. Cada nombre propio o palabra técnica
necesita decir qué es la primera vez que sale.

- Mal: "OpenCode, Claude Code y Codex te dan un harness ya montado."
- Bien: "Hay aplicaciones que lo traen ya montado, como Claude Code."

Nada de jerga suelta ("API", "open source") si no hace falta para entender la frase.

Cada concepto, en una frase: "Un bean es un objeto que Spring crea y maneja", "una dependencia
es lo que una clase necesita para funcionar". Un término se define la **primera vez que sale**,
nunca antes: no digas "beans" veinte líneas antes de la sección Bean.

Lo del lenguaje que uses (Java, SQL…) se explica dentro del ejemplo y solo lo que sale. Un
glosario de términos sueltos no enseña.

## Tono

De tú y cercano, pero en castellano correcto, como un buen apunte o una buena
documentación: lo lee toda la clase, y también profesores o quien llegue de fuera.

- Sin coloquialismos: currar, pillar, liar, molar, flipar, a lo loco, en plan, un montón.
  Hay una palabra normal para cada uno (trabajar, entender, confundir, gustar...).
- Sin muletillas ni guiños ("ojo, que esto es un clásico", "spoiler:"). La frase va a lo
  que dice.
- Sin fórmulas de relleno para empezar ("lo más típico es...", "a la hora de...", "es importante
  tener en cuenta"). Empieza por el hecho: "una práctica común es...", "muchas veces...".
- Serio no es frío: frases cortas y directas, de tú, sin "usted" ni pasivas de manual.

- Mal: "Haz `git pull` antes de currar, que si no la lías."
- Bien: "Haz `git pull` antes de ponerte a trabajar, para no pisar el trabajo de otro."

## No digas lo innecesario

Si un dato no ayuda a quien lee a entender o decidir algo, sobra, aunque sea cierto. Cada
ejemplo entre paréntesis, cada nombre propio que metes de más, le cuesta atención al lector
sin darle nada a cambio.

- Mal: "Apuntes para repasar, y herramientas reales (como un panel que junta tareas y notas
  del Aula Virtual) que cualquiera puede clonar y usar."
- Bien: "Apuntes para repasar, y herramientas reales que cualquiera puede clonar y usar."

El ejemplo concreto vive en la página de esa herramienta, no en la frase que presenta el
repo entero.

Esto no es "no pongas ejemplos" en general. En un apunte técnico, un ejemplo de código o un
caso concreto *es* la explicación, no un adorno (ver "Código en bloques, nunca descrito en
prosa" más abajo). La regla es sobre lo decorativo: un paréntesis con un dato suelto metido
en una frase de presentación o de resumen, que no ayuda a entender esa frase y que además
ya tiene su sitio propio en otra página.

Y no repitas. Si una idea ya está dicha en una sección anterior, o la quitas o la cambias por un
enlace. La misma idea dos veces ocupa el doble y no añade nada.

## Trocear, no amontonar

Un bloque de texto largo se salta. Usa:

- **Encabezados** por subtema, no un único párrafo gigante. Que digan de qué va lo de abajo,
  en llano: "Cómo funciona", "El modelo de conducta". No titulares de campaña ("La magia de
  X", "Donde todo encaja"): si al leer el título no sabes qué hay debajo, está mal. Y cortos y
  básicos: `Problema`, `Bean`, `Instancia`, `Escalabilidad`. Sin frases ni historias.
- **Listas de hasta 5 puntos.** Si tienes más, agrúpalos bajo sub-encabezados.
- **Código en bloques**, nunca descrito en prosa cuando se puede pegar directamente.

## Enséñalo

Un concepto nuevo lleva un ejemplo real o un visual, justo después de la frase que lo
explica. Cómo hacerlo en la web: [apuntes-web](../apuntes-web/SKILL.md).

Si algo se ve, se dibuja: lo que crece (una curva), lo que se repite, un flujo de datos. Y el
texto no repite lo que ya enseña el dibujo.

## Quita los tics de IA

Delatan que un texto lo escribió (o lo pasó sin revisar por) una IA, y estorban a la
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
- ¿Hay alguna palabra coloquial (currar, pillar, liar...) que tenga una normal?
- ¿Hay algún párrafo que se pueda cortar a la mitad sin perder información?
- ¿Sobra alguna palabra de la lista de "infladas"?
- ¿Una lista tiene más de 5 puntos sin agrupar?
- ¿Hay un ejemplo o paréntesis que no hace falta para entender la frase?
- ¿Cada concepto nuevo tiene un ejemplo real o un diagrama?
- ¿Empieza por el problema (para qué hace falta) en vez de por la definición?
- ¿Cada concepto tiene una definición de una frase ("X es Y")?
- ¿Algún término sale antes de definirse?
- ¿Se repite una idea que ya está en otra sección?
- ¿Alguna frase empieza con una fórmula de relleno ("lo más típico", "a la hora de")?

## De dónde sale

Esto no es ocurrencia: viene de los **ejemplos resueltos** (mostrar la solución paso a paso
antes de pedir que se resuelva, mejor para quien empieza) y de la **teoría de la carga
cognitiva** (la memoria de trabajo sostiene pocos elementos a la vez). De ahí que el problema
vaya antes que la solución y que cada concepto se defina de uno en uno. El detalle, en
[Worked Examples (MIT)](https://tll.mit.edu/teaching-resources/how-people-learn/worked-examples/).
