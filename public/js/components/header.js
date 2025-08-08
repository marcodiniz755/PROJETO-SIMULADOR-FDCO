// Componente Header

class HeaderComponent {
    constructor() {
        this.currentDate = new Date().toLocaleDateString('pt-BR');
        this.version = '2.1.2';
    }

    render() {
        const header = document.getElementById('header-component');
        
        header.innerHTML = `
            <header class="header" style="min-height: 200px; display: flex; align-items: center; padding: 20px; gap: 30px;">
                <div class="header-logo" style="flex: 0 0 auto; max-width: 400px;">
                    <img src="logo_sudeco_final.jpg" alt="Logo SUDECO" 
                         style="max-width: 100%; max-height: 160px; width: auto; height: auto; object-fit: contain;"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <svg width="380" height="162" viewBox="0 0 950 300" style="display: none;">
                        <!-- Logo SUDECO oficial como fallback -->
                        <rect x="50" y="50" width="140" height="90" rx="20" fill="#00B04F" />
                        <rect x="210" y="50" width="140" height="90" rx="20" fill="#FFD500" />
                        <rect x="50" y="160" width="140" height="90" rx="20" fill="#003F7F" />
                        <rect x="170" y="120" width="60" height="60" rx="8" fill="#E30613" />
                        <text x="240" y="190" font-family="Arial Black, Arial, sans-serif" font-size="56" font-weight="900" fill="#4A4A4A" text-anchor="left">SUDECO</text>
                        <text x="50" y="270" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#666" text-anchor="left">SUPERINTENDÊNCIA DO DESENVOLVIMENTO DO CENTRO-OESTE</text>
                    </svg>
                </div>
                <div class="header-content" style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding-right: 10%;">
                    <h1 style="margin: 0; font-size: 2.5rem; color: #2c3e50; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);"><span class="icon-fallback">🏛️</span> Simulador FDCO</h1>
                    <p style="margin: 10px 0; font-size: 1.3rem; color: #34495e; font-weight: 500;">Fundo de Desenvolvimento do Centro-Oeste</p>
                    <div style="margin-top: 15px; padding: 10px 16px; background: #e7f3ff; border-radius: 8px; font-size: 0.95rem; color: #1976d2; border: 1px solid #bbdefb;">
                        Data: <span id="current-date">${this.currentDate}</span> | Versão: ${this.version}
                    </div>
                </div>
            </header>
        `;

        this.updateDate();
    }

    updateDate() {
        const dateElement = document.getElementById('current-date');
        if (dateElement) {
            dateElement.textContent = new Date().toLocaleDateString('pt-BR');
        }
    }

    setVersion(newVersion) {
        this.version = newVersion;
        this.render();
    }

    // Métodos para interação com outros componentes
    showUpdateIndicator() {
        const headerContent = document.querySelector('.header-content');
        
        // Remove indicador anterior se existir
        const existingIndicator = headerContent.querySelector('.update-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }

        const indicator = document.createElement('div');
        indicator.className = 'update-indicator';
        indicator.style.cssText = `
            margin-top: 10px;
            padding: 8px 12px;
            background: #fff3cd;
            border-radius: 6px;
            font-size: 0.8rem;
            color: #856404;
            border-left: 4px solid #ffc107;
        `;
        indicator.innerHTML = '🔄 Atualizando taxas...';
        
        headerContent.appendChild(indicator);
    }

    hideUpdateIndicator() {
        const indicator = document.querySelector('.update-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    showSuccessIndicator(message) {
        const headerContent = document.querySelector('.header-content');
        
        // Remove indicador anterior se existir
        const existingIndicator = headerContent.querySelector('.update-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }

        const indicator = document.createElement('div');
        indicator.className = 'update-indicator';
        indicator.style.cssText = `
            margin-top: 10px;
            padding: 8px 12px;
            background: #d4edda;
            border-radius: 6px;
            font-size: 0.8rem;
            color: #155724;
            border-left: 4px solid #28a745;
        `;
        indicator.innerHTML = `✅ ${message}`;
        
        headerContent.appendChild(indicator);

        // Auto-remove após 5 segundos
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 5000);
    }

    showErrorIndicator(message) {
        const headerContent = document.querySelector('.header-content');
        
        // Remove indicador anterior se existir
        const existingIndicator = headerContent.querySelector('.update-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }

        const indicator = document.createElement('div');
        indicator.className = 'update-indicator';
        indicator.style.cssText = `
            margin-top: 10px;
            padding: 8px 12px;
            background: #f8d7da;
            border-radius: 6px;
            font-size: 0.8rem;
            color: #721c24;
            border-left: 4px solid #dc3545;
        `;
        indicator.innerHTML = `❌ ${message}`;
        
        headerContent.appendChild(indicator);

        // Auto-remove após 7 segundos
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 7000);
    }
}

// Instância global
const headerComponent = new HeaderComponent();

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    headerComponent.render();
});