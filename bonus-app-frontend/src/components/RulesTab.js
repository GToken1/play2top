// src/components/RulesTab.js
import React, { useState } from 'react';
import { Container, Typography, Box, Tabs, Tab, Link } from '@mui/material';

const ListeningRules = () => (
  <Box>
    <Typography variant="h6" gutterBottom>
      Прослушивание треков
    </Typography>
    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
      На 1 уровне за 1 выполненное задание по прослушиванию трека вы получаете:
      {"\n"}• 7₽ + 25 P2T, если слушаете через приложение Яндекс Музыки с подпиской
      {"\n"}• 4₽ + 15 P2T, если слушаете через браузер с компьютера без подписки
      {"\n"}• 7₽ + 25 P2T за прослушивание трека во ВКонтакте
      {"\n\n"}Лайфхак: оформите пробную подписку на Яндекс.Музыку (месяц бесплатно) и получайте по 7₽ за прослушивание.
      {"\n\n"}Важно: не снимайте лайки с треков после выполнения заданий! При выводе средств проверяется ваш плейлист "Мне нравится".
    </Typography>
  </Box>
);

const MassPostingRules = () => (
  <Box>
    <Typography variant="h6" gutterBottom>
      Масспостинг видеороликов
    </Typography>
    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
      На 1 уровне за 1 выполненное задание вы получаете до 3000₽ + 25 P2T, в зависимости от набранных просмотров.
      {"\n"}Каждый пользователь может выкладывать неограниченное количество видеороликов под трек артиста, пока задание активно.
      {"\n"}Все просмотры суммируются, и вознаграждение распределяется по системе аукциона.
      {"\n\n"}При выкладывании видео обязательно добавляйте уникальный хештег, указанный в описании задания.
      {"\n\n"}После исключения трека из заданий, в течение 3–5 дней система подсчитывает просмотры и начисляет вознаграждения.
    </Typography>
  </Box>
);

const RulesTab = () => {
  const [subTab, setSubTab] = useState(0);

  const handleSubTabChange = (event, newValue) => {
    setSubTab(newValue);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Правила сервиса Play2Top
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={subTab} onChange={handleSubTabChange}>
          <Tab label="Прослушивание треков" />
          <Tab label="Масспостинг видеороликов" />
        </Tabs>
      </Box>
      {subTab === 0 && <ListeningRules />}
      {subTab === 1 && <MassPostingRules />}
    </Container>
  );
};

export default RulesTab;