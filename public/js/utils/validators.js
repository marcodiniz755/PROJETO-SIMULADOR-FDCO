// Utilitários de validação

class ValidatorService {
    constructor() {
        this.municipiosPrioritariosAltaRenda = [
            "ANÁPOLIS", "GOIÁS", "JATAÍ", "FORMOSA", "ITUMBIARA", "CALDAS NOVAS", "CATALÃO", "MINEIROS",
            "QUIRINÓPOLIS", "SENADOR CANEDO", "LUZIÂNIA", "VALPARAÍSO DE GOIÁS", "NOVO GAMA", "ÁGUAS LINDAS DE GOIÁS",
            "BRASÍLIA", "VÁRZEA GRANDE", "RONDONÓPOLIS", "CUIABÁ", "SINOP", "TANGARÁ DA SERRA", "CÁCERES",
            "BARRA DO GARÇAS", "PRIMAVERA DO LESTE", "ALTA FLORESTA", "SORRISO", "LUCAS DO RIO VERDE",
            "CAMPO GRANDE", "DOURADOS", "TRÊS LAGOAS", "CORUMBÁ", "PONTA PORÃ", "AQUIDAUANA", "NAVIRAÍ"
        ];
    }

    // Função para validar se pode calcular
    canCalculate() {
        const totalInvestment = window.parseInputValue(document.getElementById('totalInvestment').value) || 0;
        const state = document.getElementById('state').value;
        const municipality = document.getElementById('municipality').value;
        const projectSector = document.getElementById('projectSector').value;
        
        if (!state || !municipality || !projectSector || !totalInvestment) {
            return { canProceed: false, message: '⚠️ Por favor, preencha todos os campos obrigatórios.' };
        }
        
        const municipalityInfo = window.getMunicipalityInfo(state, municipality);
        if (!municipalityInfo) {
            return { canProceed: false, message: `❌ Município "${municipality}" não encontrado no estado ${state}.` };
        }
        
        const isPrioritaria = municipalityInfo.prioridade_espacial === 'PRIORITÁRIA';
        const isHealthSector = projectSector === 'servicos_hospitalares_II';
        const isPrioritariaAltaRenda = isPrioritaria && this.municipiosPrioritariosAltaRenda.includes(municipality.toUpperCase());
        
        let minimoInvestimento;
        let justificativa;
        
        if (isHealthSector) {
            minimoInvestimento = 15000000;
            justificativa = 'Serviços Hospitalares (exceção para qualquer tipologia)';
        } else if (isPrioritariaAltaRenda) {
            minimoInvestimento = 20000000;
            justificativa = 'Município PRIORITÁRIO de Alta Renda';
        } else if (isPrioritaria) {
            minimoInvestimento = 15000000;
            justificativa = 'Município PRIORITÁRIO (Baixa/Média Renda)';
        } else {
            minimoInvestimento = 20000000;
            justificativa = 'Município DEMAIS';
        }
        
        if (totalInvestment < minimoInvestimento) {
            const valorMinimo = window.formatCurrency(minimoInvestimento);
            const valorAtual = window.formatCurrency(totalInvestment);
            return { 
                canProceed: false, 
                message: `❌ Valor insuficiente! Mínimo: ${valorMinimo} (${justificativa}). Atual: ${valorAtual}`
            };
        }
        
        return { canProceed: true, message: '' };
    }

