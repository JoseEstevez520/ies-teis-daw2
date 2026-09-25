# Fundamentos: modelo, harness y agente

El modelo es el cerebro. El harness le da herramientas. Juntos son un agente.

## Modelo y harness

- **Modelo:** la IA que piensa, como la que hay detrás de ChatGPT. Solo recibe texto y
  devuelve texto.
- **Harness:** lo que le das al modelo para que pueda trabajar. Sobre todo herramientas
  (leer tus archivos, editarlos, ejecutar comandos), y también instrucciones y permisos.
  No lo tienes que montar tú: hay aplicaciones que lo traen ya montado, como Claude Code.
- **Agente:** modelo + harness.

## La misma petición, dos veces

Pídele a un modelo solo que no deje crear productos sin nombre en la práctica de la
tienda. No ha visto tu proyecto, así que te contesta con código para pegar. Las sesiones
son un ejemplo inventado.

**Solo, el modelo te dice qué hacer, pero lo haces tú.**

Ahora, el mismo modelo con un harness alrededor. Fíjate en que busca, lee, edita y pasa
los tests antes de contestar.

**Con un harness, lo hace él en tu proyecto, y ves cada paso.**

## Aplicaciones que traen el harness montado

Se instalan en tu ordenador y se usan desde la terminal.

| Aplicación | Qué necesitas |
|---|---|
| OpenCode | nada, es gratis |
| Claude Code | pagar Claude |
| Codex | pagar ChatGPT |

Para empezar, [OpenCode](../opencode/), que es gratis.
