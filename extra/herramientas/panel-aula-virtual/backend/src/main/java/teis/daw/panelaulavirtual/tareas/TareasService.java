package teis.daw.panelaulavirtual.tareas;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;

import teis.daw.panelaulavirtual.moodle.CursosClient;
import teis.daw.panelaulavirtual.moodle.MoodleClient;
import teis.daw.panelaulavirtual.moodle.dto.Asignacion;
import teis.daw.panelaulavirtual.moodle.dto.Curso;
import teis.daw.panelaulavirtual.moodle.dto.EstadoEntrega;
import teis.daw.panelaulavirtual.moodle.dto.RespuestaAsignaciones;

@Service
public class TareasService {

    private final MoodleClient moodle;
    private final CursosClient cursosClient;
    private final String siteUrl;

    public TareasService(MoodleClient moodle, CursosClient cursosClient,
                          @Value("${moodle.site-url}") String siteUrl) {
        this.moodle = moodle;
        this.cursosClient = cursosClient;
        this.siteUrl = siteUrl;
    }

    public List<Tarea> listar() {
        var cursos = cursosClient.misCursos();
        var nombrePorCurso = cursos.stream().collect(Collectors.toMap(Curso::id, Curso::fullname));

        return cursos.stream()
                .flatMap(curso -> asignaciones(curso.id()).stream())
                .filter(a -> a.duedate() > 0)
                .map(a -> new Tarea(a.id(), a.name(), a.course(), nombrePorCurso.get(a.course()),
                        siteUrl + "/mod/assign/view.php?id=" + a.cmid(), a.duedate(), estaEntregada(a)))
                .toList();
    }

    private List<Asignacion> asignaciones(long cursoId) {
        var params = new LinkedMultiValueMap<String, String>();
        params.add("courseids[0]", String.valueOf(cursoId));
        var respuesta = moodle.call("mod_assign_get_assignments", params, RespuestaAsignaciones.class);
        return respuesta.courses().stream()
                .flatMap(c -> c.assignments().stream())
                .toList();
    }

    private boolean estaEntregada(Asignacion asignacion) {
        var params = new LinkedMultiValueMap<String, String>();
        params.add("assignid", String.valueOf(asignacion.id()));
        var estado = moodle.call("mod_assign_get_submission_status", params, EstadoEntrega.class);
        // Sin intento (nunca abierta) o con estado "new": no hay entrega real todavía.
        return estado.lastattempt() != null
                && estado.lastattempt().submission() != null
                && "submitted".equals(estado.lastattempt().submission().status());
    }
}
