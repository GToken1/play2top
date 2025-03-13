import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import OpenAI from 'openai'; 
import { MongoClient, ObjectId } from "mongodb";
import axios from 'axios';
import querystring from 'querystring';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

// Подключение к MongoDB
const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
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

// Коллекции
const usersCollection = () => db.collection("users");
const tracksCollection = () => db.collection("tracks");
const tasksCollection = () => db.collection("tasks");

// === Инициализация OpenAI ===
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5001;

// Заголовки безопасности
app.use(helmet());

// Rate limiting: максимум 100 запросов за 15 минут с одного IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Слишком много запросов с одного IP, попробуйте позже."
});
app.use(limiter);

app.use(cors());
app.use(bodyParser.json());

// ----- Проверка URL -----
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

// ----- Проверка «ссылки на Яндекс.Музыку» -----
function isValidYandexMusicLink(link) {
  // Простейшая проверка: ссылка должна начинаться с https://music.yandex.
  return /^https:\/\/music\.yandex\.\S+/.test(link);
}

// ----- Настройка nodemailer -----
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ========================= РЕГИСТРАЦИЯ с подтверждением email =========================
app.post("/register", async (req, res) => {
  console.log("POST /register called");
  const { username, password, role, refCodeUsed, yandexLink } = req.body;

  if (!username || !password || !yandexLink) {
    return res.status(400).json({ message: "Логин, пароль и ссылка на Яндекс музыку обязательны." });
  }
  if (username.length < 3) {
    return res.status(400).json({ message: "Логин должен быть не менее 3 символов." });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Пароль должен быть не менее 6 символов." });
  }
  // Проверяем, что URL валидный
  if (!isValidUrl(yandexLink)) {
    return res.status(400).json({ message: "Некорректный формат ссылки на Яндекс музыку." });
  }
  // Проверяем, что это именно music.yandex
  if (!isValidYandexMusicLink(yandexLink)) {
    return res.status(400).json({ message: "Некорректная ссылка. Должна начинаться с https://music.yandex..." });
  }

  // Проверяем, нет ли такого пользователя
  const existing = await usersCollection().findOne({ username });
  if (existing) {
    return res.status(400).json({ message: "User already exists." });
  }

  // Хэшируем пароль
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Генерируем уникальный refCode
  function generateRefCode() {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  }
  const refCode = generateRefCode();

  // Генерируем код подтверждения email
  const verifyCode = Math.random().toString(36).substr(2, 6).toUpperCase();

  // Определяем ID (простой счётчик)
  const userCount = await usersCollection().countDocuments();
  const newUserId = userCount + 1;

  let newUser = {
    id: newUserId,
    username,          // предполагаем, что это email
    password: hashedPassword,
    role: role || "musician",
    bonusRoubles: 0,
    bonusInternal: 0,
    refCode,
    yandexLink,
    refCodeUsed: refCodeUsed || null,
    // Поля для подтверждения email
    verified: false,
    verifyCode,
    // Геймификация: уровни и XP
    level: 1,
    xp: 0
  };

  // Реферальная логика
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

  // Отправляем письмо с кодом подтверждения
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: username,
      subject: "Подтвердите вашу почту на Play2Top",
      text: `Ваш код подтверждения: ${verifyCode}\nВведите его в приложении для завершения регистрации.`
    });
    console.log("Код подтверждения отправлен на", username);
  } catch (err) {
    console.error("Ошибка отправки письма:", err);
    // При желании можно удалить запись из БД, если письмо не отправилось
  }

  res.json({ message: "User registered. Check your email for the verify code." });
});

// ========================= ПОДТВЕРЖДЕНИЕ EMAIL =========================
app.post("/verifyEmail", async (req, res) => {
  const { username, code } = req.body;
  if (!username || !code) {
    return res.status(400).json({ message: "Missing username or code" });
  }
  try {
    const user = await usersCollection().findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.verifyCode !== code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    await usersCollection().updateOne(
      { _id: user._id },
      { $set: { verified: true }, $unset: { verifyCode: "" } }
    );
    res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Ошибка в /verifyEmail:", err);
    res.status(500).json({ error: err.message });
  }
});

// ========================= ЛОГИН с генерацией JWT =========================
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }
  try {
    const user = await usersCollection().findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.verified) {
      return res.status(403).json({ message: "Email not verified" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const tokenPayload = {
      id: user.id,
      username: user.username,
      role: user.role
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
    const { password: _, verifyCode, ...safeUser } = user;
    res.json({ user: safeUser, token });
  } catch (err) {
    console.error("Ошибка в /login:", err);
    res.status(500).json({ error: err.message });
  }
});

// ========================= Вспомогательное middleware для защиты роутов (JWT) =========================
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    // decoded = { id, username, role, iat, exp }
    req.user = decoded;
    next();
  });
}

