// models/modelProduto.js
const axios = require('axios');
require('dotenv').config();

async function executar(itemId) {
  const entityTypeId = 1044;

  try {
    const url = `${process.env.BITRIX_WEBHOOK}/crm.item.get`;
    const response = await axios.get(url, {
      params: { entityTypeId, id: itemId }
    });

    const item = response.data.result.item;
    if (!item) {
      console.warn(`SPA Produto ID ${itemId} não encontrado`);
      return;
    }

    console.log(`SPA ${item.id} (Produto)`);
    console.log(`Título: ${item.title}`);
    console.log(`NCM/SH: ${item.UF_CRM_13_1736526141}`);
    // Exiba outros campos relevantes aqui...

  } catch (error) {
    console.error('Erro ao processar SPA Produto:', error.response?.data || error.message);
  }
}

module.exports = { executar };
