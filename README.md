# ies-teis-daw2

Este repo es un espacio colaborativo para que a toda la clase de 2º DAW le vaya mejor:
apuntes, conocimientos extra, ideas y herramientas que cualquiera puede usar.

## Empezar

```bash
git clone https://github.com/JoseEstevez520/ies-teis-daw2.git
```

Apuntes y documentación se leen directamente aquí en GitHub. Cada herramienta con código
en `extra/herramientas/` trae su propio quick start en su README (clonar, instalar,
arrancar).

## Ver la web

Todo el contenido del repo, navegable y visual, mejor que ir carpeta por carpeta. Con el
repo ya clonado:

```bash
cd ies-teis-daw2/extra/herramientas/web-del-repo
npm install
npm run dev
```

Abre la dirección que imprime (por defecto `http://localhost:5173`). Necesita Node 20 o
superior. `npm install` descarga y compila la librería de interfaz, así que la primera vez
tarda un poco.

## Estructura

```
modulos/  - apuntes del temario, por módulo
  DAW/
  dwcs/
  diw/
  dwcc/
  despregamento/
  dasp/
extra/    - conocimientos extra, ideas y herramientas
  ia/
  diseno-web/
  ideas-proyecto-fin-curso/
  herramientas/
horario/  - horario semanal
```

## Cómo aportar

Ver [CONTRIBUTING.md](CONTRIBUTING.md).
