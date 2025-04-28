const { conectarBanco } = require('./db/conecBD');

async function iniciar() {
    try {
        const conexao = await conectarBanco();
        console.log('Conexão feita com sucesso! 🎉');
        conexao.end(); // encerra a conexão depois
    } catch (erro) {
        console.error(erro);
    }
}

iniciar();
