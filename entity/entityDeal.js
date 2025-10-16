const { conectarBanco } = require('../db/conecBD');

async function inserirNFIntegracao(deal) {
  try {
    const conexao = await conectarBanco();

    const sql = `
      INSERT INTO bi_alt.deal_NFIntegracao (
        id_deal,
        deal_title,
        deal_valor,
        deal_dataEmissao,
        deal_resumo,
        deal_comprador,
        deal_NFCNPJ,
        deal_NFFornecedor,
        deal_qtdParcelas,
        deal_responsavel,
        deal_dataVencimento
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        deal_title = VALUES(deal_title),
        deal_valor = VALUES(deal_valor),
        deal_dataEmissao = VALUES(deal_dataEmissao),
        deal_resumo = VALUES(deal_resumo),
        deal_comprador = VALUES(deal_comprador),
        deal_NFCNPJ = VALUES(deal_NFCNPJ),
        deal_NFFornecedor = VALUES(deal_NFFornecedor),
        deal_qtdParcelas = VALUES(deal_qtdParcelas),
        deal_responsavel = VALUES(deal_responsavel),
        deal_dataVencimento = VALUES(deal_dataVencimento)
    `;
    
    const valores = [
      deal.ID,
      deal.TITLE,
      parseFloat(deal.OPPORTUNITY) || 0,
      deal.UF_CRM_1740818224573 || null, // Data da Emissão
      deal.UF_CRM_1671806783 || null,    // Resumo
      Array.isArray(deal.UF_CRM_1741097481) && deal.UF_CRM_1741097481.length > 0
        ? deal.UF_CRM_1741097481[0]
        : null,                          // Comprador
      deal.UF_CRM_1668797471381 || null, // CNPJ
      deal.UF_CRM_1668797465377 || null, // Fornecedor
      1, // Quantidade de parcelas (fixo)
      deal.ASSIGNED_BY_ID || null,       // Responsável
      deal.UF_CRM_1669380856931 || null // Data de Vencimento

    ];

    console.log('Inserindo no banco...', valores);
    await conexao.query(sql, valores);
    console.log('Deal inserida com sucesso no banco!');
    conexao.end();
  } catch (err) {
    console.error('Erro ao inserir deal:', err.message);
  }
}

module.exports = { inserirNFIntegracao };