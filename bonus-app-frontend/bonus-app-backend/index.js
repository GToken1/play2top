import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import OpenAI from 'openai';
import { MongoClient, ObjectId } from "mongodb";

// Подключение к MongoDB
const mongoUrl = "mongodb://127.0.0.1:27017";
const client = new MongoClient(mongoUrl);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("bonusApp");
    console.log("✅ Подключено к MongoDB");
  } catch (err) {
    console.error("❌ Ошибка подключения к MongoDB:", err);
  }
}
connectDB();

const usersCollection = () => db.collection("users");
const tracksCollection = () => db.collection("tracks");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// Раздача загруженных файлов (чтобы <audio> мог воспроизводить)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Подготовка папки uploads
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Функция, убирающая кириллицу/спецсимволы из названия файла
function sanitizeFilename(originalName) {
  // Заменяем пробелы на '_'
  // и любые не-латинские/цифровые/._- символы на '_'
  return originalName
    .replace(/\s/g, '_')
    .replace(/[^a-zA-Z0-9.\-_]/g, '_');
}

// Настройка хранения файлов (multer)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    // Очищаем имя файла
    const cleanedName = sanitizeFilename(file.originalname);
    cb(null, Date.now() + '-' + cleanedName);
  },
});
const upload = multer({ storage });

// =============================
// 1) СТАРЫЕ МАРШРУТЫ (без /api)
// =============================

