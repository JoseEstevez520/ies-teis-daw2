<script setup>
import { Callout, CodeBlock, Tabs, TabsContent, TabsList, TabsTrigger } from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'

// modulos/dwcs/optional.md
const DECLARACION = `Optional<Alumno> buscarPorDni(String dni) { ... }`

const CREAR = `Optional<Alumno> conValor    = Optional.of(alumno);
Optional<Alumno> puedeFaltar = Optional.ofNullable(alumno);
Optional<Alumno> vacio       = Optional.empty();`

const USO = `Alumno alumno = buscarPorDni("123")
        .orElseThrow(() -> new RuntimeException("No existe"));`
</script>

<template>
  <PlantillaPagina
    titulo="Optional"
    entradilla="Optional es un envoltorio que dice, en el propio tipo, que un valor puede no estar. Se usa cuando un método quizá no encuentre lo que busca."
  >
    <h2 id="problema">Problema</h2>
    <p>
      Un método que busca algo puede no encontrarlo. Si devuelve <code>null</code> y quien llama
      se olvida de comprobarlo, salta un <code>NullPointerException</code> en cualquier parte. El
      fallo no avisa por adelantado.
    </p>

    <h2 id="optional">Optional</h2>
    <p>
      <code>Optional&lt;T&gt;</code> es un objeto contenedor que puede llevar un valor de tipo
      <code>T</code> o estar vacío. Al devolver un <code>Optional</code>, el método avisa en su
      tipo de que el valor puede faltar, y obliga a quien llama a decidir qué hacer si no está.
    </p>
    <CodeBlock :code="DECLARACION" language="java" />

    <h2 id="metodos">Crearlo y usarlo</h2>
    <Tabs default-value="crear" variant="underline">
      <TabsList>
        <TabsTrigger value="crear">Crearlo</TabsTrigger>
        <TabsTrigger value="usar">Usarlo</TabsTrigger>
      </TabsList>
      <TabsContent value="crear">
        <ul>
          <li><code>Optional.of(valor)</code>: hay valor, y no puede ser <code>null</code>.</li>
          <li><code>Optional.ofNullable(valor)</code>: puede haber valor o <code>null</code>.</li>
          <li><code>Optional.empty()</code>: no hay valor.</li>
        </ul>
        <CodeBlock :code="CREAR" language="java" />
      </TabsContent>
      <TabsContent value="usar">
        <ul>
          <li><code>ifPresent(...)</code>: si hay valor, hace algo con él; si no, nada.</li>
          <li><code>orElse(otro)</code>: devuelve el valor, o <code>otro</code> si está vacío.</li>
          <li><code>orElseThrow(...)</code>: devuelve el valor, o lanza una excepción si está vacío.</li>
        </ul>
        <CodeBlock :code="USO" language="java" />
      </TabsContent>
    </Tabs>
    <Callout type="tip">
      <p>Así no hay que comprobar <code>null</code> a mano.</p>
    </Callout>

    <h2 id="para-explorar">Para explorar</h2>
    <ul>
      <li>
        <a href="https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Optional.html" target="_blank" rel="noopener noreferrer"><code>Optional</code></a>
        en la API de Java.
      </li>
    </ul>
  </PlantillaPagina>
</template>
