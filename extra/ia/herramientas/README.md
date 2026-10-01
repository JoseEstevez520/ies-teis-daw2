# Herramientas

Alrededor del agente hay programas que ayudan a trabajar con él. Dos que encajan bien: uno para
tenerlos corriendo (Herdr) y otro para leer y escribir lo que el agente usa (Obsidian).

## Herdr

Herdr es un **multiplexor de terminal**. Un multiplexor es un programa que guarda las terminales
en un servidor en segundo plano: cierras la ventana y las terminales siguen ahí, listas para
volver a ellas desde el mismo equipo o por SSH.

Herdr hace eso mismo, pero **entendiendo de agentes**. Cada agente vive en su terminal dentro del
servidor de Herdr, y Herdr sabe en qué estado está:

- `working`: trabajando.
- `blocked`: parado, esperando algo de ti.
- `done`: terminó y no lo has mirado.

Con varios agentes a la vez, de un vistazo ves cuál necesita que le hagas caso, en vez de ir
terminal por terminal.

![La portada de Herdr: «Run them anywhere. Leave them running.»](https://herdr.dev/assets/og-card-v9.png)

Se instala y se arranca con:

```bash
curl -fsSL https://herdr.dev/install.sh | sh
herdr
```

`ctrl+b q` te desengancha del servidor sin cerrarlo; `herdr` te vuelve a enganchar.

Su gracia está en dos cosas: los agentes pueden **hablar entre ellos** (uno le abre un panel a
otro, lee su salida y espera a que termine o se quede bloqueado), y las terminales **siguen
vivas** aunque apagues tu ordenador, si Herdr corre en otra máquina o te conectas por SSH. Al
volver, te reenganchas donde estabas.

## Obsidian

Los apuntes de este repo, el `AGENTS.md` y las skills son **markdown**: texto plano con un poco de
formato. Es lo que leen los agentes y lo que Git guarda y compara sin líos.

**Obsidian es un programa para leer y escribir esos archivos.** Le das una carpeta (un *vault*) y
te muestra los `.md` como notas: las enlazas entre ellas, ves qué notas apuntan a cuál y buscas en
todas. El archivo sigue siendo el mismo `.md`; Obsidian solo lo pinta, así que el agente ni se
entera de con qué lo abriste.

![La portada de Obsidian: «Sharpen your thinking.»](https://obsidian.md/images/banner.png)

## Para explorar

- [Herdr](https://herdr.dev/) y su [documentación](https://herdr.dev/docs/).
- [Obsidian](https://obsidian.md/).

---

**6 de 7** · Anterior: [Un equipo de agentes](../equipo/) · Siguiente: [Consejos](../consejos/)
