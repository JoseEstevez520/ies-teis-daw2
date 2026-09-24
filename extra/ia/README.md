# IA aplicada

Cosas que no son temario pero que ayudan a currar mejor con asistentes de IA (Claude,
Copilot, ChatGPT...) en el día a día de clase.

## Para empezar

- **No le pidas la solución, pídele que explique.** Si el asistente te da el código directo,
  aprendes menos y no vas a poder defenderlo en un examen o en una entrevista. Pídele que te
  explique el concepto o que revise lo que ya has hecho tú.
- **Dale contexto real, no solo la pregunta suelta.** "¿Por qué falla esto?" funciona peor
  que pegar el error completo + qué estabas intentando hacer.
- **Un archivo `AGENTS.md` (o `CLAUDE.md`) en la raíz de tu proyecto** le dice al asistente
  cómo quieres que trabaje contigo (por ejemplo: "no edites código, solo explica"). Es la
  forma de que no se pase de listo y te resuelva el ejercicio por ti.
- **Úsalo para lo tedioso, no para lo que tienes que aprender.** Documentación, bootear un
  proyecto, buscar en la documentación oficial: ahí sí ahorra tiempo real.

Añade aquí prompts o flujos concretos que te hayan funcionado bien en las prácticas del
curso.

## Empezar con agentes: OpenCode

[OpenCode](https://opencode.ai/) es un agente de código para la terminal. Sirve para
iniciarse en trabajar con agentes sin pagar nada:

- **Gratis**: open source y con modelos gratuitos incluidos, no necesitas suscripción.
- **`AGENTS.md`**: lo lee al arrancar, así que puedes practicar a darle reglas a un
  agente por proyecto.
- **Skills**: instrucciones reutilizables que el agente carga cuando hacen falta (como
  `apuntes-claros` en este repo).
- **MCP**: le conectas servidores externos (GitHub, una base de datos, el navegador...)
  para que use herramientas más allá de leer y editar archivos.

Lo que aprendas aquí vale igual para Claude Code, Codex o Copilot: usan los mismos
conceptos.

## Recursos

- [How I Use AI to Learn Things](https://www.youtube.com/watch?v=kzcI5F4tGiU) — usar la IA
  para aprender algo nuevo, no para que te lo resuelva.
- [OpenCode](https://opencode.ai/) — agente de código en la terminal, gratis y open
  source, con modelos gratuitos incluidos. Buena forma de empezar a trabajar con agentes:
  lee tu `AGENTS.md` y admite skills y servidores MCP.
