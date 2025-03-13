// src/components/ToolsTab.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ToolsTab = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Инструменты для музыкантов
      </Typography>
      <Typography variant="body1">
        Здесь вы можете использовать инструменты AI для создания и улучшения треков.
      </Typography>
      <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
        Генерация текстов (ChatGPT)
      </Button>
      <Button variant="outlined" color="secondary" sx={{ mt: 2, ml: 2 }}>
        Анализ трека
      </Button>
    </Box>
  );
};

export default ToolsTab;