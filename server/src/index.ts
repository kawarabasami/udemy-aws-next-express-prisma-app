import { PrismaClient } from '@prisma/client';
import express from 'express';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

const PORT = 8080;

app.get('/allTodos', async (req, res) => {
  const allTodos = await prisma.todo.findMany();
  return res.send(allTodos);
});

app.post('/createTodo', async (req, res) => {
  const { title, isCompleted } = req.body;
  const newTodo = await prisma.todo.create({
    data: {
      title,
      isCompleted
    }
  });
  return res.send(newTodo);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
