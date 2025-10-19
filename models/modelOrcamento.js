const axios = require("axios");
require("dotenv").config();
const { inserirSPAOrcamento } = require("../entity/entityOrcamento");

function limparValor(valor) {
  if (!valor) return 0;
  return (
    parseFloat(valor.toString().replace("|BRL", "").replace(",", ".")) || 0
  );
}

async function executar(itemId) {
  const entityTypeId = 1060; // ID da SPA Orçamento

  try {
    const url = `${process.env.BITRIX_WEBHOOK}/crm.item.get`;
    const response = await axios.get(url, {
      params: { entityTypeId, id: itemId },
    });

    const item = response.data.result.item;
    if (!item) {
      console.warn(`SPA Orçamento ID ${itemId} não encontrado`);
      return;
    }

    const valorOrcamento = limparValor(item.ufCrm21_1740551446497);
    const valorUtilizado = limparValor(item.ufCrm21_1742871692);
    const valorRestante = limparValor(item.ufCrm21_1742871717);

    console.log(`SPA ${item.id} (Orçamento)`);
    console.log(`Título: ${item.title}`);
    console.log(`Valor do Orçamento: ${valorOrcamento}`);
    console.log(`Vigente?: ${item.ufCrm21_1740820579}`);
    console.log(`Valor Utilizado: ${valorUtilizado}`);
    console.log(`Valor Restante: ${valorRestante}`);
    console.log(`Centro de Custo (parentId): ${item.parentId1048}`);

    await inserirSPAOrcamento({
      ...item,
      ufCrm21_1740551446497: valorOrcamento,
      ufCrm21_1742871692: valorUtilizado,
      ufCrm21_1742871717: valorRestante,
    });
  } catch (error) {
    console.error(
      "Erro ao processar SPA Orçamento:",
      error.response?.data || error.message
    );
  }
}

module.exports = { executar };
