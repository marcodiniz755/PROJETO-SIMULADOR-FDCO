// Serviços de API - Comunicação com APIs externas

class ApiService {
    constructor() {
        this.tfdParameters = {
            jm: 7.51, // TLP - 7,51% atual
            alpha: 1.00,
            cdr: 1.00,
            du: 21, // DU = 21 dias úteis em agosto
            ipca_m1: 0.0024, // IPCA M-1 = 0,24% (real)
            ipca_m2: 0.0026, // IPCA M-2 = 0,26% (real)
            ndup: 10,
            ndus: 11,
            ndmp: 21,
            ndms: 21,
            lastUpdate: null
        };
    }

    // Função para buscar TLP do BACEN
    async fetchTLP() {
        try {
            console.log('🔄 Tentando buscar TLP do BACEN (método direto)...');
            
            const response = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.27572/dados?formato=json', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('📊 Dados TLP recebidos:', data);
            
            if (data && data.length > 0) {
                const ultimoRegistro = data[data.length - 1];
                const tlpValue = parseFloat(ultimoRegistro.valor);
                
                this.tfdParameters.jm = tlpValue;
                
                console.log(`✅ TLP atualizada: ${tlpValue}% a.a. (${ultimoRegistro.data})`);
                
                const paramTlpElement = document.getElementById('param-tlp');
                if (paramTlpElement) {
                    paramTlpElement.textContent = `${tlpValue.toFixed(2)}% a.a.`;
                }
                
                return tlpValue;
            }
        } catch (error) {
            console.error('❌ Erro ao buscar TLP:', error.message);
            console.log(`📋 Mantendo TLP padrão: ${this.tfdParameters.jm}% a.a.`);
            return this.tfdParameters.jm;
        }
    }

    // Função para atualizar TLP manualmente
    updateTLPManually(novoValor) {
        const valor = parseFloat(novoValor);
        
        if (isNaN(valor) || valor <= 0) return;
        
        const paramTlpElement = document.getElementById('param-tlp');
        if (paramTlpElement) {
            paramTlpElement.textContent = `${valor.toFixed(2)}% a.a.`;
        }
        
        this.tfdParameters.jm = valor;
        
        const indicator = document.getElementById('last-update-indicator');
        if (indicator) {
            indicator.innerHTML = `
                <div style="background: #d4edda; color: #155724; padding: 8px; border-radius: 6px; border-left: 4px solid #28a745; font-size: 0.75rem;">
                    ✅ <strong>Atualização Manual:</strong> ${new Date().toLocaleString('pt-BR')}<br>
                    📊 <strong>TLP:</strong> ${valor.toFixed(2)}% a.a.
                </div>`;
        }
    }

