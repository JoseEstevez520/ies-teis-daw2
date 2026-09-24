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

Ve paso a paso: de los dos que trae OpenCode a crear el tuyo.

```visual
agentes-por-pasos
```

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
