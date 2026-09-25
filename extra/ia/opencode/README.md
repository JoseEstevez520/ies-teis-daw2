# Agentes de IA con OpenCode

[OpenCode](https://opencode.ai/) es una aplicación para la terminal que trae el harness
ya montado: le pides algo y el modelo trabaja en tu proyecto. Si no sabes qué es un
harness, empieza por los [fundamentos](../fundamentos/).

Explicamos OpenCode porque es gratis, sencillo y está bien hecho. Lo que aprendas aquí
vale igual para Claude Code o Codex.

## Instalar y arrancar

1. Instálalo: `curl -fsSL https://opencode.ai/install | bash` (o
   `npm install -g opencode-ai`).
2. Entra en la carpeta de tu proyecto y ejecuta `opencode`.
3. Escribe `/connect` y elige **OpenCode Zen**, que tiene modelos gratis.
4. Escribe `/init`: analiza el proyecto y te crea un `AGENTS.md`.

## Agentes

Un agente es el modelo con un papel: unas instrucciones que dicen qué hace y unos permisos
que dicen qué puede tocar. Con papeles distintos tienes agentes distintos, como en un
equipo: uno construye, otro planifica, otro explica.

| Agente | Qué hace | Edita | Ejecuta comandos |
|---|---|---|---|
| Constructor (Build, en OpenCode) | hace el cambio que le pides | sí | sí |
| Planificador (Plan, en OpenCode) | piensa el cambio y te lo propone | te pregunta | te pregunta |
| Tutor (hecho por ti) | te explica, pero no te resuelve la práctica | no | no |
| Explorador (un subagente) | busca para otro agente, solo leyendo, y vuelve con la respuesta | no | no |

**Lo que cambia de un agente a otro no es el modelo, son sus instrucciones y sus
permisos.**

OpenCode trae dos hechos, Build y Plan (cambias de uno a otro con la tecla Tab), y puedes
crear los tuyos. Abajo, la misma petición a cada uno. En la web se ven las sesiones; son
un ejemplo inventado.

### El constructor: Build

El agente con el que arranca. Fíjate en que edita sin preguntarte.

**Build hace el cambio directamente.**

### El planificador: Plan

Para pensar antes de un cambio grande. Fíjate en que se para y te pide permiso antes de
editar.

**Plan te deja un plan y no cambia nada sin tu permiso.**

### El tutor: uno tuyo

Puedes crear otro con tus instrucciones y tus permisos. Este tutor tiene la edición
denegada, así que no puede resolverte la práctica aunque se lo pidas.

**Sus permisos mandan: aunque el modelo quiera editar, el harness no le deja.**

Así se crea: guarda esto en tu proyecto.

```markdown title=".opencode/agents/tutor.md"
---
description: Explica y guía sin escribir la solución
mode: primary
permission:
  edit: deny
  bash: deny
---

Explícame el concepto y hazme preguntas.
No me des el código de la práctica.
```

### El explorador: un subagente

Un agente puede encargarle una parte a otro, que trabaja aparte. Fíjate en lo que vuelve.

**Del subagente solo vuelve la respuesta, no todo lo que leyó.**

## `AGENTS.md`: las reglas del proyecto

Un `.md` en la raíz del proyecto que el agente lee siempre al arrancar. Ejemplo para una
práctica:

```markdown
# Práctica Spring: tienda

- Java 21 + Spring Boot + Thymeleaf + H2.
- Arrancar: `./mvnw spring-boot:run`
- Es una práctica de clase: no me escribas la solución. Explícame y revisa lo que
  hago yo.
```

Si no hay `AGENTS.md` pero sí `CLAUDE.md`, lee ese. Para reglas tuyas en todos los
proyectos está `~/.config/opencode/AGENTS.md`.

## Para explorar

Cuando ya te manejes, hay más. Pregúntale al propio agente o mira la documentación:

- **Skills:** instrucciones que el agente carga solo cuando le hacen falta. Este repo
  tiene una en `.agents/skills/apuntes-claros/`. [Documentación](https://opencode.ai/docs/skills/)
- **MCP:** conecta al agente con cosas de fuera de tu proyecto, como la documentación de
  una librería. [Documentación](https://opencode.ai/docs/mcp-servers/)
- **Más agentes:** crear los tuyos y los subagentes. [Documentación](https://opencode.ai/docs/agents/)
