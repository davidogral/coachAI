const mongoose = require('../config/db');

const chatSchema = new mongoose.Schema({
    userMessage: String,
    botResponse: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
