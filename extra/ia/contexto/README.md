# Darle contexto: AGENTS.md, skills y MCP

**Un agente solo sabe de tu proyecto lo que le das.** Hay tres formas de dárselo, y cada
una entra en un momento distinto:

| | Qué es | Cuándo lo usa |
|---|---|---|
| **AGENTS.md** | las reglas de tu proyecto | siempre, al arrancar |
| **Skills** | instrucciones para un tipo de tarea | solo cuando la tarea lo pide |
| **MCP** | herramientas de fuera de tu proyecto | cuando las necesita |

Todo eso ocupa sitio en lo que el modelo tiene delante: AGENTS.md entero; de las skills,
solo su nombre y descripción hasta que carga una; de cada MCP, la lista de sus
herramientas.

**Lo que usa siempre va en AGENTS.md; lo que solo usa a veces, en una skill.** Así no le
llenas la cabeza de instrucciones que no necesita.

Los conceptos valen para cualquier agente. Los archivos y rutas de los ejemplos son los de
[OpenCode](../opencode/), que es el que usamos.

## AGENTS.md: las reglas del proyecto

Un `.md` en la raíz del proyecto que el agente lee siempre al arrancar: cómo se arranca,
qué tecnologías usa, qué no debe hacer. Es un nombre común a casi todos los agentes;
`/init` te crea uno. Un ejemplo para una práctica:

```markdown
# Práctica Spring: tienda

- Java 21 + Spring Boot + Thymeleaf + H2.
- Arrancar: `./mvnw spring-boot:run`
- Es una práctica de clase: no me escribas la solución. Explícame y revisa lo que
  hago yo.
```

En OpenCode, si no hay `AGENTS.md` pero sí `CLAUDE.md` (el nombre que usa Claude Code),
lee ese. Para reglas tuyas en todos tus proyectos, está `~/.config/opencode/AGENTS.md`.

## Skills: instrucciones cuando hacen falta

Una skill es una carpeta con un `SKILL.md`: un nombre, una descripción de cuándo usarla y
las instrucciones. El agente ve de primeras solo el nombre y la descripción de cada una, y
carga la entera cuando la tarea encaja. Este repo tiene las suyas en
[`.agents/skills/`](../../../.agents/skills/), como
[apuntes-claros](../../../.agents/skills/apuntes-claros/SKILL.md), la de escribir apuntes.

Nadie le dice que use la skill: la carga él al ver que la tarea encaja con su descripción.
**La descripción es lo que decide cuándo se usa**: tiene que decir para qué tareas sirve.

OpenCode busca skills en `.opencode/skills/`, `.agents/skills/` y `.claude/skills/` de tu
proyecto, y en las mismas carpetas de tu usuario.

## MCP: herramientas de fuera

MCP es una forma estándar de darle al agente herramientas que no trae: buscar en la
documentación de una librería, mirar tus incidencias, consultar una base de datos. Cada
una la pone un servidor MCP, que conectas en la configuración. Por ejemplo, Context7, que
busca en la documentación oficial de las librerías:

```json title="opencode.json"
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

Luego le pides algo acabando en "use context7" y busca en la documentación de ahora, no
en lo que el modelo recordaba. **Un MCP le da al agente herramientas nuevas, y con ellas
información que no tiene.**

> [!WARNING]
> La lista de herramientas de cada MCP entra en lo que el modelo tiene delante, aunque no
> las use. Conecta solo los que necesitas: algunos, como el de GitHub, tienen tantas que
> llenan el contexto.

Más en la documentación de OpenCode: [reglas](https://opencode.ai/docs/rules/),
[skills](https://opencode.ai/docs/skills/) y [MCP](https://opencode.ai/docs/mcp-servers/).
