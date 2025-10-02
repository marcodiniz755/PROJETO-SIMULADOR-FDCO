// Componente de Parâmetros

class ParametersComponent {
    constructor() {
        this.isExpanded = false;
    }

    render() {
        const parametersContainer = document.getElementById('parameters-component');
        
        parametersContainer.innerHTML = `
            <div class="parameters-collapsible">
                <div class="parameters-header" onclick="toggleParameters()">
                    <div class="parameters-title">
                        📊 Fórmulas e Parâmetros
                        <span class="formula-badge">TFD = FAM × [1 + (CDR × FP × TLP)]^(DU/252) - 1</span>
                    </div>
                    <div class="parameters-toggle" id="parametersToggle">
                        ▼
                    </div>
                </div>
                
                <div class="parameters-content" id="parametersContent">
                    <div class="parameters-horizontal" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
                        ${this.renderParameterCards()}
                    </div>
                </div>
            </div>
        `;
    }

    renderParameterCards() {
        return `
            <div class="parameter-card">
                <h4 style="font-size: 0.9rem;"><i class="fas fa-function"></i> TFD - Fórmula Principal</h4>
                <div class="parameter-value" style="font-size: 0.75rem;">TFD = FAM × [1 + (CDR × FP × TLP)]^(DU/252) - 1</div>
                <div class="parameter-description" style="font-size: 0.75rem; line-height: 1.3;">
                    <strong>FAM:</strong> Fator de Atualização Monetária<br>
                    <strong>CDR:</strong> Coeficiente de Desequilíbrio Regional (1,00)<br>
                    <strong>FP:</strong> Fator de Programa (A/B/C/D)<br>
                    <strong>TLP:</strong> Taxa de Longo Prazo<br>
                    <strong>DU:</strong> Dias Úteis (252 base anual)
                </div>
            </div>
            
            <div class="parameter-card">
                <h4 style="font-size: 0.9rem;"><i class="fas fa-calculator"></i> FAM - Fator de Atualização</h4>
                <div class="parameter-value" style="font-size: 0.7rem;">FAM = (1 + πm-2)^(ndup/ndmp) × (1 + πm-1)^(ndus/ndms)</div>
                <div class="parameter-description" style="font-size: 0.75rem; line-height: 1.3;">
                    <strong>πm-1:</strong> IPCA mês anterior = <span id="ipca-m1-display">0,24%</span><br>
                    <strong>πm-2:</strong> IPCA mês retrasado = <span id="ipca-m2-display">0,26%</span><br>
                    <strong>ndup/ndus:</strong> Dias úteis = <span id="ndup-display">10</span>/<span id="ndus-display">13</span><br>
                    <strong>ndmp/ndms:</strong> Dias totais = <span id="ndmp-display">21</span>/<span id="ndms-display">23</span>
                </div>
            </div>
            
            <div class="parameter-card">
                <h4 style="font-size: 0.9rem;"><i class="fas fa-chart-line"></i> TLP - Taxa de Longo Prazo</h4>
                <div class="parameter-value" id="param-tlp">7,70% a.a.</div>
                <div class="parameter-description" style="font-size: 0.75rem; line-height: 1.3;">
                    Taxa oficial do BACEN, definida conforme metodologia do BNDES. Atualizada automaticamente via API oficial do Banco Central.
                    <br><strong>Fonte:</strong> API BCB - Série 27572
                    <div id="last-update-indicator" style="margin-top: 8px;"></div>
                </div>
            </div>
            
            <div class="parameter-card">
                <h4 style="font-size: 0.9rem;"><i class="fas fa-tags"></i> Fatores de Programa (FP)</h4>
                <div class="parameter-value" style="font-size: 0.75rem; line-height: 1.2;">A(0,85) | B(1,05) | C(1,25) | D(1,45)</div>
                <div class="parameter-description" style="font-size: 0.75rem; line-height: 1.3;">
                    <strong>A (0,85):</strong> Saneamento - PRIORITÁRIA<br>
                    <strong>B (1,05):</strong> Demais setores - PRIORITÁRIA<br>
                    <strong>C (1,25):</strong> Saneamento - DEMAIS<br>
                    <strong>D (1,45):</strong> Demais setores - DEMAIS
                </div>
            </div>

            <div class="parameter-card" style="border-left: 4px solid #f39c12;">
                <h4 style="font-size: 0.9rem;"><i class="fas fa-sync-alt"></i> Atualização de Taxas</h4>
                <div class="parameter-description" style="text-align: center;">
                    <p style="margin-bottom: 10px; color: #7f8c8d; font-size: 0.75rem; line-height: 1.2;">
                        APIs bloqueadas pelo ambiente. Use atualização manual:
                    </p>
                    <button onclick="parametersComponent.updateRates()" style="background: #f39c12; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 0.75rem; cursor: pointer; width: 100%; transition: all 0.3s ease; font-weight: 600;">
                        🔄 Atualizar Taxas
                    </button>
                    <div style="margin-top: 10px;">
                        <button onclick="parametersComponent.showManualUpdateModal()" style="background: #6c757d; color: white; border: none; padding: 6px 10px; border-radius: 4px; font-size: 0.7rem; cursor: pointer; width: 100%;">
                            ✏️ Atualização Manual
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    toggle() {
        const content = document.getElementById('parametersContent');
        const toggle = document.getElementById('parametersToggle');
        
        if (content.classList.contains('expanded')) {
            content.classList.remove('expanded');
            toggle.classList.remove('expanded');
            this.isExpanded = false;
        } else {
            content.classList.add('expanded');
            toggle.classList.add('expanded');
            this.isExpanded = true;
        }
    }

    async updateRates() {
        try {
            headerComponent.showUpdateIndicator();
            const success = await apiService.updateAllRates();
            
            if (success) {
                headerComponent.showSuccessIndicator('Taxas atualizadas com sucesso!');
                this.updateParameterDisplays();
            } else {
                headerComponent.showErrorIndicator('Erro ao atualizar taxas');
            }
        } catch (error) {
            console.error('Erro na atualização:', error);
            headerComponent.showErrorIndicator('Erro na atualização das taxas');
        }
    }

    showManualUpdateModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.display = 'flex';
        
        const params = apiService.getTfdParameters();
        
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                <h3 style="margin-bottom: 20px; color: #2c3e50;">Atualização Manual de Taxas</h3>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">TLP (% a.a.):</label>
                    <input type="number" id="manual-tlp" value="${params.jm}" step="0.01" min="0" max="100" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">IPCA M-1 (%):</label>
                    <input type="number" id="manual-ipca-m1" value="${(params.ipca_m1 * 100).toFixed(2)}" step="0.01" min="-10" max="10" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 500;">IPCA M-2 (%):</label>
                    <input type="number" id="manual-ipca-m2" value="${(params.ipca_m2 * 100).toFixed(2)}" step="0.01" min="-10" max="10" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                
                <div style="display: flex; gap: 10px;">
                    <button onclick="parametersComponent.applyManualUpdates()" style="flex: 1; background: #28a745; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; font-weight: 500;">
                        ✅ Aplicar
                    </button>
                    <button onclick="this.closest('.modal-overlay').remove()" style="flex: 1; background: #6c757d; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; font-weight: 500;">
                        ❌ Cancelar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    applyManualUpdates() {
        const tlp = parseFloat(document.getElementById('manual-tlp').value);
        const ipcaM1 = parseFloat(document.getElementById('manual-ipca-m1').value);
        const ipcaM2 = parseFloat(document.getElementById('manual-ipca-m2').value);
        
        if (isNaN(tlp) || isNaN(ipcaM1) || isNaN(ipcaM2)) {
            alert('Por favor, insira valores válidos para todas as taxas.');
            return;
        }
        
        // Aplicar atualizações
        apiService.updateTLPManually(tlp);
        apiService.updateIPCAManually(ipcaM1, ipcaM2);
        
        // Atualizar displays
        this.updateParameterDisplays();
        
        // Fechar modal
        document.querySelector('.modal-overlay').remove();
        
        headerComponent.showSuccessIndicator('Taxas atualizadas manualmente!');
    }

    updateParameterDisplays() {
        const params = apiService.getTfdParameters();
        
        // Atualizar TLP
        const tlpElement = document.getElementById('param-tlp');
        if (tlpElement) {
            tlpElement.textContent = `${params.jm.toFixed(2)}% a.a.`;
        }
        
        // Atualizar IPCA
        const ipcaM1Element = document.getElementById('ipca-m1-display');
        const ipcaM2Element = document.getElementById('ipca-m2-display');
        
        if (ipcaM1Element) ipcaM1Element.textContent = `${(params.ipca_m1 * 100).toFixed(2)}%`;
        if (ipcaM2Element) ipcaM2Element.textContent = `${(params.ipca_m2 * 100).toFixed(2)}%`;
        
        // Atualizar dias úteis
        const ndupElement = document.getElementById('ndup-display');
        const ndusElement = document.getElementById('ndus-display');
        const ndmpElement = document.getElementById('ndmp-display');
        const ndmsElement = document.getElementById('ndms-display');
        
        if (ndupElement) ndupElement.textContent = params.ndup;
        if (ndusElement) ndusElement.textContent = params.ndus;
        if (ndmpElement) ndmpElement.textContent = params.ndmp;
        if (ndmsElement) ndmsElement.textContent = params.ndms;
    }

    // Método para expandir automaticamente (útil para debug ou primeiro acesso)
    expand() {
        if (!this.isExpanded) {
            this.toggle();
        }
    }

    // Método para recolher
    collapse() {
        if (this.isExpanded) {
            this.toggle();
        }
    }

    // Atualizar indicador de última atualização
    updateLastUpdateIndicator() {
        const params = apiService.getTfdParameters();
        const indicator = document.getElementById('last-update-indicator');
        
        if (indicator && params.lastUpdate) {
            indicator.innerHTML = `
                <div style="background: #d4edda; color: #155724; padding: 8px; border-radius: 6px; border-left: 4px solid #28a745; font-size: 0.75rem;">
                    ✅ <strong>Última atualização:</strong> ${params.lastUpdate}<br>
                    📊 <strong>TLP:</strong> ${params.jm}% a.a. | <strong>IPCA:</strong> ${(params.ipca_m1*100).toFixed(2)}%/${(params.ipca_m2*100).toFixed(2)}%
                </div>`;
        }
    }
}

// Instância global
const parametersComponent = new ParametersComponent();

// Função global para compatibilidade - implementação direta como no original
function toggleParameters() {
    const content = document.getElementById('parametersContent');
    const toggle = document.getElementById('parametersToggle');
    
    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        toggle.classList.remove('expanded');
    } else {
        content.classList.add('expanded');
        toggle.classList.add('expanded');
    }
}

// Disponibilizar globalmente
window.toggleParameters = toggleParameters;

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    parametersComponent.render();
    parametersComponent.updateParameterDisplays();
});