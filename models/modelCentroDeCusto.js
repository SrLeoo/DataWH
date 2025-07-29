const axios = require('axios');
require('dotenv').config();

const { inserirCentroDeCusto } = require('../entity/entityCentroDeCusto');

async function executar(itemId) {
  const entityTypeId = 1048; // ID do Centro de Custo

  try {
    const url = `${process.env.BITRIX_WEBHOOK}/crm.item.get`;
    const response = await axios.get(url, {
      params: { entityTypeId, id: itemId }
    });

    const item = response.data.result.item;
    if (!item) {
      console.warn(`Centro de Custo ID ${itemId} não encontrado`);
      return;
    }

    console.log(`SPA ${item.id} (Centro de Custo)`);
    console.log(`Título: ${item.title}`);
    console.log(`Valor Orçamento: ${item.ufCrm15_1740128202}`);
    console.log(`Status: ${item.ufCrm15_1740548804349}`);
    console.log(`Valor Utilizado: ${item.ufCrm15_1740556366}`);
    console.log(`Valor Restante: ${item.ufCrm15_1742744559}`);
    console.log(`Report Enviado: ${item.ufCrm15_1743529391}`);

    await inserirCentroDeCusto(item);

  } catch (error) {
    console.error('Erro ao processar Centro de Custo:', error.response?.data || error.message);
  }
}

module.exports = { executar };