    // Validar recursos próprios mínimos
    validateOwnResources() {
        const ownResourcesPerc = parseFloat(document.getElementById('ownResources').value) || 20;
        const totalInvestment = window.parseInputValue(document.getElementById('totalInvestment').value) || 0;
        const fixedInvestment = window.parseInputValue(document.getElementById('fixedInvestment').value) || 0;
        const state = document.getElementById('state').value;
        const municipality = document.getElementById('municipality').value;
        const projectSector = document.getElementById('projectSector').value;
        const hintElement = document.getElementById('ownResourcesHint');
        
        if (!hintElement) return;
        
        if (ownResourcesPerc < 20) {
            hintElement.innerHTML = '❌ <strong>Mínimo 20%</strong> do investimento total';
            hintElement.style.color = '#e74c3c';
            return;
        }
        
        if (!totalInvestment) {
            hintElement.innerHTML = '💡 <strong>Mínimo 20%</strong> do investimento total';
            hintElement.style.color = '#7f8c8d';
            return;
        }
        
        const ownResourcesAmount = totalInvestment * (ownResourcesPerc / 100);
        
        if (state && municipality && projectSector && fixedInvestment) {
            const limits = window.calculateLimits(totalInvestment, projectSector, state, municipality, ownResourcesPerc, fixedInvestment);
            
            if (limits) {
                const fdcoAvailable = limits.fdcoAmount;
                const totalUpdatedInvestment = ownResourcesAmount + fdcoAvailable;
                const needsApproval = fdcoAvailable > 50000000; // standardLimit
                
                hintElement.innerHTML = `✅ <strong>${ownResourcesPerc}%</strong> = ${window.formatCurrency(ownResourcesAmount)}<br>💰 <strong>FDCO disponível:</strong> ${window.formatCurrency(fdcoAvailable)}<br>📊 <strong>Valor Total Atualizado do Investimento = Recursos Próprios e Terceiros + FDCO disponível =</strong> ${window.formatCurrency(ownResourcesAmount)} + ${window.formatCurrency(fdcoAvailable)} = ${window.formatCurrency(totalUpdatedInvestment)}`;
                hintElement.style.color = needsApproval ? '#856404' : '#27ae60';
            } else {
                hintElement.innerHTML = `✅ <strong>${ownResourcesPerc}%</strong> = ${window.formatCurrency(ownResourcesAmount)}`;
                hintElement.style.color = '#27ae60';
            }
        } else {
            hintElement.innerHTML = `✅ <strong>${ownResourcesPerc}%</strong> = ${window.formatCurrency(ownResourcesAmount)}`;
            hintElement.style.color = '#27ae60';
        }
    }

    // Validar investimento total mínimo
    validateMinimumTotalInvestment() {
        const totalInvestment = window.parseInputValue(document.getElementById('totalInvestment').value) || 0;
        const state = document.getElementById('state').value;
        const municipality = document.getElementById('municipality').value;
        const projectSector = document.getElementById('projectSector').value;
        const hintElement = document.getElementById('totalInvestmentHint');
        
        if (!hintElement) return;
        
        const formGroup = document.getElementById('totalInvestment').closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error', 'success');
        }
        
        if (!state || !municipality || !projectSector) {
            hintElement.innerHTML = '💡 <strong>Valor mínimo:</strong> R$ 15-20 milhões conforme município e setor';
            hintElement.style.color = '#7f8c8d';
            return;
        }
        
        const municipalityInfo = window.getMunicipalityInfo(state, municipality);
        const isPrioritaria = municipalityInfo?.prioridade_espacial === 'PRIORITÁRIA';
        const isHealthSector = projectSector === 'servicos_hospitalares_II';
        const isPrioritariaAltaRenda = isPrioritaria && this.municipiosPrioritariosAltaRenda.includes(municipality.toUpperCase());
        
        let minimoInvestimento;
        let justificativa;
        
        if (isHealthSector) {
            minimoInvestimento = 15000000;
            justificativa = 'Serviços Hospitalares (exceção para qualquer tipologia)';
        } else if (isPrioritariaAltaRenda) {
            minimoInvestimento = 20000000;
            justificativa = 'Município PRIORITÁRIO de Alta Renda';
        } else if (isPrioritaria) {
            minimoInvestimento = 15000000;
            justificativa = 'Município PRIORITÁRIO (Baixa/Média Renda)';
        } else {
            minimoInvestimento = 20000000;
            justificativa = 'Município DEMAIS';
        }
        
        const observacao = (minimoInvestimento === 15000000) ? 
            `<br><br>📋 <strong>Observação:</strong> R$ 15 milhões aplicável para:<br>• Empreendimentos situados em municípios classificados pela tipologia da PNDR, como de baixa e média renda, independente do seu dinamismo;<br>• Investimentos em serviços hospitalares e ambulatoriais, independentemente da classificação da Tipologia do município definido pela PNDR` : '';
        
        const valorMinimo = window.formatCurrency(minimoInvestimento);
        
        if (!totalInvestment) {
            hintElement.innerHTML = `💡 <strong>Valor mínimo:</strong> ${valorMinimo} (${justificativa})${observacao}`;
            hintElement.style.color = '#0c5460';
            return;
        }
        
