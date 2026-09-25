# Darle contexto: AGENTS.md, skills y MCP

**Un agente solo sabe de tu proyecto lo que le das.** Hay tres formas de dárselo, y cada
una entra en un momento distinto:

| | Qué es | Cuándo lo usa |
|---|---|---|
| **AGENTS.md** | las reglas de tu proyecto | siempre, al arrancar |
| **Skills** | instrucciones para un tipo de tarea | solo cuando la tarea lo pide |
| **MCP** | conexiones con otras aplicaciones | cuando necesita algo de ellas |

Todo eso ocupa sitio en lo que el modelo tiene delante: AGENTS.md entero; de las skills,
solo su nombre y descripción hasta que carga una; de cada MCP, lo que se puede hacer con
esa conexión.

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

## MCP: conexiones con otras aplicaciones

Un MCP conecta al agente con otra aplicación: la documentación de las librerías, tu
GitHub, una base de datos. Es una forma estándar de conectarlas, así que la misma conexión
sirve para cualquier agente. Se añade en la configuración; por ejemplo, Context7, que
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
en lo que el modelo recordaba. **Un MCP conecta al agente con otra aplicación, y con ella
con información que no tiene.**

> [!WARNING]
> Lo que se puede hacer con cada conexión entra en lo que el modelo tiene delante, aunque
> no lo use. Conecta solo lo que necesitas: algunas, como la de GitHub, traen tantas cosas
> que llenan el contexto.

Más en la documentación de OpenCode: [reglas](https://opencode.ai/docs/rules/),
[skills](https://opencode.ai/docs/skills/) y [MCP](https://opencode.ai/docs/mcp-servers/).
