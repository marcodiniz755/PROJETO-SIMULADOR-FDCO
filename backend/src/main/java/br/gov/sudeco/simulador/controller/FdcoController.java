package br.gov.sudeco.simulador.controller;

import br.gov.sudeco.simulador.dto.FdcoRequest;
import br.gov.sudeco.simulador.dto.FdcoResponse;
import br.gov.sudeco.simulador.service.FdcoCalculatorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/fdco")
@Tag(name = "FDCO Simulator", description = "APIs para simulação de cálculos do Fundo de Desenvolvimento do Centro-Oeste")
@CrossOrigin(origins = "*")
public class FdcoController {

    @Autowired
    private FdcoCalculatorService fdcoCalculatorService;

    @PostMapping("/simular")
    @Operation(summary = "Simular cálculo FDCO", 
               description = "Calcula o valor do FDCO baseado nos parâmetros do projeto")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cálculo realizado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos"),
        @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    public ResponseEntity<FdcoResponse> simularFdco(
            @Parameter(description = "Dados do projeto para simulação", required = true)
            @Valid @RequestBody FdcoRequest request) {
        
        try {
            FdcoResponse response = fdcoCalculatorService.calcularFdco(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Log detalhado do erro
            System.err.println("Erro ao processar simulação FDCO: " + e.getMessage());
            e.printStackTrace();
            
            // Retornar resposta com mais detalhes do erro
            FdcoResponse errorResponse = new FdcoResponse();
            errorResponse.setElegivelFdco(false);
            errorResponse.setJustificativa("Erro interno: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    @GetMapping("/parametros/regioes")
    @Operation(summary = "Obter fatores regionais", 
               description = "Retorna os fatores multiplicadores por região")
    public ResponseEntity<Map<String, BigDecimal>> getFatoresRegionais() {
        return ResponseEntity.ok(fdcoCalculatorService.getFatoresRegionais());
    }

    @GetMapping("/parametros/tipos-projeto")
    @Operation(summary = "Obter fatores por tipo de projeto", 
               description = "Retorna os fatores multiplicadores por tipo de projeto")
    public ResponseEntity<Map<String, BigDecimal>> getFatoresTipoProjeto() {
        return ResponseEntity.ok(fdcoCalculatorService.getFatoresTipoProjeto());
    }

    @PostMapping("/calcular-tfd")
    @Operation(summary = "Calcular TFD", description = "Calcula a Taxa Final do Devedor")
    public ResponseEntity<Map<String, Object>> calcularTFD(
            @RequestBody Map<String, Object> parametros) {
        
        try {
            // Extrair parâmetros
            BigDecimal tlp = new BigDecimal(parametros.get("tlp").toString());
            BigDecimal fp = new BigDecimal(parametros.get("fp").toString());
            BigDecimal ipcaM1 = new BigDecimal(parametros.get("ipca_m1").toString());
            BigDecimal ipcaM2 = new BigDecimal(parametros.get("ipca_m2").toString());
            BigDecimal alpha = new BigDecimal(parametros.getOrDefault("alpha", "1.0").toString());
            BigDecimal cdr = new BigDecimal(parametros.getOrDefault("cdr", "1.0").toString());
            int ndup = Integer.parseInt(parametros.getOrDefault("ndup", "10").toString());
            int ndus = Integer.parseInt(parametros.getOrDefault("ndus", "11").toString());
            int ndmp = Integer.parseInt(parametros.getOrDefault("ndmp", "21").toString());
            int ndms = Integer.parseInt(parametros.getOrDefault("ndms", "21").toString());
            int du = Integer.parseInt(parametros.getOrDefault("du", "21").toString());
            
            // Calcular FAM
            BigDecimal fam = fdcoCalculatorService.calcularFAM(ipcaM1, ipcaM2, ndup, ndus, ndmp, ndms);
            
            // Calcular TFD
            BigDecimal tfd = fdcoCalculatorService.calcularTFD(tlp, fp, fam, alpha, cdr, du);
            
            Map<String, Object> response = new HashMap<>();
            response.put("tfd_anual", tfd);
            response.put("fam", fam);
            response.put("timestamp", java.time.LocalDateTime.now());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("erro", "Erro ao calcular TFD: " + e.getMessage());
            errorResponse.put("timestamp", java.time.LocalDateTime.now());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @GetMapping("/health")
    @Operation(summary = "Health check", description = "Verifica se a API está funcionando")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "FDCO Simulator",
            "timestamp", java.time.LocalDateTime.now().toString()
        ));
    }
}