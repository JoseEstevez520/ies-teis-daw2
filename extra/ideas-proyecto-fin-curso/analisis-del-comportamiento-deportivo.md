# Análisis del comportamiento deportivo con IA

Un sistema que convierte vídeos de combates de boxeo en datos. De cada combate saca lo que
pasa en el ring (golpes, desplazamientos, intercambios, defensa) y lo guarda como números
medibles. Con varios combates salen perfiles: cómo se comporta cada deportista y qué estilos
aparecen.

Contar golpes es solo el principio. Lo que busca el proyecto son patrones de comportamiento,
con Machine Learning (clasificación, clustering, reducción de dimensionalidad).

*A escala de PFC:* un sistema de visión por computador que saca las features del vídeo, un
análisis con Machine Learning encima, y una web donde consultar las estadísticas, los
perfiles y los patrones.

## De lo observado a los patrones

El proyecto es esta cadena: datos observables → features → perfiles de comportamiento →
modelos de Machine Learning.

El boxeo es solo el caso de estudio. La misma metodología sirve para cualquier ámbito donde
una persona deje un rastro observable: otros deportes, videojuegos competitivos, análisis de
rendimiento, educación o interacción humano-computadora.

## Privacidad

Los datos se tratan de forma anonimizada y minimizada, sin guardar información personal que
no haga falta. Cuando hay que asociar un análisis a un deportista real, se usan
identificadores anónimos y su consentimiento.