    // Função para buscar IPCA do IBGE
    async fetchIPCA() {
        try {
            console.log('🔄 Tentando buscar IPCA do IBGE...');
            
            const response = await fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1737/periodos/-2/variaveis/63?localidades=N1[all]', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (data && data[0] && data[0].resultados && data[0].resultados[0] && data[0].resultados[0].series) {
                const series = data[0].resultados[0].series[0].serie;
                const periods = Object.keys(series).slice(-2);
                
                if (periods.length >= 2) {
                    const ipcaM1 = parseFloat(series[periods[1]]) / 100;
                    const ipcaM2 = parseFloat(series[periods[0]]) / 100;
                    
                    this.tfdParameters.ipca_m1 = ipcaM1;
                    this.tfdParameters.ipca_m2 = ipcaM2;
                    
                    console.log(`✅ IPCA atualizado: M-1: ${(ipcaM1*100).toFixed(2)}%, M-2: ${(ipcaM2*100).toFixed(2)}%`);
                    
                    const ipcaM1Display = document.getElementById('ipca-m1-display');
                    const ipcaM2Display = document.getElementById('ipca-m2-display');
                    
                    if (ipcaM1Display) ipcaM1Display.textContent = `${(ipcaM1*100).toFixed(2)}%`;
                    if (ipcaM2Display) ipcaM2Display.textContent = `${(ipcaM2*100).toFixed(2)}%`;
                    
                    return { ipcaM1, ipcaM2, periods };
                }
            }
            throw new Error('Dados IPCA não encontrados');
        } catch (error) {
            console.error('❌ Erro ao buscar IPCA:', error.message);
            console.log('📋 Mantendo IPCA padrão: M-1: 0,24%, M-2: 0,26%');
            return { 
                ipcaM1: this.tfdParameters.ipca_m1, 
                ipcaM2: this.tfdParameters.ipca_m2,
                periods: ['padrão', 'padrão']
            };
        }
    }

    // Atualizar IPCA manualmente
    updateIPCAManually(m1Percent, m2Percent) {
        const ipcaM1 = parseFloat(m1Percent) / 100;
        const ipcaM2 = parseFloat(m2Percent) / 100;
        
        this.tfdParameters.ipca_m1 = ipcaM1;
        this.tfdParameters.ipca_m2 = ipcaM2;
        
        const ipcaM1Display = document.getElementById('ipca-m1-display');
        const ipcaM2Display = document.getElementById('ipca-m2-display');
        
        if (ipcaM1Display) ipcaM1Display.textContent = `${(ipcaM1*100).toFixed(2)}%`;
        if (ipcaM2Display) ipcaM2Display.textContent = `${(ipcaM2*100).toFixed(2)}%`;
    }

    // Função para atualizar todas as taxas
    async updateAllRates() {
        try {
            console.log('🚀 Iniciando atualização completa...');
            console.log(`📅 Data atual: ${new Date().toLocaleDateString('pt-BR')}`);
            
            this.showLoadingIndicator(true);
            
            const [tlp, ipca] = await Promise.all([
                this.fetchTLP(),
                this.fetchIPCA()
            ]);
            
            this.tfdParameters.lastUpdate = new Date().toLocaleString('pt-BR');
            
            console.log('✅ Atualização completa realizada com sucesso!');
            
            this.updateLastUpdateIndicator();
            this.showSuccessNotification();
            
            return true;
        } catch (error) {
            console.error('❌ Erro geral na atualização:', error);
            this.showErrorNotification(error.message);
            return false;
        } finally {
            this.showLoadingIndicator(false);
        }
    }

    // Indicadores visuais
    showLoadingIndicator(show) {
        let indicator = document.getElementById('loading-indicator');
        
        if (show && !indicator) {
            indicator = document.createElement('div');
            indicator.id = 'loading-indicator';
            indicator.innerHTML = `
                <div style="position: fixed; top: 20px; right: 20px; background: #3498db; color: white; padding: 10px 15px; border-radius: 8px; z-index: 9999; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="width: 16px; height: 16px; border: 2px solid #fff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                        <span>Atualizando taxas...</span>
                    </div>
                </div>`;
            document.body.appendChild(indicator);
        } else if (!show && indicator) {
            indicator.remove();
        }
    }

    showSuccessNotification() {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px 20px; border-radius: 8px; z-index: 9999; box-shadow: 0 4px 12px rgba(0,0,0,0.2); max-width: 350px;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                    <span style="font-size: 1.2em;">✅</span>
                    <strong>Taxas Atualizadas!</strong>
                </div>
                <div style="font-size: 0.9rem; line-height: 1.3;">
                    TLP: ${this.tfdParameters.jm}% • IPCA: ${(this.tfdParameters.ipca_m1*100).toFixed(2)}%/${(this.tfdParameters.ipca_m2*100).toFixed(2)}%<br>
                    Dias: ${this.tfdParameters.ndup}/${this.tfdParameters.ndus}/${this.tfdParameters.ndmp}/${this.tfdParameters.ndms}
                </div>
            </div>`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    showErrorNotification(message) {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 15px 20px; border-radius: 8px; z-index: 9999; box-shadow: 0 4px 12px rgba(0,0,0,0.2); max-width: 350px;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                    <span style="font-size: 1.2em;">❌</span>
                    <strong>Erro na Atualização</strong>
                </div>
                <div style="font-size: 0.9rem;">
                    ${message}<br>
                    <small>Usando valores padrão.</small>
                </div>
            </div>`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 7000);
    }

    updateLastUpdateIndicator() {
        const indicator = document.getElementById('last-update-indicator');
        if (indicator && this.tfdParameters.lastUpdate) {
            indicator.innerHTML = `
                <div style="background: #d4edda; color: #155724; padding: 8px; border-radius: 6px; border-left: 4px solid #28a745; font-size: 0.75rem;">
                    ✅ <strong>Última atualização:</strong> ${this.tfdParameters.lastUpdate}<br>
                    📊 <strong>TLP:</strong> ${this.tfdParameters.jm}% a.a. | <strong>IPCA:</strong> ${(this.tfdParameters.ipca_m1*100).toFixed(2)}%/${(this.tfdParameters.ipca_m2*100).toFixed(2)}%
                </div>`;
        }
    }

    getTfdParameters() {
        return this.tfdParameters;
    }
}

// Instância global
const apiService = new ApiService();

// Funções globais para compatibilidade
window.fetchTLP = () => apiService.fetchTLP();
window.fetchIPCA = () => apiService.fetchIPCA();
window.updateAllRates = () => apiService.updateAllRates();
window.updateRatesManually = () => apiService.updateAllRates();
window.tfdParameters = apiService.getTfdParameters();