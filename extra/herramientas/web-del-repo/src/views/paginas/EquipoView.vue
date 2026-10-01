<script setup>
import { Steps, StepsItem } from 'elastic-ui'
import DiagramaEquipo from '../../visuales/DiagramaEquipo.vue'
import SesionAgente from '../../visuales/SesionAgente.vue'
import PlantillaPagina from '../../components/PlantillaPagina.vue'

// extra/ia/equipo/README.md. Una reflexión, no un manual: junta lo de las
// páginas anteriores en un proyecto y enlaza a ellas en vez de repetirlas. El
// proyecto (el buscador de FCT) sale de las ideas de PFC; la sesión es inventada.
</script>

<template>
  <PlantillaPagina
    titulo="Un equipo de agentes"
    entradilla="Hacer software ahora es mucho más rápido. Así se vería un proyecto hecho por un equipo de agentes, cada uno con su papel."
  >
    <h2 id="que-ha-cambiado">Lo que ha cambiado</h2>
    <p>
      Durante años, lo que más tiempo llevaba era escribir el código. Ahora eso lo hace un agente en
      minutos. Y como puedes tener varios, cada uno con su papel y sus instrucciones, se reparten el
      trabajo como un equipo: uno busca, otro planifica, otro construye, otro revisa.
    </p>
    <p><strong>Lo lento ya no es escribir el código: es saber qué quieres y comprobar que lo que sale está bien.</strong></p>

    <h2 id="un-proyecto">Un proyecto de principio a fin</h2>
    <p>
      Una idea que ya está en el repo: un
      <RouterLink to="/extra/ideas-proyecto-fin-curso/oportunidades-y-trayectoria">sistema de oportunidades y trayectoria</RouterLink>,
      que busca dónde hacer la FCT y lo guarda en un vault de Markdown. Así se lo repartiría un equipo:
    </p>
    <DiagramaEquipo />
    <p>
      Cada agente es el mismo modelo con otro papel, como en
      <RouterLink to="/extra/ia/agentes">Agentes y subagentes</RouterLink>, y cada uno lleva su skill, como
      en <RouterLink to="/extra/ia/contexto#skills">Darle contexto</RouterLink>. El explorador hace lo de
      <RouterLink to="/extra/open-source#busca-antes">buscar antes de construir</RouterLink>.
    </p>
    <p>
      Y pueden llevar <strong>modelos distintos</strong>: al que planifica y decide le pones el más
      listo, y a los que ejecutan lo fácil, uno más barato (ver
      <RouterLink to="/extra/ia/modelos">Elegir un modelo</RouterLink>).
    </p>
    <p>
      Ahora, verlos trabajar. Lo pides una vez y cada agente hace lo suyo, aparte, y le pasa al
      siguiente solo lo que necesita. Fíjate en quién encuentra el fallo. La sesión es un ejemplo
      inventado.
    </p>
    <SesionAgente nombre="equipo" />
    <p><strong>Tú no escribiste el código, pero decidiste qué hacer y tienes la última palabra.</strong></p>

    <h2 id="lo-que-pones-tu">Lo que pones tú</h2>
    <ul>
      <li>
        <strong>Saber qué quieres.</strong> Para qué sirve y para quién. Si no lo tienes claro tú, el
        equipo construye rápido otra cosa.
      </li>
      <li>
        <strong>Explicarlo bien.</strong> Revisar la especificación antes de que construyan nada, y
        tener unas buenas reglas del proyecto y unas buenas skills: son lo que guía al equipo.
      </li>
      <li>
        <strong>Revisar lo que sale.</strong> Probarlo, leer lo que ha cambiado y decidir si vale.
      </li>
    </ul>

    <h2 id="lo-que-no-cambia">Lo que no cambia</h2>
    <p>
      Tienes que entender lo que se ha hecho. Eres quien decide, quien lo defiende en clase o en una
      entrevista y quien responde si falla. Un equipo de agentes te hace ir más rápido, no te quita
      tener que saber.
    </p>
    <p><strong>Los agentes hacen el trabajo; entenderlo y decidir sigue siendo cosa tuya.</strong></p>

    <h2 id="pruebalo">Pruébalo</h2>
    <p>
      Coge una idea pequeña, por ejemplo de las
      <RouterLink to="/extra/ideas-proyecto-fin-curso">ideas para el PFC</RouterLink>, y arráncala así, aunque
      al principio sea un solo agente haciendo cada papel por turnos:
    </p>
    <Steps static>
      <StepsItem title="Pide que busque"><p>¿Existe ya algo que haga esto?</p></StepsItem>
      <StepsItem title="Pide la especificación"><p>Qué tiene que hacer, qué no y cómo se sabe que está bien. Revísala antes de seguir.</p></StepsItem>
      <StepsItem title="Pide que lo construya"><p>Siguiendo esa especificación.</p></StepsItem>
      <StepsItem title="Pide que lo revise otro"><p>Otro agente, o el mismo en otra sesión, que busque fallos.</p></StepsItem>
      <StepsItem title="Revisa tú"><p>Pruébalo y decide si vale.</p></StepsItem>
    </Steps>
  </PlantillaPagina>
</template>
