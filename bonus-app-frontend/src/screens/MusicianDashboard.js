import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const MusicianDashboard = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Личный кабинет музыканта
        </Typography>
        <Typography>
          Здесь вы можете загружать свои треки, смотреть статистику и получать обратную связь от слушателей.
        </Typography>
        {/* В дальнейшем сюда можно встроить компонент загрузки трека и статистику */}
      </Box>
    </Container>
  );
};

export default MusicianDashboard;