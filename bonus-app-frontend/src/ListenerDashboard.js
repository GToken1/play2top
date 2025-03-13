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

// ----- Карточка одного задания -----
const TaskCard = ({ task, onComplete }) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const toggleInstructions = () => setShowInstructions(!showInstructions);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {task.type === "listening" ? "Прослушать трек" : "Выкладывание ролика"}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
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
        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onComplete(task.id)}
          >
            Загрузить отчет
          </Button>
          <Button variant="outlined" color="secondary">
            Пропустить
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="text" onClick={toggleInstructions}>
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
        </Box>
      </CardContent>
    </Card>
  );
};

// ----- Основной компонент ListenerDashboard -----
const ListenerDashboard = () => {
  const listenerId = 2; // ID слушателя (будет получаться из системы авторизации)
  const [tabIndex, setTabIndex] = useState(0); // Основные вкладки: 0 - Задания, 1 - Правила, 2 - Реферальная программа, 3 - Вывод средств
  const [taskSubTab, setTaskSubTab] = useState(0); // Внутренние вкладки для Заданий: 0 - Слушать музыку, 1 - Выкладывать ролики
  const [userData, setUserData] = useState({
    bonusRoubles: 80,
    bonusInternal: 120,
    level: 3,
  });
  const [tasks, setTasks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [agreePD, setAgreePD] = useState(false);
  const [refCode, setRefCode] = useState("ABC123");

  useEffect(() => {
    // Загружаем задания (пока mock-данные)
    const mockTasks = [
      {
        id: 1,
        type: "listening",
        instructions: "Прослушать трек 'Катятся колеса' полностью без перемотки.",
        link: "https://example.com/track1",
        detailedInstructions:
          "Внимательно прослушайте трек без перемотки. После завершения сделайте скриншот и отправьте отчет.",
      },
      {
        id: 2,
        type: "massposting",
        instructions:
          "Снимите видеоролик с использованием официального трека и опубликуйте его в TikTok с хештегом #34663.",
        link: "https://example.com/assignment2",
        detailedInstructions:
          "Снимите креативное видео, опубликуйте в TikTok с хештегом #34663 и отправьте ссылку на ролик для проверки.",
      },
      // Можно добавить дополнительные задачи...
    ];
    setTasks(mockTasks);

    // Загружаем данные пользователя (mock)
    setUserData({
      bonusRoubles: 80,
      bonusInternal: 120,
      level: 3,
    });

    // Рефкод (mock)
    setRefCode("ABC123");
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Обработчик для внутренних вкладок в "Задания"
  const handleTaskSubTabChange = (event, newValue) => {
    setTaskSubTab(newValue);
  };

  const handleTaskComplete = (taskId) => {
    // Здесь добавить реальную логику выполнения задания и начисления бонусов
    alert(`Задание ${taskId} выполнено, бонус начислен`);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleGetRefCode = () => {
    alert("Ваш рефкод: " + refCode);
  };

  // Фильтруем задания по типу для внутренних вкладок в "Задания"
  const filteredTasks = tasks.filter(
    (task) => task.type === (taskSubTab === 0 ? "listening" : "massposting")
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Личный кабинет слушателя
      </Typography>
      <Box sx={{ p: 2, backgroundColor: "#e3f2fd", borderRadius: 1, mb: 2 }}>
        <Typography variant="h6">
          Ваш баланс: {userData.bonusRoubles} руб. | {userData.bonusInternal} монет
        </Typography>
        <Typography variant="h6">Ваш уровень: {userData.level}</Typography>
      </Box>

      {/* Основные вкладки */}
      <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Задания" />
        <Tab label="Правила" />
        <Tab label="Реферальная программа" />
        <Tab label="Вывод средств" />
      </Tabs>

      {tabIndex === 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Очередь заданий
          </Typography>
          {/* Внутренние вкладки для "Задания": Слушать музыку / Выкладывать ролики */}
          <Tabs
            value={taskSubTab}
            onChange={handleTaskSubTabChange}
            sx={{ mb: 2 }}
          >
            <Tab label="Слушать музыку" />
            <Tab label="Выкладывать ролики" />
          </Tabs>
          {filteredTasks.length === 0 ? (
            <Typography variant="body1">Нет доступных заданий</Typography>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} onComplete={handleTaskComplete} />
            ))
          )}
        </Box>
      )}

      {tabIndex === 1 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Правила прослушивания треков
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Здесь разместите подробные правила для прослушивания треков…
          </Typography>
        </Box>
      )}

      {tabIndex === 2 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Реферальная программа
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Пригласите друзей и получите бонусы. Ваш рефкод можно использовать для начисления бонусов как вам, так и вашему приглашенному.
          </Typography>
          <Button variant="contained" onClick={handleGetRefCode}>
            Показать мой рефкод
          </Button>
        </Box>
      )}

      {tabIndex === 3 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Вывод средств
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Минимальная сумма для вывода — 400₽. Выберите банк:
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

export default ListenerDashboard;