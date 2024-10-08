const express = require('express');
const Chat = require('../models/Chat');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userMessage, botResponse } = req.body;
    const chat = new Chat({ userMessage, botResponse });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    console.error('Erro ao salvar mensagem:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

router.get('/', async (req, res) => {
  try {
    const chats = await Chat.find().sort({ timestamp: -1 }).limit(5);
    res.json(chats);
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
