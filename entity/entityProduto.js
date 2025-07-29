// entity/entityProduto.js
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
        spa_id_centro_de_custo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        produtos_title = VALUES(produtos_title),
        spa_ncm_sh = VALUES(spa_ncm_sh),
        spa_quantidade = VALUES(spa_quantidade),
        spa_valor_unitario = VALUES(spa_valor_unitario),
        spa_valor_total = VALUES(spa_valor_total),
        spa_id_projeto = VALUES(spa_id_projeto),
        spa_id_centro_de_custo = VALUES(spa_id_centro_de_custo)
    `;

    const valores = [
      item.id,
      item.title || null,
      item.ufCrm13_1736526141 || null,
      item.ufCrm13_1736526487 || null,
      parseFloat((item.ufCrm13_1736526502 || '0').split('|')[0]),
      parseFloat((item.ufCrm13_1736526603 || '0').split('|')[0]),
      item.parentId1040 || null,
      item.parentId1048 || null
    ];

    console.log('🔄 Inserindo SPA de Produto no banco...', valores);
    await conexao.query(sql, valores);
    console.log('✅ Produto inserido com sucesso!');
    conexao.end();
  } catch (err) {
    console.error('❌ Erro ao inserir SPA Produto:', err.message);
  }
}

module.exports = { inserirSPAProduto };
