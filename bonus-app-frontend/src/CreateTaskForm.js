// CreateTaskForm.js
import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function CreateTaskForm({ onTaskCreated }) {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/createTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1,
          link,
          title,
          description,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Задание создано!");
        setLink("");
        setTitle("");
        setDescription("");
        if (onTaskCreated) onTaskCreated(data.task);
      } else {
        alert("Ошибка: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка сети");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleCreateTask}
      sx={{ mt: 4, p: 2, border: "1px solid #ccc", borderRadius: 1 }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        Создать задание
      </Typography>
      <TextField
        label="Ссылка (Яндекс, ВК и т.д.)"
        fullWidth
        required
        sx={{ mb: 2 }}
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <TextField
        label="Название задания"
        fullWidth
        sx={{ mb: 2 }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Описание"
        fullWidth
        multiline
        sx={{ mb: 2 }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        Создать задание
      </Button>
    </Box>
  );
}