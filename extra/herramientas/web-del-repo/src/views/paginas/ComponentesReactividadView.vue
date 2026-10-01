<script setup>
import { CodeBlock } from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import DiagramaComponente from '../../visuales/DiagramaComponente.vue'

// modulos/diw/componentes-y-reactividad.md
const COMPONENTE = `<script setup>
import { ref } from 'vue'

const nombre = ref('Ana')
<\/script>

<template>
  <p>Hola, {{ nombre }}</p>
</template>

<style scoped>
p { color: #0d9488; }
</style>`

const REF_REACTIVE = `const contador = ref(0)
contador.value++            // en el script se usa .value

const paciente = reactive({ nombre: '', dni: '' })
paciente.nombre = 'Ana'     // reactive va directo, sin .value`

const VMODEL = `<input v-model="paciente.nombre" />
<p>{{ paciente.nombre }}</p>`

const V_IF_FOR = `<p v-if="paciente.dni">DNI: {{ paciente.dni }}</p>

<ul>
  <li v-for="p in pacientes" :key="p.id">{{ p.nombre }}</li>
</ul>`

const EVENTOS = `<button @click="guardar">Guardar</button>
<form @submit.prevent="guardar"> ... </form>`

const COMPUTED = `const nombreCompleto = computed(() => \`\${nombre.value} \${apellidos.value}\`)`

const ONMOUNTED = `import { onMounted, ref } from 'vue'

const pacientes = ref([])

onMounted(async () => {
  pacientes.value = await getPacientes()
})`
</script>

<template>
  <PlantillaPagina
    titulo="Componentes y reactividad"
    entradilla="Una página de Vue se monta con componentes: cada uno junta su HTML, su lógica y sus estilos, y se actualiza solo cuando cambian sus datos."
  >
    <h2 id="problema">Problema</h2>
    <p>
      Con HTML y JavaScript sueltos, para que la página cambie hay que ir a buscar el elemento y
      tocarle el texto a mano. Eso se desincroniza en cuanto hay varios datos. Vue enlaza los
      datos y la pantalla: cambias el dato y la página se actualiza sola. Eso es la
      <strong>reactividad</strong>.
    </p>

    <h2 id="componente">El componente</h2>
    <p>
      Un <strong>componente</strong> es un archivo <code>.vue</code> con tres bloques: la
      plantilla (lo que se ve), el script (los datos y las funciones) y los estilos (solo de este
      componente).
    </p>
    <DiagramaComponente />
    <p><strong>Cada componente lleva dentro su HTML, su lógica y sus estilos.</strong></p>
    <CodeBlock :code="COMPONENTE" language="vue" />
    <p>
      <code>&#123;&#123; nombre &#125;&#125;</code> muestra el valor. El <code>scoped</code> del
      estilo hace que no se salga de este componente.
    </p>

    <h2 id="reactividad">Reactividad: ref y reactive</h2>
    <p>
      Un dato reactivo se declara con <code>ref</code> (uno solo) o <code>reactive</code> (un
      objeto con varios campos):
    </p>
    <CodeBlock :code="REF_REACTIVE" language="js" />
    <p>
      En la plantilla, <code>ref</code> también se usa directo
      (<code>&#123;&#123; contador &#125;&#125;</code>).
    </p>

    <h2 id="v-model">Enlazar un campo: v-model</h2>
    <p>
      <code>v-model</code> ata un campo del formulario a un dato, en los dos sentidos: si
      escribes, cambia el dato, y si cambia el dato, se actualiza el campo.
    </p>
    <CodeBlock :code="VMODEL" language="html" />

    <h2 id="v-if-v-for">Mostrar y repetir: v-if y v-for</h2>
    <CodeBlock :code="V_IF_FOR" language="html" />
    <p>
      <code>v-if</code> muestra la etiqueta solo si se cumple la condición. <code>v-for</code> la
      repite por cada elemento de la lista; el <code>:key</code> tiene que ser único.
    </p>

    <h2 id="eventos">Eventos</h2>
    <p>
      <code>@click</code> llama a una función al pulsar, y <code>@submit.prevent</code> al enviar
      un formulario, sin recargar la página:
    </p>
    <CodeBlock :code="EVENTOS" language="html" />

    <h2 id="computed">Valor calculado: computed</h2>
    <p>Un <code>computed</code> es un valor que se recalcula solo cuando cambian los datos de los que depende:</p>
    <CodeBlock :code="COMPUTED" language="js" />

    <h2 id="onmounted">Al abrir: onMounted</h2>
    <p>
      <code>onMounted</code> ejecuta código cuando el componente ya está en pantalla. Se usa para
      pedir los datos al backend nada más abrir:
    </p>
    <CodeBlock :code="ONMOUNTED" language="js" />

    <h2 id="para-explorar">Para explorar</h2>
    <ul>
      <li>
        <a href="https://vuejs.org/guide/essentials/reactivity-fundamentals.html" target="_blank" rel="noopener noreferrer">Reactividad</a>
        en la documentación de Vue.
      </li>
      <li>
        <a href="https://vuejs.org/guide/essentials/template-syntax.html" target="_blank" rel="noopener noreferrer">Directivas</a>:
        <code>v-if</code>, <code>v-for</code>, <code>v-model</code>.
      </li>
    </ul>
  </PlantillaPagina>
</template>
