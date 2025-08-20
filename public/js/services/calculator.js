// Serviço de cálculos financeiros

class CalculatorService {
    constructor() {
        this.priorityFactors = {
            'A': 0.85, // Saneamento - PRIORITÁRIA
            'B': 1.05, // Demais setores - PRIORITÁRIA  
            'C': 1.25, // Saneamento - DEMAIS
            'D': 1.45  // Demais setores - DEMAIS
        };

        this.sectorLimits = {
            'infraestrutura_saneamento_III': { prioritaria: 80, demais: 70 },
            'infraestrutura_transportes_I': { prioritaria: 80, demais: 70 },
            'infraestrutura_armazenagem_II': { prioritaria: 80, demais: 70 },
            'infraestrutura_residuos_IV': { prioritaria: 80, demais: 70 },
            'infraestrutura_gas_V': { prioritaria: 80, demais: 70 },
            'infraestrutura_petroleo_VI': { prioritaria: 80, demais: 70 },
            'infraestrutura_logistica_VII': { prioritaria: 80, demais: 70 },
            'infraestrutura_telecomunicacoes_VIII': { prioritaria: 80, demais: 70 },
            'infraestrutura_energia_X': { prioritaria: 80, demais: 70 },
            'infraestrutura_urbana_XI': { prioritaria: 80, demais: 70 },
            'infraestrutura_portuaria_IX': { prioritaria: 80, demais: 70 },
            'infraestrutura_estruturador': { prioritaria: 80, demais: 70 },
            'servicos_publicos': { prioritaria: 80, demais: 70 },
            'servicos_turismo_I': { prioritaria: 80, demais: 70 },
            'servicos_hospitalares_II': { prioritaria: 80, demais: 70 },
            'servicos_transporte_passageiros_III': { prioritaria: 80, demais: 70 },
            'servicos_educacionais_IV': { prioritaria: 80, demais: 70 },
            'tradicionais_agricultura_I': { prioritaria: 80, demais: 70 },
            'tradicionais_veiculos_II': { prioritaria: 80, demais: 70 },
            'tradicionais_couros_III_a': { prioritaria: 80, demais: 70 },
            'tradicionais_plasticos_III_b': { prioritaria: 80, demais: 70 },
            'tradicionais_latex_III_c': { prioritaria: 80, demais: 70 },
            'tradicionais_textil_III_d': { prioritaria: 80, demais: 70 },
            'tradicionais_maquinas_III_e': { prioritaria: 80, demais: 70 },
            'tradicionais_minerais_III_f': { prioritaria: 80, demais: 70 },
            'tradicionais_quimicos_III_g': { prioritaria: 80, demais: 70 },
            'tradicionais_moveis_madeira_III_h': { prioritaria: 80, demais: 70 },
            'tradicionais_alimentos_III_i': { prioritaria: 80, demais: 70 },
            'tradicionais_papel_III_j': { prioritaria: 80, demais: 70 },
            'tradicionais_farmaceuticos_III_k': { prioritaria: 80, demais: 70 },
            'tradicionais_produtos_higiene_III_l': { prioritaria: 80, demais: 70 },
            'cti_pesquisa_I': { prioritaria: 80, demais: 70 },
            'cti_desenvolvimento_II': { prioritaria: 80, demais: 70 },
            'cti_inovacao_III': { prioritaria: 80, demais: 70 }
        };

        this.standardLimit = 50000000; // R$ 50 milhões
    }

    // Calcular FAM com precisão otimizada
    calculateFAM() {
        const params = apiService.getTfdParameters();
        const { ipca_m1, ipca_m2, ndup, ndus, ndmp, ndms } = params;
        const pi_m1 = parseFloat(ipca_m1.toFixed(3));
        const pi_m2 = parseFloat(ipca_m2.toFixed(3));
        const termo1 = Math.pow(1 + pi_m2, ndup / ndmp);
        const termo2 = Math.pow(1 + pi_m1, ndus / ndms);
        const fam = termo1 * termo2;
        return parseFloat(fam.toFixed(9));
    }

