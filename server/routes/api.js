// Rotas da API - Proxy para APIs externas e endpoints internos

const express = require('express');
const router = express.Router();

// Simulação de cache simples (em produção, usar Redis)
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

// Middleware para cache
function cacheMiddleware(key, ttl = CACHE_TTL) {
    return (req, res, next) => {
        const cachedData = cache.get(key);
        
        if (cachedData && Date.now() - cachedData.timestamp < ttl) {
            return res.json(cachedData.data);
        }
        
        // Continuar para o próximo middleware
        res.sendCachedResponse = (data) => {
            cache.set(key, {
                data: data,
                timestamp: Date.now()
            });
            res.json(data);
        };
        
        next();
    };
}

// Proxy para TLP do Banco Central
router.get('/tlp', cacheMiddleware('tlp'), async (req, res) => {
    try {
        const fetch = (await import('node-fetch')).default;
        
        const response = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.27572/dados?formato=json', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'SimuladorFDCO/2.1.2'
            },
            timeout: 10000
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data && data.length > 0) {
            const ultimoRegistro = data[data.length - 1];
            const tlpValue = parseFloat(ultimoRegistro.valor);
            
            const result = {
                valor: tlpValue,
                data: ultimoRegistro.data,
                fonte: 'BACEN - Série 27572',
                timestamp: new Date().toISOString()
            };
            
            res.sendCachedResponse(result);
        } else {
            throw new Error('Dados TLP não encontrados');
        }
        
    } catch (error) {
        console.error('Erro ao buscar TLP:', error.message);
        
        res.status(503).json({
            error: 'Serviço temporariamente indisponível',
            message: 'Não foi possível obter dados da TLP do BACEN',
            timestamp: new Date().toISOString(),
            fallback: {
                valor: 7.51,
                data: 'Valor padrão',
                fonte: 'Fallback'
            }
        });
    }
});

// Proxy para IPCA do IBGE
router.get('/ipca', cacheMiddleware('ipca'), async (req, res) => {
    try {
        const fetch = (await import('node-fetch')).default;
        
        const response = await fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1737/periodos/-2/variaveis/63?localidades=N1[all]', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'SimuladorFDCO/2.1.2'
            },
            timeout: 10000
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data && data[0] && data[0].resultados && data[0].resultados[0] && data[0].resultados[0].series) {
            const series = data[0].resultados[0].series[0].serie;
            const periods = Object.keys(series).slice(-2);
            
            if (periods.length >= 2) {
                const ipcaM1 = parseFloat(series[periods[1]]);
                const ipcaM2 = parseFloat(series[periods[0]]);
                
                const result = {
                    ipca_m1: {
                        valor: ipcaM1,
                        periodo: periods[1]
                    },
                    ipca_m2: {
                        valor: ipcaM2,
                        periodo: periods[0]
                    },
                    fonte: 'IBGE - Agregado 1737',
                    timestamp: new Date().toISOString()
                };
                
                res.sendCachedResponse(result);
            } else {
                throw new Error('Dados IPCA insuficientes');
            }
        } else {
            throw new Error('Estrutura de dados IPCA inválida');
        }
        
    } catch (error) {
        console.error('Erro ao buscar IPCA:', error.message);
        
        res.status(503).json({
            error: 'Serviço temporariamente indisponível',
            message: 'Não foi possível obter dados do IPCA do IBGE',
            timestamp: new Date().toISOString(),
            fallback: {
                ipca_m1: { valor: 0.24, periodo: 'Padrão' },
                ipca_m2: { valor: 0.26, periodo: 'Padrão' },
                fonte: 'Fallback'
            }
        });
    }
});

