// src/Feed.js
import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";

const Feed = () => {
  const [tracks, setTracks] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Загружаем треки
    fetch("http://localhost:5001/api/tracks")
      .then((res) => res.json())
      .then((data) => setTracks(data.data))
      .catch((err) => console.error("Ошибка получения треков:", err));

    // Загружаем задания
    fetch("http://localhost:5001/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data.data))
      .catch((err) => console.error("Ошибка получения заданий:", err));
  }, []);

  // Функция для выполнения задания (пример для слушателя, userId=2)
  const handleTaskComplete = async (taskId) => {
    try {
      const res = await fetch("http://localhost:5001/api/taskComplete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 2, taskId }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Задание выполнено, бонус начислен!");
        setTasks((prev) => prev.filter((t) => t._id !== taskId));
      } else {
        alert("Ошибка: " + data.message);
      }
    } catch (err) {
      console.error("Ошибка при выполнении задания:", err);
      alert("Ошибка сети");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mt: 4 }}>
        Лента треков
      </Typography>
      {tracks.length === 0 ? (
        <Typography>Пока нет треков.</Typography>
      ) : (
        tracks.map((track) => (
          <Box
            key={track._id}
            sx={{ border: "1px solid #ccc", p: 2, mb: 2 }}
          >
            <Typography variant="h6">{track.title}</Typography>
            <Typography variant="body2">{track.description}</Typography>
            {track.filePath && (
              <audio
                controls
                src={`http://localhost:5001/${track.filePath}`}
              />
            )}
            <Typography variant="caption">
              Прослушивания: {track.listens || 0} | Лайки: {track.likes || 0}
            </Typography>
          </Box>
        ))
      )}

      <Typography variant="h4" sx={{ mt: 4 }}>
        Задания на прослушивание
      </Typography>
      {tasks.length === 0 ? (
        <Typography>Пока нет заданий.</Typography>
      ) : (
        tasks.map((task) => (
          <Box
            key={task._id}
            sx={{ border: "1px solid #ccc", p: 2, mb: 2 }}
          >
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2">{task.description}</Typography>
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption">
                Награда: {task.reward || "N/A"}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={() => handleTaskComplete(task._id)}
              >
                Выполнить задание
              </Button>
            </Box>
          </Box>
        ))
      )}
    </Container>
  );
};

export default Feed;