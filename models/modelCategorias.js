const axios = require("axios");
require("dotenv").config();

const { inserirSPACategoria } = require("../entity/entityCategorias");

async function executar(itemId) {
  const entityTypeId = 1056; // ID da SPA Categorias

  try {
    const url = `${process.env.BITRIX_WEBHOOK}/crm.item.get`;
    const response = await axios.get(url, {
      params: { entityTypeId, id: itemId },
    });

    const item = response.data.result.item;
    if (!item) {
      console.warn(`SPA Categoria ID ${itemId} não encontrado`);
      return;
    }

    console.log(`SPA ${item.id} (Categoria)`);
    console.log(`Título: ${item.title}`);
    console.log(`Valor Orçamento: ${item.ufCrm19_1740129258}`);
    console.log(`Valor Utilizado: ${item.ufCrm19_1740555537}`);
    console.log(`Status: ${item.ufCrm19_1740820304}`);
    console.log(`Valor Restante: ${item.ufCrm19_1742744609}`);

    await inserirSPACategoria(item);
  } catch (error) {
    console.error("Erro ao processar SPA Categoria:", error.response?.data || error.message);
  }
}

module.exports = { executar };
