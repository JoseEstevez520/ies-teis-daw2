# Skills de diseño

Una skill son instrucciones que tu agente sigue para una tarea concreta (qué es, en
[`../../ia/contexto/`](../../ia/contexto/)). Estas son las que ayudan a diseñar.

## Contra el AI slop

Las más famosas son justo para esto: que el agente no saque el look genérico (ver
[`../ai-slop/`](../ai-slop/)).

- [frontend-design](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md)
  — la oficial de Anthropic, para Claude Code. La referencia.
- [unslop-ui-skill](https://github.com/claudiusararu/unslop-ui-skill) — un catálogo de casi
  100 "tells" de diseño de IA, cada uno con su arreglo.
- [no-slop-ui](https://github.com/LeoStehlik/no-slop-ui) — reglas para Codex, Claude Code y
  compañía, con checklist de revisión.
- [anti-slop-design](https://github.com/Ferousco-dev/anti-slop-design) — evita el degradado
  morado, Inter y las tres tarjetas.
- [design-slop](https://github.com/wpgaurav/design-slop) — detectar y quitar el look genérico
  en webs, dashboards y componentes.
- [web-ai-slop](https://github.com/sahilkargutkar/web-ai-slop) — filtra patrones de diseño,
  clichés de texto y "tells" de código.

## Otras

- **Accesibilidad**: contraste, tamaño de los toques, foco visible.
- **Un sistema**: paleta, escala de tipos, espaciado.
- **De una captura a código**: pasar una referencia a una maqueta.

## Dónde encontrarlas

- [skills.sh](https://skills.sh) — directorio de skills que publica la gente.
- [anthropics/skills](https://github.com/anthropics/skills) — skills de ejemplo.
- En este repo hay unas cuantas en [`.agents/skills/`](../../../.agents/skills/).

> [!WARNING]
> Una skill son instrucciones que tu agente va a seguir. Instala solo lo que venga de alguien
> de confianza y léela antes, como cualquier cosa que le des a ejecutar.
