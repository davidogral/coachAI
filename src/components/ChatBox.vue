<template>
    <div id="chat-box">
        <div v-for="message in messages" :key="message._id" class="response-message">
            <strong>Usuário:</strong> {{ message.userMessage }} <br />
            <strong>Gemini:</strong> {{ message.botResponse }}
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            messages: [
                {
                    userMessage: '',
                    botResponse: ''
                }
            ]
        };
    },
    mounted() {
        //this.fetchMessages();
    },
    methods: {
        async fetchMessages() {
            const response = await fetch('http://localhost:3000/api/chat');
            this.messages = await response.json();
        }
    }
};
</script>
  