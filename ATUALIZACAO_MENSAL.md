# 📅 Atualização Mensal do Histórico - SIMULADOR FDCO

## 🔄 Sistema Automático

O sistema agora funciona **100% automaticamente** para a maioria dos casos:

### ✅ O que é automático:

1. **Seleção de IPCAs (Regra do dia 10)**
   - **Antes do dia 10**: Usa IPCA M-2 e M-3 (mês anterior ainda não divulgado)
   - **Depois do dia 10**: Usa IPCA M-1 e M-2 (mês anterior já divulgado)

2. **Busca de dados das APIs**
   - **TLP**: Busca automaticamente os últimos 12 meses do BACEN
   - **IPCA**: Busca automaticamente os últimos 24 meses do IBGE

3. **Cálculo de médias**
   - A média dos últimos 12 meses é recalculada automaticamente sempre que há novos dados

4. **Atualização de cache**
   - Cache expira automaticamente após 24 horas OU quando muda o mês
   - Sistema busca novos dados automaticamente quando o cache expira

5. **Parâmetros de meses futuros**
   - Quando um novo mês chega (ex: novembro/2025), o sistema gera parâmetros estimados automaticamente
   - **Valores estimados**: DU=21, NDUP=10, NDUS=11, NDMP=21, NDMS=21

---

## 🎯 Quando você PRECISA atualizar manualmente

**APENAS se você quiser ter os valores EXATOS** dos parâmetros (DU, NDUP, NDUS, NDMP, NDMS) de meses futuros.

### 📝 Como atualizar (opcional):

1. **Abra o arquivo**: `public/js/services/historical-data.js`

2. **Localize a função**: `getHistoricalParams()` (linha ~143)

3. **Adicione o novo mês** no objeto `baseParams`:

```javascript
const baseParams = {
    // ... meses anteriores ...
    '2025-10': { mes: '01/10/2025', du: 23, ndup: 10, ndus: 13, ndmp: 22, ndms: 23 },
    '2025-11': { mes: '01/11/2025', du: 19, ndup: 10, ndus: 9, ndmp: 23, ndms: 19 },  // ← ADICIONAR AQUI
};
```

4. **Onde obter os valores**:
   - Consulte sua planilha `parametros TFD.csv`
   - Ou calcule manualmente os dias úteis do mês

---

## 📊 Exemplo de atualização para Novembro/2025

Quando chegar **01/11/2025**, você pode (opcionalmente):

1. **Calcular os dias úteis de novembro/2025** na sua planilha
2. **Adicionar no código**:

```javascript
'2025-11': { mes: '01/11/2025', du: 19, ndup: 10, ndus: 9, ndmp: 23, ndms: 19 },
```

3. **Reiniciar o servidor**: `npm start`
4. **Limpar cache do navegador**: F12 → `localStorage.clear()`

---

## ⚠️ IMPORTANTE

- **Não é obrigatório atualizar todo mês**
- O sistema funciona com valores estimados se você não atualizar
- A diferença entre valores estimados e reais é **geralmente pequena** (±1-2 dias úteis)
- TLP e IPCA são **sempre buscados automaticamente** das APIs oficiais

---

## 🔍 Como verificar se está funcionando

1. Abra o Console do navegador (F12)
2. Faça uma simulação
3. Procure por mensagens como:
   - ✅ `📅 01/11/2025: usando parâmetros da planilha` (se você atualizou)
   - ⚠️ `📅 Gerando parâmetros automáticos para 01/11/2025` (se está usando estimados)

---

## 📞 Resumo

**Você NÃO precisa fazer nada todo mês!**

O sistema funcionará automaticamente. Você só precisa atualizar manualmente se quiser **máxima precisão** nos dias úteis.

A TLP e o IPCA são sempre buscados automaticamente das APIs oficiais (BACEN e IBGE), então os valores principais sempre estarão corretos.
