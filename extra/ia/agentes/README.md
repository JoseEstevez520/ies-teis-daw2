# Agentes y subagentes

Un agente es el modelo con un papel: unas instrucciones que dicen qué hace y unos permisos
que dicen qué puede tocar. Con papeles distintos tienes agentes distintos, como en un
equipo:

| Agente | Qué hace | Edita | Ejecuta comandos |
|---|---|---|---|
| Constructor (Build, en OpenCode) | hace el cambio que le pides | sí | sí |
| Planificador (Plan, en OpenCode) | piensa el cambio y te lo propone | te pregunta | te pregunta |
| Tutor (hecho por ti) | te explica, pero no te resuelve la práctica | no | no |
| Explorador (un subagente) | busca para otro agente, solo leyendo, y vuelve con la respuesta | no | no |

**Lo que cambia de un agente a otro no es el modelo, son sus instrucciones y sus
permisos.**

Las aplicaciones traen algunos hechos (OpenCode trae Build y Plan, y cambias de uno a otro
con la tecla Tab) y puedes crear los tuyos. En la web se ve a cada uno trabajando con la
misma petición; las sesiones son un ejemplo inventado.

## El constructor

El que hace el trabajo; en OpenCode, Build, con el que arranca. **Hace el cambio
directamente**, sin preguntarte.

## El planificador

Para pensar antes de un cambio grande; en OpenCode, Plan. Se para y te pide permiso antes
de editar: **te deja un plan y no cambia nada sin tu permiso.**

## Uno tuyo: el tutor

Un agente creado por ti, con tus instrucciones y tus permisos. Este tutor tiene la edición
denegada, así que no puede resolverte la práctica aunque se lo pidas: **sus permisos
mandan, aunque el modelo quiera editar.** En OpenCode se crea con un archivo como este en
tu proyecto:

```markdown title=".opencode/agents/tutor.md"
---
description: Explica y guía sin escribir la solución
mode: primary
permission:
  edit: deny
  bash: deny
---

Explícame el concepto y hazme preguntas.
No me des el código de la práctica.
```

## Subagentes: el explorador

Un agente puede encargarle una parte del trabajo a otro, que trabaja aparte, en su propia
sesión. **Del subagente solo vuelve la respuesta, no todo lo que leyó**, así que el agente
principal no se llena de contexto.

## Para explorar

Crear agentes y subagentes, con todas sus opciones, en la
[documentación de OpenCode](https://opencode.ai/docs/agents/).

---

**4 de 7** · Anterior: [Darle contexto](../contexto/) · Siguiente: [Un equipo de agentes](../equipo/)
