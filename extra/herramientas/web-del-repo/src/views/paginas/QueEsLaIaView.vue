<script setup>
import { Callout } from 'elastic-ui'
import PlantillaPagina from '../../components/PlantillaPagina.vue'

// extra/ia/que-es-la-ia/README.md
const SIGNIFICA = [
  ['Comprueba lo que te diga', 'Escribe lo probable, no lo verdadero.'],
  ['No da siempre lo mismo', 'La misma pregunta puede salir distinta; si no te sirve, pídesela otra vez.'],
  ['Sabe hasta una fecha', 'Aprendió de lo que existía hasta un punto; lo posterior no lo conoce.'],
]

const SABER_MAS = [
  {
    href: 'https://www.understandingai.org/p/grandes-modelos-de-lenguaje-llm-una',
    titulo: 'Cómo funciona un modelo de lenguaje',
    texto: 'Explicado sin matemáticas, por Timothy B. Lee.',
  },
  {
    href: 'https://www.bbc.com/mundo/resources/idt-74697280-e684-43c5-a782-29e9d11fecf3',
    titulo: 'Una guía sencilla para entender la IA',
    texto: 'Por capas, para quien empieza de cero.',
  },
]
</script>

<template>
  <PlantillaPagina
    titulo="Qué es la IA"
    entradilla="Un programa normal hace lo que le escribes, paso a paso. La IA funciona al revés: le enseñas ejemplos y saca las reglas ella."
  >
    <h2 id="reglas">Antes: reglas</h2>
    <p>
      Un cajero sigue reglas que escribió alguien: si pasa esto, haz aquello. Con lo que se previó
      funciona; con lo que no, falla.
    </p>

    <h2 id="ejemplos">Ahora: ejemplos</h2>
    <p>
      Para saber si un correo es spam, nadie escribió la regla. Se le dieron miles de correos ya
      marcados como spam y como no spam, y aprendió a distinguirlos. Enseñar con ejemplos se llama
      <strong>entrenar</strong>, y el programa que sale de ahí es un <strong>modelo</strong>.
    </p>

    <h2 id="modelo-de-texto">Un modelo de texto</h2>
    <p>
      Con el texto pasa igual. Un modelo leyó muchísimo y aprendió a continuar lo que le pones,
      palabra a palabra. No busca en una base de datos ni comprueba si es verdad: escribe lo que le
      parece más probable.
    </p>
    <p><strong>Por eso a veces se lo inventa, y con total seguridad. No está roto: es cómo funciona.</strong></p>

    <h2 id="significa">Lo que eso significa al usarlo</h2>
    <ul>
      <li v-for="s in SIGNIFICA" :key="s[0]"><strong>{{ s[0] }}.</strong> {{ s[1] }}</li>
    </ul>
    <Callout type="tip">
      <p>No hace falta entenderlo todo para empezar: arranca, pregúntale y prueba.</p>
    </Callout>

    <h2 id="para-saber-mas">Para saber más</h2>
    <ul>
      <li v-for="s in SABER_MAS" :key="s.href">
        <a :href="s.href" target="_blank" rel="noopener noreferrer">{{ s.titulo }}</a>: {{ s.texto }}
      </li>
    </ul>
  </PlantillaPagina>
</template>
