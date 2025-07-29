# 📦 Data Warehouse Bitrix24

Este projeto integra dados do Bitrix24 com um Data Warehouse (MySQL)

- Negócios (Deals)
- SPA

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Axios
- MySQL
- dotenv

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```
BITRIX_WEBHOOK=https://SEU_DOMINIO.bitrix24.com/rest/WEBHOOK_ID
DB_HOST='...'
DB_USER='...'
DB_PASSWORD='...'
DB_NAME='...'
```

---

## 📦 Instalação e Execução
Clone o repositorio
```
git clone https://github.com/SrLeoo/DataWH.git
```

Instale as dependências:

```
npm install
```

Inicie o projeto:

```
node app.js
```

---
# Duvidas
## ➕ Como Adicionar um Novo Campo

Este guia explica o processo completo para adicionar um novo campo a uma tabela integrada com o Bitrix24.

1. Atualizar o Banco de Dados (MySQL)  
Adicione a nova coluna na tabela desejada:

```
ALTER TABLE bi_alt.NOME_DA_TABELA
ADD COLUMN NOME_DO_CAMPO VARCHAR(45) NULL;
```

Substitua `NOME_DA_TABELA` e `NOME_DO_CAMPO` pelos nomes reais da estrutura que você está acrescentar.

2. Atualizar o Arquivo da Entidade  
No arquivo da entidade correspondente (ex: `entity/entityProduto.js`), inclua o novo campo com o respectivo código do Bitrix24 (UF_CRM...):

```
const dados = {
  // campos existentes
  novo_campo: item.UF_CRM_XX_XXXXXXXXXXXX, // Substitua pelo ID real do campo no Bitrix24
};
```

3. Atualizar o Arquivo do Model  
No arquivo de model correspondente (ex: `models/modelProduto.js`), atualize a query de inserção e os valores:

```
const values = [
  ...,
  dados.novo_campo
];
```

Certifique-se de que o campo também está listado na query `INSERT INTO ...`.

---

Autor: Its a Maga
