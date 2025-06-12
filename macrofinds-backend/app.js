  require("dotenv").config();

  const express = require("express");
  const cors    = require("cors");
  const { PrismaClient } = require("@prisma/client");

  const prisma = new PrismaClient();
  const app    = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (_, res) => res.send("API rodando"));

  app.get("/foods", async (_, res) => {
    const foods = await prisma.food.findMany();
    res.json(foods);
  });

  app.post("/foods", async (req, res) => {
    const { name, unit, price, cal, prot, carb } = req.body;
    try {
      const food = await prisma.food.create({
        data: { name, unit, price, cal, prot, carb }
      });
      res.status(201).json(food);
    } catch (err) {
      console.error("Erro ao criar alimento:", err);
      res.status(500).json({ error: "Falha ao criar alimento" });
    }
  });

app.get("/dietas", async (_, res) => {
  try {
    const dietas = await prisma.diet.findMany({
      include: {
        plates: {
          include: {
            foods: true 
          }
        }
      }
    });
    const resultado = dietas.map(diet => ({
      name: diet.name,
      plates: diet.plates.map(plate => ({
        name: plate.name,
        food: plate.foods.map(pf => ({
          id: pf.foodId,
          amount: pf.amount
        }))
      }))
    }));

    res.json(resultado);
  } catch (err) {
    console.error("Erro ao buscar dietas:", err);
    res.status(500).json({ error: "Falha ao buscar dietas" });
  }
});


  app.post("/dietas", async (req, res) => {
    const { name, objective, userId } = req.body;
    const dieta = await prisma.diet.create({
      data: { name, objective, userId }
    });
    res.json(dieta);
  });

  app.post("/dietas/:dietId/plates", async (req, res) => {
    const { name } = req.body;
    const plate = await prisma.plate.create({
      data: { name, dietId: Number(req.params.dietId) }
    });
    res.json(plate);
  });

  app.post("/plates/:plateId/foods", async (req, res) => {
    const { foodId, amount } = req.body;
    const plateFood = await prisma.plateFood.create({
      data: {
        plateId: Number(req.params.plateId),
        foodId,
        amount
      }
    });
    res.json(plateFood);
  });

  app.put("/plates/:plateId/foods/:foodId", async (req, res) => {
    const { amount } = req.body;
    const updated = await prisma.plateFood.update({
      where: {
        plateId_foodId: {
          plateId: Number(req.params.plateId),
          foodId: Number(req.params.foodId)
        }
      },
      data: { amount }
    });
    res.json(updated);
  });

  app.delete("/plates/:plateId/foods/:foodId", async (req, res) => {
    await prisma.plateFood.delete({
      where: {
        plateId_foodId: {
          plateId: Number(req.params.plateId),
          foodId: Number(req.params.foodId)
        }
      }
    });
    res.json({ ok: true });
  });
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