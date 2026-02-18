import express from 'express';

const app = express();
app.use(express.json());

// Simula endpoint rápido
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Simula endpoint com pequeno delay
app.get('/users', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  res.status(200).json({ users: [] });
});

// Simula endpoint pesado
app.get('/heavy', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  res.status(200).json({ data: 'heavy response' });
});

app.listen(3001, () => {
  console.log('Mock API running on http://localhost:3001');
});
