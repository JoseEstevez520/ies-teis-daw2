# Cuaderno de IA para apuntes

Preguntar sobre el material de un módulo (PDFs, transcripciones) con IA, en vez de
buscarlo a mano. Investigado, sin código todavía.

## Opción 1: a mano (la que ya vale hoy)

Subir el material a NotebookLM (Gemini Notebook) desde la web, sin automatizar nada. Un
cuaderno por módulo, y solo cuando ya haya material real que meter. Ver la nota sobre
esto en `extra/ia/README.md`.

Con el plan gratuito de estudiante de Google (Google AI Pro/Plus, sí cubre FP en España)
se sube sin límite de materiales, solo hay que hacerlo a mano.

## Opción 2: automatizar con `notebooklm-py` (descartada)

Existe una librería que automatiza NotebookLM ([`notebooklm-py`](https://github.com/teng-lin/notebooklm-py)),
pero funciona **robando las cookies de sesión de tu cuenta de Google** para llamar a
endpoints internos no documentados. Los propios autores avisan de que Google puede marcar
la cuenta por usarlo. No se recomienda usarlo con una cuenta real.

## Opción 3: construir algo propio con la Gemini API (la vía limpia si se quiere automatizar)

En vez de automatizar NotebookLM, usar la **Gemini API oficial** ([`ai.google.dev`](https://ai.google.dev/gemini-api/docs/google-ai-plans)),
documentada y pensada para desarrolladores: subes tus documentos y preguntas sobre ellos,
sin cookies ni sesiones ajenas de por medio.

- El plan de estudiante Google AI Pro/Plus incluye **10 $/mes en créditos de Google
  Cloud**, usables en esta API. Hay crédito gratis para probarlo.
- Esto sería construir una versión propia y simplificada de "pregunta sobre tus apuntes",
  no depender del producto NotebookLM en sí.
