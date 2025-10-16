const { conectarBanco } = require("../db/conecBD");

async function inserirCentroDeCusto(item) {
  try {
    const conexao = await conectarBanco();

    const sql = `
      INSERT INTO bi_alt.spa_CentroDeCusto (
        id_CentroDeCusto,
        CentroDeCusto_title,
        spa_valor_orcamento,
        spa_status,
        spa_valor_utilizado,
        spa_valor_restante,
        spa_report_enviado
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        CentroDeCusto_title = VALUES(CentroDeCusto_title),
        spa_valor_orcamento = VALUES(spa_valor_orcamento),
        spa_status = VALUES(spa_status),
        spa_valor_utilizado = VALUES(spa_valor_utilizado),
        spa_valor_restante = VALUES(spa_valor_restante),
        spa_report_enviado = VALUES(spa_report_enviado)
    `;

    const valores = [
      item.id,
      item.title || null,
      item.ufCrm15_1740128202 || null,
      item.ufCrm15_1740548804349 || null,
      item.ufCrm15_1740556366 || null,
      item.ufCrm15_1742744559 || null,
      item.ufCrm15_1743529391 || null,
    ];

    console.log("Inserindo Centro de Custo no banco...", valores);
    await conexao.query(sql, valores);
    console.log("Centro de Custo inserido com sucesso!");
    conexao.end();
  } catch (err) {
    console.error("Erro ao inserir Centro de Custo:", err.message);
  }
}

module.exports = { inserirCentroDeCusto };
