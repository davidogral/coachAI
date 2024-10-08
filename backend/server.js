const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const requestIp = require('request-ip');

// Conectar ao MongoDB Atlas
const uri = "mongodb+srv://user:user@cluster0.g7njc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(requestIp.mw());

// Modelo para o histórico de conversas
const chatSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ID do usuário
  userMessage: { type: String, required: true },
  botResponse: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  ip: { type: String, required: true } // Endereço IP
});

const Chat = mongoose.model('Chat', chatSchema);

// Modelo para o histórico de logins
const loginSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ID do usuário
  timestamp: { type: Date, default: Date.now },
  ip: { type: String, required: true } // Endereço IP
});

const Login = mongoose.model('Login', loginSchema);

// Endpoint para salvar o histórico de conversas
app.post('/api/chat', async (req, res) => {
  const { userId, userMessage, botResponse } = req.body;
  const ip = req.clientIp; // Captura o IP do cliente
  const chat = new Chat({ userId, userMessage, botResponse, ip });

  try {
    await chat.save();
    res.status(200).send(chat);
    console.log(sucess);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

// Endpoint para pegar o histórico de conversas (últimos 5 registros de um usuário específico)
app.get('/api/chat/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const chats = await Chat.find({ userId }).sort({ timestamp: -1 }).limit(5);
    res.status(200).send(chats);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint para registrar logins de usuário
app.post('/api/login', async (req, res) => {
  const { userId } = req.body;
  const ip = req.clientIp; // Captura o IP do cliente
  const login = new Login({ userId, ip });

  try {
    await login.save();
    res.status(200).send(login);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint para pegar o histórico de logins de um usuário
app.get('/api/login/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const logins = await Login.find({ userId }).sort({ timestamp: -1 });
    res.status(200).send(logins);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
