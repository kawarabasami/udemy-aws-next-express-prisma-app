import { ApolloServer } from '@apollo/server';
import { PrismaClient } from '@prisma/client';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import cors from 'cors';
import express from 'express';
import http from 'http';

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

const PORT = 8080;

// REST

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

// GraphQL

interface MyContext {
  token?: string;
}

const todos = [
  { id: 1, title: 'Todo 1', isCompleted: false },
  { id: 2, title: 'Todo 2', isCompleted: true },
  { id: 3, title: 'Todo 3', isCompleted: false }
];

const typeDefs = `#graphql
  type Todo {
    id: Int
    title: String
    isCompleted: Boolean
  }
  type Query {
    Todos: [Todo]
  }
`;

const resolvers = {
  Query: {
    Todos: () => todos
  }
};

const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

(async () => {
  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token })
    })
  );
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4001 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4001/graphql`);
})();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
