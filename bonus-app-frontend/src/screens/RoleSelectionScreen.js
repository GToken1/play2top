import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const RoleSelectionScreen = () => {
  const selectMusician = () => {
    window.location.href = '/lk-musician';
  };

  const selectListener = () => {
    window.location.href = '/lk-listener';
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Выберите вашу роль
        </Typography>
        <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }} onClick={selectMusician}>
          Я музыкант
        </Button>
        <Button variant="contained" color="secondary" fullWidth onClick={selectListener}>
          Я слушатель
        </Button>
      </Box>
    </Container>
  );
};

export default RoleSelectionScreen;