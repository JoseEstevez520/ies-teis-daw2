# Tu primer agente

Para trabajar con un agente no montas tú el harness: instalas una aplicación que ya lo
trae, la abres en tu proyecto y le pides cosas. Si no sabes qué es un harness, empieza
por los [fundamentos](../fundamentos/).

Aquí se ve con [OpenCode](https://opencode.ai/), que es el que usamos porque es gratis.
Claude Code y Codex funcionan igual.

## Instalar y arrancar

1. Instálalo: `curl -fsSL https://opencode.ai/install | bash` (o
   `npm install -g opencode-ai`).
2. Entra en la carpeta de tu proyecto y ejecuta `opencode`.
3. Escribe `/connect` y elige **OpenCode Zen**, que tiene modelos gratis.
4. Escribe `/init`: lee el proyecto y te crea un `AGENTS.md` con lo que ha entendido de
   él. Qué es, en [Darle contexto](../contexto/#agentsmd-las-reglas-del-proyecto).

## Pídele algo

Escríbele en palabras normales, como a un compañero que tiene tu proyecto delante. Por
ejemplo:

- Explícame qué hace ProductoController.
- Añade que no se pueda guardar un producto sin nombre.
- ¿Por qué falla el test de crear producto?

Mientras trabaja ves cada paso: qué busca, qué lee, qué cambia y qué ejecuta. **Revisa lo
que cambia antes de darlo por bueno**, igual que revisarías el código de otro.

## Siguiente

- [Darle contexto](../contexto/): AGENTS.md, skills y MCP.
- [Agentes y subagentes](../agentes/): el mismo modelo con papeles distintos.
