const modelDeal = require('./modelDeal'); // Exibe dados básicos
const { buscarDealNoBitrix } = require('./modelDeal');
const { buscarSPAItemNoBitrix } = require('./modelSPA');

const modelCategorias = require('./modelCategorias');     // ID 1056
const modelCentroDeCusto = require('./modelCentroDeCusto'); // ID 1048
const modelOrcamento = require('./modelOrcamento');       // ID 1060
const modelParcelas = require('./modelParcelas');         // ID 1036
const modelProduto = require('./modelProduto');           // ID 1044
const modelProjetos = require('./modelProjetos');         // ID 1040

const { inserirNFIntegracao } = require('../entity/entityDeal'); // ✅ inserção no banco

async function identificarEProcessar(evento, data) {
  const isDeal = evento === 'ONCRMDEALUPDATE';
  const isSPA = evento.startsWith('ONCRMDYNAMICITEM');

  // Processar Deal tradicional
  if (isDeal) {
    const dealId = data['data[FIELDS][ID]'];
    const deal = await buscarDealNoBitrix(dealId);
    if (!deal) return console.warn(`Deal ${dealId} não encontrada`);

    const categoryId = parseInt(deal.CATEGORY_ID);

    if (categoryId === 49) {
      console.log(`Deal ${deal.ID} é do funil 49. Processando Projetos...`);

      await modelDeal.processar(deal);              // Exibe os dados
      await inserirNFIntegracao(deal);              // ✅ Insere no banco
      await modelProjetos.processar(deal);          // Continua o fluxo
    } else {
      console.log(`Deal ${deal.ID} pertence ao funil ${categoryId}. Ignorada.`);
    }

  // Processar SPA
  } else if (isSPA) {
    const itemId = data['data[FIELDS][ID]'];
    const entityTypeId = parseInt(data['data[FIELDS][ENTITY_TYPE_ID]']);
    const item = await buscarSPAItemNoBitrix(entityTypeId, itemId);
    if (!item) return console.warn(`SPA ID ${itemId} não encontrado`);

    switch (entityTypeId) {
      case 1056:
        console.log(`SPA ${item.id} (Categorias)`);
        await modelCategorias.processar(item);
        break;
      case 1048:
        console.log(`SPA ${item.id} (Centro de Custo)`);
        await modelCentroDeCusto.processar(item);
        break;
      case 1060:
        console.log(`SPA ${item.id} (Orçamento)`);
        await modelOrcamento.processar(item);
        break;
      case 1036:
        console.log(`SPA ${item.id} (Parcelas)`);
        await modelParcelas.processar(item);
        break;
      case 1044:
        console.log(`SPA ${item.id} (Produto)`);
        await modelProduto.processar(item);
        break;
      case 1040:
        console.log(`SPA ${item.id} (Projetos)`);
        await modelProjetos.processar(item);
        break;
      default:
        console.log(`ENTITY_TYPE_ID ${entityTypeId} não mapeado`);
    }

  } else {
    console.log(`Evento ${evento} não tratado`);
  }
}

module.exports = { identificarEProcessar };
