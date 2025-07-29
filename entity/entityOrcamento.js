const { conectarBanco } = require("../db/conecBD");

async function inserirSPAOrcamento(item) {
  try {
    const conexao = await conectarBanco();

    const sql = `
      INSERT INTO bi_alt.spa_Orcamento (
        id_Orcamento,
        orcamento_title,
        spa_valor_orcamento,
        spa_vigente,
        spa_valor_utilizado,
        spa_valor_restante,
        id_CentroDeCusto
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        orcamento_title = VALUES(orcamento_title),
        spa_valor_orcamento = VALUES(spa_valor_orcamento),
        spa_vigente = VALUES(spa_vigente),
        spa_valor_utilizado = VALUES(spa_valor_utilizado),
        spa_valor_restante = VALUES(spa_valor_restante),
        id_CentroDeCusto = VALUES(id_CentroDeCusto)
    `;

    const valores = [
      item.id,
      item.title || null,
      item.ufCrm21_1740551446497 || null,
      item.ufCrm21_1740820579 || null,
      item.ufCrm21_1742871692 || null,
      item.ufCrm21_1742871717 || null,
      item.parentId1048 || null
    ];

    console.log("🔄 Inserindo SPA Orçamento no banco...", valores);
    await conexao.query(sql, valores);
    console.log("✅ SPA Orçamento inserido com sucesso!");
    conexao.end();
  } catch (err) {
    console.error("❌ Erro ao inserir SPA Orçamento:", err.message);
  }
}

module.exports = { inserirSPAOrcamento };
