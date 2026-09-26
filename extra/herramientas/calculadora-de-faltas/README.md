# Calculadora de faltas

Idea: meter las faltas por módulo y ver el % frente al máximo permitido antes de perder
evaluación continua.

## Arrancarlo tú mismo

Todo en el navegador, sin backend ni token.

```bash
git clone https://github.com/JoseEstevez520/ies-teis-daw2.git
cd ies-teis-daw2/extra/herramientas/calculadora-de-faltas
npm install
npm run dev
```

Abre la URL que te dé Vite (`http://localhost:5173` normalmente).

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

## Los umbrales reales

De la presentación de Tutoría de IES de Teis (más específica que la norma general):

- **6% de faltas sin justificar** de un módulo → apercibimiento.
- **10% de faltas sin justificar** → pérdida de evaluación continua (esto coincide con la
  Orde do 12 de xullo de 2011 de la Xunta, que fija el 10% como norma general de Galicia).
- Solo cuentan las faltas **sin justificar**. Justificar se hace siempre por AbalarMóvil,
  subiendo foto.
- Baja de oficio: 15 días consecutivos o 25 alternos sin asistir.

## Horas por módulo y semanas lectivas (para calcular el total)

Horas/semana (contando los bloques de 50 min de
[`horario/README.md`](../../../horario/README.md)): dwcs 8h20, diw 6h40, dwcc 6h40, daw 3h20,
ipeii 1h40, hcle 1h40, dasp 50min, acp 50min.

Semanas lectivas reales para **2º curso**: el calendario escolar general de Galicia va del
9 de septiembre de 2026 al 21 de junio de 2027, pero en 2º no hay tercer trimestre de
clase. Tras la 2ª avaliación (24/25 de febrero) se pasa a FCT, así que las horas de cada
módulo solo cuentan hasta ahí. Contando días lectivos reales (restando Nadal y festivos)
salen **~20,8 semanas**, no las ~34,8 de un curso completo.

## Fórmula

```
horas totales módulo = horas/semana × 20,8 semanas
horas de falta = nº de faltas sin justificar × 50 min (duración de una clase)
% faltado = horas de falta / horas totales
```

Ejemplo con DWCS (8,33h/semana): ~173 horas totales. 6% ≈ 10,4h de falta (aviso), 10% ≈
17,3h (pérdida de evaluación continua).

## Fuentes

- Presentación de Tutoría 2ºDAW 2026-2027 (Aula Virtual, IES de Teis).
- [Orde do 12 de xullo de 2011 (DOG)](https://www.xunta.gal/dog/Publicados/2011/20110715/AnuncioC3F1-120711-4341_es.html).
- [Calendario escolar Galicia 2026-2027 (galiciae.com)](https://www.galiciae.com/articulo/galicia/calendario-escolar-galicia-curso-2026-27-cuando-empiezan-claves-que-dias-seran-lectivos/20260825180432109165.html).
