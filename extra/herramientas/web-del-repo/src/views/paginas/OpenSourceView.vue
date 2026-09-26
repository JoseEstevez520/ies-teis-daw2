<script setup>
import { Callout, Steps, StepsItem } from 'elastic-ui'
import DiagramaBuscar from '../../visuales/DiagramaBuscar.vue'
import DiagramaFork from '../../visuales/DiagramaFork.vue'
import SesionAgente from '../../visuales/SesionAgente.vue'
import PlantillaPagina from '../../components/PlantillaPagina.vue'
import RejillaTarjetas from '../../components/RejillaTarjetas.vue'
import TarjetaPagina from '../../components/TarjetaPagina.vue'

// extra/open-source/README.md. Licencias comprobadas en GitHub; fork y pull
// request según la documentación de GitHub. La sesión es inventada.
const EJEMPLOS = [
  {
    href: 'https://github.com/lochie/torph',
    titulo: 'Torph',
    descripcion: 'Usarlo tal cual: anima un texto cuando cambia. La librería de componentes de esta web lo usa en vez de hacerlo de cero.',
    nota: 'MIT',
  },
  {
    href: 'https://github.com/spring-projects/spring-petclinic',
    titulo: 'spring-petclinic',
    descripcion: 'Ver cómo se hace: el proyecto de ejemplo oficial de Spring, con controladores, repositorios, validación y tests bien organizados.',
    nota: 'Apache-2.0',
  },
  {
    href: 'https://github.com/unovue/shadcn-vue',
    titulo: 'shadcn-vue',
    descripcion: 'Coger piezas: componentes de Vue pensados para copiarlos a tu proyecto y cambiarlos a tu gusto.',
    nota: 'MIT',
  },
  {
    href: 'https://github.com/wandb/openui',
    titulo: 'OpenUI',
    descripcion: 'Sacar ideas: genera interfaces a partir de una descripción en texto. Para ver cómo lo hacen, o como motor de tu proyecto.',
    nota: 'Apache-2.0',
  },
]

const DOCS = {
  fork: 'https://docs.github.com/es/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo',
  sincronizar: 'https://docs.github.com/es/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork',
  pullRequest: 'https://docs.github.com/es/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests',
  licencias: 'https://choosealicense.com/',
  sinLicencia: 'https://choosealicense.com/no-permission/',
}
</script>

<template>
  <PlantillaPagina
    titulo="Open source"
    entradilla="Código que su autor publica para que cualquiera lo vea, lo use y lo mejore. Muchas veces lo que vas a construir ya existe, hecho y probado."
  >
    <h2 id="busca-antes">Busca antes de construir</h2>
    <p>
      Es muy típico ponerse a hacer desde cero algo que ya está hecho, y mejor. Antes de empezar,
      busca. Lo que hagas depende de lo que encuentres:
    </p>
    <DiagramaBuscar />
    <p><strong>Si ya hay algo maduro que hace lo que necesitas, úsalo</strong>: tu tiempo va a lo que es solo tuyo.</p>

    <h2 id="como-buscar">Cómo buscar</h2>
    <p>
      Pídeselo a un agente: le cuentas qué quieres hacer y busca por ti. Fíjate en que no se queda
      con el primero: mira si se mantiene y qué licencia tiene. La sesión es un ejemplo inventado.
    </p>
    <SesionAgente nombre="buscar" />
    <p><strong>Un buen proyecto se mantiene, tiene licencia y encaja con lo que usas</strong>; las estrellas solas no lo dicen.</p>

    <h2 id="que-aprovechar">Qué puedes aprovechar</h2>
    <p>Según lo que necesites, de un proyecto sacas cosas distintas. Ejemplos reales, con su licencia:</p>
    <RejillaTarjetas>
      <TarjetaPagina v-for="e in EJEMPLOS" :key="e.href" v-bind="e" />
    </RejillaTarjetas>
    <Callout type="warning" title="Mira la licencia antes de copiar">
      <p>
        La licencia dice qué puedes hacer con el código. MIT o Apache-2.0 te dejan usarlo casi para
        todo, citando de dónde viene. <strong>Sin licencia no puedes usar su código</strong>, aunque
        esté a la vista (<a :href="DOCS.sinLicencia" target="_blank" rel="noopener noreferrer">por qué</a>).
      </p>
    </Callout>

    <h2 id="fork">Fork y pull request</h2>
    <p>
      Cuando lo que encuentras es parecido pero no justo lo tuyo, haz un fork: tu copia del
      proyecto, en tu cuenta, para cambiarla sin tocar el original.
    </p>
    <DiagramaFork />
    <Steps static>
      <StepsItem title="Haz el fork">
        <p>En la página del proyecto en GitHub, el botón <strong>Fork</strong>. Se crea tu copia en tu cuenta.</p>
      </StepsItem>
      <StepsItem title="Trabaja en tu copia">
        <p>Clónala, arráncala y cámbiala: es tuya, puedes romperla sin miedo.</p>
      </StepsItem>
      <StepsItem title="Si mejoras algo, propónselo">
        <p>
          Un <strong>pull request</strong> le enseña al autor tus cambios para que los revise y, si
          le valen, los añada al original.
        </p>
      </StepsItem>
    </Steps>
    <p><strong>Con un pull request, lo que arreglas para ti lo aprovecha todo el que usa el proyecto.</strong></p>

    <h2 id="publica">Publica lo tuyo</h2>
    <p>
      Lo mismo al revés: si construyes algo que no existía, publícalo. Con un README que diga qué es
      y cómo se arranca, y una licencia (<a :href="DOCS.licencias" target="_blank" rel="noopener noreferrer">cómo elegirla</a>),
      otros pueden usarlo, avisarte de fallos y ayudarte a mejorarlo.
    </p>
    <p>
      Este repo es la misma idea, a escala de clase: cada uno aporta apuntes y herramientas, y todos
      aprovechan lo de los demás en vez de hacerlo cada uno por su cuenta.
    </p>
    <p><strong>Publicar es la otra mitad de aprovechar: alguien, en algún sitio, está buscando lo que tú ya has hecho.</strong></p>

    <h2 id="para-explorar">Para explorar</h2>
    <ul>
      <li><a :href="DOCS.fork" target="_blank" rel="noopener noreferrer">Hacer un fork</a>, en la documentación de GitHub.</li>
      <li><a :href="DOCS.sincronizar" target="_blank" rel="noopener noreferrer">Mantener tu fork al día</a> con los cambios del original.</li>
      <li><a :href="DOCS.pullRequest" target="_blank" rel="noopener noreferrer">Qué es un pull request</a> y cómo se revisa.</li>
    </ul>
  </PlantillaPagina>
</template>
