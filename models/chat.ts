const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  id: String,
  role: String,
  content: String,
});

const chatSchema = new Schema({
  chatId: String,
  messages: [MessageSchema],
  savedAt: {
    type: Date,
    default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
  },
});

const ChatModel = mongoose.model('Chat', chatSchema, 'Chats');

module.exports = ChatModel;
