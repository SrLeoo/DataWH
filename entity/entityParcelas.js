const { conectarBanco } = require('../db/conecBD');

async function inserirSPAParcelas(item) {
  try {
    const conexao = await conectarBanco();

    // Captura dos campos corretamente mapeados
    const vencimento = item.ufCrm9_1734704375 || null;
    const valorBruto = item.ufCrm9_1734704390 || '';
    const valor = parseFloat(valorBruto.split('|')[0]) || 0;
    const idDeal = item.parentId2 || null;

    const sql = `
      INSERT INTO bi_alt.spa_Parcelas (
        id_parcela,
        parcela_title,
        spa_vencimento_da_parcela,
        spa_valor,
        spa_forma_pagamento,
        spa_agencia,
        spa_operacao,
        spa_conta,
        spa_tipo_de_conta,
        spa_banco,
        spa_dealvinculado
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        parcela_title = VALUES(parcela_title),
        spa_vencimento_da_parcela = VALUES(spa_vencimento_da_parcela),
        spa_valor = VALUES(spa_valor),
        spa_forma_pagamento = VALUES(spa_forma_pagamento),
        spa_agencia = VALUES(spa_agencia),
        spa_operacao = VALUES(spa_operacao),
        spa_conta = VALUES(spa_conta),
        spa_tipo_de_conta = VALUES(spa_tipo_de_conta),
        spa_banco = VALUES(spa_banco),
        spa_dealvinculado = VALUES(spa_dealvinculado)
    `;

    const valores = [
      item.id,
      item.title || null,
      vencimento,
      valor,
      item.ufCrm9_1736522633 || null,
      item.ufCrm9_1736577702 || null,
      item.ufCrm9_1736577799 || null,
      item.ufCrm9_1736577814 || null,
      item.ufCrm9_1736577834 || null,
      item.ufCrm9_1743618466962 || null,
      idDeal
    ];

    console.log('Inserindo SPA de Parcelas no banco...', valores);
    await conexao.query(sql, valores);
    console.log('Parcela inserida com sucesso!');
    conexao.end();
  } catch (err) {
    console.error('Erro ao inserir SPA de Parcelas:', err.message);
  }
}

module.exports = { inserirSPAParcelas };
