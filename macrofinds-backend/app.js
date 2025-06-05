require("dotenv").config();

const express = require("express");
const cors    = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app    = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.send("API rodando"));

/* Lista todas as dietas */
app.get("/dietas", async (_, res) => {
  try {
    const dietas = await prisma.dietas.findMany();
    res.json(dietas);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/* Busca dados para cálculo de TMB */
app.get("/usuario/:id_usuario", async (req, res) => {
  try {
    const usuario = await prisma.usuarios.findUnique({
      where: { id_usuario: Number(req.params.id_usuario) },
      select: {
        altura_usuario: true,
        sexo_usuario: true,
        idade_usuario: true,
        peso_usuario: true,
        tipo_atividade_fisica: true,
        tmb_usuario: true 
      }
    });
    if (!usuario)
      return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.post("/usuario/:id_usuario", async (req, res) => {
  const {
    peso,            // kg
    altura,          // cm
    sexo,            // 'Masculino' | 'Feminino'
    intensidade,     // 'N' | 'M' | 'I'
    idade,           // anos
    tmb              // opcional
  } = req.body;

  // monta objeto só com o que veio preenchido
  const data = {};
  if (peso        !== undefined) data.peso_usuario     = peso;
  if (altura      !== undefined) data.altura_usuario   = altura;
  if (sexo        !== undefined) data.sexo_usuario     = sexo;
  if (intensidade !== undefined) data.tipo_atividade_fisica = intensidade;
  if (idade       !== undefined) data.idade_usuario    = idade;
  if (tmb         !== undefined) data.tmb_usuario      = tmb;

  try {
    await prisma.usuarios.update({
      where: { id_usuario: Number(req.params.id_usuario) },
      data
    });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Falha ao salvar" });
  }
});

/* Atualiza TMB do usuário */
app.post("/usuario/salvarTmb/:id_usuario", async (req, res) => {
  const { tmb } = req.body;
  if (tmb == null)
    return res.status(400).json({ error: "TMB não fornecida" });

  try {
    await prisma.usuarios.update({
      where: { id_usuario: Number(req.params.id_usuario) },
      data:  { tmb_usuario: tmb }
    });
    res.json({ message: "TMB atualizada com sucesso!" });
  } catch (err) {
    console.error("Erro ao atualizar TMB:", err);
    res.status(500).json({ error: "Erro ao salvar TMB" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});