# Simulador FDCO - SUDECO

## 📋 Descrição

Simulador oficial para financiamentos do **Fundo de Desenvolvimento do Centro-Oeste (FDCO)** da SUDECO (Superintendência do Desenvolvimento do Centro-Oeste), implementando as regras da **Resolução 4960/2021**.

O sistema permite calcular condições de financiamento, taxas TFD, cronogramas de pagamento SAC e validações automáticas conforme a legislação vigente.

## 🚀 Características

- ✅ **Cálculo automatizado** da Taxa de Financiamento para o Desenvolvimento (TFD)
- ✅ **Integração com APIs oficiais** (BACEN para TLP, IBGE para IPCA)
- ✅ **Validação automática** de municípios e setores elegíveis
- ✅ **Cronograma SAC** com período de carência configurável
- ✅ **Interface responsiva** e moderna
- ✅ **Arquitetura modular** separando frontend e backend
- ✅ **Cache inteligente** para otimização de performance
- ✅ **Compatibilidade total** com a legislação FDCO

## 🏗️ Arquitetura

### Frontend
```
public/
├── css/
│   ├── styles.css          # Estilos principais
│   └── components.css      # Estilos de componentes
├── js/
│   ├── services/
│   │   ├── api.js         # Comunicação com APIs
│   │   └── calculator.js  # Cálculos financeiros
│   ├── utils/
│   │   ├── formatters.js  # Formatação de dados
│   │   └── validators.js  # Validações
│   ├── components/
│   │   ├── header.js      # Componente cabeçalho
│   │   ├── parameters.js  # Parâmetros e fórmulas
│   │   ├── form.js        # Formulário principal
│   │   └── results.js     # Exibição de resultados
│   └── app.js             # Aplicação principal
└── index.html             # Página principal
```

### Backend
```
server/
├── routes/
│   └── api.js            # Rotas da API
├── data/
│   └── municipalities.js # Dados dos municípios
└── app.js               # Servidor Express
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 16.x ou superior
- npm ou yarn

### Instalação
```bash
# Clonar o projeto
git clone <repositorio>
cd projeto_simulador

# Instalar dependências
npm install

# Iniciar em modo desenvolvimento
npm run dev

# Iniciar em modo produção
npm start
```

### Scripts Disponíveis
```bash
npm start      # Iniciar servidor em produção
npm run dev    # Iniciar com nodemon (desenvolvimento)
npm run build  # Build de produção
```

## 🔧 Configuração

### Variáveis de Ambiente
```bash
# .env
PORT=3000
NODE_ENV=production
```

### APIs Externas
O sistema integra automaticamente com:
- **BACEN API** - Taxa de Longo Prazo (TLP): `https://api.bcb.gov.br/dados/serie/bcdata.sgs.27572/dados`
- **IBGE API** - IPCA: `https://servicodados.ibge.gov.br/api/v3/agregados/1737/periodos/-2/variaveis/63`

## 📊 Funcionalidades

### Cálculo da TFD
A Taxa de Financiamento para o Desenvolvimento é calculada usando:

```
TFD = FAM × [1 + (CDR × FP × TLP)]^(DU/252) - 1
```

Onde:
- **FAM**: Fator de Atualização Monetária
- **CDR**: Coeficiente de Desequilíbrio Regional (1,00)
- **FP**: Fator de Programa (A/B/C/D conforme setor e região)
- **TLP**: Taxa de Longo Prazo do BACEN
- **DU**: Dias Úteis no período

### Fatores de Programa
- **A (0,85)**: Saneamento em região PRIORITÁRIA
- **B (1,05)**: Demais setores em região PRIORITÁRIA
- **C (1,25)**: Saneamento em região DEMAIS
- **D (1,45)**: Demais setores em região DEMAIS

### Limites de Financiamento
- **Infraestrutura**: até 80% (prioritária) / 70% (demais)
- **Outros setores**: até 80% (prioritária) / 70% (demais)
- **Máximo financiável**: 80% do investimento total
- **Recursos próprios**: mínimo 20%

## 🌍 Estados e Municípios Atendidos

- **DF** - Distrito Federal
- **GO** - Goiás (246 municípios)
- **MT** - Mato Grosso (141 municípios)
- **MS** - Mato Grosso do Sul (79 municípios)

## 📋 Setores Elegíveis

### Infraestrutura (até 20 anos)
- Saneamento Básico
- Transportes (rodovias, ferrovias, hidrovias, aeroportos)
- Armazenagem
- Energia
- Telecomunicações
- Logística

### Serviços (até 12 anos)
- Turismo
- Saúde
- Educação
- Transporte de passageiros

### Tradicionais (até 12 anos)
- Agricultura e agronegócio
- Indústria (diversos segmentos)
- Ciência, tecnologia e inovação

## 🔒 Segurança

- Helmet.js para headers de segurança
- CORS configurado
- Sanitização de inputs
- Rate limiting (em desenvolvimento)
- Validação de dados server-side

## 📈 Performance

- Compressão gzip
- Cache de APIs externas (5 minutos)
- Assets otimizados
- Lazy loading de componentes

## 🧪 Testes

```bash
# Executar testes (quando implementados)
npm test
# Coverage
npm run test:coverage
```

## 📚 API Reference

### Endpoints Principais

#### `GET /api/tlp`
Busca TLP atual do BACEN
```json
{
  "valor": 7.51,
  "data": "2024-08-01",
  "fonte": "BACEN - Série 27572",
  "timestamp": "2024-08-03T10:00:00.000Z"
}
```

#### `GET /api/ipca`
Busca IPCA dos últimos 2 meses
```json
{
  "ipca_m1": { "valor": 0.24, "periodo": "202407" },
  "ipca_m2": { "valor": 0.26, "periodo": "202406" },
  "fonte": "IBGE - Agregado 1737",
  "timestamp": "2024-08-03T10:00:00.000Z"
}
```

#### `POST /api/calculate-fam`
Calcula Fator de Atualização Monetária
```json
{
  "ipca_m1": 0.24,
  "ipca_m2": 0.26,
  "ndup": 10,
  "ndus": 13,
  "ndmp": 21,
  "ndms": 23
}
```

#### `POST /api/calculate-tfd`
Calcula Taxa de Financiamento para o Desenvolvimento
```json
{
  "fam": 1.001234,
  "tlp": 7.51,
  "fp": 1.05,
  "cdr": 1.0,
  "du": 21,
  "alpha": 1.0
}
```

## 🎯 Roadmap

- [ ] Implementação de testes automatizados
- [ ] Dashboard administrativo
- [ ] Exportação para PDF/Excel
- [ ] Histórico de simulações
- [ ] API GraphQL
- [ ] PWA (Progressive Web App)
- [ ] Modo offline básico

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença ISC - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contato

**SUDECO** - Superintendência do Desenvolvimento do Centro-Oeste
- Website: [https://sudeco.gov.br](https://sudeco.gov.br)
- Email: [contato@sudeco.gov.br](mailto:contato@sudeco.gov.br)

## 📖 Documentação Legal

- [Resolução CONDEL/SUDECO 135/2022](link-para-documento)
- [Resolução CONDEL/SUDECO 144/2023](link-para-documento)
- [Resolução CMN 4960/2021](link-para-documento)
- [Política Nacional de Desenvolvimento Regional (PNDR)](link-para-documento)

---

**Versão**: 2.1.2  
**Última atualização**: Agosto 2025  
**Desenvolvido com**: Node.js, Express, Vanilla JavaScript