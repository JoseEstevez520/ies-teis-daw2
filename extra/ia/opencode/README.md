# Agentes de IA con OpenCode

[OpenCode](https://opencode.ai/) es una aplicación para la terminal que trae el harness
ya montado: le pides algo y el modelo trabaja en tu proyecto. Si no sabes qué es un
harness, empieza por los [fundamentos](../fundamentos/).

Explicamos OpenCode porque es gratis, sencillo y está bien hecho. Lo que aprendas aquí
vale igual para Claude Code o Codex.

## Un agente trabajando, paso a paso

Caso de este repo: pedirle un apunte. La terminal está simplificada.

```visual
agente-en-accion
```

## Instalar y arrancar

1. Instálalo: `curl -fsSL https://opencode.ai/install | bash` (o
   `npm install -g opencode-ai`).
2. Entra en la carpeta de tu proyecto y ejecuta `opencode`.
3. Escribe `/connect` y elige **OpenCode Zen**, que tiene modelos gratis.
4. Escribe `/init`: analiza el proyecto y te crea un `AGENTS.md`.

## Los agentes de OpenCode

En OpenCode, cada agente es el mismo modelo con tres ajustes: **instrucciones**,
**permisos** y **cómo se le llama**. Elige uno y compara:

```visual
agentes-opencode
```

- **Principal:** hablas directamente con él. Cambias de uno a otro con `Tab`.
- **Subagente:** el agente principal le encarga una parte, la hace aparte y le devuelve
  solo el resultado. Tú también puedes llamarlo con `@nombre`.

Para hacerte uno, `opencode agent create` te pregunta los tres ajustes, o escribes el `.md`
en `.opencode/agents/`. Merece la pena cuando quieres que **no pueda** hacer algo: sin
permiso de editar, no edita aunque se lo pidas.

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

## Skills: instrucciones que carga solo si hacen falta

De cada skill el agente solo ve el nombre y la descripción, y carga el resto cuando la
tarea encaja. Es una carpeta con un `SKILL.md`; `name` y `description` son obligatorios:

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

Este repo tiene una en `.agents/skills/apuntes-claros/`: OpenCode la usa sin configurar
nada.

## MCP: herramientas de fuera

Un servidor MCP conecta al agente con algo de fuera de tu proyecto: documentación, tu
GitHub, una base de datos. Va en `opencode.json`. Ejemplo con Context7, que busca en la
documentación oficial de librerías:

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

Se lo pides tal cual: "usa context7 y dime cómo se hace un `watch` en Vue 3".

## Ponte a prueba

```visual
autoexamen-agentes
```
