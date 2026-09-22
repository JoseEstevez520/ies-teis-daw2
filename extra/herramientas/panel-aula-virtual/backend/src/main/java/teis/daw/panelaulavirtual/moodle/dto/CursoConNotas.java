package teis.daw.panelaulavirtual.moodle.dto;

import java.util.List;

public record CursoConNotas(long courseid, List<GradeItem> gradeitems) {
}
