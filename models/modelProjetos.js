// models/modelProjetos.js
const axios = require('axios');
require('dotenv').config();

const { inserirSPAProjeto } = require('../entity/entityProjeto');

async function executar(itemId) {
  const entityTypeId = 1040; // ID da SPA de Projetos

  try {
    const url = `${process.env.BITRIX_WEBHOOK}/crm.item.get`;
    const response = await axios.get(url, {
      params: { entityTypeId, id: itemId }
    });

    const item = response.data.result.item;
    if (!item) {
      console.warn(`SPA Projeto ID ${itemId} não encontrado`);
      return;
    }

    console.log(`SPA ${item.id} (Projeto)`);
    console.log(`Título: ${item.title}`);
    console.log(`Custo Real [Fechamento]: ${item.ufCrm11_1736527482}`);
    console.log(`Economia do projeto [Previsto-Real]: ${item.ufCrm11_1736527517}`);
    console.log(`Valor pendente [Previsto-Realizado]: ${item.ufCrm11_1736527535}`);
    console.log(`Custo previsto [Manual]: ${item.ufCrm11_1736527556}`);
    console.log(`Custo realizado [Automático]: ${item.ufCrm11_1736527566}`);
    console.log(`Código: ${item.ufCrm11_1740118723}`);
    console.log(`Identificação: ${item.ufCrm11_1740118797}`);
    console.log(`Endereço: ${item.ufCrm11_1740118816}`);
    console.log(`Cidade: ${item.ufCrm11_1740118837}`);
    console.log(`UF: ${item.ufCrm11_1740118857}`);
    console.log(`CEP: ${item.ufCrm11_1740118870}`);
    console.log(`Projetoscol: ${item.ufCrm11_1740118879}`);

    // Inserção no banco
    await inserirSPAProjeto(item);

  } catch (error) {
    console.error('Erro ao processar SPA Projeto:', error.response?.data || error.message);
  }
}

module.exports = { executar };
