package br.gov.sudeco.simulador.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class FdcoResponse {
    
    @JsonProperty("valor_projeto")
    private BigDecimal valorProjeto;
    
    @JsonProperty("valor_contrapartida")
    private BigDecimal valorContrapartida;
    
    @JsonProperty("valor_fdco_calculado")
    private BigDecimal valorFdcoCalculado;
    
    @JsonProperty("percentual_fdco")
    private BigDecimal percentualFdco;
    
    @JsonProperty("regiao")
    private String regiao;
    
    @JsonProperty("estado")
    private String estado;
    
    @JsonProperty("municipio")
    private String municipio;
    
    @JsonProperty("tipo_projeto")
    private String tipoProjeto;
    
    @JsonProperty("elegivel_fdco")
    private Boolean elegivelFdco;
    
    @JsonProperty("justificativa")
    private String justificativa;
    
    @JsonProperty("observacoes")
    private List<String> observacoes;
    
    @JsonProperty("data_calculo")
    private LocalDateTime dataCalculo;
    
    @JsonProperty("parametros_utilizados")
    private ParametrosCalculoDto parametrosUtilizados;

    // Constructors
    public FdcoResponse() {
        this.dataCalculo = LocalDateTime.now();
    }

    // Getters and Setters
    public BigDecimal getValorProjeto() { return valorProjeto; }
    public void setValorProjeto(BigDecimal valorProjeto) { this.valorProjeto = valorProjeto; }

    public BigDecimal getValorContrapartida() { return valorContrapartida; }
    public void setValorContrapartida(BigDecimal valorContrapartida) { this.valorContrapartida = valorContrapartida; }

    public BigDecimal getValorFdcoCalculado() { return valorFdcoCalculado; }
    public void setValorFdcoCalculado(BigDecimal valorFdcoCalculado) { this.valorFdcoCalculado = valorFdcoCalculado; }

    public BigDecimal getPercentualFdco() { return percentualFdco; }
    public void setPercentualFdco(BigDecimal percentualFdco) { this.percentualFdco = percentualFdco; }

    public String getRegiao() { return regiao; }
    public void setRegiao(String regiao) { this.regiao = regiao; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getMunicipio() { return municipio; }
    public void setMunicipio(String municipio) { this.municipio = municipio; }

    public String getTipoProjeto() { return tipoProjeto; }
    public void setTipoProjeto(String tipoProjeto) { this.tipoProjeto = tipoProjeto; }

    public Boolean getElegivelFdco() { return elegivelFdco; }
    public void setElegivelFdco(Boolean elegivelFdco) { this.elegivelFdco = elegivelFdco; }

    public String getJustificativa() { return justificativa; }
    public void setJustificativa(String justificativa) { this.justificativa = justificativa; }

    public List<String> getObservacoes() { return observacoes; }
    public void setObservacoes(List<String> observacoes) { this.observacoes = observacoes; }

    public LocalDateTime getDataCalculo() { return dataCalculo; }
    public void setDataCalculo(LocalDateTime dataCalculo) { this.dataCalculo = dataCalculo; }

    public ParametrosCalculoDto getParametrosUtilizados() { return parametrosUtilizados; }
    public void setParametrosUtilizados(ParametrosCalculoDto parametrosUtilizados) { 
        this.parametrosUtilizados = parametrosUtilizados; 
    }
}