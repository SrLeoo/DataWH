require('dotenv').config();
const express = require('express');
const { identificarEProcessar } = require('./models/routerEntity');
const { pool } = require('./db/conecBD');
const pino = require('pino')({ level: process.env.LOG_LEVEL || 'info' });

const app = express();
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(express.raw({ type: '*/*' }));

(async () => {
  try {
    await pool.query('SELECT 1');
    pino.info('Conexão DB validada!');
  } catch (err) {
    pino.error('Falha conexão DB:', err);
    process.exit(1);
  }
})();

app.post('/', async (req, res) => {
  try {
    const data = new URLSearchParams(req.body.toString());
    const evento = data.get('event');
    if (evento) {
      await identificarEProcessar(evento, Object.fromEntries(data));
    }
    res.status(200).send('OK');
  } catch (err) {
    pino.error('Erro processamento:', err);
    res.status(500).send('Erro interno');
  }
});

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
  } catch {
    res.status(500).json({ status: 'DB Error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => pino.info(`Servidor na porta ${port}`));