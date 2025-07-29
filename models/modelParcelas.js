// models/modelParcelas.js
const axios = require('axios');
require('dotenv').config();

const { inserirSPAParcelas } = require('../entity/entityParcelas');

async function executar(itemId) {
  const entityTypeId = 1036;

  try {
    const url = `${process.env.BITRIX_WEBHOOK}/crm.item.get`;
    const response = await axios.get(url, {
      params: { entityTypeId, id: itemId }
    });

    const item = response.data.result.item;
    if (!item) {
      console.warn(`SPA ID ${itemId} não encontrado`);
      return;
    }

    // Exibe dados da SPA de Parcelas
    console.log(`\nSPA ${item.id} (Título: ${item.title})`);
    console.log(`Criado em: ${item.createdTime}`);
    console.log(`Responsável: ${item.assignedById}`);
    console.log(`parcela_title: ${item.ufCrm9_1734704375}`);
    console.log(`spa_vencimento_da_parcela: ${item.ufCrm9_1734704375}`);
    console.log(`spa_valor: ${item.ufCrm9_1734704390}`);
    console.log(`spa_forma_pagamento: ${item.ufCrm9_1736522633}`);
    console.log(`spa_agencia: ${item.ufCrm9_1736577702}`);
    console.log(`spa_operacao: ${item.ufCrm9_1736577799}`);
    console.log(`spa_conta: ${item.ufCrm9_1736577814}`);
    console.log(`spa_tipo_de_conta: ${item.ufCrm9_1736577834}`);
    console.log(`spa_banco: ${item.ufCrm9_1743618466962}`);
    console.log(`spa_negocio: ${item.parentId2}`);

    // Inserção no banco
    await inserirSPAParcelas(item);

  } catch (error) {
    console.error('Erro ao processar SPA Parcelas:', error.response?.data || error.message);
  }
}

module.exports = { executar };
