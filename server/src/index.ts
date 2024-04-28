import { PrismaClient } from '@prisma/client';
import express from 'express';

const app = express();
const prisma = new PrismaClient();

const PORT = 8080;

app.get('/allTodos', async (req, res) => {
  const allTodos = await prisma.todo.findMany();
  return res.send(allTodos);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
