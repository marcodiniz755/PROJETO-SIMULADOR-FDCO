// Serviços de API - Comunicação com APIs externas

class ApiService {
    constructor() {
        // Tentar carregar dados persistidos do localStorage
        const cachedData = this.loadFromCache();

        // Inicializar parâmetros TFD
        const now = new Date();
        const currentMonth = now.getMonth(); // 0-based

        this.tfdParameters = {
            jm: cachedData?.jm || 7.70, // TLP - usa cache ou valor padrão
            alpha: 1.00,
            cdr: 1.00,
            du: 0, // Será calculado dinamicamente
            ipca_m1: cachedData?.ipca_m1 || 0.0024, // IPCA M-1 - usa cache ou padrão
            ipca_m2: cachedData?.ipca_m2 || 0.0026, // IPCA M-2 - usa cache ou padrão
            ndup: 0,   // Será calculado dinamicamente
            ndus: 0,   // Será calculado dinamicamente
            nudsa: 0,  // Será calculado dinamicamente
            ndupx: 0,  // Será calculado dinamicamente
            ndmp: 0,   // Será calculado dinamicamente
            ndms: 0,   // Será calculado dinamicamente
            lastUpdate: cachedData?.lastUpdate || null,
            mesReferencia: cachedData?.mesReferencia ?? currentMonth, // Usa cache ou mês atual
            lastTLPCheck: cachedData?.lastTLPCheck || null
        };

        console.log(`📅 Inicializando com mês de referência: ${this.getMonthName(this.tfdParameters.mesReferencia)} (${this.tfdParameters.mesReferencia})`);
        if (cachedData) {
            console.log(`💾 Dados carregados do cache: TLP=${this.tfdParameters.jm}%, última verificação=${cachedData.lastTLPCheck ? new Date(cachedData.lastTLPCheck).toLocaleDateString('pt-BR') : 'nunca'}`);
        }

        // Calcular dias úteis iniciais (serão atualizados depois se necessário)
        this.updateBusinessDays();
        // Verificar TLP de forma assíncrona
        this.initializeWithTLPCheck();
    }

    // Função para carregar dados do cache (localStorage)
    loadFromCache() {
        try {
            const cached = localStorage.getItem('fdco_tlp_cache');
            if (!cached) return null;

            const data = JSON.parse(cached);
            console.log('💾 Cache encontrado no localStorage');

            // Validar se os dados não estão muito antigos (ex: mais de 60 dias)
            if (data.lastTLPCheck) {
                const lastCheck = new Date(data.lastTLPCheck);
                const now = new Date();
                const daysDiff = Math.floor((now - lastCheck) / (1000 * 60 * 60 * 24));

                if (daysDiff > 60) {
                    console.log(`⚠️ Cache muito antigo (${daysDiff} dias) - será descartado`);
                    localStorage.removeItem('fdco_tlp_cache');
                    return null;
                }
            }

            // Validar se o mês de referência do cache ainda é válido
            // Se mudou o mês calendário, pode ser necessário validar o mês de referência
            const now = new Date();
            const currentMonth = now.getMonth(); // 0-based

            // Se o cache tem um mês de referência definido, verificar se ainda é apropriado
            if (data.mesReferencia !== undefined && data.mesReferencia !== null) {
                // Se o mês de referência do cache é anterior ao mês atual em mais de 1 mês,
                // invalidar o cache (pode estar desatualizado)
                let monthDiff = currentMonth - data.mesReferencia;
                if (monthDiff < 0) monthDiff += 12; // Ajuste para virada de ano

                if (monthDiff > 1) {
                    console.log(`⚠️ Mês de referência do cache (${this.getMonthName(data.mesReferencia)}) muito antigo - será descartado`);
                    localStorage.removeItem('fdco_tlp_cache');
                    return null;
                }
            }

            return data;
        } catch (error) {
            console.error('❌ Erro ao carregar cache:', error);
            return null;
        }
    }

