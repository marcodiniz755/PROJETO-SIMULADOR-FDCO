# Simulador FDCO - SUDECO

> **Versão 1.0.0** - Frontend Node.js  
> Para a versão completa com backend Java, veja o branch [`v2-fullstack`](../../tree/v2-fullstack)

## 📋 Descrição

Simulador oficial para financiamentos do **Fundo de Desenvolvimento do Centro-Oeste (FDCO)** da SUDECO, implementando as regras da **Resolução 4960/2024**.

Sistema web para calcular condições de financiamento, taxas TFD e cronogramas de pagamento SAC.

## 🚀 Funcionalidades

- **Cálculo automatizado** da Taxa de Financiamento para o Desenvolvimento (TFD)
- **Integração com APIs oficiais** (BACEN para TLP, IBGE para IPCA)  
- **Validação automática** de municípios e setores elegíveis
- **Cronograma SAC** com período de carência configurável
- **Interface responsiva** e acessível

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express
- **APIs**: BACEN (TLP), IBGE (IPCA)

## ⚡ Instalação Rápida

```bash
# Clonar repositório
git clone https://github.com/marcodiniz755/PROJETO-SIMULADOR-FDCO.git
cd PROJETO-SIMULADOR-FDCO

# Instalar dependências
npm install

# Iniciar aplicação
npm start
```

Acesse: `http://localhost:3000`

## 📊 Como Usar

1. **Preencha os dados do projeto**:
   - Valor total do investimento
   - Setor e localização
   - Percentual de recursos próprios

2. **Configure parâmetros**:
   - Prazo do financiamento
   - Período de carência

3. **Obtenha os resultados**:
   - Taxa TFD aplicável
   - Valor financiável pelo FDCO  
   - Cronograma de pagamentos

## 🗺️ Abrangência

- **Distrito Federal**
- **Goiás** (246 municípios)
- **Mato Grosso** (141 municípios elegíveis)
- **Mato Grosso do Sul** (79 municípios elegíveis)

## 📈 Roadmap

### ✅ Versão 1.0 (Atual - Master)
- Frontend completo Node.js
- Cálculos TFD/FAM  
- APIs BACEN/IBGE
- Interface responsiva

### 🚀 Versão 2.0 (Branch `v2-fullstack`)
- Backend Java Spring Boot
- API REST completa
- Arquitetura microserviços  
- Documentação OpenAPI/Swagger

### 🔄 Futuras Funcionalidades  
- Dashboard administrativo
- Exportação PDF/Excel
- PWA (Progressive Web App)
- Integração com sistemas governamentais

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adicionar MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 📞 Contato

**SUDECO** - Superintendência do Desenvolvimento do Centro-Oeste  
- Website: [sudeco.gov.br](https://sudeco.gov.br)
- Email: contato@sudeco.gov.br

---

**Versão**: 1.0.0 | **Desenvolvido com**: Node.js, Express, JavaScript