// AIHitGenerator.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Collapse,
} from "@mui/material";

export default function AIHitGenerator() {
  // Управляем «раскрытием» для каждого шага:
  const [showLyrics, setShowLyrics] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showVocal, setShowVocal] = useState(false);
  const [showMaster, setShowMaster] = useState(false);

  // Поля ввода (prompt) для каждого шага
  const [lyricsPrompt, setLyricsPrompt] = useState("");
  const [musicPrompt, setMusicPrompt] = useState("");
  const [vocalPrompt, setVocalPrompt] = useState("");
  const [masterPrompt, setMasterPrompt] = useState("");

  // Результаты
  const [lyricsResult, setLyricsResult] = useState("");
  const [musicResult, setMusicResult] = useState("");
  const [vocalResult, setVocalResult] = useState("");
  const [masterResult, setMasterResult] = useState("");

  // 1) Текст (Lyrics)
  const toggleLyrics = () => setShowLyrics(!showLyrics);

  const handleGenerateLyrics = async () => {
    try {
      const res = await fetch("http://localhost:5001/ai/generateLyrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: lyricsPrompt }),
      });
      const data = await res.json();
      setLyricsResult(data.lyrics);
    } catch (error) {
      console.error(error);
      alert("Ошибка при генерации текста");
    }
  };

  // 2) Музыка
  const toggleMusic = () => setShowMusic(!showMusic);

  const handleGenerateMusic = async () => {
    try {
      const res = await fetch("http://localhost:5001/ai/generateMusic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: musicPrompt }),
      });
      const data = await res.json();
      setMusicResult(data.music);
    } catch (error) {
      console.error(error);
      alert("Ошибка при генерации музыки");
    }
  };

  // 3) Вокал
  const toggleVocal = () => setShowVocal(!showVocal);

  const handleGenerateVocal = async () => {
    try {
      const res = await fetch("http://localhost:5001/ai/generateVocal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: vocalPrompt }),
      });
      const data = await res.json();
      setVocalResult(data.vocal);
    } catch (error) {
      console.error(error);
      alert("Ошибка при генерации вокала");
    }
  };

  // 4) Мастеринг
  const toggleMaster = () => setShowMaster(!showMaster);

  const handleMastering = async () => {
    try {
      const res = await fetch("http://localhost:5001/ai/generateMaster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: masterPrompt }),
      });
      const data = await res.json();
      setMasterResult(data.mastered);
    } catch (error) {
      console.error(error);
      alert("Ошибка при мастеринге");
    }
  };

  // 5) Выпустить трек (без поля ввода – просто кнопка)
  const handleDistribution = async () => {
    try {
      const res = await fetch("http://localhost:5001/ai/distributeTrack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Возможно, передать { trackId: ..., ... }
        body: JSON.stringify({ someData: "..." }),
      });
      const data = await res.json();
      alert("Трек выпущен! " + data.message);
    } catch (error) {
      console.error(error);
      alert("Ошибка при выпуске трека");
    }
  };

  return (
    <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Создать хит (AI)
      </Typography>

      {/* 1) Текст */}
      <Button variant="contained" onClick={toggleLyrics} sx={{ mr: 1 }}>
        ТЕКСТ
      </Button>
      <Collapse in={showLyrics} sx={{ mt: 2 }}>
        <TextField
          label="Введите запрос для текста (жанр, стиль, ключевые слова...)"
          fullWidth
          multiline
          rows={3}
          value={lyricsPrompt}
          onChange={(e) => setLyricsPrompt(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleGenerateLyrics}>
          Сгенерировать
        </Button>

        {lyricsResult && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Сгенерированный текст:
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
              {lyricsResult}
            </Typography>
          </Box>
        )}
      </Collapse>

      {/* 2) Музыка */}
      <Button variant="contained" onClick={toggleMusic} sx={{ m: 1 }}>
        МУЗЫКА
      </Button>
      <Collapse in={showMusic} sx={{ mt: 2 }}>
        <TextField
          label="Введите запрос для музыки (жанр, BPM, инструменты...)"
          fullWidth
          multiline
          rows={3}
          value={musicPrompt}
          onChange={(e) => setMusicPrompt(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleGenerateMusic}>
          Сгенерировать
        </Button>

        {musicResult && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Сгенерированная музыка:
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
              {musicResult}
            </Typography>
          </Box>
        )}
      </Collapse>

      {/* 3) Вокал */}
      <Button variant="contained" onClick={toggleVocal} sx={{ m: 1 }}>
        ВОКАЛ
      </Button>
      <Collapse in={showVocal} sx={{ mt: 2 }}>
        <TextField
          label="Введите запрос для вокала (пол, тембр, язык...)"
          fullWidth
          multiline
          rows={3}
          value={vocalPrompt}
          onChange={(e) => setVocalPrompt(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleGenerateVocal}>
          Сгенерировать
        </Button>

        {vocalResult && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Сгенерированный вокал:
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
              {vocalResult}
            </Typography>
          </Box>
        )}
      </Collapse>

      {/* 4) Мастеринг */}
      <Button variant="contained" onClick={toggleMaster} sx={{ m: 1 }}>
        МАСТЕРИНГ
      </Button>
      <Collapse in={showMaster} sx={{ mt: 2 }}>
        <TextField
          label="Введите параметры мастеринга (громкость, стиль...)"
          fullWidth
          multiline
          rows={3}
          value={masterPrompt}
          onChange={(e) => setMasterPrompt(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleMastering}>
          Сгенерировать
        </Button>

        {masterResult && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Результат мастеринга:
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
              {masterResult}
            </Typography>
          </Box>
        )}
      </Collapse>

      {/* 5) Выпустить трек */}
      <Button variant="contained" onClick={handleDistribution} sx={{ m: 1 }}>
        ВЫПУСТИТЬ
      </Button>
    </Box>
  );
}