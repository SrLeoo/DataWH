const modelDeal = require('./modelDeal');
const { buscarDealNoBitrix } = require('./modelDeal');

const modelCategorias = require('./modelCategorias');        // ID 1056
const modelCentroDeCusto = require('./modelCentroDeCusto');  // ID 1048
const modelOrcamento = require('./modelOrcamento');          // ID 1060
const modelParcelas = require('./modelParcelas');            // ID 1036
const modelProduto = require('./modelProduto');              // ID 1044
const modelProjetos = require('./modelProjetos');            // ID 1040

const { inserirNFIntegracao } = require('../entity/entityDeal');

async function identificarEProcessar(evento, data) {
  const isDeal = evento === 'ONCRMDEALUPDATE';
  const isSPA = evento.startsWith('ONCRMDYNAMICITEM');

  // Processar negócio tradicional
  if (isDeal) {
    const dealId = data['data[FIELDS][ID]'];
    const deal = await buscarDealNoBitrix(dealId);
    if (!deal) return console.warn(`Deal ${dealId} não encontrada`);

    const categoryId = parseInt(deal.CATEGORY_ID);

    if (categoryId === 49) {
      console.log(`Deal ${deal.ID} é do funil 49. Processando Projetos...`);
      await modelDeal.processar(deal);
      await inserirNFIntegracao(deal);
      await modelProjetos.executar(deal);
    } else {
      console.log(`Deal ${deal.ID} pertence ao funil ${categoryId}. Ignorada.`);
    }

  // Processar SPA via model responsável
  } else if (isSPA) {
    const itemId = data['data[FIELDS][ID]'];
    const entityTypeId = parseInt(data['data[FIELDS][ENTITY_TYPE_ID]']);

    switch (entityTypeId) {
      case 1056:
        await modelCategorias.executar(itemId);
        break;
      case 1048:
        await modelCentroDeCusto.executar(itemId);
        break;
      case 1060:
        await modelOrcamento.executar(itemId);
        break;
      case 1036:
        await modelParcelas.executar(itemId);
        break;
      case 1044:
        await modelProduto.executar(itemId);
        break;
      case 1040:
        await modelProjetos.executar(itemId);
        break;
      default:
        console.log(`ENTITY_TYPE_ID ${entityTypeId} não mapeado`);
    }

  } else {
    console.log(`Evento ${evento} não tratado`);
  }
}

module.exports = { identificarEProcessar };