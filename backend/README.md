# Simulador FDCO - SUDECO

Sistema para simulação de cálculos do Fundo de Desenvolvimento do Centro-Oeste (FDCO).

## 🚀 Como executar

### Pré-requisitos
- Java 17+
- Maven (ou usar o wrapper incluído)

### Executar a aplicação

```bash
# Windows
./mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

### Testar a aplicação

```bash
# Health check
curl http://localhost:8080/actuator/health

# Health check da API
curl http://localhost:8080/api/fdco/health
```

## 📋 Endpoints da API

### POST /api/fdco/simular
Simula o cálculo do FDCO para um projeto.

**Request:**
```json
{
  "valor_projeto": 1000000.00,
  "percentual_contrapartida": 25.00,
  "regiao": "CENTRO-OESTE",
  "estado": "GO",
  "municipio": "Goiânia",
  "tipo_projeto": "INFRAESTRUTURA",
  "observacoes": "Projeto de infraestrutura urbana"
}
```

**Response:**
```json
{
  "valor_projeto": 1000000.00,
  "valor_contrapartida": 250000.00,
  "valor_fdco_calculado": 750000.00,
  "percentual_fdco": 75.00,
  "regiao": "CENTRO-OESTE",
  "estado": "GO",
  "municipio": "Goiânia",
  "tipo_projeto": "INFRAESTRUTURA",
  "elegivel_fdco": true,
  "justificativa": "Cálculo realizado com base nas regras vigentes do FDCO",
  "observacoes": [],
  "data_calculo": "2024-01-15T10:30:00",
  "parametros_utilizados": {
    "percentual_maximo_fdco": 80.00,
    "valor_minimo_projeto": 50000.00,
    "valor_maximo_projeto": 10000000.00,
    "percentual_minimo_contrapartida": 20.00,
    "fator_regional": 1.00,
    "fator_tipo_projeto": 1.00,
    "versao_calculo": "1.0"
  }
}
```

### GET /api/fdco/parametros/regioes
Retorna os fatores regionais utilizados no cálculo.

### GET /api/fdco/parametros/tipos-projeto  
Retorna os fatores por tipo de projeto.

## 📖 Documentação da API

Acesse a documentação interativa em: http://localhost:8080/swagger-ui.html

## 🧪 Testes

```bash
# Executar testes
./mvnw.cmd test

# Executar com relatório de cobertura
./mvnw.cmd test jacoco:report
```

## 📊 Regras de Negócio

### Elegibilidade
- Valor mínimo: R$ 50.000,00
- Valor máximo: R$ 10.000.000,00
- Contrapartida mínima: 20%
- Percentual máximo FDCO: 80%

### Fatores Regionais
- Norte: 1.20
- Nordeste: 1.15
- Centro-Oeste: 1.10
- Sudeste: 1.00
- Sul: 1.05

### Fatores por Tipo de Projeto
- Educação: 1.20
- Saúde: 1.18
- Infraestrutura: 1.15
- Meio Ambiente: 1.12
- Desenvolvimento Econômico: 1.10
- Turismo: 1.08
- Outros: 1.00

## 🔧 Configuração

A aplicação usa cache em memória (Caffeine) para otimizar os cálculos repetidos.
Configurações estão em `application.yml`.

## 🏗️ Estrutura do Projeto

```
src/
├── main/java/br/gov/sudeco/simulador/
│   ├── config/          # Configurações (Cache, OpenAPI)
│   ├── controller/      # Controllers REST
│   ├── dto/             # DTOs de Request/Response  
│   └── service/         # Lógica de negócio
└── test/                # Testes unitários
```