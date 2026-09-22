package teis.daw.panelaulavirtual;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Solo localhost en desarrollo (el puerto de Vite cambia si 5173 está ocupado).
        // Fase 1 es de un único usuario, sin despliegue público todavía.
        registry.addMapping("/api/**").allowedOriginPatterns("http://localhost:*");
    }
}
