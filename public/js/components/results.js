// Componente de Resultados

class ResultsComponent {
    constructor() {
        this.currentResults = null;
    }

    render() {
        const resultsContainer = document.getElementById('results-component');
        
        resultsContainer.innerHTML = `
            <div class="results-panel-fullwidth">
                <div id="resultsPlaceholder" class="results-placeholder">
                    <div class="placeholder-icon">📊</div>
                    <h3 class="results-title-full">Simulação FDCO</h3>
                    <p style="margin-bottom: 30px; color: #7f8c8d; line-height: 1.5;">
                        Complete o formulário acima para simular as condições do financiamento FDCO
                    </p>
                    
                    <div class="placeholder-steps">
                        <div class="step">
                            <div class="step-number">1</div>
                            <div>Selecione estado, município e setor do projeto</div>
                        </div>
                        <div class="step">
                            <div class="step-number">2</div>
                            <div>Informe os valores de investimento</div>
                        </div>
                        <div class="step">
                            <div class="step-number">3</div>
                            <div>Configure as condições de financiamento</div>
                        </div>
                        <div class="step">
                            <div class="step-number">4</div>
                            <div>Clique em "Calcular FDCO" para ver os resultados</div>
                        </div>
                    </div>
                </div>

                <div id="simulationResults" style="display: none;">
                    <h3 class="results-title-full">📊 Resultados da Simulação FDCO</h3>
                    
                    <div style="margin: 20px 0; padding: 15px; background: #fff3cd; border-radius: 8px; border: 1px solid #ffeaa7;">
                        <div style="font-size: 1rem; color: #856404; margin-bottom: 10px;">
                            <strong>📚 SIMULADOR EDUCACIONAL</strong>
                        </div>
                        <div style="font-size: 0.85rem; color: #856404; line-height: 1.5;">
                            Este simulador tem fins exclusivamente educacionais e de demonstração. Os dados obtidos nas parcelas SAC é considerando o dia do pagamento nesta data. No caso do financiamento REAL quem define esses valores é o Banco (Agente Operador), na data que vencer o pagamento da parcela. Para consultas oficiais, acesse:
                        </div>
                        <div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 15px; font-size: 0.85rem;">
                            <a href="https://www.gov.br/sudeco" target="_blank" style="color: #0066cc; text-decoration: none;">
                                🌐 Site SUDECO
                            </a>
                            <a href="https://www.gov.br/sudeco/pt-br/assuntos/fundo-de-desenvolvimento-do-centro-oeste" target="_blank" style="color: #0066cc; text-decoration: none;">
                                📄 Informações FDCO
                            </a>
                            <a href="https://www.gov.br/sudeco/pt-br/assuntos/fundo-de-desenvolvimento-do-centro-oeste/consultas-previas" target="_blank" style="color: #0066cc; text-decoration: none;">
                                📝 Cadastre uma Consulta Prévia
                            </a>
                            <a href="https://www.gov.br/sudeco/pt-br/assuntos/fundo-de-desenvolvimento-do-centro-oeste/legislacao" target="_blank" style="color: #0066cc; text-decoration: none;">
                                📋 Normativos
                            </a>
                        </div>
                    </div>
                    
                    <div id="approvalStatus" style="display: none; margin-bottom: 20px;"></div>
                    
                    <div class="results-horizontal">
                        ${this.renderMainResultsCard()}
                        ${this.renderFinancingDetailsCard()}
                        ${this.renderTechnicalDetailsCard()}
                    </div>
                    
                    <div class="schedule-section">
                        <h4 class="schedule-title">
                            <span class="icon-fallback">📋</span> Cronograma de Pagamentos SAC
                        </h4>
                        <div class="payment-schedule-large" id="paymentSchedule">
                            <!-- Cronograma será inserido aqui -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderMainResultsCard() {
        return `
            <div class="results-card" style="border-top-color: #27ae60;">
                <h4 class="results-card-title">
                    <span class="icon-fallback">💰</span> Financiamento FDCO
                </h4>
                <div class="highlight-result-large">
                    <span class="value-large" id="fdcoLoanAmount">R$ 0,00</span>
                    <span class="label-large">Valor do Financiamento</span>
                </div>
                <div class="result-item-large">
                    <span class="result-label-large">Taxa TFD (anual)</span>
                    <span class="result-value-large" id="tfdRate">0,00% a.a.</span>
                </div>
                <div class="result-item-large">
                    <span class="result-label-large">Fator de Programa</span>
                    <span class="result-value-large" id="fpValue">-</span>
                </div>
                <div class="result-item-large">
                    <span class="result-label-large">% do Projeto FDCO</span>
                    <span class="result-value-large" id="fdcoPercentage">0,0%</span>
                </div>
            </div>
        `;
    }

    renderFinancingDetailsCard() {
        return `
            <div class="results-card" style="border-top-color: #3498db;">
                <h4 class="results-card-title">
                    <span class="icon-fallback">📈</span> Detalhes do Financiamento
                </h4>
                <div class="result-item-large">
                    <span class="result-label-large">Recursos Próprios</span>
                    <span class="result-value-large" id="ownResourcesAmount">R$ 0,00</span>
                </div>
                <div class="result-item-large">
                    <span class="result-label-large">Amortização SAC (semestral)</span>
                    <span class="result-value-large" id="sacAmortization">R$ 0,00</span>
                </div>
                <div class="result-item-large">
                    <span class="result-label-large">1ª Prestação</span>
                    <span class="result-value-large" id="firstPayment">R$ 0,00</span>
                </div>
                <div class="result-item-large">
                    <span class="result-label-large">Sistema</span>
                    <span class="result-value-large">SAC (Sistema de Amortização Constante)</span>
                </div>
            </div>
        `;
    }

    renderTechnicalDetailsCard() {
        return `
            <div class="results-card" style="border-top-color: #f39c12;">
                <h4 class="results-card-title">
                    <span class="icon-fallback">⚙️</span> Parâmetros Técnicos
                </h4>
                <div class="result-item-large">
                    <span class="result-label-large">FAM (Fator Atualização)</span>
                    <span class="result-value-large" id="famValue">-</span>
                </div>
                <div class="result-item-large">
                    <span class="result-label-large">TLP Utilizada</span>
                    <span class="result-value-large" id="tlpUsed">-</span>
                </div>
                <div class="result-item-large">
                    <span class="result-label-large">CDR (Coef. Desequilíbrio)</span>
                    <span class="result-value-large">1,00</span>
                </div>
            </div>
        `;
    }

    updateResults(data) {
        this.currentResults = data;
        
        // Atualizar valores principais
        document.getElementById('fdcoLoanAmount').textContent = formatterService.formatCurrency(data.fdcoAmount);
        document.getElementById('tfdRate').textContent = `${data.tfdRate.toFixed(2)}% a.a.`;
        document.getElementById('fpValue').textContent = `${data.priority} (${data.fp.toFixed(2)})`;
        document.getElementById('fdcoPercentage').textContent = `${data.fdcoPercentage.toFixed(1)}%`;
        
        // Atualizar detalhes do financiamento
        document.getElementById('ownResourcesAmount').textContent = formatterService.formatCurrency(data.ownResourcesAmount);
        document.getElementById('sacAmortization').textContent = formatterService.formatCurrency(data.sacAmortization);
        document.getElementById('firstPayment').textContent = formatterService.formatCurrency(data.firstPayment);
        
        // Atualizar parâmetros técnicos
        const fam = calculatorService.calculateFAM();
        const params = apiService.getTfdParameters();
        
        document.getElementById('famValue').textContent = fam.toFixed(6);
        document.getElementById('tlpUsed').textContent = `${params.jm.toFixed(2)}% a.a.`;
        
        // Mostrar resultados
        document.getElementById('resultsPlaceholder').style.display = 'none';
        document.getElementById('simulationResults').style.display = 'block';
    }

    displaySACSchedule(schedule) {
        const scheduleContainer = document.getElementById('paymentSchedule');
        
        if (!schedule || schedule.length === 0) {
            scheduleContainer.innerHTML = '<p style="text-align: center; padding: 20px; color: #7f8c8d;">Nenhum cronograma disponível</p>';
            return;
        }

        let html = `
            <table>
                <thead>
                    <tr>
                        <th style="width: 10%;">#</th>
                        <th style="width: 15%;">Data</th>
                        <th style="width: 15%;">Tipo</th>
                        <th style="width: 20%;">Amortização</th>
                        <th style="width: 20%;">Juros</th>
                        <th style="width: 20%;">Total</th>
                        <th style="width: 20%;">Saldo Devedor</th>
                    </tr>
                </thead>
                <tbody>
        `;

        schedule.forEach((payment, index) => {
            const isGracePeriod = payment.type === 'Carência';
            const rowClass = isGracePeriod ? 'grace-period' : '';
            
            html += `
                <tr class="${rowClass}">
                    <td style="text-align: center; font-weight: 600;">${payment.payment}</td>
                    <td style="text-align: center;">${payment.date}</td>
                    <td style="text-align: center;">
                        <span class="badge ${isGracePeriod ? 'badge-warning' : 'badge-primary'}">
                            ${payment.type}
                        </span>
                    </td>
                    <td style="text-align: right;">${formatterService.formatTableCurrency(payment.principal)}</td>
                    <td style="text-align: right;">${formatterService.formatTableCurrency(payment.interest)}</td>
                    <td style="text-align: right; font-weight: 600;">${formatterService.formatTableCurrency(payment.total)}</td>
                    <td style="text-align: right;">${formatterService.formatTableCurrency(payment.balance)}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
            <div style="margin-top: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px; font-size: 0.9rem;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <div>
                        <strong>📋 Total de Parcelas:</strong> ${schedule.length}
                    </div>
                    <div>
                        <strong>⏸️ Período de Carência:</strong> ${schedule.filter(p => p.type === 'Carência').length} parcelas
                    </div>
                    <div>
                        <strong>💰 Total de Juros:</strong> ${formatterService.formatCurrency(schedule.reduce((sum, p) => sum + p.interest, 0))}
                    </div>
                    <div>
                        <strong>💵 Total Geral:</strong> ${formatterService.formatCurrency(schedule.reduce((sum, p) => sum + p.total, 0))}
                    </div>
                </div>
            </div>
        `;

        scheduleContainer.innerHTML = html;
    }

    showApprovalStatus(needsApproval, fdcoAmount, tfdRate) {
        const statusDiv = document.getElementById('approvalStatus');
        const standardLimit = 50000000; // R$ 50 milhões
        
        if (needsApproval) {
            statusDiv.style.display = 'block';
            statusDiv.className = 'alert alert-warning';
            statusDiv.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i> 
                <strong>⚠️ DELIBERAÇÃO DIRETORIA COLEGIADA NECESSÁRIA!</strong><br>
                O valor do financiamento FDCO (${formatterService.formatCurrency(fdcoAmount)}) supera o limite anual padrão de ${formatterService.formatCurrency(standardLimit)} por Grupo Empresarial, conforme Resolução CONDEL/SUDECO 144/2023. Este projeto requer aprovação da DIRETORIA COLEGIADA.<br>
                Taxa TFD: ${tfdRate.toFixed(2)}% a.a.`;
        } else {
            statusDiv.style.display = 'block';
            statusDiv.className = 'alert alert-success';
            statusDiv.innerHTML = `
                <i class="fas fa-check-circle"></i> 
                <strong>✅ APROVAÇÃO AUTOMÁTICA</strong><br>
                O valor do financiamento FDCO (${formatterService.formatCurrency(fdcoAmount)}) está dentro do limite anual padrão de ${formatterService.formatCurrency(standardLimit)} por Grupo Empresarial, conforme Resolução CONDEL/SUDECO 144/2023.<br>
                Este projeto pode seguir o fluxo normal de análise da SUDECO.<br>
                Taxa TFD: ${tfdRate.toFixed(2)}% a.a.`;
        }
    }

    showValidationError() {
        document.getElementById('simulationResults').style.display = 'none';
        document.getElementById('resultsPlaceholder').style.display = 'block';
        
        const statusDiv = document.getElementById('approvalStatus');
        if (statusDiv) {
            statusDiv.style.display = 'none';
        }
    }

    // Métodos para exportação de dados
    exportToCSV() {
        if (!this.currentResults || !this.currentResults.schedule) {
            alert('Nenhum resultado disponível para exportar.');
            return;
        }

        const schedule = this.currentResults.schedule;
        let csv = 'Parcela,Data,Tipo,Amortizacao,Juros,Total,Saldo Devedor\n';
        
        schedule.forEach(payment => {
            csv += `${payment.payment},${payment.date},${payment.type},`;
            csv += `${payment.principal.toFixed(2)},${payment.interest.toFixed(2)},`;
            csv += `${payment.total.toFixed(2)},${payment.balance.toFixed(2)}\n`;
        });

        this.downloadFile(csv, 'cronograma_fdco.csv', 'text/csv');
    }

    exportToPDF() {
        // Implementação futura com jsPDF
        alert('Exportação para PDF será implementada em versão futura.');
    }

    printResults() {
        const printContent = document.getElementById('simulationResults').innerHTML;
        const printWindow = window.open('', '_blank');
        
        printWindow.document.write(`
            <html>
                <head>
                    <title>Simulação FDCO - Resultados</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        .alert { padding: 15px; margin: 10px 0; border-radius: 5px; }
                        .alert-success { background: #d4edda; color: #155724; }
                        .alert-warning { background: #fff3cd; color: #856404; }
                        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background: #f8f9fa; }
                        .results-horizontal { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
                        .results-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
                        .value-large { font-size: 2rem; font-weight: bold; color: #27ae60; }
                        @media print { body { print-color-adjust: exact; } }
                    </style>
                </head>
                <body>
                    <h1>Simulação FDCO - Resultados</h1>
                    <p>Data: ${new Date().toLocaleDateString('pt-BR')}</p>
                    ${printContent}
                </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.print();
    }

    downloadFile(content, filename, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        window.URL.revokeObjectURL(url);
    }

    // Método para mostrar estatísticas do município
    showMunicipalityStats() {
        if (!this.currentResults || !this.currentResults.municipalityInfo) {
            return;
        }

        const info = this.currentResults.municipalityInfo;
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.display = 'flex';
        
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                <h3 style="margin-bottom: 20px; color: #2c3e50;">📊 Informações do Município</h3>
                
                <div style="display: grid; gap: 15px;">
                    <div class="info-card">
                        <div class="info-card-title">Município</div>
                        <div class="info-card-content">${info.name}</div>
                    </div>
                    
                    <div class="info-card">
                        <div class="info-card-title">Classificação PNDR</div>
                        <div class="info-card-content">
                            <span class="badge ${info.prioridade_espacial === 'PRIORITÁRIA' ? 'badge-success' : 'badge-info'}">
                                ${info.prioridade_espacial}
                            </span>
                        </div>
                    </div>
                    
                    <div class="info-card">
                        <div class="info-card-title">Fator de Programa Aplicado</div>
                        <div class="info-card-content">${this.currentResults.priority} (${this.currentResults.fp.toFixed(2)})</div>
                    </div>
                    
                    <div class="info-card">
                        <div class="info-card-title">Limite Setorial</div>
                        <div class="info-card-content">${this.currentResults.limits.sectorLimitPerc}% do investimento total</div>
                    </div>
                </div>
                
                <div style="margin-top: 20px; text-align: center;">
                    <button onclick="this.closest('.modal-overlay').remove()" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
                        Fechar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // Método para rolar suavemente até os resultados
    scrollToResults() {
        const resultsSection = document.querySelector('.results-panel-fullwidth');
        if (resultsSection) {
            resultsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }
}

// Instância global
const resultsComponent = new ResultsComponent();

// Funções globais para compatibilidade
window.updateResults = (data) => resultsComponent.updateResults(data);
window.displaySACSchedule = (schedule) => resultsComponent.displaySACSchedule(schedule);
window.showApprovalStatus = (needsApproval, fdcoAmount, tfdRate) => 
    resultsComponent.showApprovalStatus(needsApproval, fdcoAmount, tfdRate);
// showValidationErrorInResults já definida em validators.js
// showMunicipalityStats já definida em form.js

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    resultsComponent.render();
});