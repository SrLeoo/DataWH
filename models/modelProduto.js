const axios = require("axios");
require("dotenv").config();

const { inserirSPAProduto } = require("../entity/entityProduto");

async function executar(itemId) {
  const entityTypeId = 1044;

  try {
    const url = `${process.env.BITRIX_WEBHOOK}/crm.item.get`;
    const response = await axios.get(url, {
      params: { entityTypeId, id: itemId },
    });

    const item = response.data.result.item;
    if (!item) {
      console.warn(`SPA Produto ID ${itemId} não encontrado`);
      return;
    }

    console.log(`Processado: ${item.id}`);

    // Logs dos dados recebidos
    // console.log(`SPA ${item.id} (Produto)`);
    // console.log(`Título: ${item.title}`);
    // console.log(`NCM/SH: ${item.ufCrm13_1736526141}`);
    // console.log(`QuantidadeR: ${item.ufCrm13_1736526487}`);
    // console.log(`Valor Unitário: ${item.ufCrm13_1736526502}`);
    // console.log(`Valor Total Realizado: ${item.ufCrm13_1736526603}`);
    // console.log(`Projeto Vinculado (parentId1040): ${item.parentId1040}`);
    // console.log(`Centro de Custo (parentId1048): ${item.parentId1048}`);
    // console.log(`Categoria (parentId1056): ${item.parentId1056}`);
    // console.log(`Subcategoria: ${item.ufCrm13_1741811686}`);

    // Inserção no banco
    await inserirSPAProduto(item);
  } catch (error) {
    console.error(
      "Erro ao processar SPA Produto:",
      error.response?.data || error.message
    );
  }
}

module.exports = { executar };
