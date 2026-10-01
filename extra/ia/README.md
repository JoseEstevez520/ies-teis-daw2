# IA

Cómo usar la IA mejor.

## Páginas

Se leen en orden: cada página se apoya en la anterior. Las siete primeras bastan para usar
la IA; las dos últimas explican qué es por dentro, por si quieres más.

1. [`fundamentos/`](fundamentos/): qué es un modelo, un harness y un agente.
2. [`opencode/`](opencode/): tu primer agente: instalarlo y pedirle cosas.
3. [`modelos/`](modelos/): elegir un modelo: capacidad, precio y cuándo basta el barato.
4. [`contexto/`](contexto/): darle contexto con AGENTS.md, skills y MCP.
5. [`agentes/`](agentes/): agentes y subagentes, y cómo crear los tuyos.
6. [`equipo/`](equipo/): un equipo de agentes, en un proyecto de principio a fin.
7. [`herramientas/`](herramientas/): las que rodean al agente: Herdr (mantenerlo corriendo) y
   Obsidian (editar el markdown).
8. [`que-es-la-ia/`](que-es-la-ia/): qué es esto, en llano: aprende de ejemplos.
9. [`aplicaciones-con-ia/`](aplicaciones-con-ia/): qué se puede hacer con ella: chat, generar,
   tool calling y MCP.

Las páginas explican conceptos que valen para cualquier agente. Los ejemplos son de
OpenCode porque es el que usamos.

## Recursos

Sitios para buscar skills y conexiones que ya ha hecho otra gente, y para aprender a hacer
las tuyas. Lo que es cada cosa, en [`contexto/`](contexto/).

### AGENTS.md

- [agents.md](https://agents.md) — qué es el formato, qué agentes lo leen y ejemplos de
  proyectos reales. Lo mantiene la Linux Foundation.

### Skills

- [Agent Skills](https://agentskills.io) — el formato de las skills: cómo se escribe una y
  qué agentes las usan. Es un estándar abierto.
- [anthropics/skills](https://github.com/anthropics/skills) — skills de ejemplo, para ver
  cómo están hechas o copiarlas y adaptarlas.
- [skills.sh](https://skills.sh) — un directorio de skills que publica la gente, para buscar
  si ya existe la que necesitas. Lo mantiene Vercel.

### MCP

- [Model Context Protocol](https://modelcontextprotocol.io) — qué es MCP y cómo funciona una
  conexión, en la documentación oficial.
- [Registro de MCP](https://registry.modelcontextprotocol.io) — el registro oficial de
  servidores: para buscar la conexión con la aplicación que usas.
- [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) —
  servidores de referencia, sencillos, para ver cómo está hecho uno por dentro.
- [Context7](https://context7.com) — la documentación al día de muchas librerías; el ejemplo
  de [`contexto/`](contexto/).

### Para aprender

- [How I Use AI to Learn Things](https://www.youtube.com/watch?v=kzcI5F4tGiU) (vídeo, en
  inglés) — usar la IA para aprender algo nuevo, no para que te lo resuelva.

> [!WARNING]
> **Lee antes de instalar.** Una skill son instrucciones que tu agente va a seguir, y un MCP
> es un programa que se ejecuta en tu ordenador con acceso a lo que le conectes. Instala solo
> lo que venga de alguien de confianza, y lee qué hace antes. Es lo mismo que al
> [buscar un proyecto open source](../open-source/#cómo-buscar).

**Si haces una skill que te sirve, compártela**: en este repo están en
[`.agents/skills/`](../../.agents/skills/), y cualquiera de la clase la puede usar y mejorar.
