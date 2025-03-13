import React, { useEffect, useState } from 'react';
import { Typography, Container, Box } from '@mui/material';

const ListenerDashboard = () => {
  const listenerId = 2; // пока для теста используем фиксированный ID
  const [bonus, setBonus] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5001/users')
      .then(res => res.json())
      .then(data => {
        const user = data.data.find(u => u.id === listenerId);
        if (user) setBonus(user.bonus);
      })
      .catch(err => console.error('Ошибка получения данных пользователя:', err));
  }, [listenerId]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Личный кабинет слушателя
        </Typography>
        <Typography variant="h6">
          Ваши бонусы: {bonus}
        </Typography>
        {/* Здесь можно добавить историю заданий и прослушиваний */}
      </Box>
    </Container>
  );
};

export default ListenerDashboard;