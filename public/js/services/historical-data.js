// Serviço de Dados Históricos - TFD dos últimos 12 meses

class HistoricalDataService {
    constructor() {
        this.cacheKey = 'fdco_historical_tfd_cache';
        this.cacheDuration = 24 * 60 * 60 * 1000; // 24 horas
        this.cacheVersion = 2; // Incrementar quando mudar lógica de cálculo
    }

    // Carregar dados históricos do cache
    loadFromCache() {
        try {
            const cached = localStorage.getItem(this.cacheKey);
            if (!cached) return null;

            const data = JSON.parse(cached);

            // Verificar se cache ainda é válido (< 24 horas E mês atual)
            const now = new Date();
            const cachedDate = new Date(data.cachedAt);
            const timeDiff = now - cachedDate;

            // Invalida se passou 24h OU mudou o mês
            if (timeDiff > this.cacheDuration ||
                now.getMonth() !== cachedDate.getMonth() ||
                now.getFullYear() !== cachedDate.getFullYear()) {
                console.log('💾 Cache histórico expirado - será atualizado');
                localStorage.removeItem(this.cacheKey);
                return null;
            }

            // Validar versão do cache
            if (!data.version || data.version !== this.cacheVersion) {
                console.log(`💾 Cache histórico com versão antiga (v${data.version || 1}) - será invalidado`);
                localStorage.removeItem(this.cacheKey);
                return null;
            }

            // Validar estrutura dos dados - deve ter tfd_a, tfd_b, tfd_c, tfd_d
            if (data.historicalData && data.historicalData.length > 0) {
                const firstRow = data.historicalData[0];
                if (!firstRow.tfd_a || !firstRow.tfd_b || !firstRow.tfd_c || !firstRow.tfd_d) {
                    console.log('💾 Cache histórico com formato antigo - será invalidado');
                    localStorage.removeItem(this.cacheKey);
                    return null;
                }
            }

            console.log(`💾 Dados históricos carregados do cache (v${this.cacheVersion})`);
            return data;
        } catch (error) {
            console.error('❌ Erro ao carregar cache histórico:', error);
            localStorage.removeItem(this.cacheKey);
            return null;
        }
    }

    // Salvar dados no cache
    saveToCache(data) {
        try {
            const cacheData = {
                ...data,
                version: this.cacheVersion,
                cachedAt: new Date().toISOString()
            };
            localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
            console.log(`💾 Dados históricos salvos no cache (v${this.cacheVersion})`);
        } catch (error) {
            console.error('❌ Erro ao salvar cache histórico:', error);
        }
    }

    // Buscar TLP histórica do BACEN (últimos 12 registros)
    async fetchHistoricalTLP() {
        try {
            console.log('🔄 Buscando TLP histórica dos últimos 12 meses...');

            const response = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.27572/dados/ultimos/12?formato=json', {
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
            console.log(`✅ TLP histórica recebida: ${data.length} registros`);

            return data.map(item => ({
                date: item.data,
                value: parseFloat(item.valor)
            }));
        } catch (error) {
            console.error('❌ Erro ao buscar TLP histórica:', error.message);
            return null;
        }
    }

