// Servidor Node.js para produção - Simulador FDCO

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware de segurança e performance
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            scriptSrcAttr: ["'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://api.bcb.gov.br", "https://servicodados.ibge.gov.br"]
        }
    }
}));

app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - ${req.ip}`);
    next();
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public'), {
    maxAge: NODE_ENV === 'production' ? '1d' : '0',
    etag: true,
    lastModified: true
}));

// Configurar cache para assets
app.use('/css', express.static(path.join(__dirname, '../public/css'), {
    maxAge: '7d',
    setHeaders: (res, path) => {
        res.set('Cache-Control', 'public, max-age=604800'); // 7 dias
    }
}));

app.use('/js', express.static(path.join(__dirname, '../public/js'), {
    maxAge: '1d',
    setHeaders: (res, path) => {
        res.set('Cache-Control', 'public, max-age=86400'); // 1 dia
    }
}));

// Rotas API
app.use('/api', require('./routes/api'));

// Rota principal - servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Rota de saúde
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        version: '2.1.2',
        environment: NODE_ENV,
        uptime: process.uptime()
    });
});

// Rota de informações do sistema
app.get('/system-info', (req, res) => {
    res.json({
        name: 'Simulador FDCO',
        version: '2.1.2',
        description: 'Fundo de Desenvolvimento do Centro-Oeste - SUDECO',
        author: 'SUDECO',
        environment: NODE_ENV,
        node_version: process.version,
        platform: process.platform,
        arch: process.arch,
        memory_usage: process.memoryUsage(),
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Middleware de tratamento de erros 404
app.use((req, res) => {
    res.status(404).json({
        error: 'Página não encontrada',
        message: 'A rota solicitada não existe',
        timestamp: new Date().toISOString()
    });
});

// Middleware de tratamento de erros globais
app.use((err, req, res, next) => {
    console.error('Erro capturado:', err.stack);
    
    res.status(err.status || 500).json({
        error: NODE_ENV === 'production' ? 'Erro interno do servidor' : err.message,
        timestamp: new Date().toISOString(),
        ...(NODE_ENV !== 'production' && { stack: err.stack })
    });
});

// Tratamento de sinais de encerramento
process.on('SIGTERM', () => {
    console.log('SIGTERM recebido. Encerrando servidor graciosamente...');
    server.close(() => {
        console.log('Servidor encerrado.');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT recebido. Encerrando servidor graciosamente...');
    server.close(() => {
        console.log('Servidor encerrado.');
        process.exit(0);
    });
});

// Iniciar servidor
const server = app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`🚀 Simulador FDCO iniciado`);
    console.log(`📍 Porta: ${PORT}`);
    console.log(`🌍 Ambiente: ${NODE_ENV}`);
    console.log(`🕒 Timestamp: ${new Date().toISOString()}`);
    console.log(`🔗 URL: http://localhost:${PORT}`);
    console.log('='.repeat(50));
});

module.exports = app;