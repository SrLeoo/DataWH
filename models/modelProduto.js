async function processar(item) {
  const id = item.id;
  const title = item.title;
  const stageId = item.stageId;
  const dataCriacao = item.createdTime;

  console.log('🛠️ Processando Produto:');
  console.log('🔹 ID:', id);
  console.log('🔹 TITLE:', title);
  console.log('🔹 STAGE_ID:', stageId);
  console.log('🔹 DATE_CREATE:', dataCriacao);

  // aqui você pode salvar no banco, ou passar para uma entidade
}

module.exports = { processar };
