<script setup>
import { CodeBlock, CodeDiff } from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'

// modulos/dwcs/enum.md
const ENUM = `public enum Estado {
    OPERANDO,
    EN_PARADA,
    AVERIADO
}`

const USO = `Estado estado = Estado.OPERANDO;

if (estado == Estado.OPERANDO) { ... }`

const ANTES = `public class Maquina {
    private String estado = "OPERANDO";
}`

const DESPUES = `public class Maquina {
    private Estado estado = Estado.OPERANDO;
}

public enum Estado {
    OPERANDO, EN_PARADA, AVERIADO
}`

const CLASSAPPEND = `<p th:classappend="\${estado == 'OPERANDO' ? 'focus' : ''}">...</p>`
</script>

<template>
  <PlantillaPagina
    titulo="Enum"
    entradilla="Un enum es un tipo con un conjunto cerrado de valores: los únicos que existen. Se usa cuando algo solo puede estar en unos pocos estados."
  >
    <h2 id="problema">Problema</h2>
    <p>
      Un estado como el de una máquina puede ser "operando" o "averiada". Si se guarda en un
      <code>String</code>, cabe cualquier texto, incluso uno mal escrito, y el error no se ve
      hasta que falla en tiempo de ejecución.
    </p>

    <h2 id="enum">Enum</h2>
    <p>
      Un <strong>enum</strong> (enumeración) declara esos pocos valores uno a uno. Solo existen
      esos:
    </p>
    <CodeBlock :code="ENUM" language="java" />

    <h2 id="el-cambio">El cambio</h2>
    <p>Pasar de un <code>String</code> a un enum cambia el tipo del campo, no su uso:</p>
    <CodeDiff :before="ANTES" :after="DESPUES" file="Maquina.java" />

    <h2 id="usarlo">Usarlo</h2>
    <p>Se usan con el nombre del tipo delante, se comparan con <code>==</code> y encajan en un <code>switch</code>:</p>
    <CodeBlock :code="USO" language="java" />

    <h2 id="por-que">Por qué no un String</h2>
    <p>
      El compilador conoce los valores, así que avisa si escribes uno que no existe, y el editor
      los sugiere. Con un <code>String</code>, un valor mal escrito compila igual y falla más
      tarde.
    </p>

    <h2 id="plantilla">En una plantilla</h2>
    <p>
      Thymeleaf compara el enum por su nombre, entre comillas. Es lo que usa
      <RouterLink to="/modulos/dwcs/thymeleaf">th:classappend</RouterLink> para marcar el estado:
    </p>
    <CodeBlock :code="CLASSAPPEND" language="html" />

    <h2 id="para-explorar">Para explorar</h2>
    <ul>
      <li>
        <a href="https://docs.oracle.com/javase/tutorial/java/javaOO/enums.html" target="_blank" rel="noopener noreferrer">Enum Types</a>,
        en el tutorial de Java.
      </li>
    </ul>
  </PlantillaPagina>
</template>
