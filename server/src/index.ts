import express from 'express';

const app = express();

const PORT = 8080;

app.get('/allTodos', (req, res) => {
  return res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
