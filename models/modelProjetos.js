// models/modelProjetos.js
const axios = require('axios');
require('dotenv').config();

const { inserirSPAProjeto } = require('../entity/entityProjeto');

function limparValor(valor) {
  if (!valor) return 0;
  return parseFloat(valor.toString().replace("|BRL", "").replace(",", ".")) || 0;
}

async function executar(itemId) {
  const entityTypeId = 1040; // ID da SPA de Projetos

  try {
    const url = `${process.env.BITRIX_WEBHOOK}/crm.item.get`;
    const response = await axios.get(url, {
      params: { entityTypeId, id: itemId }
    });

    const item = response.data.result.item;
    if (!item) {
      console.warn(`SPA Projeto ID ${itemId} não encontrado`);
      return;
    }

    // Conversões
    const custoRealizado = limparValor(item.ufCrm11_1736527566);
    const valorPendente = limparValor(item.ufCrm11_1736527535);

    console.log(`SPA ${item.id} (Projeto)`);
    console.log(`Título: ${item.title}`);
    console.log(`Custo realizado [Automático]: ${custoRealizado}`);
    console.log(`Valor pendente [Previsto-Realizado]: ${valorPendente}`);

    // Inserção no banco com valores tratados
    await inserirSPAProjeto({
      ...item,
      ufCrm11_1736527566: custoRealizado,     // spa_custo_realizado
      ufCrm11_1736527535: valorPendente       // spa_valor_pendente
    });

  } catch (error) {
    console.error('Erro ao processar SPA Projeto:', error.response?.data || error.message);
  }
}

module.exports = { executar };
