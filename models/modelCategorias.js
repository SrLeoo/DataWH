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

    // Conversão dos campos |BRL para float
    const valorOrcamento = parseFloat(
      (item.ufCrm19_1740129258 || "0").split("|")[0]
    );
    const valorUtilizado = parseFloat(
      (item.ufCrm19_1740555537 || "0").split("|")[0]
    );
    const valorRestante = parseFloat(
      (item.ufCrm19_1742744609 || "0").split("|")[0]
    );

    const categoriaTratada = {
      ...item,
      ufCrm19_1740129258: valorOrcamento,
      ufCrm19_1740555537: valorUtilizado,
      ufCrm19_1742744609: valorRestante,
    };

    await inserirSPACategoria(categoriaTratada);
  } catch (error) {
    console.error(
      "Erro ao processar SPA Categoria:",
      error.response?.data || error.message
    );
  }
}

module.exports = { executar };
