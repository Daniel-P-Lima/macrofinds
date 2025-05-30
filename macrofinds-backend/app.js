const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "macrofinds"
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
        tipo_atividade_fisica
        FROM usuarios WHERE id_usuario = ?`, [userId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
