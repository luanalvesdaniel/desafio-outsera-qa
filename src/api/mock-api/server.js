import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
// Middleware para tratar JSON malformado
app.use(express.json({
  strict: true,
  verify: (req, res, buf, encoding) => {
    try {
      JSON.parse(buf.toString(encoding));
    } catch (e) {
      req.invalidJson = true;
    }
  }
}));

// Middleware de autenticação simples
app.use((req, res, next) => {
  if (req.headers.authorization === 'Bearer token-invalido') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// Usuários mockados
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Listar usuários
app.get('/users', (req, res) => {
  res.status(200).json({ users });
});

// Buscar usuário por ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json(user);
});

// Criar usuário
app.post('/users', (req, res) => {
  if (req.invalidJson) return res.status(400).json({ error: 'Malformed JSON' });
  // console.log('POST /users payload:', req.body);
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Missing fields' });
  const id = users.length + 1;
  const user = { id, name, email };
  users.push(user);
  res.status(201).json(user);
});

// Atualizar usuário
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { name, email } = req.body;
  if (!name && !email) return res.status(400).json({ error: 'Missing fields' });
  if (name) user.name = name;
  if (email) user.email = email;
  res.status(200).json(user);
});

// Deletar usuário
app.delete('/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(idx, 1);
  res.status(204).send();
});

// Handler para métodos não implementados (Express 5): usar app.use sem path
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const port = process.env.MOCK_API_PORT || 3001;
app.listen(port, () => {
  console.log(`Mock API rodando na porta ${port}`);
});
