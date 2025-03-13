// TaskCard.js
import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

export default function TaskCard({ task, onComplete }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6">
          {task.title || "Задание без названия"}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {task.description}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">Ссылка:</Typography>
          <a href={task.link} target="_blank" rel="noopener noreferrer">
            {task.link}
          </a>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => onComplete(task._id)}>
            Завершить
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