// Endpoint para calcular FAM
router.post('/calculate-fam', (req, res) => {
    try {
        const { ipca_m1, ipca_m2, ndup, ndus, ndmp, ndms } = req.body;
        
        // Validação dos parâmetros
        const params = [ipca_m1, ipca_m2, ndup, ndus, ndmp, ndms];
        if (params.some(p => typeof p !== 'number' || isNaN(p))) {
            return res.status(400).json({
                error: 'Parâmetros inválidos',
                message: 'Todos os parâmetros devem ser números válidos'
            });
        }
        
        // Cálculo do FAM
        const pi_m1 = parseFloat((ipca_m1 / 100).toFixed(6));
        const pi_m2 = parseFloat((ipca_m2 / 100).toFixed(6));
        const termo1 = Math.pow(1 + pi_m2, ndup / ndmp);
        const termo2 = Math.pow(1 + pi_m1, ndus / ndms);
        const fam = termo1 * termo2;
        
        res.json({
            fam: parseFloat(fam.toFixed(9)),
            parametros: {
                ipca_m1: pi_m1,
                ipca_m2: pi_m2,
                ndup, ndus, ndmp, ndms,
                termo1: parseFloat(termo1.toFixed(9)),
                termo2: parseFloat(termo2.toFixed(9))
            },
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Erro ao calcular FAM:', error.message);
        
        res.status(500).json({
            error: 'Erro no cálculo',
            message: 'Não foi possível calcular o FAM',
            timestamp: new Date().toISOString()
        });
    }
});

// Endpoint para calcular TFD
router.post('/calculate-tfd', (req, res) => {
    try {
        const { fam, tlp, fp, cdr = 1.0, du, alpha = 1.0 } = req.body;
        
        // Validação dos parâmetros
        const params = [fam, tlp, fp, cdr, du, alpha];
        if (params.some(p => typeof p !== 'number' || isNaN(p))) {
            return res.status(400).json({
                error: 'Parâmetros inválidos',
                message: 'Todos os parâmetros devem ser números válidos'
            });
        }
        
        // Cálculo do TFD
        const jurosPrefixadosTLP = (alpha * tlp) / 100;
        const termo1 = cdr * fp * jurosPrefixadosTLP;
        const termo2 = 1 + termo1;
        const expoente = du / 252;
        const termo3 = Math.pow(termo2, expoente);
        const tfd_mensal = fam * termo3 - 1;
        const tfd_anual = Math.pow(1 + tfd_mensal, 12) - 1;
        
        res.json({
            tfd_mensal: parseFloat((tfd_mensal * 100).toFixed(6)),
            tfd_anual: parseFloat((tfd_anual * 100).toFixed(6)),
            parametros: {
                fam, tlp, fp, cdr, du, alpha,
                juros_prefixados: parseFloat(jurosPrefixadosTLP.toFixed(6)),
                expoente: parseFloat(expoente.toFixed(6))
            },
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Erro ao calcular TFD:', error.message);
        
        res.status(500).json({
            error: 'Erro no cálculo',
            message: 'Não foi possível calcular a TFD',
            timestamp: new Date().toISOString()
        });
    }
});

// Endpoint para validar município
router.get('/validate-municipality/:state/:municipality', (req, res) => {
    try {
        const { state, municipality } = req.params;
        
        // Dados dos municípios (importar de arquivo separado em produção)
        const municipalityData = require('../data/municipalities');
        
        if (!municipalityData[state]) {
            return res.status(404).json({
                error: 'Estado não encontrado',
                message: `Estado ${state} não está disponível no FDCO`
            });
        }
        
        const municipalityInfo = municipalityData[state].find(city => 
            city.name.toUpperCase() === municipality.toUpperCase()
        );
        
        if (!municipalityInfo) {
            return res.status(404).json({
                error: 'Município não encontrado',
                message: `Município ${municipality} não encontrado no estado ${state}`
            });
        }
        
        res.json({
            valido: true,
            municipio: municipalityInfo,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Erro ao validar município:', error.message);
        
        res.status(500).json({
            error: 'Erro na validação',
            message: 'Não foi possível validar o município',
            timestamp: new Date().toISOString()
        });
    }
});

// Endpoint para limpar cache (apenas em desenvolvimento)
router.delete('/cache', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({
            error: 'Operação não permitida',
            message: 'Cache não pode ser limpo em produção'
        });
    }
    
    cache.clear();
    
    res.json({
        message: 'Cache limpo com sucesso',
        timestamp: new Date().toISOString()
    });
});

// Endpoint de estatísticas da API
router.get('/stats', (req, res) => {
    res.json({
        cache_size: cache.size,
        cache_keys: Array.from(cache.keys()),
        memory_usage: process.memoryUsage(),
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

module.exports = router;