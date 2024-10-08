<template>
  <div class="chatbot">
    <ChatInput @send="handleSend" />
    <ChatBox :messages="messages" />
  </div>
  <div id="chat-container">
    <div id="header">
      <h1>VIRTUAL COACH</h1>
    </div>
    <div id="chat-box">
      <div v-for="message in chatHistory" :key="message.id">
        <div v-if="message.type === 'user'">
          <span class="user-message">{{ message.text }}</span>
        </div>
        <div v-else-if="message.type === 'response'">
          <span class="response-message">{{ message.text }}</span>
        </div>
        <div v-else-if="message.type === 'error'">
          <span class="error-message">{{ message.text }}</span>
        </div>
        <div v-else>
          <span>Unknown message type: {{ message.type }}</span>
        </div>
      </div>
    </div>
    <div id="input-container">
      <input type="text" id="question" v-model="question" placeholder="Digite sua pergunta">
      <button @click="postChatResponse('Olá', 'Resposta do bot'); askGemini()" id="sendButton">Enviar</button>
      <input type="file" id="fileInput" @change="handleFileInput">
    </div>
  </div>
</template>
  
<script>
//import { ref } from 'vue';
//import ChatInput from './ChatInput.vue';
//import ChatBox from './ChatBox.vue';

// Lista de mensagens
//const messages = ref([]);
import { ref } from 'vue';
import axios from 'axios';

const chatResponse = ref(null);

// this.postChatResponse('Olá', 'Resposta do bot');


import { GoogleGenerativeAI } from "@google/generative-ai";

export default {
  data() {
    return {
      question: "",
      chatHistory: [],
      API_KEY: "AIzaSyBotIFsOfKTmmrojM0cFNQj30BDfH6O5uU", // Replace with your actual API key
    };
  },
  methods: {
    async postChatResponse(userMessage, botResponse) {
      try {
        const response = await axios.post('http://localhost:3000/api/chat', { userMessage, botResponse });
        chatResponse.value = response.data;
      } catch (error) {
        console.error('Erro ao enviar a mensagem:', error);
      }
    },

    async askGemini() {
      if (!this.question) return;

      const genAI = new GoogleGenerativeAI(this.API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      try {
        const result = await model.generateContent(this.question);
        const response = await result.response.text();

        this.chatHistory.push({
          type: "response",
          text: response,
          id: Date.now(), // Add a unique ID for tracking
        });

        this.question = ""; // Clear the question input after sending
      } catch (error) {
        this.chatHistory.push({
          type: "error",
          text: "Erro: " + error.message,
          id: Date.now(),
        });
      }
      const response1 = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify(message)
      });

      response1;
    },
    handleFileInput(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.chatHistory.push({
            type: "file",
            text: e.target.result,
            id: Date.now(),
          });
        };
        reader.readAsText(file);
      }
    },
  },
};
</script>
  
<style scoped>
/* Add your styling here, similar to the original HTML code */
.user-message {
  text-align: center;
  /* ... */
}

.response-message {
  /* ... */
  text-align: center;
}

.error-message {
  /* ... */
  text-align: center;
}

.file-content {
  /* ... */
  text-align: center;
}</style>