app.post('/uploadTrack', upload.single('trackFile'), async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });

    const newTrack = {
      title: title || "Без названия",
      description: description || "",
      filePath: req.file.path,
      likes: 0,
      listens: 0,
      createdAt: new Date()
    };
    await tracksCollection().insertOne(newTrack);
    res.status(201).json({ message: 'Track uploaded successfully.', track: newTrack });
  } catch (err) {
    console.error("Ошибка в /uploadTrack:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/tracks', async (req, res) => {
  try {
    const tracks = await tracksCollection().find().toArray();
    res.json({ data: tracks, total: tracks.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =============================
// 2) НОВЫЕ МАРШРУТЫ (с префиксом /api)
// =============================

// a) Получить все треки
app.get('/api/tracks', async (req, res) => {
  console.log("GET /api/tracks called");
  try {
    const tracks = await tracksCollection().find().sort({ createdAt: -1 }).toArray();
    res.json({ data: tracks, total: tracks.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// b) Загрузить демо-файл
app.post('/api/uploadDemo', upload.single('demoFile'), async (req, res) => {
  console.log("POST /api/uploadDemo called");
  try {
    const { musicianId } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    const newTrack = {
      title: req.file.originalname,
      filePath: req.file.path,
      userId: parseInt(musicianId, 10),
      listens: 0,
      likes: 0,
      isDemo: true,
      createdAt: new Date()
    };
    await tracksCollection().insertOne(newTrack);
    res.status(201).json(newTrack);
  } catch (err) {
    console.error("Ошибка в /api/uploadDemo:", err);
    res.status(500).json({ error: err.message });
  }
});

// c) Создание «внешнего» трека (ссылка)
app.post("/api/tracks", async (req, res) => {
  console.log("POST /api/tracks called");
  const { title, description, link, userId } = req.body;
  try {
    const newTrack = {
      title: title || "Без названия",
      description: description || "",
      link: link || "",
      userId: parseInt(userId, 10),
      listens: 0,
      likes: 0,
      createdAt: new Date()
    };
    await tracksCollection().insertOne(newTrack);
    res.status(201).json(newTrack);
  } catch (err) {
    console.error("Ошибка в POST /api/tracks:", err);
    res.status(500).json({ error: err.message });
  }
});

// d) Личный кабинет музыканта
app.get("/api/musicianData", async (req, res) => {
  console.log("GET /api/musicianData called");
  const musicianId = parseInt(req.query.musicianId, 10);
  try {
    const musician = await usersCollection().findOne({ id: musicianId });
    const hisTracks = await tracksCollection().find({ userId: musicianId }).toArray();

    res.json({
      bonusRoubles: musician?.bonusRoubles || 0,
      bonusInternal: musician?.bonusInternal || 0,
      level: musician?.level || 1,
      levelMax: musician?.levelMax || 9,
      tracks: hisTracks
    });
  } catch (err) {
    console.error("Ошибка GET /api/musicianData:", err);
    res.status(500).json({ error: err.message });
  }
});

// e) Удалить трек (с проверкой userId)
app.delete("/api/tracks/:id", async (req, res) => {
  console.log("DELETE /api/tracks/:id called");
  const trackId = req.params.id;
  // Для MVP userId берём из query, например: /api/tracks/123?userId=1
  const userId = parseInt(req.query.userId || "1", 10);

  try {
    const track = await tracksCollection().findOne({ _id: new ObjectId(trackId) });
    if (!track) {
      return res.status(404).json({ message: "Track not found" });
    }
    // Проверяем, что владелец совпадает
    if (track.userId !== userId) {
      return res.status(403).json({ message: "Not your track" });
    }
    await tracksCollection().deleteOne({ _id: new ObjectId(trackId) });
    res.json({ message: "Track deleted successfully" });
  } catch (err) {
    console.error("Ошибка DELETE /api/tracks/:id:", err);
    res.status(500).json({ error: err.message });
  }
});

// f) Лента демо
app.get("/api/feed", async (req, res) => {
  console.log("GET /api/feed called");
  try {
    // Отдаём только демо: isDemo=true
    const demoTracks = await tracksCollection().find({ isDemo: true }).sort({ createdAt: -1 }).toArray();
    res.json({ data: demoTracks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// g) Лайк трека
app.post("/api/likeTrack", async (req, res) => {
  console.log("POST /api/likeTrack called");
  const { trackId, userId } = req.body;
  try {
    const track = await tracksCollection().findOne({ _id: new ObjectId(trackId) });
    if (!track) {
      return res.status(404).json({ message: "Track not found" });
    }
    // Для MVP просто +1
    await tracksCollection().updateOne(
      { _id: new ObjectId(trackId) },
      { $inc: { likes: 1 } }
    );
    res.json({ message: "Like added" });
  } catch (err) {
    console.error("Ошибка в /api/likeTrack:", err);
    res.status(500).json({ error: err.message });
  }
});

// h) Добавить комментарий (в поле comments массива)
app.post("/api/addComment", async (req, res) => {
  console.log("POST /api/addComment called");
  const { trackId, userId, text } = req.body;
  if (!text) return res.status(400).json({ message: "Comment text is required" });
  try {
    const result = await tracksCollection().updateOne(
      { _id: new ObjectId(trackId) },
      { $push: { comments: { userId, text, createdAt: new Date() } } }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Track not found" });
    }
    res.json({ message: "Comment added" });
  } catch (err) {
    console.error("Ошибка в /api/addComment:", err);
    res.status(500).json({ error: err.message });
  }
});

// Пример taskComplete
app.post("/api/taskComplete", async (req, res) => {
  console.log("POST /api/taskComplete called");
  const { userId, taskId } = req.body;
  try {
    const updatedBonus = { bonusRoubles: 7, bonusInternal: 25, level: 1 };
    res.json(updatedBonus);
  } catch (err) {
    console.error("Ошибка /api/taskComplete:", err);
    res.status(500).json({ error: err.message });
  }
});

// Пример withdraw
app.post("/api/withdraw", async (req, res) => {
  console.log("POST /api/withdraw called");
  const { userId, bank, amount } = req.body;
  try {
    res.json({ message: "Withdrawal request received", bank, amount });
  } catch (err) {
    console.error("Ошибка /api/withdraw:", err);
    res.status(500).json({ error: err.message });
  }
});

// Пример рефкоды (GET)
app.get("/api/refCode", async (req, res) => {
  console.log("GET /api/refCode called");
  const userId = parseInt(req.query.userId || "1", 10);
  try {
    const user = await usersCollection().findOne({ id: userId });
    if (!user) return res.status(404).json({ message: "User not found" });
    const code = user.refCode || "NO_CODE";
    res.json({ refCode: code });
  } catch (err) {
    console.error("Ошибка GET /api/refCode:", err);
    res.status(500).json({ error: err.message });
  }
});

// Пример рефкоды (POST)
app.post("/api/useRefCode", async (req, res) => {
  console.log("POST /api/useRefCode called");
  const { userId, refCodeUsed } = req.body;
  try {
    const inviter = await usersCollection().findOne({ refCode: refCodeUsed });
    if (!inviter) {
      return res.status(404).json({ message: "Invalid ref code" });
    }
    await usersCollection().updateOne(
      { _id: inviter._id },
      { $inc: { bonusRoubles: 20, bonusInternal: 50 } }
    );
    const newUserObj = await usersCollection().findOne({ id: userId });
    if (newUserObj) {
      await usersCollection().updateOne(
        { _id: newUserObj._id },
        { $inc: { bonusRoubles: 20, bonusInternal: 50 } }
      );
    }
    res.json({ message: "RefCode applied successfully" });
  } catch (err) {
    console.error("Ошибка POST /api/useRefCode:", err);
    res.status(500).json({ error: err.message });
  }
});

// Пример /register
app.post("/register", async (req, res) => {
  console.log("POST /register called");
  const { username, password, refCodeUsed } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username & password required." });
  }
  const existing = await usersCollection().findOne({ username });
  if (existing) {
    return res.status(400).json({ message: "User already exists." });
  }
  const userCount = await usersCollection().countDocuments();
  const newUserId = userCount + 1;
  function generateRefCode() {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  }
  const refCode = generateRefCode();

  let newUser = {
    id: newUserId,
    username,
    password,
    bonusRoubles: 0,
    bonusInternal: 0,
    refCode
  };

  if (refCodeUsed) {
    const inviter = await usersCollection().findOne({ refCode: refCodeUsed });
    if (inviter) {
      await usersCollection().updateOne(
        { _id: inviter._id },
        { $inc: { bonusRoubles: 20, bonusInternal: 50 } }
      );
      newUser.bonusRoubles += 20;
      newUser.bonusInternal += 50;
    }
  }

  await usersCollection().insertOne(newUser);
  res.json({ message: "User registered successfully.", user: newUser });
});

// Тестовый маршрут
app.get("/test", (req, res) => {
  console.log("GET /test called");
  res.send("Test endpoint works");
});

app.listen(port, () => {
  console.log(`🚀 Сервер запущен на порту ${port}`);
});