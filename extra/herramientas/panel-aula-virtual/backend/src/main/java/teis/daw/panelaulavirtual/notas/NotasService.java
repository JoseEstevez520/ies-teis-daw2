package teis.daw.panelaulavirtual.notas;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;

import teis.daw.panelaulavirtual.moodle.CursosClient;
import teis.daw.panelaulavirtual.moodle.MoodleClient;
import teis.daw.panelaulavirtual.moodle.dto.RespuestaNotas;

@Service
public class NotasService {

    private final MoodleClient moodle;
    private final CursosClient cursosClient;

    public NotasService(MoodleClient moodle, CursosClient cursosClient) {
        this.moodle = moodle;
        this.cursosClient = cursosClient;
    }

    public List<Nota> puestas() {
        return cursosClient.misCursos().stream()
                .flatMap(curso -> notasDelCurso(curso.id(), curso.fullname()).stream())
                .toList();
    }

    private List<Nota> notasDelCurso(long cursoId, String cursoNombre) {
        var params = new LinkedMultiValueMap<String, String>();
        params.add("courseid", String.valueOf(cursoId));
        params.add("userid", String.valueOf(moodle.userId()));
        var respuesta = moodle.call("gradereport_user_get_grade_items", params, RespuestaNotas.class);

        return respuesta.usergrades().stream()
                .flatMap(c -> c.gradeitems().stream())
                .filter(item -> item.graderaw() != null)
                .map(item -> new Nota(item.id(), item.itemname(), cursoId, cursoNombre,
                        item.graderaw(), item.gradeformatted()))
                .toList();
    }
}
