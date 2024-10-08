<template>
    <div id="input-container">
      <input v-model="userMessage" type="text" id="question" placeholder="Digite sua pergunta" />
      <button @click="sendMessage" id="sendButton">Enviar</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userMessage: ''
      };
    },
    methods: {
      sendMessage() {
        this.$emit('newMessage', { userMessage: this.userMessage, botResponse: 'Processing...' });
        this.userMessage = '';
      }
    }
  };
  </script>
  