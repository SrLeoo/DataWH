const mysql = require('mysql2');
require('dotenv').config();

const conectarBanco = () => {
    const conexao = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME 
    });

    return new Promise((resolve, reject) => {
        conexao.connect((err) => {
            if (err) {
                reject('Erro ao conectar no banco:' + err);
            } else {
                console.log('Conexão com o banco estabelecida');
                resolve(conexao);
            }
        });
    });
};

module.exports = { conectarBanco };