    // Calcular TFD usando API Java
    async calculateTFD(fp) {
        try {
            const params = apiService.getTfdParameters();
            const { jm, alpha, cdr, du, ipca_m1, ipca_m2, ndup, ndus, ndmp, ndms } = params;
            
            const tfdData = {
                tlp: jm,
                fp: fp,
                ipca_m1: ipca_m1 * 100, // Converter para percentual (0.0024 -> 0.24)
                ipca_m2: ipca_m2 * 100, // Converter para percentual (0.0026 -> 0.26)
                alpha: alpha,
                cdr: cdr,
                ndup: ndup,
                ndus: ndus,
                ndmp: ndmp,
                ndms: ndms,
                du: du
            };
            
            // Criar AbortController com timeout de 10 segundos
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);
            
            const response = await fetch('http://localhost:8082/api/fdco/calcular-tfd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tfdData),
                signal: controller.signal,
                mode: 'cors'
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`Erro na API TFD: ${response.status}`);
            }
            
            const result = await response.json();
            return result.tfd_anual; // Já vem em percentual
            
        } catch (error) {
            console.warn('Erro ao calcular TFD via API, usando cálculo local:', error);
            // Fallback para cálculo local
            return this.calculateTFDLocal(fp);
        }
    }
    
    // Calcular TFD local (fallback)
    calculateTFDLocal(fp) {
        const params = apiService.getTfdParameters();
        const { jm, alpha, cdr, du } = params;
        const jurosPrefixadosTLP = (alpha * jm) / 100;
        const fam = this.calculateFAM();
        const termo1 = cdr * fp * jurosPrefixadosTLP;
        const termo2 = 1 + termo1;
        const expoente = du / 252;
        const termo3 = Math.pow(termo2, expoente);
        const tfd_mensal = fam * termo3 - 1;
        const tfd_anual = Math.pow(1 + tfd_mensal, 12) - 1;
        return tfd_anual * 100;
    }

    // Calcular limites de financiamento
    calculateLimits(totalInvestment, projectSector, state, municipality, ownResourcesPerc = 20, fixedInvestment = 0) {
        if (!projectSector || !state || !municipality || !totalInvestment) {
            return null;
        }

        const municipalityInfo = window.getMunicipalityInfo(state, municipality);
        if (!municipalityInfo) {
            return null;
        }

        const location = municipalityInfo.prioridade_espacial === 'PRIORITÁRIA' ? 'prioritaria' : 'demais';
        const sectorLimitPerc = this.sectorLimits[projectSector] ? this.sectorLimits[projectSector][location] : null;
        
        if (!sectorLimitPerc) {
            return null;
        }

        const maxBySector = totalInvestment * (sectorLimitPerc / 100);
        const maxByFixedRule = fixedInvestment * 0.9;
        const maxByFinanciable = totalInvestment * 0.8;
        const maxByOwnResources = totalInvestment * (1 - ownResourcesPerc / 100);
        
        let fdcoAmount = Math.min(maxBySector, maxByFixedRule, maxByFinanciable, maxByOwnResources);
        
        if (fixedInvestment > 0 && fixedInvestment < fdcoAmount) {
            fdcoAmount = fixedInvestment;
        }
        
        fdcoAmount = Math.max(0, fdcoAmount);
        
        const needsCondelApproval = fdcoAmount > this.standardLimit;
        
        return {
            maxBySector,
            maxByFixedRule,
            maxByFinanciable,
            maxByOwnResources,
            standardLimit: this.standardLimit,
            fdcoAmount,
            sectorLimitPerc,
            location,
            municipalityInfo,
            needsCondelApproval
        };
    }

    // Gerar cronograma SAC
    generateSACSchedule(principal, semestralRate, totalYears, gracePeriod) {
        const schedule = [];
        const startDate = new Date();
        let currentDate = new Date(startDate);
        let balance = principal;
        const amortizationPeriods = (totalYears - gracePeriod) * 2;
        const sacAmortization = amortizationPeriods > 0 ? principal / amortizationPeriods : 0;

        // Período de carência
        for (let i = 1; i <= gracePeriod * 2; i++) {
            currentDate.setMonth(currentDate.getMonth() + 6);
            const interest = balance * semestralRate;
            balance += interest;
            
            schedule.push({
                payment: i,
                date: new Date(currentDate).toLocaleDateString('pt-BR'),
                principal: 0, 
                interest: interest, 
                total: interest, 
                balance: balance, 
                type: 'Carência'
            });
        }

        // Período de amortização
        balance = principal + (gracePeriod * 2 * principal * semestralRate);
        for (let i = 1; i <= amortizationPeriods; i++) {
            currentDate.setMonth(currentDate.getMonth() + 6);
            const interest = balance * semestralRate;
            const totalPayment = sacAmortization + interest;
            balance -= sacAmortization;

            schedule.push({
                payment: (gracePeriod * 2) + i,
                date: new Date(currentDate).toLocaleDateString('pt-BR'),
                principal: sacAmortization, 
                interest: interest, 
                total: totalPayment,
                balance: Math.max(0, balance), 
                type: 'SAC'
            });
        }

        return schedule;
    }

    // Função para calcular dias úteis e feriados
    getFeriadosNacionais(ano) {
        const feriados = [];
        
        // Feriados fixos
        feriados.push(new Date(ano, 0, 1));   // Confraternização Universal
        feriados.push(new Date(ano, 3, 21));  // Tiradentes
        feriados.push(new Date(ano, 4, 1));   // Dia do Trabalhador
        feriados.push(new Date(ano, 8, 7));   // Independência do Brasil
        feriados.push(new Date(ano, 9, 12));  // Nossa Senhora Aparecida
        feriados.push(new Date(ano, 10, 2));  // Finados
        feriados.push(new Date(ano, 10, 15)); // Proclamação da República
        feriados.push(new Date(ano, 11, 25)); // Natal
        
        // Feriados móveis (baseados na Páscoa)
        const pascoa = this.calcularPascoa(ano);
        feriados.push(new Date(pascoa.getTime() - 47 * 24 * 60 * 60 * 1000)); // Carnaval (47 dias antes)
        feriados.push(new Date(pascoa.getTime() - 46 * 24 * 60 * 60 * 1000)); // Carnaval (46 dias antes)
        feriados.push(new Date(pascoa.getTime() - 2 * 24 * 60 * 60 * 1000));  // Sexta-feira Santa
        feriados.push(new Date(pascoa.getTime() + 60 * 24 * 60 * 60 * 1000));  // Corpus Christi
        
        return feriados;
    }

    calcularPascoa(ano) {
        const a = ano % 19;
        const b = Math.floor(ano / 100);
        const c = ano % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const mes = Math.floor((h + l - 7 * m + 114) / 31);
        const dia = ((h + l - 7 * m + 114) % 31) + 1;
        
        return new Date(ano, mes - 1, dia);
    }

    ehFeriado(data) {
        const ano = data.getFullYear();
        const feriados = this.getFeriadosNacionais(ano);
        
        return feriados.some(feriado => 
            feriado.getDate() === data.getDate() &&
            feriado.getMonth() === data.getMonth() &&
            feriado.getFullYear() === data.getFullYear()
        );
    }

    // Função principal de cálculo
    async calculateResults() {
        const validation = window.canCalculate();
        if (!validation.canProceed) {
            window.showAlert('danger', validation.message);
            window.showValidationErrorInResults();
            return;
        }
        
        const totalInvestment = window.parseInputValue(document.getElementById('totalInvestment').value) || 0;
        const fixedInvestment = window.parseInputValue(document.getElementById('fixedInvestment').value) || 0;
        const ownResourcesPerc = parseFloat(document.getElementById('ownResources').value) || 20;
        const projectSector = document.getElementById('projectSector').value;
        const state = document.getElementById('state').value;
        const municipality = document.getElementById('municipality').value;
        const loanTerm = parseInt(document.getElementById('loanTerm').value) || 0;
        const gracePeriod = parseFloat(document.getElementById('gracePeriod').value) || 0;

        const municipalityInfo = window.getMunicipalityInfo(state, municipality);
        
        if (ownResourcesPerc < 20) {
            window.showAlert('danger', '❌ Recursos próprios devem ser no mínimo 20%.');
            window.showValidationErrorInResults();
            return;
        }

        try {
            const limits = this.calculateLimits(totalInvestment, projectSector, state, municipality, ownResourcesPerc, fixedInvestment);
            if (!limits) {
                window.showAlert('danger', `❌ Erro ao calcular limites para o setor: ${projectSector}`);
                window.showValidationErrorInResults();
                return;
            }

            const priority = window.getFatorPrograma(projectSector, municipalityInfo);
            if (!priority) {
                window.showAlert('danger', `❌ Erro ao determinar Fator de Programa para o setor: ${projectSector}`);
                window.showValidationErrorInResults();
                return;
            }
            
            const fp = this.priorityFactors[priority];
            const tfdRate = await this.calculateTFD(fp);
            
            const fdcoAmount = limits.fdcoAmount;
            const fdcoPercentage = totalInvestment > 0 ? (fdcoAmount / totalInvestment) * 100 : 0;
            const ownResourcesAmount = totalInvestment - fdcoAmount;

            const semestralRate = tfdRate / 100 / 2;
            const amortizationPeriods = (loanTerm - gracePeriod) * 2;
            let sacAmortization = 0;
            let firstPayment = 0;

            if (amortizationPeriods > 0 && fdcoAmount > 0) {
                sacAmortization = fdcoAmount / amortizationPeriods;
                const initialInterest = fdcoAmount * semestralRate;
                firstPayment = sacAmortization + initialInterest;
            }

            const schedule = this.generateSACSchedule(fdcoAmount, semestralRate, loanTerm, gracePeriod);

            const results = {
                fdcoAmount,
                tfdRate,
                fp,
                priority,
                fdcoPercentage,
                ownResourcesAmount,
                sacAmortization,
                firstPayment,
                schedule,
                limits,
                municipalityInfo,
                needsCondelApproval: limits.needsCondelApproval
            };

            window.updateResults(results);
            window.displaySACSchedule(results.schedule);
            window.showApprovalStatus(results.needsCondelApproval, results.fdcoAmount, results.tfdRate);
            
            const placeholder = document.getElementById('resultsPlaceholder');
            if (placeholder) placeholder.style.display = 'none';
            
            document.getElementById('simulationResults').style.display = 'block';
            
            setTimeout(() => {
                const resultsSection = document.querySelector('.results-panel-fullwidth');
                if (resultsSection) {
                    resultsSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }, 100);

        } catch (error) {
            console.error('Erro no cálculo:', error);
            window.showAlert('danger', `❌ Erro no cálculo: ${error.message}`);
            window.showValidationErrorInResults();
        }
    }
}

