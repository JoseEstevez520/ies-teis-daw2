# Agentes de IA con OpenCode

Un agente de IA para programar es una IA que trabaja dentro de tu proyecto: lee
archivos, ejecuta comandos y edita código. Aquí lo aprendemos con [OpenCode](https://opencode.ai/)
porque es gratis y cualquiera puede instalarlo, pero lo que aprendas vale igual para
Claude Code o Codex.

## Modelo, harness y agente

Son tres palabras que se mezclan mucho:

- **Modelo:** la IA en sí (GPT, Claude, Gemini, Qwen...). Recibe texto y devuelve texto.
  No ve tus archivos ni ejecuta nada.
- **Harness:** el programa que envuelve al modelo y le da manos. Lee tus archivos,
  ejecuta comandos, le pasa los resultados al modelo y repite. OpenCode, Claude Code y
  Codex son harnesses.
- **Agente:** un modelo dentro de un harness, trabajando en bucle hasta acabar.

La diferencia se ve con la misma petición. Cambia entre las dos pestañas:

```visual
modelo-y-harness
```

Los tres harnesses más usados:

| Harness | De quién | Qué necesitas |
|---|---|---|
| OpenCode | open source | nada: trae modelos gratis |
| Claude Code | Anthropic | suscripción de Claude o API |
| Codex | OpenAI | cuenta de ChatGPT o API |

Las ideas de esta página (reglas del proyecto, skills, MCP) son las mismas en los tres.
Solo cambia algún nombre de fichero: Claude Code, por ejemplo, lee `CLAUDE.md`.

## Un agente trabajando, paso a paso

Pulsa **Reproducir** o ve paso a paso: se ilumina la pieza que entra en juego en cada
momento. El caso es de este mismo repo (la terminal está simplificada): pedirle un apunte.

```visual
agente-en-accion
```

| Pieza | Dónde va | Cuándo la usa el agente |
|---|---|---|
| `AGENTS.md` | raíz del proyecto | siempre, al arrancar |
| Skill | `.agents/skills/<nombre>/SKILL.md` | solo cuando la tarea encaja con su descripción |
| MCP | `opencode.json` | cuando necesita algo de fuera de tu proyecto |

## Instalar y arrancar

1. Instálalo: `curl -fsSL https://opencode.ai/install | bash` (o
   `npm install -g opencode-ai`).
2. Entra en la carpeta de tu proyecto y ejecuta `opencode`.
3. Escribe `/connect` y elige **OpenCode Zen**, que tiene modelos gratis.
4. Escribe `/init`: analiza el proyecto y te crea un `AGENTS.md`.

## Los agentes de OpenCode

Dentro de OpenCode, cada "agente" es el mismo modelo y el mismo harness con tres ajustes:
**instrucciones** (qué hace y cómo), **permisos** (si puede editar o usar la terminal) y
**cómo se le llama**. Trae varios de serie, y puedes hacerte los tuyos. Elige uno y
compara:

```visual
agentes-opencode
```

- **Principal:** hablas directamente con él. Cambias de uno a otro con `Tab`.
- **Subagente:** el agente principal le encarga una parte, la hace aparte y le devuelve
  solo el resultado. Tú también puedes llamarlo con `@nombre`.

Hacerte uno es elegir tú esos tres ajustes: `opencode agent create` te los pregunta, o
escribes el `.md` a mano en `.opencode/agents/`. Merece la pena cuando repites siempre
las mismas instrucciones, o cuando quieres que **no pueda** hacer algo: un agente sin
permiso de editar no edita aunque se lo pidas.

## `AGENTS.md`: las reglas del proyecto

Es un `.md` normal en la raíz del proyecto. El agente lo lee cada vez que arranca, así
que no tienes que repetirle lo mismo en cada conversación. Ejemplo para una práctica:

```markdown
# Práctica Spring: tienda

- Java 21 + Spring Boot + Thymeleaf + H2.
- Arrancar: `./mvnw spring-boot:run`
- Es una práctica de clase: no me escribas la solución. Explícame y revisa lo que
  hago yo.
```

Si no hay `AGENTS.md` pero sí `CLAUDE.md`, lee ese. Para reglas tuyas en todos los
proyectos está `~/.config/opencode/AGENTS.md`.

## Skills: instrucciones que carga solo si hacen falta

La diferencia con `AGENTS.md`: de cada skill el agente solo ve el nombre y la
descripción. El contenido entero lo carga cuando la tarea encaja (paso 3 del esquema de
arriba).

Una skill es una carpeta con un `SKILL.md`. El frontmatter con `name` y `description` es
obligatorio:

```markdown
---
name: apuntes-claros
description: Estilo de escritura para cualquier .md de este repo. Aplícalo siempre
  que redactes o revises un apunte.
---

# Apuntes claros

- Empieza por lo importante, no por el contexto.
- Código en bloques, nunca descrito en prosa.
```

Este repo ya tiene una en `.agents/skills/apuntes-claros/`, así que si abres OpenCode aquí
la usa sin configurar nada.

## MCP: herramientas de fuera

Un servidor MCP le da al agente acceso a algo que no está en tu proyecto: documentación
actualizada, tu GitHub, una base de datos... Se añade en `opencode.json`, en la raíz del
proyecto. Ejemplo con Context7, que busca en la documentación oficial de librerías:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp"
    }
  }
}
```

Luego se lo pides tal cual: "usa context7 y dime cómo se hace un `watch` en Vue 3". Con
`opencode mcp list` ves qué servidores tiene conectados.

## Ponte a prueba

```visual
autoexamen-agentes
```