    // Buscar IPCA histórico do IBGE (últimos 24 períodos)
    async fetchHistoricalIPCA() {
        try {
            console.log('🔄 Buscando IPCA histórico dos últimos 24 meses...');

            const response = await fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1737/periodos/-24/variaveis/63?localidades=N1[all]', {
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
                const periods = Object.keys(series);

                console.log(`✅ IPCA histórico recebido: ${periods.length} períodos`);

                return periods.map(period => ({
                    period: period,
                    value: parseFloat(series[period])
                }));
            }

            throw new Error('Dados IPCA históricos não encontrados');
        } catch (error) {
            console.error('❌ Erro ao buscar IPCA histórico:', error.message);
            return null;
        }
    }

    // Gerar parâmetros históricos dinamicamente
    // Usa dados da planilha quando disponíveis, caso contrário calcula automaticamente
    getHistoricalParams() {
        // Dados fixos extraídos da planilha "parametros TFD.csv" (nov/2024 até out/2025)
        const baseParams = {
            '2024-11': { mes: '01/11/2024', du: 20, ndup: 10, ndus: 10, ndmp: 23, ndms: 20 },
            '2024-12': { mes: '01/12/2024', du: 21, ndup: 10, ndus: 11, ndmp: 20, ndms: 20 },
            '2025-01': { mes: '01/01/2025', du: 22, ndup: 9, ndus: 13, ndmp: 20, ndms: 23 },
            '2025-02': { mes: '01/02/2025', du: 20, ndup: 10, ndus: 10, ndmp: 23, ndms: 18 },
            '2025-03': { mes: '01/03/2025', du: 20, ndup: 9, ndus: 11, ndmp: 19, ndms: 21 },
            '2025-04': { mes: '01/04/2025', du: 20, ndup: 10, ndus: 10, ndmp: 21, ndms: 19 },
            '2025-05': { mes: '01/05/2025', du: 21, ndup: 9, ndus: 12, ndmp: 19, ndms: 22 },
            '2025-06': { mes: '01/06/2025', du: 20, ndup: 10, ndus: 10, ndmp: 22, ndms: 20 },
            '2025-07': { mes: '01/07/2025', du: 23, ndup: 10, ndus: 13, ndmp: 20, ndms: 23 },
            '2025-08': { mes: '01/08/2025', du: 21, ndup: 10, ndus: 11, ndmp: 23, ndms: 21 },
            '2025-09': { mes: '01/09/2025', du: 22, ndup: 10, ndus: 12, ndmp: 21, ndms: 22 },
            '2025-10': { mes: '01/10/2025', du: 23, ndup: 10, ndus: 13, ndmp: 22, ndms: 23 }
        };

        // Gerar últimos 12 meses dinamicamente
        const result = [];
        const hoje = new Date();

        for (let i = 11; i >= 0; i--) {
            const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
            const ano = data.getFullYear();
            const mes = data.getMonth() + 1; // 1-12
            const key = `${ano}-${String(mes).padStart(2, '0')}`;

            // Usar dados da planilha se disponível, senão calcular
            if (baseParams[key]) {
                result.push(baseParams[key]);
            } else {
                // Calcular parâmetros automaticamente (para meses futuros)
                console.warn(`⚠️ Parâmetros para ${key} não encontrados na planilha, calculando automaticamente...`);
                const params = this.calculateMonthParams(ano, mes);
                result.push(params);
            }
        }

        return result;
    }

    // Calcular parâmetros de um mês automaticamente
    calculateMonthParams(ano, mes) {
        // Aqui você pode implementar a lógica de cálculo de dias úteis
        // Por enquanto, retorna valores estimados
        const mesFormatado = `01/${String(mes).padStart(2, '0')}/${ano}`;

        console.log(`📅 Gerando parâmetros automáticos para ${mesFormatado}`);

        return {
            mes: mesFormatado,
            du: 21,     // Média aproximada
            ndup: 10,   // Média aproximada
            ndus: 11,   // Média aproximada
            ndmp: 21,   // Média aproximada
            ndms: 21    // Média aproximada
        };
    }

    // Calcular TFD histórica para cada mês e para todos os tipos (A, B, C, D)
    calculateHistoricalTFD(tlpData, ipcaData, params) {
        if (!tlpData || !ipcaData || tlpData.length === 0 || ipcaData.length < 2) {
            return null;
        }

        console.log('📊 Calculando TFD histórica com dados reais da planilha...');
        console.log(`TLP: ${tlpData.length} registros, IPCA: ${ipcaData.length} registros`);

        const results = [];
        const historicalParams = this.getHistoricalParams();

        // Fatores de Programa (FP) para cada tipo
        const fpValues = {
            A: 0.85,  // Saneamento PRIORITÁRIA
            B: 1.05,  // Demais setores PRIORITÁRIA
            C: 1.25,  // Saneamento DEMAIS
            D: 1.45   // Demais setores DEMAIS
        };

        // Para cada TLP histórica (do mais antigo para o mais recente)
        for (let i = 0; i < Math.min(tlpData.length, 12); i++) {
            const tlp = tlpData[i];

            // Encontrar parâmetros históricos correspondentes
            const monthParam = historicalParams[i];
            if (!monthParam) {
                console.warn(`⚠️ Parâmetros históricos não encontrados para índice ${i}`);
                continue;
            }

            // REGRA IMPORTANTE: Seleção de IPCAs baseada no dia do mês
            // - Antes do dia 10: IPCA do mês anterior ainda NÃO foi divulgado
            //   Então usar IPCA M-2 e M-3
            // - Dia 10 ou depois: IPCA do mês anterior JÁ foi divulgado
            //   Então usar IPCA M-1 e M-2

            const hoje = new Date();
            const diaAtual = hoje.getDate();
            const antesDoIPCA = diaAtual < 10; // IPCA divulga dia 10

            // Calcular quantos meses atrás está este registro
            const mesesAtras = (tlpData.length - 1) - i;

            let ipcaM1Index, ipcaM2Index;

            if (antesDoIPCA) {
                // ANTES DO DIA 10: usar IPCA M-2 e M-3
                // Outubro (mesesAtras=0): M-2=agosto, M-3=julho
                // Setembro (mesesAtras=1): M-2=julho, M-3=junho
                // Agosto (mesesAtras=2): M-2=junho, M-3=maio
                const ultimoIPCAIndex = ipcaData.length - 1; // Último IPCA disponível
                ipcaM1Index = ultimoIPCAIndex - 1 - mesesAtras; // M-2
                ipcaM2Index = ultimoIPCAIndex - 2 - mesesAtras; // M-3
                console.log(`  ⚠️ Antes do dia 10: usando IPCA M-2 e M-3`);
            } else {
                // DIA 10 OU DEPOIS: usar IPCA M-1 e M-2
                // Outubro (mesesAtras=0): M-1=setembro, M-2=agosto
                // Setembro (mesesAtras=1): M-1=agosto, M-2=julho
                const ultimoIPCAIndex = ipcaData.length - 1;
                ipcaM1Index = ultimoIPCAIndex - mesesAtras;     // M-1
                ipcaM2Index = ultimoIPCAIndex - 1 - mesesAtras; // M-2
                console.log(`  ✓ Depois do dia 10: usando IPCA M-1 e M-2`);
            }

            console.log(`📅 ${monthParam.mes} (${mesesAtras} meses atrás): TLP=${tlp.value}%, DU=${monthParam.du}`);

            if (ipcaM2Index >= 0 && ipcaM1Index >= 0 && ipcaM1Index < ipcaData.length) {
                const ipcaM1 = ipcaData[ipcaM1Index].value / 100;
                const ipcaM2 = ipcaData[ipcaM2Index].value / 100;

                const labelM1 = antesDoIPCA ? 'M-2' : 'M-1';
                const labelM2 = antesDoIPCA ? 'M-3' : 'M-2';

                console.log(`  → IPCA ${labelM1}=${ipcaData[ipcaM1Index].period} (${(ipcaM1*100).toFixed(4)}%), IPCA ${labelM2}=${ipcaData[ipcaM2Index].period} (${(ipcaM2*100).toFixed(4)}%)`);
                console.log(`  → ndmp=${monthParam.ndmp}, ndms=${monthParam.ndms}, ndup=${monthParam.ndup}, ndus=${monthParam.ndus}`);

                // Calcular FAM usando parâmetros históricos do mês
                // FAM = (1 + IPCA_primeiro)^(ndup/ndmp) × (1 + IPCA_segundo)^(ndus/ndms)
                // Antes do dia 10: primeiro=M-3 (julho), segundo=M-2 (agosto)
                // Depois do dia 10: primeiro=M-2 (agosto), segundo=M-1 (setembro)
                const exp1 = monthParam.ndup / monthParam.ndmp;
                const exp2 = monthParam.ndus / monthParam.ndms;
                const termo1 = Math.pow(1 + ipcaM2, exp1);
                const termo2 = Math.pow(1 + ipcaM1, exp2);
                const fam = termo1 * termo2;

                console.log(`  → exp1=${exp1.toFixed(6)}, exp2=${exp2.toFixed(6)}`);
                console.log(`  → termo1=(1+${(ipcaM2*100).toFixed(4)}%)^${exp1.toFixed(4)}=${termo1.toFixed(9)}`);
                console.log(`  → termo2=(1+${(ipcaM1*100).toFixed(4)}%)^${exp2.toFixed(4)}=${termo2.toFixed(9)}`);
                console.log(`  → FAM = ${fam.toFixed(9)}`);

                // Calcular TFD para cada tipo (A, B, C, D)
                const tfdResults = {};
                const expoente = monthParam.du / 252;

                for (const [type, fp] of Object.entries(fpValues)) {
                    const jurosPrefixados = (1.0 * tlp.value) / 100; // alpha = 1.0
                    const termo_tlp1 = 1.0 * fp * jurosPrefixados; // cdr = 1.0
                    const termo_tlp2 = 1 + termo_tlp1;
                    const termo_tlp3 = Math.pow(termo_tlp2, expoente);
                    const tfd_mensal = fam * termo_tlp3 - 1;
                    const tfd_anual = Math.pow(1 + tfd_mensal, 12) - 1;

                    tfdResults[`tfd_${type.toLowerCase()}`] = tfd_anual * 100;

                    if (type === 'B') {
                        console.log(`  → [TFD-B] TLP=${tlp.value}%, FP=${fp}, DU=${monthParam.du}`);
                        console.log(`  → [TFD-B] termo_tlp=(1+${fp}*${tlp.value/100})^(${monthParam.du}/252)=${termo_tlp3.toFixed(9)}`);
                        console.log(`  → [TFD-B] tfd_mensal=${tfd_mensal.toFixed(9)}`);
                        console.log(`  → [TFD-B] tfd_anual=${(tfd_anual*100).toFixed(4)}%`);
                    }
                }

                console.log(`  → ✅ TFD-B = ${tfdResults.tfd_b.toFixed(2)}%`);

                results.push({
                    date: tlp.date,
                    tlp: tlp.value,
                    ipcaM1: ipcaM1 * 100,
                    ipcaM2: ipcaM2 * 100,
                    du: monthParam.du,
                    ndup: monthParam.ndup,
                    ndus: monthParam.ndus,
                    ndmp: monthParam.ndmp,
                    ndms: monthParam.ndms,
                    ...tfdResults
                });
            }
        }

        return results;
    }

    // Calcular estatísticas dos dados históricos baseado no tipo do projeto
    calculateStatistics(historicalData, projectType) {
        if (!historicalData || historicalData.length === 0) {
            console.error('❌ Dados históricos vazios para calcular estatísticas');
            return null;
        }

        // Determinar qual campo TFD usar baseado no tipo (A, B, C ou D)
        const tfdField = `tfd_${projectType.toLowerCase()}`;

        // Validar que os campos existem
        const firstRow = historicalData[0];
        if (!firstRow[tfdField]) {
            console.error(`❌ Campo ${tfdField} não encontrado nos dados históricos`);
            console.log('Campos disponíveis:', Object.keys(firstRow));
            return null;
        }

        const tfdAnualValues = historicalData.map(d => d[tfdField]).filter(v => !isNaN(v) && v !== undefined);

        if (tfdAnualValues.length === 0) {
            console.error('❌ Nenhum valor TFD válido encontrado');
            return null;
        }

        const min = Math.min(...tfdAnualValues);
        const max = Math.max(...tfdAnualValues);
        const avg = tfdAnualValues.reduce((a, b) => a + b, 0) / tfdAnualValues.length;

        // Calcular desvio padrão
        const variance = tfdAnualValues.reduce((sum, val) => {
            return sum + Math.pow(val - avg, 2);
        }, 0) / tfdAnualValues.length;
        const stdDev = Math.sqrt(variance);

        console.log(`✅ Estatísticas calculadas para tipo ${projectType}: min=${min.toFixed(2)}, max=${max.toFixed(2)}, avg=${avg.toFixed(2)}`);

        return {
            min: min,
            max: max,
            avg: avg,
            stdDev: stdDev,
            count: tfdAnualValues.length,
            projectType: projectType
        };
    }

    // Obter dados históricos completos (com cache)
    async getHistoricalData(currentParams, projectType = 'B') {
        // Tentar carregar do cache
        const cached = this.loadFromCache();
        if (cached && cached.historicalData) {
            // Recalcular estatísticas para o tipo de projeto atual
            const statistics = this.calculateStatistics(cached.historicalData, projectType);
            return {
                historicalData: cached.historicalData,
                statistics
            };
        }

        console.log('🔍 Buscando dados históricos das APIs...');

        // Buscar dados das APIs
        const [tlpData, ipcaData] = await Promise.all([
            this.fetchHistoricalTLP(),
            this.fetchHistoricalIPCA()
        ]);

        if (!tlpData || !ipcaData) {
            console.log('⚠️ Não foi possível obter dados históricos');
            return null;
        }

        // Calcular TFD histórica para todos os tipos
        const historicalData = this.calculateHistoricalTFD(tlpData, ipcaData, currentParams);

        if (!historicalData || historicalData.length === 0) {
            console.log('⚠️ Não foi possível calcular TFD histórica');
            return null;
        }

        // Calcular estatísticas para o tipo específico
        const statistics = this.calculateStatistics(historicalData, projectType);

        const result = {
            historicalData,
            statistics
        };

        // Salvar no cache (sem estatísticas, pois dependem do tipo)
        this.saveToCache({ historicalData });

        return result;
    }
}

// Instância global
const historicalDataService = new HistoricalDataService();