        if (totalInvestment < minimoInvestimento) {
            hintElement.innerHTML = `❌ <strong>Insuficiente!</strong> Mínimo: ${valorMinimo} (${justificativa})<br>Atual: ${window.formatCurrency(totalInvestment)}<br><br>📋 <strong>Base Legal:</strong> Resolução CONDEL/SUDECO 135 de 12 de dezembro de 2022, Art. 2º - ...valor mínimo dos projetos assistidos pelo FDCO em R$ 15.000.000,00 (quinze milhões de reais), para empreendimentos situados em municípios classificados pela tipologia da Política Nacional de Desenvolvimento Regional - PNDR como de baixa e média renda, independente do seu dinamismo e para investimentos em serviços hospitalares e ambulatoriais, independentemente da classificação da Tipologia do município definido pela PNDR, respeitados os limites de participação dos recursos do Fundo estabelecidos pelo Conselho Monetário Nacional (CMN).`;
            hintElement.style.color = '#721c24';
            
            if (formGroup) {
                formGroup.classList.add('error');
            }
            return;
        }
        
        hintElement.innerHTML = `✅ <strong>Adequado!</strong> Mínimo: ${valorMinimo} (${justificativa})<br>Atual: ${window.formatCurrency(totalInvestment)}${observacao}`;
        hintElement.style.color = '#155724';
        
