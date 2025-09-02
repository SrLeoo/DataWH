const axios = require('axios');
require('dotenv').config();

const BITRIX_WEBHOOK = process.env.BITRIX_WEBHOOK;

async function buscarDealNoBitrix(dealId) {
  try {
    const response = await axios.get(`${BITRIX_WEBHOOK}/crm.deal.get`, {
      params: { id: dealId }
    });

    return response.data.result;
  } catch (error) {
    console.error('Erro ao buscar deal:', error.message);
    return null;
  }
}
// NAO MODIFICAR
async function processar(deal) {
  console.log(`Deal ${deal.ID} (Título: ${deal.TITLE})`);

  const campos = {
    'TITLE': deal.TITLE,
    'CATEGORY_ID': deal.CATEGORY_ID,
    'STAGE_ID': deal.STAGE_ID,
    'CREATED_BY_ID': deal.CREATED_BY_ID,
    'DATE_CREATE': deal.DATE_CREATE,
    'ASSIGNED_BY_ID': deal.ASSIGNED_BY_ID,
    'STAGE_SEMANTIC_ID': deal.STAGE_SEMANTIC_ID,
    'OPPORTUNITY': deal.OPPORTUNITY,
    'Data da Emissão': deal.UF_CRM_1740818224573,
    'Resumo': deal.UF_CRM_1671806783, 
    'CompradorID': deal.UF_CRM_1741097481, 
    // 'Arquivo XML': deal.UF_CRM_1734746357, // Como armezena arquivos em um banco de dados?
    'NFs Vinculadas': deal.UF_CRM_1739932981,
    'CNPJ': deal.UF_CRM_1668797471381,
    'Fornecedor': deal.UF_CRM_1668797465377,
    'Data de Vencimento': deal.UF_CRM_1669380856931
  };

  console.log('Campos da Deal:');
  for (const [chave, valor] of Object.entries(campos)) {
    console.log(`🔹 ${chave}: ${valor}`);
  }
}

module.exports = {
  buscarDealNoBitrix,
  processar
};
