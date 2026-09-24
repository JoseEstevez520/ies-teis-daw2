# Fundamentos: modelo, harness y agente

Un agente de IA es un cerebro con cuerpo. El cerebro es el **modelo**, el cuerpo es el
**harness**, y juntos trabajan en tu proyecto.

## Cerebro y cuerpo

- **Modelo (el cerebro):** la IA que piensa y escribe (GPT, Claude, Gemini, Qwen...).
  Recibe texto y devuelve texto. No puede abrir tus archivos ni ejecutar nada.
- **Harness (el cuerpo):** el programa que hace lo que el modelo decide. Lee tus
  archivos, los edita y ejecuta comandos en la terminal (`npm test`, `git commit`...).
  OpenCode, Claude Code y Codex son harnesses.
- **Agente:** modelo y harness juntos, trabajando hasta acabar la tarea.

```visual
modelo-y-harness
```

## Cómo trabaja un agente

Repite cuatro pasos hasta acabar. Pulsa cada uno para ver el ejemplo:

```visual
bucle-agente
```

## Los harnesses más usados

| Harness | De quién | Qué necesitas |
|---|---|---|
| OpenCode | open source | nada: trae modelos gratis |
| Claude Code | Anthropic | suscripción de Claude o API |
| Codex | OpenAI | cuenta de ChatGPT o API |

Para empezar, [OpenCode](../opencode/): es gratis.