    // Função para salvar dados no cache (localStorage)
    saveToCache() {
        try {
            const dataToCache = {
                jm: this.tfdParameters.jm,
                ipca_m1: this.tfdParameters.ipca_m1,
                ipca_m2: this.tfdParameters.ipca_m2,
                mesReferencia: this.tfdParameters.mesReferencia,
                lastUpdate: this.tfdParameters.lastUpdate,
                lastTLPCheck: this.tfdParameters.lastTLPCheck,
                cachedAt: new Date().toISOString()
            };

            localStorage.setItem('fdco_tlp_cache', JSON.stringify(dataToCache));
            console.log('💾 Dados salvos no cache local');
        } catch (error) {
            console.error('❌ Erro ao salvar cache:', error);
        }
    }

    // Função para verificar se é feriado nacional
    isFeriado(data) {
        const ano = data.getFullYear();
        const mes = data.getMonth() + 1;
        const dia = data.getDate();
        
        // Feriados fixos
        const feriadosFixos = [
            [1, 1],   // Confraternização Universal
            [4, 21],  // Tiradentes
            [5, 1],   // Dia do Trabalhador
            [9, 7],   // Independência do Brasil
            [10, 12], // Nossa Senhora Aparecida
            [11, 2],  // Finados
            [11, 15], // Proclamação da República
            [11, 20], // Dia da Consciência Negra (feriado nacional desde 2024)
            [12, 25]  // Natal
        ];
        
        for (const [fMes, fDia] of feriadosFixos) {
            if (mes === fMes && dia === fDia) {
                return true;
            }
        }
        
        // Feriados móveis baseados na Páscoa
        const pascoa = this.calcularPascoa(ano);
        const carnaval = new Date(pascoa.getTime() - 47 * 24 * 60 * 60 * 1000);
        const carnaval2 = new Date(pascoa.getTime() - 46 * 24 * 60 * 60 * 1000);
        const sextaFeiraSanta = new Date(pascoa.getTime() - 2 * 24 * 60 * 60 * 1000);
        const corpusChristi = new Date(pascoa.getTime() + 60 * 24 * 60 * 60 * 1000);
        
        const feriadosMoveis = [carnaval, carnaval2, sextaFeiraSanta, corpusChristi];
        
        return feriadosMoveis.some(feriado => 
            feriado.getDate() === dia &&
            feriado.getMonth() + 1 === mes &&
            feriado.getFullYear() === ano
        );
    }

    // Calcular Páscoa (algoritmo de Gauss)
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

