require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log("Conectado ao MySQL");
});

app.get("/", (req, res) => {
    res.send("API rodando");
});

app.get("/dietas", (req, res) => {
    db.query("SELECT * FROM dietas", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results); 
    })
});

/*
    Query para busca de dados, serve para poder calcular a TMB
*/
app.get("/usuario/:id_usuario", (req, res) => {
    const userId = req.params.id_usuario;

    db.query(`SELECT altura_usuario,
        sexo_usuario,
        idade_usuario,
        peso_usuario,
        tipo_atividade_fisica,
        tmb_usuario
        FROM usuarios WHERE id_usuario = ?`, [userId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
});

/*
    Query para inserção de tmb no usuário
*/

app.post("/usuario/salvarTmb/:id_usuario", (req, res) => {
    const userId = req.params.id_usuario;
    const { tmb } = req.body;

    if (!tmb) {
        return res.status(400).json({ error: "TMB não fornecida" });
    }

    const query = `
        UPDATE usuarios
        SET tmb_usuario = ?
        WHERE id_usuario = ?
    `;

    db.query(query, [tmb, userId], (err, results) => {
        if (err) {
            console.error("Erro ao atualizar TMB:", err);
            return res.status(500).json({ error: "Erro ao salvar TMB" });
        }

        return res.status(200).json({ message: "TMB atualizada com sucesso!" });
    });
});


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
