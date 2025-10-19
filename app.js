const http = require("http");
const { parse } = require("querystring");
const { identificarEProcessar } = require("./models/routerEntity");
const { pool } = require("./db/conecBD");

(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Conexão validada com sucesso!");
  } catch (err) {
    console.error("Falha ao validar conexão:", err);
    process.exit(1);
  }
})();

http
  .createServer((req, res) => {
    if (req.method === "POST" && req.url === "/") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const data = parse(body);
        const evento = data.event;

        if (evento) {
          identificarEProcessar(evento, data);
        }

        res.writeHead(200);
        res.end("OK");
      });
    } else {
      res.writeHead(404);
      res.end();
    }
  })
  .listen(3000, () => {
    console.log("App.js iniciado.");
  });
