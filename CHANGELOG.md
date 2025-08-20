# Changelog - Simulador FDCO

Todas as mudanças importantes deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [2.1.2] - 2025-08-03

### 🎉 Refatoração Completa
- **BREAKING CHANGE**: Reestruturação completa da aplicação
- Separação de camadas frontend e backend
- Arquitetura modular com componentes reutilizáveis

### ✨ Adicionado
- Servidor Node.js/Express para produção
- API REST com endpoints para cálculos
- Cache inteligente para otimização de performance
- Sistema de notificações moderno
- Auto-save de formulário no localStorage
- Atalhos de teclado (Ctrl+Enter para calcular)
- Modo de debug para desenvolvimento
- Configuração completa para produção
- Documentação técnica completa

### 🔧 Melhorado
- Interface mais responsiva e moderna
- Validações em tempo real aprimoradas
- Gerenciamento de estado mais robusto
- Tratamento de erros aprimorado
- Performance de carregamento
- Acessibilidade melhorada

### 🏗️ Estrutura
```
projeto_simulador/
├── public/                 # Frontend (HTML, CSS, JS)
│   ├── css/               # Estilos separados
│   ├── js/                # JavaScript modular
│   └── index.html         # Página principal
├── server/                # Backend Node.js
│   ├── routes/            # Rotas da API
│   ├── data/              # Dados dos municípios
│   └── app.js             # Servidor principal
├── package.json           # Dependências e scripts
└── README.md              # Documentação
```

### 📊 Componentes Criados
- **HeaderComponent**: Cabeçalho com logo SUDECO
- **ParametersComponent**: Parâmetros e fórmulas (collapsible)
- **FormComponent**: Formulário principal com validações
- **ResultsComponent**: Exibição de resultados e cronograma SAC

### 🔧 Serviços Implementados
- **ApiService**: Comunicação com APIs externas
- **CalculatorService**: Cálculos financeiros (FAM, TFD, SAC)
- **FormatterService**: Formatação de moeda e números
- **ValidatorService**: Validações de formulário

### 🛡️ Segurança
- Helmet.js para headers de segurança
- CORS configurado apropriadamente
- Sanitização de inputs
- Validação server-side

### 📈 Performance
- Compressão gzip habilitada
- Cache de APIs externas (5 minutos)
- Assets otimizados com cache headers
- Lazy loading de componentes

## [2.1.1] - 2025-07-XX (Versão anterior)

### 🔧 Corrigido
- Correção nos cálculos de DU (Dias Úteis)
- Ajustes nos decimais do IPCA
- Validações de investimento mínimo aprimoradas

## [2.1.0] - 2025-06-XX

### ✨ Adicionado
- Atualização automática de taxas via API
- Validação de municípios prioritários de alta renda
- Cronograma SAC com período de carência

### 🔧 Melhorado
- Interface mais intuitiva
- Cálculo mais preciso da TFD
- Validações em tempo real

---

## 🎯 Roadmap Futuro

### [2.2.0] - Planejado para Q4 2025
- [ ] Implementação de testes automatizados
- [ ] Dashboard administrativo
- [ ] Exportação para PDF/Excel
- [ ] Histórico de simulações
- [ ] Modo offline básico

### [2.3.0] - Planejado para Q1 2026
- [ ] API GraphQL
- [ ] PWA (Progressive Web App)
- [ ] Autenticação de usuários
- [ ] Relatórios avançados
- [ ] Integração com sistemas SUDECO

---

## 📋 Notas de Migração

### De 2.1.1 para 2.1.2
1. **Estrutura de arquivos completamente alterada**
2. **Novo servidor Node.js requerido**
3. **Dependências atualizadas** - executar `npm install`
4. **Configuração de ambiente** - copiar `.env.example` para `.env`

### Comandos de Migração
```bash
# Instalar dependências
npm install

# Configurar ambiente
cp .env.example .env

# Iniciar servidor
npm start
```

### Compatibilidade
- ✅ Todas as funcionalidades mantidas
- ✅ Cálculos idênticos à versão anterior
- ✅ APIs externas inalteradas
- ✅ Dados de municípios atualizados

---

**Mantido por**: SUDECO  
**Última atualização**: 03/08/2025