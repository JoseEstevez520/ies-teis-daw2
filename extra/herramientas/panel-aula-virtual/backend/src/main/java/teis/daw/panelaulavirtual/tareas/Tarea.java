package teis.daw.panelaulavirtual.tareas;

public record Tarea(long id, String nombre, long cursoId, String cursoNombre, String url, long fechaLimite,
                     boolean entregada) {
}
