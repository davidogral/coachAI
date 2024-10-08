<template>
  <div id="app">
    <header>
      <h1>ChatBot Histórico</h1>
    </header>
    <ChatBot @sendMessage="storeChatHistory" />
  </div>
</template>

<script setup>
// import { ref } from 'vue';
import ChatBot from './components/ChatBot.vue'; // Verifique se o caminho está correto
import axios from 'axios';
 
const storeChatHistory = async (userMessage , botResponse) => {
  try {
    alert("oi");
    // Envia as mensagens para a API de armazenamento
    const response = await axios.post('http://localhost:3000/api/chat', {
      userMessage,
      botResponse
    });
    console.log('Histórico salvo com sucesso:', response.data);
  } catch (error) {
    console.error('Erro ao salvar o histórico:', error);
  }
};
</script>

<style>
#app {
  text-align: center;
}
header {
  background-color: #42b983;
  color: white;
  padding: 10px;
}
</style>
