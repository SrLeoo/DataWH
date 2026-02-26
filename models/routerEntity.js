const modelDeal = require('./modelDeal');
const modelCategorias = require('./modelCategorias'); // ID 1056
const modelCentroDeCusto = require('./modelCentroDeCusto'); // ID 1048
const modelOrcamento = require('./modelOrcamento'); // ID 1060
const modelParcelas = require('./modelParcelas'); // ID 1036
const modelProduto = require('./modelProduto'); // ID 1044
const modelProjetos = require('./modelProjetos'); // ID 1040
const { inserirNFIntegracao } = require('../entity/entityDeal');

const pino = require('pino')();

const SPA_HANDLERS = {
  1056: modelCategorias.executar.bind(modelCategorias),
  1048: modelCentroDeCusto.executar.bind(modelCentroDeCusto),
  1060: modelOrcamento.executar.bind(modelOrcamento),
  1036: modelParcelas.executar.bind(modelParcelas),
  1044: modelProduto.executar.bind(modelProduto),
  1040: modelProjetos.executar.bind(modelProjetos)
};

async function identificarEProcessar(evento, data) {
  const isDeal = evento === 'ONCRMDEALUPDATE' || evento === 'ONCRMDEALADD';
  const isSPA = evento === 'ONCRMDYNAMICITEMUPDATE' || evento === 'ONCRMDYNAMICITEMADD';

  if (isDeal) {
    const dealId = data['data[FIELDS][ID]'];
    const deal = await modelDeal.buscarDealNoBitrix(dealId); // Assumindo que existe em modelDeal
    const categoryId = parseInt(deal.CATEGORY_ID);

    if (categoryId === 49 && !deal.TITLE.includes('[Cópia]')) {
      pino.info(`Processando Deal ${deal.ID} (funil 49)`);
      await Promise.all([
        modelDeal.processar(deal),
        inserirNFIntegracao(deal)
      ]);
    }
  } else if (isSPA) {
    const itemId = data['data[FIELDS][ID]'];
    const entityTypeId = parseInt(data['data[FIELDS][ENTITY_TYPE_ID]']);
    const handler = SPA_HANDLERS[entityTypeId];
    if (handler) {
      await handler(itemId);
    } else {
      pino.warn(`ENTITY_TYPE_ID ${entityTypeId} não mapeado`);
    }
  } else {
    pino.info(`Evento ${evento} ignorado`);
  }
}

module.exports = { identificarEProcessar };