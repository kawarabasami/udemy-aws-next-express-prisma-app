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
  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        isCompleted
      }
    });
    return res.send(newTodo);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

app.put('/editTodo/:id', async (req, res) => {
  const { id } = req.params;
  const { title, isCompleted } = req.body;
  try {
    const todo = await prisma.todo.update({
      where: {
        id: Number(id)
      },
      data: {
        title,
        isCompleted
      }
    });
    return res.send(todo);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

app.delete('/deleteTodo/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await prisma.todo.delete({
      where: {
        id: Number(id)
      }
    });
    return res.send(deletedTodo);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
