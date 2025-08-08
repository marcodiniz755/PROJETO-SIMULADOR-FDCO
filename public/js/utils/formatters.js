// Utilitários de formatação

class FormatterService {
    // Função formatCurrency para exibição
    formatCurrency(value) {
        if (!value || value === 0) return '0,00';
        return new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }

    // Sistema de formatação de moeda para inputs
    formatCurrencyInput(digits) {
        if (!digits || digits === '0' || digits === '00') return '';
        
        digits = digits.toString().replace(/\D/g, '');
        if (!digits) return '';
        
        while (digits.length < 3) {
            digits = '0' + digits;
        }
        
        let centavos = digits.slice(-2);
        let reais = digits.slice(0, -2);
        
        if (!reais || reais === '0') {
            reais = '0';
        } else {
            reais = reais.replace(/^0+/, '') || '0';
            reais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
        
        return reais + ',' + centavos;
    }

    parseCurrency(value) {
        if (!value) return 0;
        
        let digits = value.toString().replace(/\D/g, '');
        if (!digits) return 0;
        
        return parseInt(digits, 10) / 100;
    }

    parseInputValue(inputValue) {
        if (!inputValue) return 0;
        let digits = inputValue.replace(/\D/g, '');
        if (!digits) return 0;
        
        while (digits.length < 3) {
            digits = '0' + digits;
        }
        
        return parseInt(digits, 10) / 100;
    }

    // Formatação de percentual
    formatPercentage(value, decimals = 2) {
        if (!value && value !== 0) return '0%';
        return `${value.toFixed(decimals)}%`;
    }

    // Formatação de data
    formatDate(date) {
        if (!date) return '';
        return new Date(date).toLocaleDateString('pt-BR');
    }

    // Formatação de números gerais
    formatNumber(value, decimals = 2) {
        if (!value && value !== 0) return '0';
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value);
    }

    // Configurar entrada de moeda
    setupCurrencyInput(inputElement) {
        let isUpdating = false;
        
        inputElement.addEventListener('input', (e) => {
            if (isUpdating) return;
            
            isUpdating = true;
            
            let digits = e.target.value.replace(/\D/g, '');
            
            if (digits.length > 12) {
                digits = digits.substring(0, 12);
            }
            
            if (digits) {
                e.target.value = this.formatCurrencyInput(digits);
            } else {
                e.target.value = '';
            }
            
            isUpdating = false;
            
            setTimeout(() => {
                if (window.triggerValidations) {
                    window.triggerValidations();
                }
            }, 10);
        });
        
        inputElement.addEventListener('keydown', (e) => {
            if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true) ||
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
        
        inputElement.addEventListener('focus', () => {
            if (inputElement.value === '0,00') {
                inputElement.value = '';
            }
        });
        
        inputElement.addEventListener('blur', () => {
            if (!inputElement.value || inputElement.value.replace(/\D/g, '') === '') {
                inputElement.value = '0,00';
            }
        });
    }

    // Configurar entrada de percentual
    setupPercentageInput(inputElement, min = 0, max = 100) {
        inputElement.addEventListener('input', (e) => {
            let value = parseFloat(e.target.value) || 0;
            
            if (value < min) value = min;
            if (value > max) value = max;
            
            e.target.value = value;
            
            setTimeout(() => {
                if (window.triggerValidations) {
                    window.triggerValidations();
                }
            }, 10);
        });
    }

    // Configurar entrada de número
    setupNumberInput(inputElement, min = 0, max = null) {
        inputElement.addEventListener('input', (e) => {
            let value = parseFloat(e.target.value) || 0;
            
            if (value < min) value = min;
            if (max !== null && value > max) value = max;
            
            e.target.value = value;
        });
    }

    // Validar entrada numérica
    validateNumericInput(value, min = 0, max = null) {
        const numValue = parseFloat(value) || 0;
        
        if (numValue < min) return min;
        if (max !== null && numValue > max) return max;
        
        return numValue;
    }

    // Mascaras de entrada
    applyMask(value, mask) {
        if (!value || !mask) return value;
        
        const cleanValue = value.replace(/\D/g, '');
        let maskedValue = '';
        let maskIndex = 0;
        let valueIndex = 0;
        
        while (maskIndex < mask.length && valueIndex < cleanValue.length) {
            if (mask[maskIndex] === '#') {
                maskedValue += cleanValue[valueIndex];
                valueIndex++;
            } else {
                maskedValue += mask[maskIndex];
            }
            maskIndex++;
        }
        
        return maskedValue;
    }

    // Remover máscara
    removeMask(value) {
        if (!value) return '';
        return value.replace(/\D/g, '');
    }

    // Formatação para exibição em tabelas
    formatTableCurrency(value) {
        if (!value && value !== 0) return '-';
        return this.formatCurrency(value);
    }

    formatTableNumber(value, decimals = 2) {
        if (!value && value !== 0) return '-';
        return this.formatNumber(value, decimals);
    }

    formatTablePercentage(value, decimals = 2) {
        if (!value && value !== 0) return '-';
        return this.formatPercentage(value, decimals);
    }

    // Truncar texto
    truncateText(text, maxLength) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    // Capitalizar primeira letra
    capitalize(text) {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    // Converter para título
    toTitleCase(text) {
        if (!text) return '';
        return text.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    }
}

// Instância global
const formatterService = new FormatterService();

// Funções globais para compatibilidade
window.formatCurrency = (value) => formatterService.formatCurrency(value);
window.formatCurrencyInput = (digits) => formatterService.formatCurrencyInput(digits);
window.parseCurrency = (value) => formatterService.parseCurrency(value);
// Função parseInputValue global direta
function parseInputValue(inputValue) {
    return formatterService.parseInputValue(inputValue);
}

window.parseInputValue = parseInputValue;
window.setupCurrencyInput = (inputElement) => formatterService.setupCurrencyInput(inputElement);
window.formatPercentage = (value, decimals) => formatterService.formatPercentage(value, decimals);
window.formatNumber = (value, decimals) => formatterService.formatNumber(value, decimals);

// Inicializar formatadores quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Configurar inputs de moeda
    const currencyInputs = document.querySelectorAll('input[data-type="currency"]');
    currencyInputs.forEach(input => {
        formatterService.setupCurrencyInput(input);
    });

    // Configurar inputs de percentual
    const percentageInputs = document.querySelectorAll('input[data-type="percentage"]');
    percentageInputs.forEach(input => {
        const min = parseFloat(input.dataset.min) || 0;
        const max = parseFloat(input.dataset.max) || 100;
        formatterService.setupPercentageInput(input, min, max);
    });

    // Configurar inputs numéricos
    const numberInputs = document.querySelectorAll('input[data-type="number"]');
    numberInputs.forEach(input => {
        const min = parseFloat(input.dataset.min) || 0;
        const max = input.dataset.max ? parseFloat(input.dataset.max) : null;
        formatterService.setupNumberInput(input, min, max);
    });
});