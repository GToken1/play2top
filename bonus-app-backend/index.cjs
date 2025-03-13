// index.cjs (CommonJS версия)

require('dotenv').config();
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = process.env.PORT || 5001;

// Мидлвары
app.use(cors());
app.use(bodyParser.json());

// Пример "базы данных" в памяти (для демонстрации)
let users = [];
let posts = [];
let tracks = [];

// Эндпоинт регистрации пользователя
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }
  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists.' });
  }
  const newUser = { id: users.length + 1, username, password, bonus: 0 };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully.', user: newUser });
});

// Эндпоинт для начисления бонусов за прослушивание трека
app.post('/listen', (req, res) => {
  const { userId } = req.body;
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }
  user.bonus += 10;
  res.json({ message: 'Bonus added.', bonus: user.bonus });
});

// Эндпоинт для получения списка пользователей (для админ-панели)
app.get('/users', (req, res) => {
  res.json({ data: users, total: users.length });
});

// Endpoint для вывода бонусов
app.post('/withdraw', (req, res) => {
  const { userId, amount } = req.body;
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }
  if (user.bonus < amount) {
    return res.status(400).json({ message: 'Insufficient bonus.' });
  }
  user.bonus -= amount;
  res.json({ message: `Withdrawal of ${amount} successful.`, bonus: user.bonus });
});

// === Работа с постами ===
// Endpoint для создания поста
app.post('/posts', (req, res) => {
  const { userId, trackId, title, description } = req.body;
  const newPost = {
    id: posts.length + 1,
    userId,
    trackId,
    title: title || 'Без названия',
    description: description || '',
    likes: 0,
    comments: [],
    createdAt: new Date()
  };
  posts.push(newPost);
  res.status(201).json({ message: 'Post created successfully', post: newPost });
});

// Endpoint для получения списка постов (лента)
app.get('/posts', (req, res) => {
  res.json({ data: posts, total: posts.length });
});

// Endpoint для добавления комментария к посту
app.post('/posts/:postId/comments', (req, res) => {
  const postId = parseInt(req.params.postId);
  const { userId, comment } = req.body;
  const post = posts.find(p => p.id === postId);
  if (!post) {
    return res.status(404).json({ message: 'Post not found.' });
  }
  const newComment = {
    id: post.comments.length + 1,
    userId,
    comment,
    createdAt: new Date()
  };
  post.comments.push(newComment);
  res.status(201).json({ message: 'Comment added successfully', comment: newComment });
});

// Endpoint для добавления лайка к посту
app.post('/posts/:postId/like', (req, res) => {
  const postId = parseInt(req.params.postId);
  const post = posts.find(p => p.id === postId);
  if (!post) {
    return res.status(404).json({ message: 'Post not found.' });
  }
  post.likes += 1;
  res.json({ message: 'Post liked', likes: post.likes });
});

// === Новый код для загрузки трека ===
// Создаем папку для загрузок, если её еще нет
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Настройка хранилища для Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage });

// Endpoint для загрузки трека
app.post('/uploadTrack', upload.single('trackFile'), (req, res) => {
  const { title, description } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  const newTrack = {
    id: tracks.length + 1,
    title: title || 'Без названия',
    description: description || '',
    filePath: req.file.path,
    likes: 0,
    comments: [],
    listens: 0,
  };
  tracks.push(newTrack);
  res.status(201).json({ message: 'Track uploaded successfully.', track: newTrack });
});

// Endpoint для получения списка треков
app.get('/tracks', (req, res) => {
  res.json({ data: tracks, total: tracks.length });
});

// === Новый код для чата ===
// Настройка OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openaiClient = new OpenAIApi(configuration);

// Endpoint для чата
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }
  
  try {
    const response = await openaiClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    });
    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error from OpenAI:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Error processing your request." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});