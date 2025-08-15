# Simulador FDCO - SUDECO

## 📋 Descrição

Simulador oficial para financiamentos do **Fundo de Desenvolvimento do Centro-Oeste (FDCO)** da SUDECO (Superintendência do Desenvolvimento do Centro-Oeste), implementando as regras da **Resolução 4960/2024**.

O sistema permite calcular condições de financiamento, taxas TFD, cronogramas de pagamento SAC e validações automáticas conforme a legislação vigente.

## 🚀 Características

- ✅ **Cálculo automatizado** da Taxa de Financiamento para o Desenvolvimento (TFD)
- ✅ **Integração com APIs oficiais** (BACEN para TLP, IBGE para IPCA)
- ✅ **Validação automática** de municípios e setores elegíveis
- ✅ **Cronograma SAC** com período de carência configurável
- ✅ **Interface responsiva** e moderna
- ✅ **Compatibilidade total** com a legislação FDCO

## 🏗️ Arquitetura Frontend

```
public/
├── css/
│   ├── styles.css          # Estilos principais
│   └── components.css      # Estilos de componentes
├── js/
│   ├── services/
│   │   ├── api.js         # Comunicação com APIs
│   │   └── calculator.js  # Lógica de cálculos
│   ├── components/
│   │   ├── form.js        # Componente do formulário
│   │   ├── results.js     # Exibição de resultados
│   │   └── parameters.js  # Parâmetros TFD
│   └── utils/
│       ├── validators.js  # Validações
│       └── formatters.js  # Formatação
├── index.html             # Página principal
└── assets/               # Recursos estáticos
```

### Backend Node.js

```
server/
├── app.js                # Servidor Express
├── routes/
│   └── api.js           # Rotas da API
└── data/
    └── municipalities.js # Dados dos municípios
```

## 🛠️ Instalação e Uso

### Pré-requisitos

- Node.js 16+
- NPM ou Yarn

### Instalação

```bash
# Clonar repositório
git clone https://github.com/marcodiniz755/PROJETO-SIMULADOR-FDCO.git
cd PROJETO-SIMULADOR-FDCO

# Instalar dependências
npm install

# Iniciar servidor
npm start
```

### Desenvolvimento

```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Build para produção
npm run build
```

## 🌐 Uso da Aplicação

1. Acesse `http://localhost:3000`
2. Preencha os dados do projeto:
   - Valor total do investimento
   - Setor do projeto
   - Localização (Estado/Município)
   - Percentual de recursos próprios
3. Configure parâmetros opcionais:
   - Prazo do financiamento
   - Período de carência
4. Clique em "Calcular" para obter:
   - Taxa TFD aplicável
   - Valor financiável pelo FDCO
   - Cronograma de pagamentos SAC

## 📊 Cálculos Implementados

### Taxa TFD (Taxa de Financiamento para o Desenvolvimento)

A TFD é calculada pela fórmula:
```
TFD = FAM × (1 + (CDR × FP × Juros_TLP))^(DU/252) - 1
```

Onde:
- **FAM**: Fator de Atualização Monetária (baseado no IPCA)
- **CDR**: Coeficiente de Desconto Regional
- **FP**: Fator de Programa (prioridade do setor)
- **Juros_TLP**: Taxa de Longo Prazo do BACEN
- **DU**: Dias úteis no mês

### Limites de Financiamento

O FDCO pode financiar até:
- **80%** para projetos prioritários
- **70%** para projetos semi-prioritários  
- **60%** para projetos não-prioritários

## 🗺️ Abrangência Geográfica

- **Distrito Federal**
- **Goiás** (todos os municípios)
- **Mato Grosso** (municípios elegíveis)
- **Mato Grosso do Sul** (municípios elegíveis)

## 🔧 API Endpoints

### Frontend Node.js

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/` | GET | Página principal da aplicação |
| `/health` | GET | Status da aplicação |
| `/api/tlp` | GET | Buscar TLP do BACEN |
| `/api/ipca` | GET | Buscar IPCA do IBGE |

## 📈 Roadmap

### Versão 2.0 (Em desenvolvimento - branch v2-fullstack)
- ✅ Backend Java Spring Boot
- ✅ API REST completa
- ✅ Arquitetura microserviços
- 🔄 Testes automatizados
- 🔄 Documentação OpenAPI/Swagger

### Futuras funcionalidades
- 🔄 Dashboard administrativo
- 🔄 Exportação PDF/Excel
- 🔄 API GraphQL
- 🔄 PWA (Progressive Web App)
- 🔄 Integração com sistemas governamentais

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para detalhes.

## 📞 Contato

**SUDECO** - Superintendência do Desenvolvimento do Centro-Oeste
- Website: [https://sudeco.gov.br](https://sudeco.gov.br)
- Email: [contato@sudeco.gov.br](mailto:contato@sudeco.gov.br)

## 📖 Documentação Legal

- [Resolução CONDEL/SUDECO 135/2022](link-para-documento)
- [Resolução CONDEL/SUDECO 144/2023](link-para-documento)
- [Resolução CMN 4960/2024](link-para-documento)
- [Política Nacional de Desenvolvimento Regional (PNDR)](link-para-documento)

---

**Versão**: 1.0.0  
**Última atualização**: Agosto 2025  
**Desenvolvido com**: Node.js, Express, Vanilla JavaScript