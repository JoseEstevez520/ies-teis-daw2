package teis.daw.panelaulavirtual.moodle;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

import teis.daw.panelaulavirtual.moodle.dto.SiteInfo;

@Component
public class MoodleClient {

    private final RestClient restClient;
    private final String token;
    private Long userId;

    public MoodleClient(@Value("${moodle.base-url}") String baseUrl,
                         @Value("${moodle.token}") String token) {
        this.restClient = RestClient.builder().baseUrl(baseUrl).build();
        this.token = token;
    }

    public <T> T call(String wsFunction, MultiValueMap<String, String> params, ParameterizedTypeReference<T> responseType) {
        var body = new LinkedMultiValueMap<String, String>();
        body.add("wstoken", token);
        body.add("wsfunction", wsFunction);
        body.add("moodlewsrestformat", "json");
        body.addAll(params);

        return restClient.post()
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(body)
                .retrieve()
                .body(responseType);
    }

    public <T> T call(String wsFunction, MultiValueMap<String, String> params, Class<T> responseType) {
        return call(wsFunction, params, ParameterizedTypeReference.forType(responseType));
    }

    // Sin userid explícito: pasarlo (aunque sea el propio) rompe algunas funciones
    // del calendario con nopermission. Este lo resuelve solo, sin ese riesgo.
    public synchronized long userId() {
        if (userId == null) {
            var info = call("core_webservice_get_site_info", new LinkedMultiValueMap<>(), SiteInfo.class);
            userId = info.userid();
        }
        return userId;
    }
}
