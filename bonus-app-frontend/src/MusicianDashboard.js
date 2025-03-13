// src/MusicianDashboard.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  Link,
  Collapse,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Карточка задания (для вкладки "Задания")
const TaskCard = ({ task, onComplete }) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const toggleInstructions = () => setShowInstructions(!showInstructions);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {task.instructions}
        </Typography>
        {task.link && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2">Ссылка на задание:</Typography>
            <Link href={task.link} target="_blank" rel="noopener">
              {task.link}
            </Link>
          </Box>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => onComplete(task.id)}
          sx={{ mt: 2 }}
        >
          Завершить задание
        </Button>
        <Button
          variant="text"
          onClick={toggleInstructions}
          sx={{ mt: 1 }}
        >
          {showInstructions ? "Скрыть инструкцию" : "Показать подробную инструкцию"}
        </Button>
        <Collapse in={showInstructions}>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              p: 1,
              backgroundColor: "#f5f5f5",
              borderRadius: 1,
            }}
          >
            {task.detailedInstructions}
          </Typography>
        </Collapse>
      </CardContent>
    </Card>
  );
};

const MusicianDashboard = () => {
  const navigate = useNavigate();
  const musicianId = 1; // Предположим, что ID музыканта доступен (например, из auth)
  
  // Основное состояние:
  const [tabIndex, setTabIndex] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [myTracks, setMyTracks] = useState([]);
  const [userData, setUserData] = useState({
    bonusRoubles: 100,
    bonusInternal: 200,
    level: 5,
  });
  const [refCode, setRefCode] = useState("MUS123");
  const [selectedBank, setSelectedBank] = useState("");
  const [agreePD, setAgreePD] = useState(false);

  // Загрузка mock-данных при загрузке компонента
  useEffect(() => {
    // Задачи для музыканта (пример)
    const mockTasks = [
      {
        id: 1,
        type: "listening",
        instructions: "Прослушайте трек 'New Sound' полностью без перемотки.",
        link: "https://example.com/musician/track1",
        detailedInstructions:
          "Прослушайте трек внимательно, не перематывайте. После окончания отправьте отчет.",
      },
      // Можно добавить другие задачи
    ];
    setTasks(mockTasks);

    // Список загруженных треков (пример)
    const mockMyTracks = [
      { id: 101, title: "Мой трек 1", listens: 120, likes: 15 },
      { id: 102, title: "Мой трек 2", listens: 300, likes: 45 },
    ];
    setMyTracks(mockMyTracks);

    // Данные пользователя (пример)
    setUserData({
      bonusRoubles: 100,
      bonusInternal: 200,
      level: 5,
    });
    setRefCode("MUS123");
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleTaskComplete = (taskId) => {
    // Реальная логика должна делать запрос к API, здесь – mock
    alert(`Задание ${taskId} выполнено, бонус начислен`);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleGetRefCode = () => {
    alert("Ваш рефкод: " + refCode);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Личный кабинет музыканта
      </Typography>
      <Box sx={{ p: 2, backgroundColor: "#e3f2fd", borderRadius: 1, mb: 2 }}>
        <Typography variant="h6">
          Баланс: {userData.bonusRoubles} руб. | {userData.bonusInternal} монет
        </Typography>
        <Typography variant="h6">Уровень: {userData.level}</Typography>
      </Box>

      {/* Основные вкладки */}
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        <Tab label="Задания" />
        <Tab label="Мои треки" />
        <Tab label="Инструменты" />
        <Tab label="Продвижение" />
        <Tab label="Реф. программа" />
        <Tab label="Правила" />
        <Tab label="Вывод средств" />
      </Tabs>

      {tabIndex === 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Задания
          </Typography>
          {tasks.length === 0 ? (
            <Typography variant="body1">Нет доступных заданий</Typography>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} onComplete={handleTaskComplete} />
            ))
          )}
        </Box>
      )}

      {tabIndex === 1 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Мои треки
          </Typography>
          {myTracks.length === 0 ? (
            <Typography variant="body1">У вас нет загруженных треков.</Typography>
          ) : (
            myTracks.map((track) => (
              <Card key={track.id} sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6">{track.title}</Typography>
                  <Typography variant="body2">
                    Прослушивания: {track.listens} | Лайки: {track.likes}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      )}

      {tabIndex === 2 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Инструменты
          </Typography>
          <Typography variant="body1">
            Здесь будут инструменты для музыкантов: редакторы, генераторы идей, аналитика и т.д.
          </Typography>
        </Box>
      )}

      {tabIndex === 3 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Продвижение
          </Typography>
          <Typography variant="body1">
            Здесь вы можете приобрести пакеты продвижения, посмотреть статистику и управлять продвижением треков.
          </Typography>
          {/* Здесь можно добавить карточки с пакетами продвижения */}
        </Box>
      )}

      {tabIndex === 4 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Реферальная программа
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Пригласите друзей и получите бонусы. Используйте свой рефкод, чтобы начислять бонусы себе и вашим друзьям.
          </Typography>
          <Button variant="contained" onClick={handleGetRefCode}>
            Показать мой рефкод
          </Button>
        </Box>
      )}

      {tabIndex === 5 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Правила
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Здесь разместите правила для музыкантов: условия загрузки треков, правила продвижения и прочее.
          </Typography>
        </Box>
      )}

      {tabIndex === 6 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Вывод средств
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Минимальная сумма для вывода — 500₽. Выберите банк и подтвердите вывод.
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

export default MusicianDashboard;