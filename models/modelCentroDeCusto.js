const axios = require("axios");
require("dotenv").config();
const { inserirCentroDeCusto } = require("../entity/entityCentroDeCusto");

async function executar(itemId) {
  const entityTypeId = 1048;

  try {
    const url = `${process.env.BITRIX_WEBHOOK}/crm.item.get`;
    const response = await axios.get(url, {
      params: { entityTypeId, id: itemId },
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

    // Conversão dos campos |BRL para float

    const valorOrcamento = parseFloat(
      (item.ufCrm15_1740128202 || "0").split("|")[0]
    );
    const valorUtilizado = parseFloat(
      (item.ufCrm15_1740556366 || "0").split("|")[0]
    );
    const valorRestante = parseFloat(
      (item.ufCrm15_1742744559 || "0").split("|")[0]
    );

    const centroDeCustoTratado = {
      ...item,
      ufCrm15_1740128202: valorOrcamento,
      ufCrm15_1740556366: valorUtilizado,
      ufCrm15_1742744559: valorRestante,
    };

    await inserirCentroDeCusto(centroDeCustoTratado);
  } catch (error) {
    console.error(
      "Erro ao processar Centro de Custo:",
      error.response?.data || error.message
    );
  }
}

module.exports = { executar };
