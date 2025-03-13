import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/single', async (req, res) => {
  const { inputUri, loudness, style, format } = req.body;

  // Логируем параметры запроса
  console.log("Отправка запроса к LANDR API с параметрами:", { inputUri, loudness, style, format });

  try {
    const response = await axios.post(
      'https://api.landr.com/mastering/v1/master/single',
      { inputUri, loudness, style, format },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-landr-mastering-api-key': process.env.LANDR_API_KEY
        }
      }
    );
    // Логируем ответ от LANDR API
    console.log("Ответ от LANDR API:", response.data);
    res.status(202).json(response.data);
  } catch (error) {
    const errMsg = error.response ? error.response.data : error.message;
    console.error("Ошибка при запросе к LANDR API:", errMsg);
    res.status(500).json({ error: "Error processing mastering request." });
  }
});

export default router;