// Instância global
const calculatorService = new CalculatorService();

// Funções globais para compatibilidade
window.calculateFAM = () => calculatorService.calculateFAM();
window.calculateTFD = async (fp) => await calculatorService.calculateTFD(fp);
window.calculateLimits = (totalInvestment, projectSector, state, municipality, ownResourcesPerc, fixedInvestment) => 
    calculatorService.calculateLimits(totalInvestment, projectSector, state, municipality, ownResourcesPerc, fixedInvestment);
window.generateSACSchedule = (principal, semestralRate, totalYears, gracePeriod) => 
    calculatorService.generateSACSchedule(principal, semestralRate, totalYears, gracePeriod);
// Função calculateResults global direta como no original
function calculateResults() {
    // Primeiro, sempre revalidar tudo para limpar estados antigos
    window.triggerValidations();
    
    // Dar um pequeno delay para as validações processarem
    setTimeout(() => {
        // Verificar se há erros de validação visíveis
        const totalInvestmentGroup = document.getElementById('totalInvestment').closest('.form-group');
        if (totalInvestmentGroup && totalInvestmentGroup.classList.contains('error')) {
            window.showValidationErrorInResults();
            return;
        }
        
        // Segunda validação: verificar se pode calcular (backup)
        const validation = window.canCalculate();
        if (!validation.canProceed) {
            window.showAlert('danger', validation.message);
            window.showValidationErrorInResults();
            return;
        }
        
        // Usar o calculatorService para fazer o cálculo
        calculatorService.calculateResults();
    }, 100);
}

// Disponibilizar globalmente  
window.calculateResults = calculateResults;