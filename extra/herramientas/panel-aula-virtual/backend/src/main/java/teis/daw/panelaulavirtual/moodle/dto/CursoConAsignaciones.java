package teis.daw.panelaulavirtual.moodle.dto;

import java.util.List;

public record CursoConAsignaciones(long id, String fullname, List<Asignacion> assignments) {
}
