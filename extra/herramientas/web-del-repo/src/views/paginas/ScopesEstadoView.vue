<script setup>
import { Callout, CodeBlock } from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import DiagramaScopes from '../../visuales/DiagramaScopes.vue'
import DiagramaSesion from '../../visuales/DiagramaSesion.vue'

// modulos/dwcs/scopes-y-estado.md
const SINGLETON = `@Service  // singleton: una instancia para toda la aplicación
public class PedidoService {
    private PedidoRepository repo;   // bien: la dependencia no cambia
    // private Usuario usuario;      // mal: lo compartirían todas las peticiones
}`

const PROTOTYPE = `@Component
@Scope("prototype")
public class InformeBuilder { }`

const SESSION = `@Component
@SessionScope
public class CarritoCompra { }`
</script>

<template>
  <PlantillaPagina
    titulo="Scopes y estado"
    entradilla="Un scope es la regla que decide cuándo Spring crea una instancia de un bean y cuánto la reutiliza. Si no dices nada, el scope es singleton."
  >
    <h2 id="singleton">Singleton</h2>
    <p>
      El scope <strong>singleton</strong> hace que Spring cree <strong>una sola instancia</strong>
      del bean y la comparta entre todo el que la pida. Es el scope por defecto:
      <code>@Service</code> o <code>@Component</code> ya son singleton.
    </p>
    <Callout type="warning">
      <p>
        Como todos comparten la misma instancia, un bean singleton <strong>no debe guardar estado de
        una petición en sus campos</strong>: la siguiente petición lo pisa.
      </p>
    </Callout>
    <CodeBlock :code="SINGLETON" language="java" />

    <h2 id="prototype">Prototype</h2>
    <p>
      El scope <strong>prototype</strong> hace que Spring cree <strong>una instancia nueva cada
      vez</strong> que se pide el bean. Sirve para objetos con estado propio que no quieres
      compartir.
    </p>
    <CodeBlock :code="PROTOTYPE" language="java" />

    <h2 id="comparar">Comparar en vivo</h2>
    <p>Pide el bean en cada lado y mira cuántas instancias salen:</p>
    <DiagramaScopes />
    <p><strong>En singleton siempre es la misma; en prototype, una nueva cada vez.</strong></p>

    <h2 id="scopes-web">Scopes web</h2>
    <p>En una aplicación web hay más scopes, ligados a la petición y a la sesión:</p>
    <table>
      <thead>
        <tr><th>Scope</th><th>Una instancia por…</th><th>Cuándo usarlo</th></tr>
      </thead>
      <tbody>
        <tr><td><code>singleton</code></td><td>aplicación</td><td>por defecto</td></tr>
        <tr><td><code>prototype</code></td><td>cada vez que se pide</td><td>objetos con estado propio</td></tr>
        <tr><td><code>request</code></td><td>petición HTTP</td><td>datos que solo viven durante una petición</td></tr>
        <tr><td><code>session</code></td><td>sesión de usuario</td><td>datos del usuario entre peticiones (carrito, login)</td></tr>
        <tr><td><code>application</code></td><td>aplicación web</td><td>igual que singleton, pero solo en web</td></tr>
      </tbody>
    </table>

    <h2 id="sesion-http">Sesión HTTP</h2>
    <p>
      Una <strong>sesión HTTP</strong> es la forma de que el servidor se acuerde de quién eres
      entre peticiones. HTTP, por sí solo, no recuerda nada: cada petición llega sola, sin saber de
      las anteriores. El servidor necesita saber que el login, el perfil y el carrito son del
      mismo usuario. Para eso, al empezar crea una sesión con un identificador y se lo manda al
      navegador en una cookie (<code>JSESSIONID</code>). En cada petición siguiente el navegador
      manda la cookie, y el servidor localiza la sesión.
    </p>
    <DiagramaSesion />
    <p><strong>Con la cookie en cada petición, el servidor sabe de quién es la sesión.</strong></p>

    <h2 id="session-scope">Session scope</h2>
    <p>
      El scope <strong>session</strong> hace que cada usuario tenga su propia instancia del bean,
      y que se reutilice mientras dura su sesión. En Spring:
    </p>
    <CodeBlock :code="SESSION" language="java" />
    <p>Solo existe en aplicaciones web; en una de consola no hay sesión.</p>

    <h2 id="stateful-stateless">Stateful y stateless</h2>
    <p>Estos dos términos describen si la aplicación recuerda información entre peticiones.</p>
    <ul>
      <li>
        <strong>Stateless:</strong> cada petición lleva todo lo que necesita y el servidor no guarda
        nada del usuario. Ejemplo: una API con un token en cada llamada.
      </li>
      <li>
        <strong>Stateful:</strong> el servidor guarda información del usuario entre peticiones. Una
        sesión HTTP es stateful.
      </li>
    </ul>
    <p>
      La regla práctica con Spring: los beans singleton son stateless (compartidos, sin datos de
      petición en campos), y el estado de cada usuario vive en un bean de scope
      <code>request</code> o <code>session</code>.
    </p>

    <h2 id="para-explorar">Para explorar</h2>
    <ul>
      <li>
        <a href="https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html" target="_blank" rel="noopener noreferrer">Bean scopes</a>
        en la documentación de Spring.
      </li>
      <li>
        <a href="https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet/container-config.html" target="_blank" rel="noopener noreferrer">Web scopes y el proxy de sesión</a>.
      </li>
    </ul>
  </PlantillaPagina>
</template>
