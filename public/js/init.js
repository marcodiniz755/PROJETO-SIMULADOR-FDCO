// Arquivo de inicialização - Define funções globais básicas imediatamente

// Funções globais básicas para compatibilidade
window.toggleParameters = window.toggleParameters || function() {
    const content = document.getElementById('parametersContent');
    const toggle = document.getElementById('parametersToggle');
    
    if (content && toggle) {
        if (content.classList.contains('expanded')) {
            content.classList.remove('expanded');
            toggle.classList.remove('expanded');
        } else {
            content.classList.add('expanded');
            toggle.classList.add('expanded');
        }
    }
};

window.calculateResults = window.calculateResults || function() {
    console.log('🧮 Iniciando cálculo...');
    
    // Verificar se o calculatorService existe
    if (typeof calculatorService !== 'undefined') {
        calculatorService.calculateResults();
    } else {
        console.warn('CalculatorService não disponível ainda');
        // Tentar novamente após um delay
        setTimeout(() => {
            if (typeof calculatorService !== 'undefined') {
                calculatorService.calculateResults();
            } else {
                console.error('CalculatorService não pôde ser carregado');
            }
        }, 500);
    }
};

window.showMunicipalityStats = window.showMunicipalityStats || function() {
    console.log('📈 Mostrando estatísticas...');
    
    // Verificar se o formComponent existe
    if (typeof formComponent !== 'undefined' && formComponent.showMunicipalityStats) {
        formComponent.showMunicipalityStats();
    } else {
        console.warn('FormComponent não disponível ainda');
        // Tentar novamente após um delay
        setTimeout(() => {
            if (typeof formComponent !== 'undefined' && formComponent.showMunicipalityStats) {
                formComponent.showMunicipalityStats();
            } else {
                console.error('FormComponent não pôde ser carregado');
            }
        }, 500);
    }
};

window.clearForm = window.clearForm || function() {
    console.log('🗑️ Limpando formulário...');
    
    // Verificar se o formComponent existe
    if (typeof formComponent !== 'undefined' && formComponent.clear) {
        formComponent.clear();
    } else {
        console.warn('FormComponent não disponível ainda');
        // Limpar manualmente como backup
        const form = document.getElementById('simulatorForm');
        if (form) {
            form.reset();
        }
    }
};

// Função de debug para verificar estado
window.debugSimulator = function() {
    console.log('🛠️ Estado do simulador:');
    console.log('- parametersComponent:', typeof parametersComponent);
    console.log('- formComponent:', typeof formComponent);
    console.log('- calculatorService:', typeof calculatorService);
    console.log('- validatorService:', typeof validatorService);
    console.log('- apiService:', typeof apiService);
    
    // Verificar elementos DOM
    console.log('- parametersContent:', document.getElementById('parametersContent') ? 'OK' : 'MISSING');
    console.log('- parametersToggle:', document.getElementById('parametersToggle') ? 'OK' : 'MISSING');
};

console.log('✅ Funções globais básicas carregadas');