// ========================= ВОССТАНОВЛЕНИЕ ПАРОЛЯ (минимальная реализация) =========================

// 1) Запрос на сброс пароля
app.post("/requestPasswordReset", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email обязателен" });

  const user = await usersCollection().findOne({ username: email });
  if (!user) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }

  const resetToken = Math.random().toString(36).substr(2, 10);
  const resetTokenExpires = Date.now() + 3600000; // 1 час
  await usersCollection().updateOne(
    { _id: user._id },
    { $set: { resetToken, resetTokenExpires } }
  );

  // Отправляем письмо
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Сброс пароля на Play2Top",
      text: `Перейдите по ссылке для сброса пароля: https://ваш_домен/reset-password?token=${resetToken}`
    });
    res.json({ message: "Инструкции по сбросу пароля отправлены на email." });
  } catch (err) {
    console.error("Ошибка отправки письма (resetPassword):", err);
    res.status(500).json({ error: err.message });
  }
});

// 2) Подтверждение сброса пароля
app.post("/resetPassword", async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ message: "Недостаточно данных" });
  }
  const user = await usersCollection().findOne({ resetToken: token });
  if (!user || !user.resetTokenExpires || user.resetTokenExpires < Date.now()) {
    return res.status(400).json({ message: "Неверный или просроченный токен" });
  }
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  await usersCollection().updateOne(
    { _id: user._id },
    {
      $set: { password: hashedPassword },
      $unset: { resetToken: "", resetTokenExpires: "" }
    }
  );
  res.json({ message: "Пароль успешно сброшен" });
});

// ========================= Пример защищённых маршрутов =========================

// Любые маршруты, которые вы хотите закрыть от неавторизованных:
app.get("/api/protectedData", verifyToken, async (req, res) => {
  // Здесь доступ только при валидном токене
  res.json({ secret: "Секретные данные" });
});

