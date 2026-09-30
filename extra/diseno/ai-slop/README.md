# AI slop

"AI slop" es el aspecto que sale cuando dejas que la IA diseñe sin corregirla. Se reconoce a
la legua y hace que todo parezca lo mismo.

No es que la IA diseñe mal: aprende de millones de webs, así que da lo más común, y lo más
común es el término medio. Anthropic lo admite en su propia skill de diseño, que lista los
tres looks en los que cae la IA cuando nadie la frena.

## Qué lo delata

- **Degradados morados** y azules, y fondos con "aurora". El color por defecto de la IA.
- **Inter** (o Roboto, Arial) para todo.
- **Cristal esmerilado** (glassmorphism) sin motivo.
- **Emojis** como iconos y como adorno de los títulos.
- **Tres tarjetas iguales**, con un icono, un título y dos líneas.
- **Píldora sobre el hero** y todo centrado, sin retícula.
- **Texto gris claro**, de bajo contraste.
- **Guiones largos** (—) en cada frase y "fade-up" al hacer scroll.
- **Textos inflados**: "potente", "sin límites", "lleva tu proyecto al siguiente nivel".

## Cómo evitarlo

- Un color de acento, no un degradado. El resto, grises (ver [`../colores/`](../colores/)).
- Una fuente con carácter, no Inter (ver [`../fuentes/`](../fuentes/)).
- Menos sombras y menos esquinas redondeadas: separa con el borde y el espaciado.
- Iconos de verdad (una librería), no emojis.
- Texto concreto: qué hace, para quién y qué problema resuelve.
- Parte de referencias reales (ver [`../referencias/`](../referencias/)), no de la nada.

## Recursos

Guías y webs sobre el tema:

- [Improving frontend design through Skills](https://claude.com/blog/improving-frontend-design-through-skills)
  — Anthropic explica por qué la IA cae en el look genérico y cómo evitarlo con una skill.
- [Frontend Design](https://claude.com/plugins/frontend-design) — la skill oficial de Claude
  Code para diseño con carácter.
- [AI Design Slop](https://smoothui.dev/blog/ai-design-slop) — por qué la interfaz generada
  por IA se ve genérica.
- [AI Slop Web Design](https://www.925studios.co/blog/ai-slop-web-design-guide) — guía para
  detectarlo y arreglarlo.
- [Made, Not Generated](https://agentfactory.panaversity.org/docs/website-design-crash-course)
  — curso corto de diseño de webs con IA.

Las skills que sirven para esto, en [`../skills/`](../skills/).
