// entity/entityProjeto.js
const { conectarBanco } = require("../db/conecBD");

async function inserirSPAProjeto(item) {
  try {
    const conexao = await conectarBanco();

    const sql = `
INSERT INTO bi_alt.spa_Projetos (
  id_Projetos,
  projetos_title,
  spa_custo_real_fechamento,
  spa_economia_do_projeto,
  spa_valor_pendente,
  spa_custo_previsto,
  spa_custo_realizado,
  spa_codigo,
  spa_identificacao,
  spa_endereco,
  spa_cidade,
  spa_uf,
  spa_cep,
  spa_Projetoscol
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
ON DUPLICATE KEY UPDATE
  projetos_title = VALUES(projetos_title),
  spa_custo_real_fechamento = VALUES(spa_custo_real_fechamento),
  spa_economia_do_projeto = VALUES(spa_economia_do_projeto),
  spa_valor_pendente = VALUES(spa_valor_pendente),
  spa_custo_previsto = VALUES(spa_custo_previsto),
  spa_custo_realizado = VALUES(spa_custo_realizado),
  spa_codigo = VALUES(spa_codigo),
  spa_identificacao = VALUES(spa_identificacao),
  spa_endereco = VALUES(spa_endereco),
  spa_cidade = VALUES(spa_cidade),
  spa_uf = VALUES(spa_uf),
  spa_cep = VALUES(spa_cep),
  spa_Projetoscol = VALUES(spa_Projetoscol)
    `;

    const valores = [
      item.id,
      item.title || null,
      item.ufCrm11_1736527482 || null, // Custo real [Fechamento]
      item.ufCrm11_1736527517 || null, // Economia do projeto
      item.ufCrm11_1736527535 || null, // Valor pendente [Previsto-Realizado]
      item.ufCrm11_1736527556 || null, // Custo previsto
      item.ufCrm11_1736527566 || null, // Custo realizado
      item.ufCrm11_1740118723 || null, // Código
      item.ufCrm11_1740118797 || null, // Identificação
      item.ufCrm11_1740118816 || null, // Endereço
      item.ufCrm11_1740118837 || null, // Cidade
      item.ufCrm11_1740118857 || null, // UF
      item.ufCrm11_1740118870 || null, // CEP
      item.ufCrm11_1740118879 || null, // spa_Projetoscol
    ];

    console.log("🔄 Inserindo SPA de Projeto no banco...", valores);
    await conexao.query(sql, valores);
    console.log("✅ Projeto inserido com sucesso!");
    conexao.end();
  } catch (err) {
    console.error("❌ Erro ao inserir SPA Projeto:", err.message);
  }
}

module.exports = { inserirSPAProjeto };
