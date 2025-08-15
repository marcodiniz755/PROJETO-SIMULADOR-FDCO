package br.gov.sudeco.simulador.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class FdcoRequest {
    
    @NotNull(message = "Valor do projeto é obrigatório")
    @Positive(message = "Valor do projeto deve ser positivo")
    @JsonProperty("valor_projeto")
    private BigDecimal valorProjeto;
    
    @NotNull(message = "Percentual de contrapartida é obrigatório")
    @DecimalMin(value = "0.0", message = "Percentual de contrapartida deve ser >= 0")
    @JsonProperty("percentual_contrapartida")
    private BigDecimal percentualContrapartida;
    
    @NotBlank(message = "Região é obrigatória")
    @JsonProperty("regiao")
    private String regiao;
    
    @NotBlank(message = "Estado é obrigatório")
    @JsonProperty("estado")
    private String estado;
    
    @NotBlank(message = "Município é obrigatório")
    @JsonProperty("municipio")
    private String municipio;
    
    @NotBlank(message = "Tipo de projeto é obrigatório")
    @JsonProperty("tipo_projeto")
    private String tipoProjeto;
    
    @JsonProperty("observacoes")
    private String observacoes;

    // Constructors
    public FdcoRequest() {}
    
    public FdcoRequest(BigDecimal valorProjeto, BigDecimal percentualContrapartida, 
                      String regiao, String estado, String municipio, String tipoProjeto) {
        this.valorProjeto = valorProjeto;
        this.percentualContrapartida = percentualContrapartida;
        this.regiao = regiao;
        this.estado = estado;
        this.municipio = municipio;
        this.tipoProjeto = tipoProjeto;
    }

    // Getters and Setters
    public BigDecimal getValorProjeto() { return valorProjeto; }
    public void setValorProjeto(BigDecimal valorProjeto) { this.valorProjeto = valorProjeto; }

    public BigDecimal getPercentualContrapartida() { return percentualContrapartida; }
    public void setPercentualContrapartida(BigDecimal percentualContrapartida) { 
        this.percentualContrapartida = percentualContrapartida; 
    }

    public String getRegiao() { return regiao; }
    public void setRegiao(String regiao) { this.regiao = regiao; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getMunicipio() { return municipio; }
    public void setMunicipio(String municipio) { this.municipio = municipio; }

    public String getTipoProjeto() { return tipoProjeto; }
    public void setTipoProjeto(String tipoProjeto) { this.tipoProjeto = tipoProjeto; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }
}