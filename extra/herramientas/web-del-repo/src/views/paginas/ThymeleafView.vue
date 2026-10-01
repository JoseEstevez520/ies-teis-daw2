<script setup>
import { CodeBlock } from 'elastic-ui'
import { siSpringboot, siThymeleaf } from 'simple-icons'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import Tecnologias from '../../components/Tecnologias.vue'
import DiagramaFragmentos from '../../visuales/DiagramaFragmentos.vue'

// modulos/dwcs/thymeleaf.md
const STACK = [
  { icon: siSpringboot, nombre: 'Spring Boot' },
  { icon: siThymeleaf, nombre: 'Thymeleaf' },
]
const TH_TEXT = `<!-- templates/saludo.html -->
<p th:text="\${nombre}">Sin nombre</p>`

const MODELO = `// en el controlador
model.addAttribute("nombre", "Ana");
// → <p>Ana</p>`

const FRAGMENTO = `<!-- templates/fragmentos.html -->
<header th:fragment="cabecera">
  <h1>Mi tienda</h1>
</header>`

const INSERT = `<!-- en otra plantilla -->
<div th:insert="~{fragmentos :: cabecera}"></div>`

const REEMPLAZAR = `<!-- sustituye la etiqueta entera -->
<header th:replace="~{fragmentos :: cabecera}"></header>`

const CONDICIONALES = `<span th:if="\${puntos > 0}">Aprobado</span>
<span th:unless="\${puntos > 0}">Suspenso</span>`

const BUCLES = `<div th:each="nombre : \${nombres}">
  <p th:text="\${nombre}">...</p>
</div>`

const BUCLES_OBJETO = `<p th:each="producto : \${productos}" th:text="\${producto.nombre}">...</p>`

const ENLACES = `<a th:href="@{/products}">Productos</a>`

const ENLACES_VAR = `<a th:href="@{/products(category=\${category})}">Libros</a>
<a th:href="@{/products/{id}(id=\${producto.id})}">Ver</a>`

const CLASSAPPEND = `<p th:classappend="\${estado == 'OPERANDO' ? 'focus' : ''}">...</p>`
</script>

<template>
  <PlantillaPagina
    titulo="Thymeleaf"
    entradilla="El controlador devuelve el nombre de una vista y unos datos. Thymeleaf es quien rellena esa vista con los datos y la convierte en el HTML que recibe el navegador."
  >
    <h2 id="motor">Motor de plantillas</h2>
    <Tecnologias :items="STACK" />
    <p>
      Un <strong>motor de plantillas</strong> coge un archivo con huecos y lo entrega con los
      huecos ya rellenos. Una página HTML normal es fija: el texto está escrito y no cambia. Como
      el saludo o la lista de productos sí cambian, hace falta una plantilla.
    </p>
    <p>
      <strong>Thymeleaf es el motor de plantillas de Java que va del lado del servidor</strong>:
      procesa el archivo en el servidor, antes de mandarlo, y por eso funciona con HTML, XML o
      JavaScript.
    </p>

    <h2 id="th-text">th:text</h2>
    <p>
      Los huecos se marcan con atributos que empiezan por <code>th:</code>. El más común es
      <code>th:text</code>, que sustituye el contenido de la etiqueta por un valor. El texto de
      dentro no se ve; queda como ejemplo para abrir el archivo sin servidor.
    </p>
    <CodeBlock :code="TH_TEXT" language="html" />

    <h2 id="dato">De dónde sale el dato</h2>
    <p>
      El valor lo pone el controlador en el <code>Model</code> y la plantilla lo lee por su
      nombre. <code>${nombre}</code> es una expresión de Thymeleaf: busca el dato llamado
      <code>nombre</code>.
    </p>
    <CodeBlock :code="MODELO" language="java" />

    <h2 id="condicionales">Condicionales</h2>
    <p>
      <code>th:if</code> muestra la etiqueta solo si se cumple la condición, y
      <code>th:unless</code> solo si no se cumple:
    </p>
    <CodeBlock :code="CONDICIONALES" language="html" />

    <h2 id="bucles">Bucles</h2>
    <p>
      <code>th:each</code> repite la etiqueta por cada elemento de una lista. El elemento y la
      lista se separan con dos puntos:
    </p>
    <CodeBlock :code="BUCLES" language="html" />
    <p>Si la lista es de objetos, se lee cada campo por sus getters:</p>
    <CodeBlock :code="BUCLES_OBJETO" language="html" />

    <h2 id="donde">Dónde va la plantilla</h2>
    <p>
      Las plantillas van en <code>src/main/resources/templates/</code>. El nombre que devuelve el
      controlador es el del archivo: <code>return "index"</code> carga
      <code>templates/index.html</code>.
    </p>

    <h2 id="fragmentos">Fragmentos</h2>
    <p>
      Un <strong>fragmento</strong> es un bloque de HTML que se guarda aparte para reutilizarlo
      en varias páginas, sin copiarlo. Se marca con <code>th:fragment</code>:
    </p>
    <CodeBlock :code="FRAGMENTO" language="html" />
    <p>Y se inserta desde otra plantilla con <code>th:insert</code>:</p>
    <CodeBlock :code="INSERT" language="html" />
    <p>
      <code>th:replace</code> hace lo mismo, pero sustituye la etiqueta entera por el fragmento en
      vez de meterlo dentro:
    </p>
    <CodeBlock :code="REEMPLAZAR" language="html" />
    <DiagramaFragmentos />
    <p><strong>La cabecera se cambia en un solo sitio y se actualiza en todas las páginas.</strong></p>

    <h2 id="enlaces">Enlaces</h2>
    <p>
      Para un enlace interno se usa <code>th:href</code> con <code>@{...}</code>, que le pone
      delante la ruta de la aplicación (sigue funcionando si la aplicación no está en la raíz):
    </p>
    <CodeBlock :code="ENLACES" language="html" />
    <p><code>@{...}</code> también admite variables, en la query o en la propia ruta:</p>
    <CodeBlock :code="ENLACES_VAR" language="html" />

    <h2 id="classappend">Cambiar clases según un valor</h2>
    <p>
      <code>th:classappend</code> añade una clase solo cuando se cumple una condición. Con un
      operador ternario sin parte falsa, cuando es <code>true</code> añade la clase y cuando es
      <code>false</code> no añade nada:
    </p>
    <CodeBlock :code="CLASSAPPEND" language="html" />

    <h2 id="para-explorar">Para explorar</h2>
    <ul>
      <li>
        <a href="https://docs.spring.io/spring-framework/reference/web/webmvc-view/mvc-thymeleaf.html" target="_blank" rel="noopener noreferrer">Thymeleaf</a>
        en la documentación de Spring.
      </li>
      <li>
        <a href="https://www.thymeleaf.org/doc/tutorials/3.1/usingthymeleaf.html" target="_blank" rel="noopener noreferrer">Using Thymeleaf</a>,
        el manual de la propia librería.
      </li>
    </ul>
  </PlantillaPagina>
</template>
