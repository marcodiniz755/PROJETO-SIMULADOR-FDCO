package br.gov.sudeco.simulador.service;

import br.gov.sudeco.simulador.dto.FdcoRequest;
import br.gov.sudeco.simulador.dto.FdcoResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
class FdcoCalculatorServiceTest {

    private FdcoCalculatorService fdcoCalculatorService;

    @BeforeEach
    void setUp() {
        fdcoCalculatorService = new FdcoCalculatorService();
    }

    @Test
    void testCalcularFdco_ProjetoElegivel() {
        // Arrange
        FdcoRequest request = new FdcoRequest();
        request.setValorProjeto(new BigDecimal("1000000.00"));
        request.setPercentualContrapartida(new BigDecimal("25.00"));
        request.setRegiao("CENTRO-OESTE");
        request.setEstado("GO");
        request.setMunicipio("Goiânia");
        request.setTipoProjeto("INFRAESTRUTURA");

        // Act
        FdcoResponse response = fdcoCalculatorService.calcularFdco(request);

        // Assert
        assertNotNull(response);
        assertTrue(response.getElegivelFdco());
        assertEquals(new BigDecimal("1000000.00"), response.getValorProjeto());
        assertNotNull(response.getValorFdcoCalculado());
        assertNotNull(response.getPercentualFdco());
        assertTrue(response.getValorFdcoCalculado().compareTo(BigDecimal.ZERO) > 0);
    }

    @Test
    void testCalcularFdco_ValorAbaixoMinimo() {
        // Arrange
        FdcoRequest request = new FdcoRequest();
        request.setValorProjeto(new BigDecimal("30000.00")); // Abaixo do mínimo
        request.setPercentualContrapartida(new BigDecimal("25.00"));
        request.setRegiao("CENTRO-OESTE");
        request.setEstado("GO");
        request.setMunicipio("Goiânia");
        request.setTipoProjeto("INFRAESTRUTURA");

        // Act
        FdcoResponse response = fdcoCalculatorService.calcularFdco(request);

        // Assert
        assertNotNull(response);
        assertFalse(response.getElegivelFdco());
        assertTrue(response.getObservacoes().stream()
            .anyMatch(obs -> obs.contains("Valor do projeto abaixo do mínimo")));
    }

    @Test
    void testCalcularFdco_ContrapartidaInsuficiente() {
        // Arrange
        FdcoRequest request = new FdcoRequest();
        request.setValorProjeto(new BigDecimal("500000.00"));
        request.setPercentualContrapartida(new BigDecimal("15.00")); // Abaixo do mínimo
        request.setRegiao("CENTRO-OESTE");
        request.setEstado("GO");
        request.setMunicipio("Goiânia");
        request.setTipoProjeto("INFRAESTRUTURA");

        // Act
        FdcoResponse response = fdcoCalculatorService.calcularFdco(request);

        // Assert
        assertNotNull(response);
        assertFalse(response.getElegivelFdco());
        assertTrue(response.getObservacoes().stream()
            .anyMatch(obs -> obs.contains("Percentual de contrapartida abaixo")));
    }

    @Test
    void testCalcularFdco_ProjetoEducacao() {
        // Arrange - Educação tem fator maior
        FdcoRequest request = new FdcoRequest();
        request.setValorProjeto(new BigDecimal("500000.00"));
        request.setPercentualContrapartida(new BigDecimal("25.00"));
        request.setRegiao("NORDESTE");
        request.setEstado("BA");
        request.setMunicipio("Salvador");
        request.setTipoProjeto("EDUCACAO");

        // Act
        FdcoResponse response = fdcoCalculatorService.calcularFdco(request);

        // Assert
        assertNotNull(response);
        assertTrue(response.getElegivelFdco());
        assertEquals("EDUCACAO", response.getTipoProjeto());
        assertEquals("NORDESTE", response.getRegiao());
    }

    @Test
    void testGetFatoresRegionais() {
        // Act
        var fatores = fdcoCalculatorService.getFatoresRegionais();

        // Assert
        assertNotNull(fatores);
        assertFalse(fatores.isEmpty());
        assertTrue(fatores.containsKey("NORTE"));
        assertTrue(fatores.containsKey("NORDESTE"));
        assertTrue(fatores.containsKey("CENTRO-OESTE"));
        assertTrue(fatores.containsKey("SUDESTE"));
        assertTrue(fatores.containsKey("SUL"));
    }

    @Test
    void testGetFatoresTipoProjeto() {
        // Act
        var fatores = fdcoCalculatorService.getFatoresTipoProjeto();

        // Assert
        assertNotNull(fatores);
        assertFalse(fatores.isEmpty());
        assertTrue(fatores.containsKey("INFRAESTRUTURA"));
        assertTrue(fatores.containsKey("EDUCACAO"));
        assertTrue(fatores.containsKey("SAUDE"));
    }
}