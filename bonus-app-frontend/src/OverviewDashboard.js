// OverviewDashboard.js
import React from "react";
import { Box, Typography } from "@mui/material";

export default function OverviewDashboard() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Общая статистика
      </Typography>
      <Typography variant="body1">
        Здесь вы сможете увидеть диаграммы и сводные данные: 
        количество прослушиваний, выполненных заданий, 
        прирост аудитории, рефералы и т.д.
      </Typography>
    </Box>
  );
}