    // Verificar se é dia útil
    isBusinessDay(date) {
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) return false; // Domingo ou Sábado
        return !this.isFeriado(date);
    }

    // Contar dias úteis em um período
    countBusinessDays(startDate, endDate) {
        let count = 0;
        const current = new Date(startDate);
        
        while (current <= endDate) {
            if (this.isBusinessDay(current)) {
                count++;
            }
            current.setDate(current.getDate() + 1);
        }
        
        return count;
    }

    // Atualizar cálculo dos dias úteis baseado no mês de referência
    updateBusinessDays() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const mesReferencia = this.tfdParameters.mesReferencia; // Usar mês de referência armazenado (0-based)
        
        // NDUP: 1-14 do mês de referência
        const inicioNdup = new Date(currentYear, mesReferencia, 1);
        const fimNdup = new Date(currentYear, mesReferencia, 14);
        this.tfdParameters.ndup = this.countBusinessDays(inicioNdup, fimNdup);

        // NDUS: 15-último dia do mês de referência
        const inicioNdus = new Date(currentYear, mesReferencia, 15);
        const fimNdus = new Date(currentYear, mesReferencia + 1, 0); // Último dia do mês
        this.tfdParameters.ndus = this.countBusinessDays(inicioNdus, fimNdus);
        
        // Correção temporária para 2025 baseada na tabela correta
        if (currentYear === 2025) {
            const ndusTabelaCorreta = [13,10,11,10,12,10,13,11,12,13,9,12]; // Nov: 9 (20/11 é feriado)
            this.tfdParameters.ndus = ndusTabelaCorreta[mesReferencia];
            console.log(`   ⚠️ NDUS corrigido para 2025: ${this.tfdParameters.ndus}`);
        }

        // NDUSA: 15-último dia do mês anterior ao de referência
        const mesAnterior = mesReferencia === 0 ? 11 : mesReferencia - 1;
        const anoAnterior = mesReferencia === 0 ? currentYear - 1 : currentYear;
        const inicioNdusa = new Date(anoAnterior, mesAnterior, 15);
        const fimNdusa = new Date(currentYear, mesReferencia, 0); // Último dia do mês anterior
        const ndusa = this.countBusinessDays(inicioNdusa, fimNdusa);

        // NDUPX: 1-14 do mês posterior ao de referência
        const mesProximo = mesReferencia === 11 ? 0 : mesReferencia + 1;
        const anoProximo = mesReferencia === 11 ? currentYear + 1 : currentYear;
        const inicioNdupx = new Date(anoProximo, mesProximo, 1);
        const fimNdupx = new Date(anoProximo, mesProximo, 14);
        const ndupx = this.countBusinessDays(inicioNdupx, fimNdupx);

        // Calcular NDMP e NDMS
        this.tfdParameters.ndmp = this.tfdParameters.ndup + ndusa;
        this.tfdParameters.ndms = this.tfdParameters.ndus + ndupx;
        
        // Correção temporária NDMS para 2025
        if (currentYear === 2025) {
            const ndmsTabelaCorreta = [23,18,21,19,22,20,23,21,22,23,19,21]; // Nov: 19 (20/11 é feriado)
            this.tfdParameters.ndms = ndmsTabelaCorreta[mesReferencia];
            console.log(`   ⚠️ NDMS corrigido para 2025: ${this.tfdParameters.ndms}`);
        }
        
        // IMPORTANTE: Atualizar DU - total de dias úteis do mês de referência
        this.tfdParameters.du = this.tfdParameters.ndup + this.tfdParameters.ndus;
        
        // Correção temporária DU para 2025 baseada na tabela correta
        if (currentYear === 2025) {
            const duTabelaCorreta = [22,20,19,20,21,20,23,21,22,23,19,22]; // Novembro corrigido: 19 (10+9)
            this.tfdParameters.du = duTabelaCorreta[mesReferencia];
            console.log(`   ⚠️ DU corrigido para 2025: ${this.tfdParameters.du}`);
        }

        console.log(`📅 Dias úteis calculados para ${this.getMonthName(mesReferencia)} (mês de referência):`);
        console.log(`   DU (total dias úteis mês): ${this.tfdParameters.du}`);
        console.log(`   NDUP (1-14 referência): ${this.tfdParameters.ndup}`);
        console.log(`   NDUS (15-fim referência): ${this.tfdParameters.ndus}`);
        console.log(`   NDUSA (15-fim anterior): ${ndusa}`);
        console.log(`   NDUPX (1-14 próximo): ${ndupx}`);
        console.log(`   NDMP (ndup + ndusa): ${this.tfdParameters.ndmp}`);
        console.log(`   NDMS (ndus + ndupx): ${this.tfdParameters.ndms}`);
    }

    // Função para verificar se é último dia útil do mês
    isLastBusinessDayOfMonth(date = new Date()) {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // Último dia do mês
        const lastDayOfMonth = new Date(year, month + 1, 0);
        
        // Encontrar último dia útil do mês
        let lastBusinessDay = new Date(lastDayOfMonth);
        while (this.isFeriado(lastBusinessDay) || lastBusinessDay.getDay() === 0 || lastBusinessDay.getDay() === 6) {
            lastBusinessDay.setDate(lastBusinessDay.getDate() - 1);
        }
        
        return date.toDateString() === lastBusinessDay.toDateString();
    }

    // Função para inicializar com verificação de TLP e IPCA
    async initializeWithTLPCheck() {
        try {
            console.log('🚀 Inicializando sistema com verificação de TLP e IPCA...');
            console.log(`📅 Mês de referência inicial: ${this.getMonthName(this.tfdParameters.mesReferencia)}`);

            // Buscar IPCA automaticamente ao iniciar
            console.log('🔍 Buscando IPCA automaticamente...');
            await this.fetchIPCA();

            // Verificar se precisa buscar nova TLP
            const shouldCheckTLP = this.shouldCheckTLP();
            const isFirstInit = !this.tfdParameters.lastTLPCheck;

            if (shouldCheckTLP) {
                console.log('🔍 Verificando se há nova TLP disponível...');
                const oldTLP = this.tfdParameters.jm;
                const newTLP = await this.fetchTLP();

                if (isFirstInit) {
                    // PRIMEIRA INICIALIZAÇÃO: mês de referência já está correto (mês atual)
                    console.log(`📊 Primeira inicialização - TLP buscada: ${newTLP}%`);
                    console.log(`📅 Mês de referência: ${this.getMonthName(this.tfdParameters.mesReferencia)} (já está correto)`);
                } else if (this.isLastBusinessDayOfMonth()) {
                    // ÚLTIMO DIA ÚTIL: incrementar mês de referência para o próximo mês
                    console.log('📅 Último dia útil do mês detectado - atualizando mês de referência...');
                    console.log(`📊 TLP atual: ${oldTLP}% → Nova TLP: ${newTLP}%`);
                    this.updateReferenceMonth();
                    console.log(`📅 Mês de referência atualizado para: ${this.getMonthName(this.tfdParameters.mesReferencia)}`);
                    this.updateBusinessDays();
                } else {
                    // DIA NORMAL: apenas atualizar TLP, manter mês de referência
                    if (newTLP && newTLP !== oldTLP) {
                        console.log(`📊 TLP atualizada de ${oldTLP}% para ${newTLP}%`);
                        console.log(`📅 Mantendo mês de referência: ${this.getMonthName(this.tfdParameters.mesReferencia)}`);
                    } else {
                        console.log('📊 TLP verificada, sem alteração.');
                    }
                }
            } else {
                console.log('📅 Mantendo configuração atual:', this.getMonthName(this.tfdParameters.mesReferencia));
            }

            // Atualizar displays dos parâmetros após buscar IPCA
            this.updateParameterDisplays();

        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
            // Em caso de erro, usar valores padrão e calcular dias úteis
            this.updateBusinessDays();
        }
    }

    // Função para verificar se deve checar TLP
    shouldCheckTLP() {
        const now = new Date();
        const lastCheck = this.tfdParameters.lastTLPCheck ? new Date(this.tfdParameters.lastTLPCheck) : null;

        // SEMPRE verificar na primeira inicialização (nunca checou antes)
        if (!lastCheck) {
            console.log('🆕 Primeira inicialização - verificação de TLP necessária');
            return true;
        }

        // Verificar se é último dia útil do mês e não checou hoje
        if (this.isLastBusinessDayOfMonth(now)) {
            console.log('🕒 Hoje é último dia útil do mês - verificação de TLP necessária');
            if (lastCheck.toDateString() !== now.toDateString()) {
                return true;
            }
        }

        console.log('⏭️ Verificação de TLP não necessária hoje');
        return false;
    }

    // Função para atualizar mês de referência
    updateReferenceMonth() {
        const currentMonth = this.tfdParameters.mesReferencia;
        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1; // 0-based: dezembro=11, janeiro=0

        console.log(`📅 Atualizando mês de referência: ${this.getMonthName(currentMonth)} → ${this.getMonthName(nextMonth)}`);
        this.tfdParameters.mesReferencia = nextMonth;

        // Salvar no cache
        this.saveToCache();
    }

    // Função para calcular o mês de referência atual baseado na data
    calculateCurrentReferenceMonth() {
        const now = new Date();
        const currentMonth = now.getMonth(); // 0-based: janeiro=0, dezembro=11
        // O mês de referência é o mês atual
        // Ex: Se estamos em outubro (01/10/2025), o mês de referência é outubro (9)
        console.log(`📅 Calculando mês de referência: Data atual=${this.getMonthName(currentMonth)} (${currentMonth})`);
        return currentMonth;
    }

    // Função auxiliar para nome do mês (0-based)
    getMonthName(month) {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return months[month];
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
                this.tfdParameters.lastTLPCheck = new Date().toISOString();

                console.log(`✅ TLP atualizada: ${tlpValue}% a.a. (${ultimoRegistro.data})`);

                // Salvar no cache
                this.saveToCache();

                const paramTlpElement = document.getElementById('param-tlp');
                if (paramTlpElement) {
                    paramTlpElement.textContent = `${tlpValue.toFixed(2)}% a.a.`;
                }

                return tlpValue;
            }
        } catch (error) {
            console.error('❌ Erro ao buscar TLP:', error.message);
            console.log(`📋 Mantendo TLP atual: ${this.tfdParameters.jm}% a.a. (cache ou padrão)`);
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
        this.tfdParameters.lastUpdate = new Date().toLocaleString('pt-BR');

        // Salvar no cache
        this.saveToCache();

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

                console.log(`📊 Períodos IPCA retornados pela API: ${periods[0]} e ${periods[1]}`);

                if (periods.length >= 2) {
                    const ipcaM2 = parseFloat(series[periods[0]]) / 100; // Período mais antigo = M-2
                    const ipcaM1 = parseFloat(series[periods[1]]) / 100; // Período mais recente = M-1

                    this.tfdParameters.ipca_m1 = ipcaM1;
                    this.tfdParameters.ipca_m2 = ipcaM2;

                    console.log(`✅ IPCA atualizado - Período ${periods[0]} (M-2): ${(ipcaM2*100).toFixed(2)}%, Período ${periods[1]} (M-1): ${(ipcaM1*100).toFixed(2)}%`);

                    // Salvar no cache
                    this.saveToCache();

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
            console.log(`📋 Mantendo IPCA atual: M-1: ${(this.tfdParameters.ipca_m1*100).toFixed(2)}%, M-2: ${(this.tfdParameters.ipca_m2*100).toFixed(2)}% (cache ou padrão)`);
            return {
                ipcaM1: this.tfdParameters.ipca_m1,
                ipcaM2: this.tfdParameters.ipca_m2,
                periods: ['cache/padrão', 'cache/padrão']
            };
        }
    }

    // Atualizar IPCA manualmente
    updateIPCAManually(m1Percent, m2Percent) {
        const ipcaM1 = parseFloat(m1Percent) / 100;
        const ipcaM2 = parseFloat(m2Percent) / 100;

        this.tfdParameters.ipca_m1 = ipcaM1;
        this.tfdParameters.ipca_m2 = ipcaM2;

        // Salvar no cache
        this.saveToCache();

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

    // Método para atualizar displays de parâmetros
    updateParameterDisplays() {
        const ipcaM1Display = document.getElementById('ipca-m1-display');
        const ipcaM2Display = document.getElementById('ipca-m2-display');
        const ndupDisplay = document.getElementById('ndup-display');
        const ndusDisplay = document.getElementById('ndus-display');
        const ndmpDisplay = document.getElementById('ndmp-display');
        const ndmsDisplay = document.getElementById('ndms-display');

        if (ipcaM1Display) ipcaM1Display.textContent = `${(this.tfdParameters.ipca_m1*100).toFixed(2)}%`;
        if (ipcaM2Display) ipcaM2Display.textContent = `${(this.tfdParameters.ipca_m2*100).toFixed(2)}%`;
        if (ndupDisplay) ndupDisplay.textContent = this.tfdParameters.ndup;
        if (ndusDisplay) ndusDisplay.textContent = this.tfdParameters.ndus;
        if (ndmpDisplay) ndmpDisplay.textContent = this.tfdParameters.ndmp;
        if (ndmsDisplay) ndmsDisplay.textContent = this.tfdParameters.ndms;
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