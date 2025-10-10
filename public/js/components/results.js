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
                            <strong>⚠️ ATENÇÃO - SIMULADOR EDUCACIONAL</strong>
                        </div>
                        <div style="font-size: 0.85rem; color: #856404; line-height: 1.5;">
                            Este simulador é destinado exclusivamente para fins educacionais e de demonstração!<br>
                            Os valores apresentados nas parcelas pelo sistema SAC consideram a data atual como data de pagamento. No entanto, em um financiamento real, os valores finais são definidos pelo banco (agente operador) na data de vencimento de cada parcela.<br>
                            Para informações oficiais e valores precisos, consulte diretamente a instituição financeira responsável. Demais informações acesse:
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
                    <span class="result-label-large">Recursos Próprios e de Terceiros</span>
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

        // Buscar e exibir alerta de volatilidade histórica (assíncrono)
        this.loadHistoricalAlert(data.tfdRate, data.fp);
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
                O valor solicitado para financiamento via FDCO (${formatterService.formatCurrency(fdcoAmount)}) ultrapassa o limite anual de ${formatterService.formatCurrency(standardLimit)} por empresa ou grupo econômico, conforme a Resolução CONDEL/SUDECO nº 144/2023.<br>
                Por isso, a concessão de valores acima desse limite fica sob responsabilidade da Diretoria Colegiada da Sudeco, que avaliará se o projeto é de alta relevância e estruturante para o desenvolvimento econômico e social da região Centro-Oeste, preferencialmente em municípios classificados como média renda, segundo a PNDR.<br>
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

                <div style="margin-top: 25px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #3498db;">
                    <h4 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 1rem;">
                        📋 Tabela de Limites - Resolução CMN 4.960/2021
                    </h4>
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
                            <thead>
                                <tr style="background: #e8f4f8;">
                                    <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Setores da Economia</th>
                                    <th style="padding: 8px; text-align: center; border: 1px solid #ddd;">Áreas Prioritárias</th>
                                    <th style="padding: 8px; text-align: center; border: 1px solid #ddd;">Demais Áreas</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding: 8px; border: 1px solid #ddd;">Infraestrutura - Saneamento e Abastecimento de Água</td>
                                    <td style="padding: 8px; text-align: center; border: 1px solid #ddd; font-weight: 600;">80%</td>
                                    <td style="padding: 8px; text-align: center; border: 1px solid #ddd; font-weight: 600;">70%</td>
                                </tr>
                                <tr style="background: #f8f9fa;">
                                    <td style="padding: 8px; border: 1px solid #ddd;">Infraestrutura (outros setores)</td>
                                    <td style="padding: 8px; text-align: center; border: 1px solid #ddd; font-weight: 600;">60%</td>
                                    <td style="padding: 8px; text-align: center; border: 1px solid #ddd; font-weight: 600;">50%</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border: 1px solid #ddd;">Serviço Público</td>
                                    <td style="padding: 8px; text-align: center; border: 1px solid #ddd; font-weight: 600;">60%</td>
                                    <td style="padding: 8px; text-align: center; border: 1px solid #ddd; font-weight: 600;">50%</td>
                                </tr>
                                <tr style="background: #f8f9fa;">
                                    <td style="padding: 8px; border: 1px solid #ddd;">Estruturador</td>
                                    <td style="padding: 8px; text-align: center; border: 1px solid #ddd; font-weight: 600;">55%</td>
                                    <td style="padding: 8px; text-align: center; border: 1px solid #ddd; font-weight: 600;">45%</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border: 1px solid #ddd;">Outros Setores</td>
                                    <td style="padding: 8px; text-align: center; border: 1px solid #ddd; font-weight: 600;">50%</td>
                                    <td style="padding: 8px; text-align: center; border: 1px solid #ddd; font-weight: 600;">40%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p style="margin: 10px 0 0 0; font-size: 0.75rem; color: #6c757d; font-style: italic;">
                        * Limite aplicado ao seu projeto: <strong>${this.currentResults.limits.sectorLimitPerc}%</strong>
                        (${info.prioridade_espacial})
                    </p>
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

    // Método para carregar e exibir alerta de volatilidade histórica
    async loadHistoricalAlert(currentTFD, currentFP) {
        try {
            // Obter parâmetros atuais
            const params = apiService.getTfdParameters();

            // Determinar tipo de projeto baseado no FP
            let projectType = 'B'; // Padrão
            if (currentFP === 0.85) projectType = 'A';
            else if (currentFP === 1.05) projectType = 'B';
            else if (currentFP === 1.25) projectType = 'C';
            else if (currentFP === 1.45) projectType = 'D';

            // Criar parâmetros para cálculo histórico
            const historicalParams = {
                ndup: params.ndup,
                ndus: params.ndus,
                ndmp: params.ndmp,
                ndms: params.ndms,
                du: params.du,
                cdr: params.cdr || 1.0,
                alpha: params.alpha || 1.0
            };

            // Buscar dados históricos
            const historicalData = await historicalDataService.getHistoricalData(historicalParams, projectType);

            if (historicalData && historicalData.statistics) {
                this.showHistoricalAlert(currentTFD, historicalData.statistics, historicalData.historicalData);
            }
        } catch (error) {
            console.error('❌ Erro ao carregar dados históricos:', error);
            // Silencioso - não mostrar erro ao usuário
        }
    }

    // Método para exibir alerta visual de volatilidade
    showHistoricalAlert(currentTFD, stats, historicalData) {
        // Validar estatísticas
        if (!stats || isNaN(stats.min) || isNaN(stats.max) || isNaN(stats.avg)) {
            console.error('❌ Estatísticas inválidas - alerta histórico não será exibido');
            return;
        }

        // Encontrar o container de aprovação (após disclaimer)
        const approvalDiv = document.getElementById('approvalStatus');
        if (!approvalDiv) return;

        // Criar div para alerta histórico se não existir
        let historicalAlertDiv = document.getElementById('historicalAlert');
        if (!historicalAlertDiv) {
            historicalAlertDiv = document.createElement('div');
            historicalAlertDiv.id = 'historicalAlert';
            approvalDiv.parentNode.insertBefore(historicalAlertDiv, approvalDiv);
        }

        // Calcular variação percentual
        const variation = ((stats.max - stats.min) / stats.avg) * 100;

        // Determinar se está acima ou abaixo da média
        const diffFromAvg = currentTFD - stats.avg;
        const percFromAvg = (diffFromAvg / stats.avg) * 100;

        let trendIcon = '📊';
        let trendText = 'na média';
        let trendColor = '#3498db';

        if (diffFromAvg > 0.2) {
            trendIcon = '📈';
            trendText = 'acima da média';
            trendColor = '#e74c3c';
        } else if (diffFromAvg < -0.2) {
            trendIcon = '📉';
            trendText = 'abaixo da média';
            trendColor = '#27ae60';
        }

        historicalAlertDiv.style.display = 'block';
        historicalAlertDiv.style.marginBottom = '20px';
        historicalAlertDiv.innerHTML = `
            <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; color: white; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                    <div style="font-size: 2.5rem;">⚠️</div>
                    <div>
                        <h4 style="margin: 0; font-size: 1.2rem; font-weight: 600;">Volatilidade das Taxas TFD</h4>
                        <p style="margin: 5px 0 0 0; font-size: 0.9rem; opacity: 0.9;">Análise dos últimos ${stats.count} meses</p>
                    </div>
                </div>

                <div style="background: rgba(255,255,255,0.15); padding: 15px; border-radius: 8px; backdrop-filter: blur(10px);">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; margin-bottom: 15px;">
                        <div style="text-align: center;">
                            <div style="font-size: 0.85rem; opacity: 0.9; margin-bottom: 5px;">📉 Mínima</div>
                            <div style="font-size: 1.5rem; font-weight: 700;">${stats.min.toFixed(2)}%</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 0.85rem; opacity: 0.9; margin-bottom: 5px;">📊 Média</div>
                            <div style="font-size: 1.5rem; font-weight: 700;">${stats.avg.toFixed(2)}%</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 0.85rem; opacity: 0.9; margin-bottom: 5px;">📈 Máxima</div>
                            <div style="font-size: 1.5rem; font-weight: 700;">${stats.max.toFixed(2)}%</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 0.85rem; opacity: 0.9; margin-bottom: 5px;">${trendIcon} Atual</div>
                            <div style="font-size: 1.5rem; font-weight: 700;">${currentTFD.toFixed(2)}%</div>
                        </div>
                    </div>

                    <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 6px; margin-top: 10px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <div>
                                <span style="font-size: 0.9rem;">
                                    <strong>Amplitude:</strong> ${(stats.max - stats.min).toFixed(2)}%
                                    (${variation.toFixed(1)}% de variação)
                                </span>
                            </div>
                            <div>
                                <span style="font-size: 0.9rem;">
                                    Taxa atual está <strong>${trendText}</strong>
                                    ${Math.abs(percFromAvg).toFixed(1)}% ${diffFromAvg > 0 ? 'acima' : 'abaixo'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 15px; font-size: 0.85rem; line-height: 1.6; opacity: 0.95;">
                    <strong>💡 Importante:</strong> As taxas TFD variam mensalmente conforme TLP e IPCA.
                    Esta simulação usa os valores atuais, mas parcelas futuras serão calculadas com taxas vigentes em cada período.
                    Estatísticas acima referem-se ao <strong>Tipo ${stats.projectType}</strong> (FP ${stats.projectType === 'A' ? '0,85' : stats.projectType === 'B' ? '1,05' : stats.projectType === 'C' ? '1,25' : '1,45'}).
                    <button onclick="resultsComponent.showHistoricalModal()" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 8px 15px; border-radius: 6px; cursor: pointer; margin-left: 10px; font-size: 0.85rem; transition: all 0.3s;">
                        📊 Ver Todos os Tipos (A, B, C, D)
                    </button>
                </div>
            </div>
        `;

        // Armazenar dados históricos para o modal
        this.historicalData = historicalData;
    }

    // Método para exibir modal com histórico completo
    showHistoricalModal() {
        if (!this.historicalData || this.historicalData.length === 0) {
            alert('Dados históricos não disponíveis.');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.display = 'flex';

        let tableRows = '';
        // Inverter ordem para mostrar mais recente primeiro
        const reversedData = [...this.historicalData].reverse();
        reversedData.forEach(row => {
            tableRows += `
                <tr>
                    <td style="text-align: center; white-space: nowrap;">${row.date}</td>
                    <td style="text-align: center;">${row.tlp.toFixed(2)}%</td>
                    <td style="text-align: center;">${row.ipcaM2.toFixed(2)}%</td>
                    <td style="text-align: center;">${row.ipcaM1.toFixed(2)}%</td>
                    <td style="text-align: center; font-weight: 600; color: #27ae60;">${row.tfd_a.toFixed(2)}%</td>
                    <td style="text-align: center; font-weight: 600; color: #3498db;">${row.tfd_b.toFixed(2)}%</td>
                    <td style="text-align: center; font-weight: 600; color: #f39c12;">${row.tfd_c.toFixed(2)}%</td>
                    <td style="text-align: center; font-weight: 600; color: #e74c3c;">${row.tfd_d.toFixed(2)}%</td>
                </tr>
            `;
        });

        // Calcular médias para cada tipo
        const avgTFD_A = this.historicalData.reduce((sum, row) => sum + row.tfd_a, 0) / this.historicalData.length;
        const avgTFD_B = this.historicalData.reduce((sum, row) => sum + row.tfd_b, 0) / this.historicalData.length;
        const avgTFD_C = this.historicalData.reduce((sum, row) => sum + row.tfd_c, 0) / this.historicalData.length;
        const avgTFD_D = this.historicalData.reduce((sum, row) => sum + row.tfd_d, 0) / this.historicalData.length;

        modal.innerHTML = `
            <div class="modal-content" style="max-width: 1100px; max-height: 90vh; overflow-y: auto;">
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                <h3 style="margin-bottom: 20px; color: #2c3e50;">📊 Histórico TFD - Últimos 12 Meses (Todos os Tipos)</h3>

                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                        <thead>
                            <tr style="background: #f8f9fa;">
                                <th style="padding: 10px; border: 1px solid #ddd; min-width: 90px;">Mês/Ano</th>
                                <th style="padding: 10px; border: 1px solid #ddd; min-width: 70px;">TLP</th>
                                <th style="padding: 10px; border: 1px solid #ddd; min-width: 80px;">IPCA M-2</th>
                                <th style="padding: 10px; border: 1px solid #ddd; min-width: 80px;">IPCA M-1</th>
                                <th style="padding: 10px; border: 1px solid #ddd; background: #d4edda; min-width: 85px;" title="Saneamento PRIORITÁRIA">
                                    TFD-A<br><span style="font-size: 0.75rem; font-weight: normal;">(FP 0,85)</span>
                                </th>
                                <th style="padding: 10px; border: 1px solid #ddd; background: #d1ecf1; min-width: 85px;" title="Demais PRIORITÁRIA">
                                    TFD-B<br><span style="font-size: 0.75rem; font-weight: normal;">(FP 1,05)</span>
                                </th>
                                <th style="padding: 10px; border: 1px solid #ddd; background: #fff3cd; min-width: 85px;" title="Saneamento DEMAIS">
                                    TFD-C<br><span style="font-size: 0.75rem; font-weight: normal;">(FP 1,25)</span>
                                </th>
                                <th style="padding: 10px; border: 1px solid #ddd; background: #f8d7da; min-width: 85px;" title="Demais DEMAIS">
                                    TFD-D<br><span style="font-size: 0.75rem; font-weight: normal;">(FP 1,45)</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                        <tfoot>
                            <tr style="background: #e8f4f8; font-weight: 700; border-top: 2px solid #3498db;">
                                <td colspan="4" style="padding: 12px; text-align: center; border: 1px solid #ddd; font-size: 0.95rem;">
                                    MÉDIA (últimos 12 meses)
                                </td>
                                <td style="padding: 12px; text-align: center; border: 1px solid #ddd; background: #d4edda; font-size: 0.95rem; color: #27ae60;">
                                    ${avgTFD_A.toFixed(2)}%
                                </td>
                                <td style="padding: 12px; text-align: center; border: 1px solid #ddd; background: #d1ecf1; font-size: 0.95rem; color: #3498db;">
                                    ${avgTFD_B.toFixed(2)}%
                                </td>
                                <td style="padding: 12px; text-align: center; border: 1px solid #ddd; background: #fff3cd; font-size: 0.95rem; color: #f39c12;">
                                    ${avgTFD_C.toFixed(2)}%
                                </td>
                                <td style="padding: 12px; text-align: center; border: 1px solid #ddd; background: #f8d7da; font-size: 0.95rem; color: #e74c3c;">
                                    ${avgTFD_D.toFixed(2)}%
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; font-size: 0.9rem; line-height: 1.6;">
                    <strong>📝 Nota:</strong> Este histórico mostra como a TFD variou nos últimos 12 meses para <strong>todos os tipos de projeto</strong> (A, B, C, D).
                    Cada tipo tem um Fator de Programa (FP) diferente que afeta a taxa final:
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li><strong>Tipo A (0,85):</strong> Saneamento em área PRIORITÁRIA - taxa mais baixa</li>
                        <li><strong>Tipo B (1,05):</strong> Demais setores em área PRIORITÁRIA</li>
                        <li><strong>Tipo C (1,25):</strong> Saneamento em área DEMAIS</li>
                        <li><strong>Tipo D (1,45):</strong> Demais setores em área DEMAIS - taxa mais alta</li>
                    </ul>
                    Os valores demonstram a volatilidade natural das taxas conforme variam TLP e IPCA, servindo como referência educacional.
                </div>

                <div style="margin-top: 20px; text-align: center;">
                    <button onclick="this.closest('.modal-overlay').remove()" style="background: #3498db; color: white; border: none; padding: 12px 30px; border-radius: 6px; cursor: pointer; font-size: 1rem;">
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