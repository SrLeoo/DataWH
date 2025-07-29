// models/modelSPA.js
const axios = require('axios');
require('dotenv').config();

async function buscarSPAItemNoBitrix(entityTypeId, itemId) {
  try {
    const url = `${process.env.BITRIX_WEBHOOK}/crm.item.get`;
    const response = await axios.post(url, {
      entityTypeId,
      id: itemId
    });
    return response.data.result.item;
  } catch (error) {
    console.error('Erro ao buscar SPA item:', error.response?.data || error.message);
    return null;
  }
}

module.exports = { buscarSPAItemNoBitrix };
