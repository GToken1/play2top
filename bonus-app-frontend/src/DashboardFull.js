// src/DashboardFull.js
import React, { useState } from "react";
import { 
  Container,
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Link
} from "@mui/material";
import RulesTab from "./components/RulesTab";

const DashboardFull = ({ user }) => {
  // Если пользователь не передан, используем примерные данные
  const currentUser = user || {
    name: "Georgy",
    level: 1,
    levelMax: 9,
    bonusRoubles: 0,
    bonusInternal: 0,
    tasksCompleted: 0,
    tasksInReview: 0,
    tasksRejected: 0,
    tasks: [
      {
        id: 1,
        trackTitle: "Название трека с сервера",
        description: `Ваша задача: прослушать трек полностью без перематывания и поставить лайк.
После чего перейдите в раздел "История", сделайте скриншот (с видимым лайком и треком в истории) и отправьте его в чат.`,
        trackLink: "https://music.yandex.ru/track/1234567",
      }
    ]
  };

  const [tabIndex, setTabIndex] = useState(0);
  const [selectedBank, setSelectedBank] = useState("");
  const [agreePD, setAgreePD] = useState(false);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleTaskComplete = (taskId) => {
    console.log("Задание выполнено:", taskId);
    // Здесь должен быть запрос на сервер для обновления данных
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Верхняя информация о пользователе */}
      <Typography variant="h4" gutterBottom>
        Личный кабинет {currentUser.name}
      </Typography>
      <Box sx={{ p: 2, backgroundColor: "#e3f2fd", borderRadius: 1, mb: 2 }}>
        <Typography variant="h6">
          Уровень: {currentUser.level}/{currentUser.levelMax}
        </Typography>
        <Typography variant="h6">
          Баланс: {currentUser.bonusRoubles} руб. | {currentUser.bonusInternal} P2T
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-around", mb: 2 }}>
        <Typography variant="body1">Слушай музыку и зарабатывай</Typography>
        <Typography variant="body1">Выкладывай ролики под треки и зарабатывай</Typography>
      </Box>
      <Box sx={{ mb: 2, p: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
        <Typography variant="body1">
          Выполнено заданий: {currentUser.tasksCompleted} | На проверке: {currentUser.tasksInReview} | Отклонено: {currentUser.tasksRejected}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Очередь заданий: {currentUser.tasks.length} трек(ов) к прослушиванию
        </Typography>
      </Box>

      {/* Вкладки личного кабинета */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Главная" />
          <Tab label="Правила" />
          <Tab label="Рефералка" />
          <Tab label="Вывод средств" />
        </Tabs>
      </Box>
      
      {/* Содержимое вкладок */}
      {tabIndex === 0 && (
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Главная
          </Typography>
          {currentUser.tasks.map(task => (
            <Box key={task.id} sx={{ border: "1px solid #ccc", borderRadius: 1, p: 2, mb: 2 }}>
              <Typography variant="h6">
                Прослушать трек: {task.trackTitle}
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-line", mt: 1 }}>
                {task.description}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2">Ссылка на трек:</Typography>
                <Link href={task.trackLink} target="_blank" rel="noopener">
                  {task.trackLink}
                </Link>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" onClick={() => handleTaskComplete(task.id)}>
                  Загрузить отчет
                </Button>
                <Button variant="outlined" color="secondary" sx={{ ml: 2 }}>
                  Пропустить
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}
      {tabIndex === 1 && (
        <Box sx={{ p: 2 }}>
          <RulesTab />
        </Box>
      )}
      {tabIndex === 2 && (
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Реферальная программа
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Пригласите друзей! Вы и ваш друг получите бонусы:
            {"\n"}+ 50 P2T за приглашенного друга (другу также +50 P2T и 20₽ на счет),
            {"\n"}+ 1₽ / 5 P2T за каждое выполненное задание приглашенным другом.
            {"\n"}Твои друзья: 0
          </Typography>
          <Button variant="contained" color="primary" sx={{ mb: 2 }}>
            Пригласить друга
          </Button>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Скопируйте свой уникальный промокод и поделитесь им с музыкантом:
          </Typography>
          <Button variant="outlined" color="secondary" sx={{ mb: 2 }}>
            Скопировать промокод
          </Button>
          <Typography variant="body2">
            Музыкант получит +20% слушателей в пакете продвижения на первый заказ, а вам +10% от суммы заказа.
          </Typography>
        </Box>
      )}
      {tabIndex === 3 && (
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Вывод средств
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            На данный момент выводить можно рублевый баланс от 400₽.
            Монеты P2T будут доступны после листинга – следите за новостями в официальном ТГ-канале.
            Вывод средств в рублях осуществляется на карту любого российского банка.
            Заполните форму ниже. Вывод средств производится в течение 3-х рабочих дней после отправки заявки.
          </Typography>
          <TextField
            select
            label="Выберите банк"
            fullWidth
            sx={{ mb: 2 }}
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
          >
            <MenuItem value="sberbank">Сбербанк</MenuItem>
            <MenuItem value="vtb">ВТБ</MenuItem>
            <MenuItem value="tinkoff">Тинькофф</MenuItem>
          </TextField>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreePD}
                onChange={(e) => setAgreePD(e.target.checked)}
                color="primary"
              />
            }
            label="Согласен с обработкой персональных данных"
          />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" disabled={!selectedBank || !agreePD}>
              Вывести
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default DashboardFull;