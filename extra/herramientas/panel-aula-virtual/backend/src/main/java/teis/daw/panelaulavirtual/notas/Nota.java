package teis.daw.panelaulavirtual.notas;

public record Nota(long id, String nombre, long cursoId, String cursoNombre, double valor, String valorFormateado) {
}
