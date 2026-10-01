# Notas de clase

Un sitio donde cualquiera de la clase deja notas en crudo, y un agente las convierte en
apuntes y páginas de la web. Idea de clase colaborativa, sin código todavía.

## El problema

Aportar al repo pide saber git y Vue, y la mayoría no lo hace aunque tenga algo que contar.
La idea es que solo tengan que dejar la nota.

## Cómo funcionaría

1. La nota se escribe donde sea cómodo (un bot de chat o una caja en la web), en texto libre
   y sin formato.
2. Se guarda en privado y en crudo.
3. Una vez al día, un agente lee las notas nuevas, las agrupa por tema y las redacta con el
   estilo de casa.
4. Abre una rama y un PR. Tú revisas y mergeas.
5. La web se reconstruye sola y queda publicado.

## Por qué en privado

Las notas en crudo no pueden ir al repo público. Un borrador puede llevar nombres o datos de
compañeros, y lo que se publica una vez ya está copiado: clones, cachés, historial de git. El
agente tiene que ser la puerta por la que pasa, no el que limpia después.

## Lo que hay que decidir

- Por dónde entran: bot de chat o web.
- Si la nota es privada de cada uno o común. Lo público sería solo la síntesis del agente.
- Cuánto revisa una persona antes de publicar. El agente solo no basta: en un grupo pequeño,
  quitar un nombre no siempre anonimiza a quien escribió.
