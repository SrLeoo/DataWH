const { pool } = require("../db/conecBD");

async function inserirSPACategoria(item) {
  try {
    const sql = `
      INSERT INTO bi_alt.spa_Categorias (
        id_Categorias,
        categorias_title,
        spa_valor_orcamento,
        spa_valor_utilizado,
        spa_status,
        spa_valor_restante
      ) VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        categorias_title = VALUES(categorias_title),
        spa_valor_orcamento = VALUES(spa_valor_orcamento),
        spa_valor_utilizado = VALUES(spa_valor_utilizado),
        spa_status = VALUES(spa_status),
        spa_valor_restante = VALUES(spa_valor_restante)
    `;

    const valores = [
      item.id,
      item.title || null,
      item.ufCrm19_1740129258 || null, // Valor Orçamento
      item.ufCrm19_1740555537 || null, // Valor Utilizado
      item.ufCrm19_1740820304 || null, // Status
      item.ufCrm19_1742744609 || null, // Valor Restante
    ];

    //console.log("Inserindo SPA de Categoria no banco...", valores);
    await pool.query(sql, valores);
    console.log("Categoria inserida com sucesso!");
  } catch (err) {
    console.error("Erro ao inserir SPA Categoria:", err.message);
  }
}

module.exports = { inserirSPACategoria };
