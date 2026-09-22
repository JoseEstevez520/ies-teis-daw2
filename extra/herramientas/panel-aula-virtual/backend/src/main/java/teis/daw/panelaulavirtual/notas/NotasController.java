package teis.daw.panelaulavirtual.notas;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notas")
public class NotasController {

    private final NotasService service;

    public NotasController(NotasService service) {
        this.service = service;
    }

    @GetMapping
    public List<Nota> puestas() {
        return service.puestas();
    }
}
