package br.gov.sudeco.simulador.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;

public class ParametrosCalculoDto {
    
    @JsonProperty("percentual_maximo_fdco")
    private BigDecimal percentualMaximoFdco;
    
    @JsonProperty("valor_minimo_projeto")
    private BigDecimal valorMinimoProjeto;
    
    @JsonProperty("valor_maximo_projeto")
    private BigDecimal valorMaximoProjeto;
    
    @JsonProperty("percentual_minimo_contrapartida")
    private BigDecimal percentualMinimoContrapartida;
    
    @JsonProperty("fator_regional")
    private BigDecimal fatorRegional;
    
    @JsonProperty("fator_tipo_projeto")
    private BigDecimal fatorTipoProjeto;
    
    @JsonProperty("versao_calculo")
    private String versaoCalculo;

    // Constructor
    public ParametrosCalculoDto() {
        this.versaoCalculo = "1.0";
    }

    // Getters and Setters
    public BigDecimal getPercentualMaximoFdco() { return percentualMaximoFdco; }
    public void setPercentualMaximoFdco(BigDecimal percentualMaximoFdco) { 
        this.percentualMaximoFdco = percentualMaximoFdco; 
    }

    public BigDecimal getValorMinimoProjeto() { return valorMinimoProjeto; }
    public void setValorMinimoProjeto(BigDecimal valorMinimoProjeto) { 
        this.valorMinimoProjeto = valorMinimoProjeto; 
    }

    public BigDecimal getValorMaximoProjeto() { return valorMaximoProjeto; }
    public void setValorMaximoProjeto(BigDecimal valorMaximoProjeto) { 
        this.valorMaximoProjeto = valorMaximoProjeto; 
    }

    public BigDecimal getPercentualMinimoContrapartida() { return percentualMinimoContrapartida; }
    public void setPercentualMinimoContrapartida(BigDecimal percentualMinimoContrapartida) { 
        this.percentualMinimoContrapartida = percentualMinimoContrapartida; 
    }

    public BigDecimal getFatorRegional() { return fatorRegional; }
    public void setFatorRegional(BigDecimal fatorRegional) { this.fatorRegional = fatorRegional; }

    public BigDecimal getFatorTipoProjeto() { return fatorTipoProjeto; }
    public void setFatorTipoProjeto(BigDecimal fatorTipoProjeto) { this.fatorTipoProjeto = fatorTipoProjeto; }

    public String getVersaoCalculo() { return versaoCalculo; }
    public void setVersaoCalculo(String versaoCalculo) { this.versaoCalculo = versaoCalculo; }
}