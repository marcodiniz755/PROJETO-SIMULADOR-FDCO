package br.gov.sudeco.simulador.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Simulador FDCO - SUDECO")
                .version("1.0.0")
                .description("API para simulação de cálculos do Fundo de Desenvolvimento do Centro-Oeste (FDCO)")
                .contact(new Contact()
                    .name("SUDECO")
                    .email("contato@sudeco.gov.br")
                    .url("https://sudeco.gov.br"))
                .license(new License()
                    .name("Governo Federal")
                    .url("https://www.gov.br")));
    }
}