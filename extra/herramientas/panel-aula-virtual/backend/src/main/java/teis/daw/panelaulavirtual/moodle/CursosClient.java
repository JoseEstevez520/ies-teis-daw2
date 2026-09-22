package teis.daw.panelaulavirtual.moodle;

import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;

import teis.daw.panelaulavirtual.moodle.dto.Curso;

@Component
public class CursosClient {

    private final MoodleClient moodle;

    public CursosClient(MoodleClient moodle) {
        this.moodle = moodle;
    }

    public List<Curso> misCursos() {
        var params = new LinkedMultiValueMap<String, String>();
        params.add("userid", String.valueOf(moodle.userId()));
        return moodle.call("core_enrol_get_users_courses", params,
                new ParameterizedTypeReference<List<Curso>>() {});
    }
}
