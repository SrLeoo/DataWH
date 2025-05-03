const axios = require('axios');
require('dotenv').config();

const listarNegociosAPI = async () => {
    try {

        const url = `${process.env.BITRIX_WEBHOOK}/crm.deal.list`;

        const response = await axios.get(url, {
            params: {
                filter: {
                    "CATEGORY_ID": "49", //NÃO MEXER
                },
                select: ["ID", "TITLE" ],
                order: {"ID": "ASC"}
            }
        });

        if (response.data.result) {
            console.log(response.data.result);
        } else {
            console.log("Nenhum negócio encontrado no funil 49.");
        }
    } catch (error) {
        console.error('Erro ao buscar os negócios na API do Bitrix:', error);
    }
};

listarNegociosAPI();