// ========================= МАРШРУТЫ ТРЕКОВ (пример) =========================
app.get('/tracks', async (req, res) => {
  try {
    const tracks = await tracksCollection().find().toArray();
    res.json({ data: tracks, total: tracks.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/tracks', async (req, res) => {
  console.log("GET /api/tracks called");
  try {
    const tracks = await tracksCollection().find().sort({ createdAt: -1 }).toArray();
    res.json({ data: tracks, total: tracks.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========================= СТАТИСТИКА ПОЛЬЗОВАТЕЛЯ =========================
app.get("/api/userStats", async (req, res) => {
  const userId = parseInt(req.query.userId);
  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }
  try {
    const user = await usersCollection().findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const referralsCount = await usersCollection().countDocuments({
      refCodeUsed: user.refCode
    });
    const tasksCreated = await tasksCollection().countDocuments({
      userId: userId
    });
    res.json({
      userId,
      level: user.level || 1,
      xp: user.xp || 0,
      bonusRoubles: user.bonusRoubles || 0,
      bonusInternal: user.bonusInternal || 0,
      referralsCount,
      tasksCreated,
      verified: !!user.verified
    });
  } catch (err) {
    console.error("Ошибка в /api/userStats:", err);
    res.status(500).json({ error: err.message });
  }
});

// ========================= Яндекс OAuth (необязательно) =========================
const YANDEX_CLIENT_ID = process.env.YANDEX_CLIENT_ID;
const YANDEX_CLIENT_SECRET = process.env.YANDEX_CLIENT_SECRET;
const YANDEX_REDIRECT_URI = process.env.YANDEX_REDIRECT_URI;

app.get('/auth/yandex', (req, res) => {
  const authUrl =
    `https://oauth.yandex.ru/authorize?response_type=code&client_id=${YANDEX_CLIENT_ID}&redirect_uri=${YANDEX_REDIRECT_URI}`;
  res.redirect(authUrl);
});

app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).json({ error: 'No code provided' });
  try {
    const tokenResponse = await axios.post(
      'https://oauth.yandex.ru/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code,
        client_id: YANDEX_CLIENT_ID,
        client_secret: YANDEX_CLIENT_SECRET,
        redirect_uri: YANDEX_REDIRECT_URI,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    const accessToken = tokenResponse.data.access_token;
    const userResponse = await axios.get('https://login.yandex.ru/info', {
      headers: { Authorization: `OAuth ${accessToken}` },
    });
    res.json({ user: userResponse.data, accessToken });
  } catch (error) {
    console.error("Yandex OAuth error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to authenticate" });
  }
});

// ========================= СПИСОК ЗАДАНИЙ (пример) =========================
app.get("/api/tasks", async (req, res) => {
  console.log("GET /api/tasks called");
  try {
    const tasks = await tasksCollection().find({}).toArray();
    res.json({ data: tasks });
  } catch (err) {
    console.error("/api/tasks error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ========================= ЗАВЕРШЕНИЕ ЗАДАНИЯ =========================
app.post('/api/taskComplete', async (req, res) => {
  console.log("POST /api/taskComplete called");
  try {
    const { userId, taskId } = req.body;
    if (!userId || !taskId) {
      return res.status(400).json({ message: 'Missing userId or taskId' });
    }
    const task = await tasksCollection().findOne({ _id: new ObjectId(taskId) });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.userId === userId) {
      return res.status(400).json({ message: "Нельзя выполнять собственное задание." });
    }
    const user = await usersCollection().findOne({ id: Number(userId) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Начисляем бонусы
    const newBonusRoubles = (user.bonusRoubles || 0) + 5;
    const newBonusInternal = (user.bonusInternal || 0) + 10;

    // Начисляем XP и пересчитываем уровень
    const xpGained = 5; // Сколько XP даём за выполнение задания
    let newXp = (user.xp || 0) + xpGained;
    let newLevel = user.level || 1;

    if (newXp >= 200) {
      newLevel = 4;
    } else if (newXp >= 100) {
      newLevel = 3;
    } else if (newXp >= 50) {
      newLevel = 2;
    } else {
      newLevel = 1;
    }

    await usersCollection().updateOne(
      { _id: user._id },
      {
        $set: {
          bonusRoubles: newBonusRoubles,
          bonusInternal: newBonusInternal,
          xp: newXp,
          level: newLevel
        }
      }
    );
    res.json({
      message: 'Задание выполнено, бонус и XP начислены',
      bonusRoubles: newBonusRoubles,
      bonusInternal: newBonusInternal,
      xp: newXp,
      level: newLevel
    });
  } catch (err) {
    console.error("Ошибка в /api/taskComplete:", err);
    res.status(500).json({ error: err.message });
  }
});

// ========================= ВЫВОД СРЕДСТВ =========================
app.post('/withdraw', async (req, res) => {
  try {
    const { userId, amount, bank } = req.body;
    if (!userId || !amount || !bank) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    const user = await usersCollection().findOne({ id: Number(userId) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.bonusRoubles < amount) {
      return res.status(400).json({ message: 'Not enough balance' });
    }
    await usersCollection().updateOne(
      { _id: user._id },
      { $inc: { bonusRoubles: -amount } }
    );
    res.json({ message: `Вывод ${amount}₽ на банк ${bank} оформлен` });
  } catch (error) {
    console.error("Ошибка вывода:", error);
    res.status(500).json({ error: error.message });
  }
});

// ========================= ChatGPT (OpenAI) МАРШРУТЫ =========================

// 1) Генерация текста
app.post("/ai/generateLyrics", async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // или "gpt-3.5-turbo", если gpt-4 недоступен
      messages: [
        {
          role: "system",
          content: "Ты — виртуальный помощник Play2Top. Пиши стихи в любом стиле, который запросит пользователь."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 1.0
    });
    const lyrics = completion.choices[0].message.content;
    res.json({ lyrics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при генерации текста" });
  }
});

// 2) Генерация музыки (заглушка)
app.post("/ai/generateMusic", async (req, res) => {
  const { prompt } = req.body;
  try {
    res.json({ music: "Demo music file (заглушка)" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при генерации музыки" });
  }
});

// 3) Генерация вокала (заглушка)
app.post("/ai/generateVocal", async (req, res) => {
  const { prompt } = req.body;
  try {
    res.json({ vocal: "Demo vocal file (заглушка)" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при генерации вокала" });
  }
});

// 4) Мастеринг (заглушка)
app.post("/ai/generateMaster", async (req, res) => {
  const { prompt } = req.body;
  try {
    res.json({ mastered: "Demo mastered file (заглушка)" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при мастеринге" });
  }
});

// 5) Выпуск трека (заглушка)
app.post("/ai/distributeTrack", async (req, res) => {
  try {
    res.json({ message: "Трек выпущен в стриминги (заглушка)" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при выпуске трека" });
  }
});

// ========================= Отдача статического фронтенда (если нужно) =========================
// (Добавьте это после всех app.post/app.get маршрутов, но до app.listen)

app.use(express.static(path.join(__dirname, "../bonus-app-frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../bonus-app-frontend/build", "index.html"));
});

// ========================= Запуск сервера =========================
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});