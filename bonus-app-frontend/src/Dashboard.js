// src/Dashboard.js
import React, { useState } from 'react';
import { Container, Box, Tabs, Tab, Typography } from '@mui/material';
import ListenerDashboard from './ListenerDashboard';
import MusicianDashboard from './MusicianDashboard';

// Компонент панели вкладок
const Dashboard = ({ role }) => {
  // role может быть "listener" или "musician"
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Личный кабинет
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Профиль" />
          {role === 'listener' && <Tab label="Задания" />}
          {role === 'musician' && <Tab label="Управление треками" />}
          <Tab label="Настройки" />
        </Tabs>
      </Box>
      {tabIndex === 0 && (
        <Box sx={{ p: 2 }}>
          <Typography>Контент профиля пользователя</Typography>
          {/* Здесь можно добавить информацию о пользователе */}
        </Box>
      )}
      {role === 'listener' && tabIndex === 1 && (
        <Box sx={{ p: 2 }}>
          <ListenerDashboard />
        </Box>
      )}
      {role === 'musician' && tabIndex === 1 && (
        <Box sx={{ p: 2 }}>
          <MusicianDashboard />
        </Box>
      )}
      {tabIndex === 2 && (
        <Box sx={{ p: 2 }}>
          <Typography>
            {role === 'listener'
              ? 'Настройки для слушателя'
              : 'Настройки для музыканта'}
          </Typography>
          {/* Добавьте элементы управления настройками */}
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;