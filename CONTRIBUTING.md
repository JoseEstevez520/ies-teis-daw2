# Cómo aportar

Sin ceremonia: si eres colaborador, tienes push directo. No hay pull requests ni revisión
previa. La idea es que subir algo sea tan fácil como copiarlo aquí.

## Reglas mínimas

- **Haz `git pull` antes de currar**, para no pisar el trabajo de otro.
- **No reescribas lo de otra persona sin necesidad.** Si crees que algo está mal, corrígelo,
  pero no borres el trabajo ajeno solo porque lo harías distinto.
- **Nombres de archivo y carpeta en minúsculas-con-guiones** (`validacion-formularios.md`,
  no `Validación Formularios.md`). Esto importa porque el repo se puede convertir en web más
  adelante, y esos nombres pasan a ser URLs.
- Si dudas dónde meter algo, mejor preguntarlo que dejarlo suelto en la raíz.
- **Estilo de redacción**: conciso y escaneable, sin relleno. Ver
  [.agents/skills/apuntes-claros/SKILL.md](.agents/skills/apuntes-claros/SKILL.md).
- **No uses la palabra "Moodle" en el nombre de una herramienta** (`alarma-tareas`, no
  `MoodleAlarma`). Es la política de marca de Moodle, aplica aunque sea gratis. Mencionarlo
  como descripción sí vale ("consulta el Aula Virtual (Moodle) vía su API").

## Plantilla mínima de apunte

No hace falta seguir un formato rígido, pero cada apunte nuevo debería empezar con esto:

```markdown
# Título del apunte

Módulo: dwcs
Tema: 3

...contenido...
```

## Dónde va cada cosa

- Temario de un módulo → `modulos/<modulo>/`
- Algo que no es temario pero aporta (IA, diseño, ideas de proyecto) → `extra/`
