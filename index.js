const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const Chat = require('./models/chat.ts');

const openai = new OpenAI({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.CHATGPT_API_KEY,
});

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: req.body.message }],
    stream: false,
  });

  res.json({ response });
});

app.get('/models', async (req, res) => {
  const response = await openai.models.list();
  res.json({ models: response.data });
});

app.get('/chats', async (req, res) => {
  const chats = await Chat.find({}).sort({ savedAt: 'desc' });
  return res.status(200).json({
    chats,
  });
});

app.post('/chats', async (req, res) => {
  const { chatId, messages } = req.body;

  if (chatId) {
    Chat.findOne({ chatId })
      .then(async (chat) => {
        if (!chat) {
          const newChat = await Chat.create({
            chatId,
            messages,
            savedAt: new Date(),
          });

          res.json({ msg: 'Chat has been saved' });
        }

        if (chat) {
          const updatedChat = await Chat.findOneAndReplace(
            { chatId },
            {
              chatId,
              messages,
              savedAt: new Date(),
            },
          );
          console.log(updatedChat);
          res.json({ msg: 'Chat has been saved' });
        }
      })
      .catch((err) => console.log(err));
  }
});

app.delete('/chats/:id', async (req, res) => {
  await Chat.findOneAndDelete({ chatId: req.params.id });
  res.json({ msg: 'Chat has been deleted!' });
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to Mongo Atlas instance.'))
  .on('error', (error) =>
    console.log('Error connecting to Mongo Atlas:', error),
  );

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html')),
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

app.listen(PORT, () => {
  console.log(`Example app listening at port ${PORT}`);
});
