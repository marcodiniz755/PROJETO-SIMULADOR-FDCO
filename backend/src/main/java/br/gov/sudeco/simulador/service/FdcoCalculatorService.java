package br.gov.sudeco.simulador.service;

import br.gov.sudeco.simulador.dto.FdcoRequest;
import br.gov.sudeco.simulador.dto.FdcoResponse;
import br.gov.sudeco.simulador.dto.ParametrosCalculoDto;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class FdcoCalculatorService {
    
    private static final BigDecimal PERCENTUAL_MAXIMO_FDCO = new BigDecimal("80.00");
    private static final BigDecimal VALOR_MINIMO_PROJETO = new BigDecimal("50000.00");
    private static final BigDecimal VALOR_MAXIMO_PROJETO = new BigDecimal("10000000.00");
    private static final BigDecimal CONTRAPARTIDA_MINIMA = new BigDecimal("20.00");
    
    private static final Map<String, BigDecimal> FATORES_REGIONAIS = Map.of(
        "NORTE", new BigDecimal("1.20"),
        "NORDESTE", new BigDecimal("1.15"),
        "CENTRO-OESTE", new BigDecimal("1.10"),
        "SUDESTE", new BigDecimal("1.00"),
        "SUL", new BigDecimal("1.05")
    );
    
    private static final Map<String, BigDecimal> FATORES_TIPO_PROJETO = Map.of(
        "INFRAESTRUTURA", new BigDecimal("1.15"),
        "DESENVOLVIMENTO_ECONOMICO", new BigDecimal("1.10"),
        "EDUCACAO", new BigDecimal("1.20"),
        "SAUDE", new BigDecimal("1.18"),
        "MEIO_AMBIENTE", new BigDecimal("1.12"),
        "TURISMO", new BigDecimal("1.08"),
        "OUTROS", new BigDecimal("1.00")
    );

    @Cacheable(value = "fdcoCalculations", key = "#request.valorProjeto + '_' + #request.regiao + '_' + #request.tipoProjeto")
    public FdcoResponse calcularFdco(FdcoRequest request) {
        FdcoResponse response = new FdcoResponse();
        List<String> observacoes = new ArrayList<>();
        
        // Copiar dados básicos
        response.setValorProjeto(request.getValorProjeto());
        response.setRegiao(request.getRegiao());
        response.setEstado(request.getEstado());
        response.setMunicipio(request.getMunicipio());
        response.setTipoProjeto(request.getTipoProjeto());
        
        // Validar elegibilidade
        boolean elegivel = validarElegibilidade(request, observacoes);
        response.setElegivelFdco(elegivel);
        
        if (!elegivel) {
            response.setJustificativa("Projeto não atende aos critérios de elegibilidade do FDCO");
            response.setObservacoes(observacoes);
            response.setParametrosUtilizados(criarParametrosCalculo());
            return response;
        }
        
        // Calcular valores
        BigDecimal valorContrapartida = calcularContrapartida(request.getValorProjeto(), request.getPercentualContrapartida());
        BigDecimal valorFdco = calcularValorFdco(request, observacoes);
        BigDecimal percentualFdco = calcularPercentualFdco(valorFdco, request.getValorProjeto());
        
        response.setValorContrapartida(valorContrapartida);
        response.setValorFdcoCalculado(valorFdco);
        response.setPercentualFdco(percentualFdco);
        response.setJustificativa("Cálculo realizado com base nas regras vigentes do FDCO");
        response.setObservacoes(observacoes);
        response.setParametrosUtilizados(criarParametrosCalculo());
        
        return response;
    }
    
    private boolean validarElegibilidade(FdcoRequest request, List<String> observacoes) {
        boolean elegivel = true;
        
        // Validar valor mínimo
        if (request.getValorProjeto().compareTo(VALOR_MINIMO_PROJETO) < 0) {
            elegivel = false;
            observacoes.add("Valor do projeto abaixo do mínimo permitido: R$ " + VALOR_MINIMO_PROJETO);
        }
        
        // Validar valor máximo
        if (request.getValorProjeto().compareTo(VALOR_MAXIMO_PROJETO) > 0) {
            elegivel = false;
            observacoes.add("Valor do projeto acima do máximo permitido: R$ " + VALOR_MAXIMO_PROJETO);
        }
        
        // Validar contrapartida mínima
        if (request.getPercentualContrapartida().compareTo(CONTRAPARTIDA_MINIMA) < 0) {
            elegivel = false;
            observacoes.add("Percentual de contrapartida abaixo do mínimo: " + CONTRAPARTIDA_MINIMA + "%");
        }
        
        // Validar região
        if (!FATORES_REGIONAIS.containsKey(request.getRegiao().toUpperCase())) {
            observacoes.add("Região informada não reconhecida, usando fator padrão");
        }
        
        // Validar tipo de projeto
        if (!FATORES_TIPO_PROJETO.containsKey(request.getTipoProjeto().toUpperCase())) {
            observacoes.add("Tipo de projeto não reconhecido, usando fator padrão");
        }
        
        return elegivel;
    }
    
    private BigDecimal calcularContrapartida(BigDecimal valorProjeto, BigDecimal percentualContrapartida) {
        return valorProjeto.multiply(percentualContrapartida)
                         .divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
    }
    
    private BigDecimal calcularValorFdco(FdcoRequest request, List<String> observacoes) {
        BigDecimal valorBase = request.getValorProjeto();
        
        // Aplicar fator regional
        BigDecimal fatorRegional = FATORES_REGIONAIS.getOrDefault(
            request.getRegiao().toUpperCase(), 
            new BigDecimal("1.00")
        );
        
        // Aplicar fator tipo de projeto
        BigDecimal fatorTipoProjeto = FATORES_TIPO_PROJETO.getOrDefault(
            request.getTipoProjeto().toUpperCase(),
            new BigDecimal("1.00")
        );
        
        // Calcular percentual FDCO considerando os fatores
        BigDecimal percentualCalculado = PERCENTUAL_MAXIMO_FDCO
            .multiply(fatorRegional)
            .multiply(fatorTipoProjeto)
            .divide(new BigDecimal("100"), 4, RoundingMode.HALF_UP);
        
        // Limitar ao máximo permitido
        if (percentualCalculado.compareTo(PERCENTUAL_MAXIMO_FDCO.divide(new BigDecimal("100"), 4, RoundingMode.HALF_UP)) > 0) {
            percentualCalculado = PERCENTUAL_MAXIMO_FDCO.divide(new BigDecimal("100"), 4, RoundingMode.HALF_UP);
            observacoes.add("Percentual limitado ao máximo permitido de " + PERCENTUAL_MAXIMO_FDCO + "%");
        }
        
        BigDecimal valorFdco = valorBase.multiply(percentualCalculado);
        
        // Garantir que contrapartida + FDCO = valor total
        BigDecimal valorContrapartida = calcularContrapartida(valorBase, request.getPercentualContrapartida());
        if (valorFdco.add(valorContrapartida).compareTo(valorBase) > 0) {
            valorFdco = valorBase.subtract(valorContrapartida);
            observacoes.add("Valor FDCO ajustado para manter equilíbrio com contrapartida");
        }
        
        return valorFdco.setScale(2, RoundingMode.HALF_UP);
    }
    
    private BigDecimal calcularPercentualFdco(BigDecimal valorFdco, BigDecimal valorProjeto) {
        return valorFdco.multiply(new BigDecimal("100"))
                       .divide(valorProjeto, 2, RoundingMode.HALF_UP);
    }
    
    private ParametrosCalculoDto criarParametrosCalculo() {
        ParametrosCalculoDto parametros = new ParametrosCalculoDto();
        parametros.setPercentualMaximoFdco(PERCENTUAL_MAXIMO_FDCO);
        parametros.setValorMinimoProjeto(VALOR_MINIMO_PROJETO);
        parametros.setValorMaximoProjeto(VALOR_MAXIMO_PROJETO);
        parametros.setPercentualMinimoContrapartida(CONTRAPARTIDA_MINIMA);
        parametros.setFatorRegional(new BigDecimal("1.00")); // Valor base
        parametros.setFatorTipoProjeto(new BigDecimal("1.00")); // Valor base
        return parametros;
    }
    
    public Map<String, BigDecimal> getFatoresRegionais() {
        return FATORES_REGIONAIS;
    }
    
    public Map<String, BigDecimal> getFatoresTipoProjeto() {
        return FATORES_TIPO_PROJETO;
    }
    
    // Calcular FAM (Fator de Atualização Mensal)
    public BigDecimal calcularFAM(BigDecimal ipcaM1, BigDecimal ipcaM2, int ndup, int ndus, int ndmp, int ndms) {
        // IPCA vem como 0.24, 0.26 (percentual) - converter para decimal exato (0.0024, 0.0026)
        BigDecimal piM1 = ipcaM1.divide(new BigDecimal("100"), 4, RoundingMode.HALF_UP);
        BigDecimal piM2 = ipcaM2.divide(new BigDecimal("100"), 4, RoundingMode.HALF_UP);
        
        // Calcular termos: (1 + pi)^(nd/ndm) com alta precisão
        BigDecimal exp1 = new BigDecimal(ndup).divide(new BigDecimal(ndmp), 10, RoundingMode.HALF_UP);
        BigDecimal exp2 = new BigDecimal(ndus).divide(new BigDecimal(ndms), 10, RoundingMode.HALF_UP);
        
        // Usar Math.pow com precisão dupla para manter compatibilidade com Excel
        BigDecimal termo1 = new BigDecimal(Math.pow(BigDecimal.ONE.add(piM2).doubleValue(), exp1.doubleValue()));
        BigDecimal termo2 = new BigDecimal(Math.pow(BigDecimal.ONE.add(piM1).doubleValue(), exp2.doubleValue()));
        
        // FAM = termo1 * termo2
        BigDecimal fam = termo1.multiply(termo2);
        return fam.setScale(9, RoundingMode.HALF_UP);
    }
    
    // Calcular TFD (Taxa Final Devedor)
    public BigDecimal calcularTFD(BigDecimal tlp, BigDecimal fp, BigDecimal fam, BigDecimal alpha, BigDecimal cdr, int du) {
        // Juros prefixados TLP
        BigDecimal jurosPrefixados = alpha.multiply(tlp).divide(new BigDecimal("100"), 9, RoundingMode.HALF_UP);
        
        // Termo 1: cdr * fp * jurosPrefixados
        BigDecimal termo1 = cdr.multiply(fp).multiply(jurosPrefixados);
        
        // Termo 2: 1 + termo1
        BigDecimal termo2 = BigDecimal.ONE.add(termo1);
        
        // Expoente: du / 252
        BigDecimal expoente = new BigDecimal(du).divide(new BigDecimal("252"), 9, RoundingMode.HALF_UP);
        
        // Termo 3: termo2 ^ expoente
        double termo3 = Math.pow(termo2.doubleValue(), expoente.doubleValue());
        
        // TFD mensal: fam * termo3 - 1
        BigDecimal tfdMensal = fam.multiply(new BigDecimal(termo3)).subtract(BigDecimal.ONE);
        
        // TFD anual: (1 + tfdMensal)^12 - 1
        double tfdAnual = Math.pow(BigDecimal.ONE.add(tfdMensal).doubleValue(), 12) - 1;
        
        // Retornar em percentual
        return new BigDecimal(tfdAnual).multiply(new BigDecimal("100")).setScale(2, RoundingMode.HALF_UP);
    }
}