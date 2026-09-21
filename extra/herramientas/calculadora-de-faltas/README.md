# Calculadora de faltas

Idea: meter las faltas por módulo y ver el % frente al máximo permitido antes de perder
evaluación continua.

Esto es documentación de diseño, sin código todavía.

## Por qué es de entrada manual, no automática

Investigado y descartado el automatizarlo:

- El Aula Virtual (Moodle) tiene un servicio de asistencia (`mod_attendance`), pero
  **ninguno de los 8 cursos del curso 2026-27 lo usa** (comprobado uno por uno vía API).
- Las faltas reales se llevan en **AbalarMóvil / XADE**, la app de la Xunta de Galicia,
  no en Moodle. No es del instituto, es infraestructura del gobierno gallego.
- AbalarMóvil no tiene API pública ni función de exportar datos (comprobado en su FAQ y
  en la documentación de la función "Faltas"). Ni siquiera la propia app calcula un %,
  solo lista faltas individuales con su estado.

Con esto, no hay ninguna fuente de la que tirar el dato automáticamente. La herramienta
tiene que ser de entrada manual: tú cuentas tus faltas en AbalarMóvil y metes el número,
la herramienta hace el cálculo (margen restante, cuántas más te puedes permitir).

Nota aparte: ese acceso a AbalarMóvil es individual, del propio alumno, no compartido
con la familia.
