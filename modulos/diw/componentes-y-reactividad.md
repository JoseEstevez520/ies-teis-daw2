# Componentes y reactividad

Módulo: DIW

Una página de Vue se monta con componentes: cada uno junta su HTML, su lógica y sus estilos, y
se actualiza solo cuando cambian sus datos.

## Problema

Con HTML y JavaScript sueltos, para que la página cambie hay que ir a buscar el elemento y
tocarle el texto a mano. Eso se desincroniza en cuanto hay varios datos. Vue enlaza los datos y
la pantalla: cambias el dato y la página se actualiza sola. Eso es la **reactividad**.

## El componente

Un **componente** es un archivo `.vue` con tres bloques: la plantilla (lo que se ve), el script
(los datos y las funciones) y los estilos (solo de este componente):

```vue
<script setup>
import { ref } from 'vue'

const nombre = ref('Ana')
</script>

<template>
  <p>Hola, {{ nombre }}</p>
</template>

<style scoped>
p { color: #0d9488; }
</style>
```

`{{ nombre }}` muestra el valor. El `scoped` del estilo hace que no se salga de este componente.

## Reactividad: ref y reactive

Un dato reactivo se declara con `ref` (uno solo) o `reactive` (un objeto con varios campos):

```js
const contador = ref(0)
contador.value++            // en el script se usa .value

const paciente = reactive({ nombre: '', dni: '' })
paciente.nombre = 'Ana'     // reactive va directo, sin .value
```

En la plantilla, `ref` también se usa directo (`{{ contador }}`).

## Enlazar un campo: v-model

`v-model` ata un campo del formulario a un dato, en los dos sentidos: si escribes, cambia el
dato, y si cambia el dato, se actualiza el campo.

```html
<input v-model="paciente.nombre" />
<p>{{ paciente.nombre }}</p>
```

## Mostrar y repetir: v-if y v-for

```html
<p v-if="paciente.dni">DNI: {{ paciente.dni }}</p>

<ul>
  <li v-for="p in pacientes" :key="p.id">{{ p.nombre }}</li>
</ul>
```

`v-if` muestra la etiqueta solo si se cumple la condición. `v-for` la repite por cada elemento
de la lista; el `:key` tiene que ser único.

## Eventos

`@click` llama a una función al pulsar, y `@submit.prevent` al enviar un formulario, sin
recargar la página:

```html
<button @click="guardar">Guardar</button>
<form @submit.prevent="guardar"> ... </form>
```

## Valor calculado: computed

Un `computed` es un valor que se recalcula solo cuando cambian los datos de los que depende:

```js
const nombreCompleto = computed(() => `${nombre.value} ${apellidos.value}`)
```

## Al abrir: onMounted

`onMounted` ejecuta código cuando el componente ya está en pantalla. Se usa para pedir los datos
al backend nada más abrir:

```js
import { onMounted, ref } from 'vue'

const pacientes = ref([])

onMounted(async () => {
  pacientes.value = await getPacientes()
})
```

## Para explorar

- [Reactividad](https://vuejs.org/guide/essentials/reactivity-fundamentals.html) en la
  documentación de Vue.
- [Directivas](https://vuejs.org/guide/essentials/template-syntax.html): `v-if`, `v-for`,
  `v-model`.
