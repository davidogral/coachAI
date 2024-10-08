const express = require('express');
const mongoose = require('mongoose');
const chatRoutes = require('./routes/chat');
const config = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;

// Conectar ao MongoDB
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Middleware
app.use(express.json());
app.use(cors());

// Rotas
app.use('/api/chat', chatRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
