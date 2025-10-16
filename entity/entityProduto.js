const { conectarBanco } = require('../db/conecBD');

async function inserirSPAProduto(item) {
  try {
    const conexao = await conectarBanco();

    const sql = `
      INSERT INTO bi_alt.spa_Produtos (
        id_produtos,
        produtos_title,
        spa_ncm_sh,
        spa_quantidade,
        spa_valor_unitario,
        spa_valor_total,
        spa_id_projeto,
        spa_id_centro_de_custo,
        spa_subcategoria,
        spa_conta_contabil,
        spa_quantidade_fechamento
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        produtos_title = VALUES(produtos_title),
        spa_ncm_sh = VALUES(spa_ncm_sh),
        spa_quantidade = VALUES(spa_quantidade),
        spa_valor_unitario = VALUES(spa_valor_unitario),
        spa_valor_total = VALUES(spa_valor_total),
        spa_id_projeto = VALUES(spa_id_projeto),
        spa_id_centro_de_custo = VALUES(spa_id_centro_de_custo),
        spa_subcategoria = VALUES(spa_subcategoria),
        spa_conta_contabil = VALUES(spa_conta_contabil),
        spa_quantidade_fechamento = VALUES(spa_quantidade_fechamento)
    `;

    const valores = [
      item.id,
      item.title || null,
      item.ufCrm13_1736526141 || null, // NCM/SH
      item.ufCrm13_1736526487 || null, // Quantidade
      parseFloat(item.ufCrm13_1736526502?.split('|')[0]) || 0, // Valor Unitário
      parseFloat(item.ufCrm13_1736526603?.split('|')[0]) || 0, // Valor Total
      item.parentId1040 || null,       // Projeto
      item.parentId1048 || null,       // Centro de Custo
      item.ufCrm13_1741811686 || null, // Subcategoria
      item.ufCrm13Contacontabil || null, // Conta Contábil
      item.ufCrm13_1742708209 || null  // Quantidade [Fechamento]
    ];

    console.log('Inserindo SPA de Produto no banco...', valores);
    await conexao.query(sql, valores);
    console.log('Produto inserido com sucesso!');
    conexao.end();
  } catch (err) {
    console.error('Erro ao inserir SPA Produto:', err.message);
  }
}

module.exports = { inserirSPAProduto };