        if (formGroup) {
            formGroup.classList.add('success');
        }
    }

    // Validar investimento fixo
    validateFixedInvestment() {
        const totalInvestment = window.parseInputValue(document.getElementById('totalInvestment').value) || 0;
        const fixedInvestment = window.parseInputValue(document.getElementById('fixedInvestment').value) || 0;
        const state = document.getElementById('state').value;
        const municipality = document.getElementById('municipality').value;
        const projectSector = document.getElementById('projectSector').value;
        const hintElement = document.getElementById('fixedInvestmentHint');
        
        if (!hintElement) return;
        
        if (!state || !municipality || !projectSector) {
            hintElement.innerHTML = '💡 Selecione todos os campos primeiro para ver os limites';
            hintElement.style.color = '#7f8c8d';
            return;
        }
        
        const municipalityInfo = window.getMunicipalityInfo(state, municipality);
        const location = municipalityInfo?.prioridade_espacial === 'PRIORITÁRIA' ? 'prioritaria' : 'demais';
        
        // Buscar limites setoriais do CalculatorService
        const sectorLimits = calculatorService.sectorLimits;
        const sectorLimitPerc = sectorLimits[projectSector] ? sectorLimits[projectSector][location] : null;
        
        if (!sectorLimitPerc) {
            hintElement.innerHTML = '⚠️ Setor não encontrado';
            hintElement.style.color = '#856404';
            return;
        }
        
        if (!fixedInvestment) {
            const regionName = location === 'prioritaria' ? 'PRIORITÁRIA' : 'DEMAIS';
            hintElement.innerHTML = `💡 <strong>Limite FDCO:</strong> 90% do investimento fixo (máx ${sectorLimitPerc}% do total e 80% financiável)<br>Região ${regionName}`;
            hintElement.style.color = '#856404';
            return;
        }
        
        const maxBySector = totalInvestment * (sectorLimitPerc / 100);
        const maxByFixedRule = fixedInvestment * 0.9;
        const maxByFinanciable = totalInvestment * 0.8;
        const fdcoLimit = Math.min(maxBySector, maxByFixedRule, maxByFinanciable);
        
        const regionName2 = location === 'prioritaria' ? 'PRIORITÁRIA' : 'DEMAIS';
        const needsApproval = fdcoLimit > 50000000; // standardLimit
        
        hintElement.innerHTML = `✅ <strong>Limite FDCO: ${window.formatCurrency(fdcoLimit)}</strong><br>• Setorial (${sectorLimitPerc}% do total): ${window.formatCurrency(maxBySector)}<br>• 90% do investimento fixo: ${window.formatCurrency(maxByFixedRule)}<br>• Limite padrão: ${window.formatCurrency(50000000)}<br>Região ${regionName2}`;
        hintElement.style.color = needsApproval ? '#856404' : '#155724';
    }

    // Validar campos obrigatórios
    validateRequiredFields() {
        const requiredFields = document.querySelectorAll('.form-group.required input, .form-group.required select');
        let allValid = true;
        
        requiredFields.forEach(field => {
            const formGroup = field.closest('.form-group');
            const value = field.value.trim();
            
            if (!value) {
                formGroup.classList.add('error');
                formGroup.classList.remove('success');
                allValid = false;
            } else {
                formGroup.classList.remove('error');
                formGroup.classList.add('success');
            }
        });
        
        return allValid;
    }

    // Validar email
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validar telefone
    validatePhone(phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        return cleanPhone.length >= 10 && cleanPhone.length <= 11;
    }

    // Validar CPF
    validateCPF(cpf) {
        const cleanCPF = cpf.replace(/\D/g, '');
        
        if (cleanCPF.length !== 11) return false;
        if (/^(\d)\1{10}$/.test(cleanCPF)) return false; // Números repetidos
        
        // Validação dos dígitos verificadores
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
        }
        let remainder = 11 - (sum % 11);
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
        
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
        }
        remainder = 11 - (sum % 11);
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cleanCPF.charAt(10))) return false;
        
        return true;
    }

    // Validar CNPJ
    validateCNPJ(cnpj) {
        const cleanCNPJ = cnpj.replace(/\D/g, '');
        
        if (cleanCNPJ.length !== 14) return false;
        if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false; // Números repetidos
        
        // Validação dos dígitos verificadores
        const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        
        let sum = 0;
        for (let i = 0; i < 12; i++) {
            sum += parseInt(cleanCNPJ.charAt(i)) * weights1[i];
        }
        let remainder = sum % 11;
        const digit1 = remainder < 2 ? 0 : 11 - remainder;
        if (digit1 !== parseInt(cleanCNPJ.charAt(12))) return false;
        
        sum = 0;
        for (let i = 0; i < 13; i++) {
            sum += parseInt(cleanCNPJ.charAt(i)) * weights2[i];
        }
        remainder = sum % 11;
        const digit2 = remainder < 2 ? 0 : 11 - remainder;
        if (digit2 !== parseInt(cleanCNPJ.charAt(13))) return false;
        
        return true;
    }

    // Validar intervalo de datas
    validateDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        return start <= end;
    }

    // Validar valor mínimo e máximo
    validateRange(value, min, max) {
        const numValue = parseFloat(value);
        
        if (isNaN(numValue)) return false;
        if (min !== null && numValue < min) return false;
        if (max !== null && numValue > max) return false;
        
        return true;
    }

    // Função principal para disparar todas as validações
    triggerValidations() {
        this.validateFixedInvestment();
        this.validateMinimumTotalInvestment();
        this.validateOwnResources();
    }

    // Mostrar erro de validação
    showValidationError(element, message) {
        const formGroup = element.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('error');
            
            let errorElement = formGroup.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            errorElement.textContent = message;
        }
    }

    // Limpar erro de validação
    clearValidationError(element) {
        const formGroup = element.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error');
            
            const errorElement = formGroup.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        }
    }

    // Rolar para o primeiro erro
    scrollToFirstError() {
        const firstError = document.querySelector('.form-group.error');
        if (firstError) {
            firstError.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            const input = firstError.querySelector('input, select');
            if (input) {
                setTimeout(() => input.focus(), 500);
            }
        }
    }
}

// Instância global
const validatorService = new ValidatorService();

// Funções globais para compatibilidade
// Função canCalculate global direta
function canCalculate() {
    return validatorService.canCalculate();
}

window.canCalculate = canCalculate;
window.validateOwnResources = () => validatorService.validateOwnResources();
window.validateMinimumTotalInvestment = () => validatorService.validateMinimumTotalInvestment();
window.validateFixedInvestment = () => validatorService.validateFixedInvestment();
// Função triggerValidations global direta
function triggerValidations() {
    validatorService.triggerValidations();
}

window.triggerValidations = triggerValidations;
window.scrollToFirstError = () => validatorService.scrollToFirstError();
window.showValidationErrorInResults = () => {
    const resultsDiv = document.getElementById('simulationResults');
    if (resultsDiv) {
        resultsDiv.style.display = 'none';
    }
    const placeholder = document.getElementById('resultsPlaceholder');
    if (placeholder) {
        placeholder.style.display = 'block';
    }
    validatorService.scrollToFirstError();
};