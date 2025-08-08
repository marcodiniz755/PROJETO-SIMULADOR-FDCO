// Aplicação Principal - Coordenador de todos os componentes

class SimuladorFDCO {
    constructor() {
        this.version = '2.1.2';
        this.isInitialized = false;
    }

    async init() {
        try {
            console.log(`🚀 Iniciando Simulador FDCO v${this.version}`);
            
            // Aguardar carregamento do DOM
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Inicializar componentes
            this.initializeComponents();
            
            // Configurar handlers globais
            this.setupGlobalHandlers();
            
            // Configurar atualizações automáticas
            this.setupAutoUpdates();
            
            this.isInitialized = true;
            console.log('✅ Simulador FDCO inicializado com sucesso');
            
            // Exibir mensagem de boas-vindas
            this.showWelcomeMessage();
            
        } catch (error) {
            console.error('❌ Erro ao inicializar simulador:', error);
            this.showErrorMessage('Erro ao inicializar aplicação');
        }
    }

    initializeComponents() {
        // Os componentes já são inicializados via DOMContentLoaded
        // Aqui fazemos apenas a coordenação
        console.log('📦 Componentes carregados');
    }

    setupGlobalHandlers() {
        // Handler para erros globais
        window.addEventListener('error', (event) => {
            console.error('Erro global capturado:', event.error);
            this.showErrorMessage('Ocorreu um erro inesperado');
        });

        // Handler para promessas rejeitadas
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Promise rejeitada:', event.reason);
            this.showErrorMessage('Erro de comunicação');
        });

        // Handler para mudanças de conectividade
        window.addEventListener('online', () => {
            this.showSuccessMessage('Conexão restabelecida');
        });

        window.addEventListener('offline', () => {
            this.showWarningMessage('Sem conexão com a internet');
        });

        // Atalhos de teclado
        document.addEventListener('keydown', (event) => {
            this.handleKeyboardShortcuts(event);
        });
    }

    setupAutoUpdates() {
        // Atualizar data a cada minuto
        setInterval(() => {
            if (headerComponent) {
                headerComponent.updateDate();
            }
        }, 60000);

        // Auto-save de parâmetros no localStorage
        this.setupAutoSave();
    }

    setupAutoSave() {
        const inputs = ['totalInvestment', 'fixedInvestment', 'ownResources', 'gracePeriod'];
        const selects = ['state', 'municipality', 'projectSector', 'loanTerm'];
        
        [...inputs, ...selects].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => {
                    this.saveFormState();
                });
            }
        });

        // Restaurar estado ao carregar
        this.restoreFormState();
    }

    saveFormState() {
        const state = {
            totalInvestment: document.getElementById('totalInvestment')?.value || '',
            fixedInvestment: document.getElementById('fixedInvestment')?.value || '',
            ownResources: document.getElementById('ownResources')?.value || '20',
            gracePeriod: document.getElementById('gracePeriod')?.value || '0',
            state: document.getElementById('state')?.value || '',
            municipality: document.getElementById('municipality')?.value || '',
            projectSector: document.getElementById('projectSector')?.value || '',
            loanTerm: document.getElementById('loanTerm')?.value || '',
            timestamp: Date.now()
        };

        try {
            localStorage.setItem('simuladorFDCO_formState', JSON.stringify(state));
        } catch (error) {
            console.warn('Não foi possível salvar estado do formulário:', error);
        }
    }

    restoreFormState() {
        try {
            const savedState = localStorage.getItem('simuladorFDCO_formState');
            if (!savedState) return;

            const state = JSON.parse(savedState);
            
            // Verificar se o estado não é muito antigo (24 horas)
            if (Date.now() - state.timestamp > 24 * 60 * 60 * 1000) {
                localStorage.removeItem('simuladorFDCO_formState');
                return;
            }

            // Restaurar valores (aguardar inicialização dos componentes)
            setTimeout(() => {
                Object.entries(state).forEach(([key, value]) => {
                    if (key === 'timestamp') return;
                    
                    const element = document.getElementById(key);
                    if (element && value) {
                        element.value = value;
                        
                        // Disparar evento de mudança para atualizar dependências
                        if (key === 'state') {
                            formComponent.updateMunicipalities();
                        } else if (key === 'projectSector') {
                            formComponent.updateLoanTermOptions();
                        }
                    }
                });

                // Disparar validações após restaurar
                setTimeout(() => {
                    if (validatorService) {
                        validatorService.triggerValidations();
                    }
                }, 100);
            }, 500);

        } catch (error) {
            console.warn('Erro ao restaurar estado do formulário:', error);
            localStorage.removeItem('simuladorFDCO_formState');
        }
    }

    handleKeyboardShortcuts(event) {
        // Ctrl/Cmd + Enter: Calcular
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            if (calculatorService) {
                calculatorService.calculateResults();
            }
        }

        // Ctrl/Cmd + R: Limpar formulário (prevenir reload padrão)
        if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
            event.preventDefault();
            if (formComponent) {
                formComponent.clear();
            }
        }

        // F5: Atualizar taxas
        if (event.key === 'F5') {
            event.preventDefault();
            if (apiService) {
                apiService.updateAllRates();
            }
        }

        // Escape: Fechar modais
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal-overlay');
            modals.forEach(modal => modal.remove());
        }
    }

    // Métodos de notificação
    showSuccessMessage(message) {
        this.showNotification(message, 'success');
    }

    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    showWarningMessage(message) {
        this.showNotification(message, 'warning');
    }

    showInfoMessage(message) {
        this.showNotification(message, 'info');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.2em;">${icons[type]}</span>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Remover após tempo
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, type === 'error' ? 7000 : 4000);
    }

    showWelcomeMessage() {
        // Mostrar apenas na primeira visita ou após atualizações
        const lastVersion = localStorage.getItem('simuladorFDCO_lastVersion');
        
        if (lastVersion !== this.version) {
            setTimeout(() => {
                this.showInfoMessage(`Bem-vindo ao Simulador FDCO v${this.version}! Use Ctrl+Enter para calcular rapidamente.`);
                localStorage.setItem('simuladorFDCO_lastVersion', this.version);
            }, 1000);
        }
    }

    // Métodos utilitários públicos
    getVersion() {
        return this.version;
    }

    isReady() {
        return this.isInitialized;
    }

    resetApplication() {
        // Limpar localStorage
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('simuladorFDCO_')) {
                localStorage.removeItem(key);
            }
        });

        // Limpar formulário
        if (formComponent) {
            formComponent.clear();
        }

        // Recolher parâmetros
        if (parametersComponent) {
            parametersComponent.collapse();
        }

        this.showSuccessMessage('Aplicação resetada com sucesso');
    }

    // Debug e diagnóstico
    getSystemInfo() {
        return {
            version: this.version,
            userAgent: navigator.userAgent,
            isOnline: navigator.onLine,
            screenResolution: `${screen.width}x${screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`,
            timestamp: new Date().toISOString(),
            localStorage: {
                available: typeof(Storage) !== "undefined",
                usage: this.getLocalStorageUsage()
            },
            components: {
                apiService: typeof apiService !== 'undefined',
                calculatorService: typeof calculatorService !== 'undefined',
                formatterService: typeof formatterService !== 'undefined',
                validatorService: typeof validatorService !== 'undefined',
                headerComponent: typeof headerComponent !== 'undefined',
                parametersComponent: typeof parametersComponent !== 'undefined',
                formComponent: typeof formComponent !== 'undefined',
                resultsComponent: typeof resultsComponent !== 'undefined'
            }
        };
    }

    getLocalStorageUsage() {
        try {
            let total = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    total += localStorage[key].length;
                }
            }
            return `${(total / 1024).toFixed(2)} KB`;
        } catch (error) {
            return 'Não disponível';
        }
    }

    // Método para exportar configuração
    exportConfiguration() {
        const config = {
            version: this.version,
            parameters: apiService ? apiService.getTfdParameters() : null,
            formState: this.getCurrentFormState(),
            timestamp: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = `simulador_fdco_config_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showSuccessMessage('Configuração exportada com sucesso');
    }

    getCurrentFormState() {
        return {
            totalInvestment: document.getElementById('totalInvestment')?.value || '',
            fixedInvestment: document.getElementById('fixedInvestment')?.value || '',
            ownResources: document.getElementById('ownResources')?.value || '',
            gracePeriod: document.getElementById('gracePeriod')?.value || '',
            state: document.getElementById('state')?.value || '',
            municipality: document.getElementById('municipality')?.value || '',
            projectSector: document.getElementById('projectSector')?.value || '',
            loanTerm: document.getElementById('loanTerm')?.value || ''
        };
    }
}

// Instância global da aplicação
const simuladorApp = new SimuladorFDCO();

// Função showAlert global direta
function showAlert(type, message) {
    const methods = {
        'success': 'showSuccessMessage',
        'error': 'showErrorMessage',
        'warning': 'showWarningMessage',
        'info': 'showInfoMessage',
        'danger': 'showErrorMessage'
    };
    
    const method = methods[type] || 'showInfoMessage';
    simuladorApp[method](message);
}

// Funções globais para compatibilidade e console
window.showAlert = showAlert;

// Funcionalidades para desenvolvedores (apenas em desenvolvimento)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.simuladorDebug = {
        getSystemInfo: () => simuladorApp.getSystemInfo(),
        resetApp: () => simuladorApp.resetApplication(),
        exportConfig: () => simuladorApp.exportConfiguration(),
        showTestNotification: (type = 'info') => simuladorApp.showNotification('Teste de notificação', type)
    };
    
    console.log('🛠️ Modo de desenvolvimento ativo. Use window.simuladorDebug para ferramentas de debug.');
}

// Inicializar aplicação
simuladorApp.init();

// Export para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimuladorFDCO;
}