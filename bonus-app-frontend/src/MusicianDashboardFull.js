import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
} from "@mui/material";

// Импортируем компоненты из отдельных файлов:
import OverviewDashboard from "./OverviewDashboard";
import TaskCard from "./TaskCard";
import PromotionYandexMusic from "./PromotionYandexMusic";
import PromotionVK from "./PromotionVK";
import PromotionMassPosting from "./PromotionMassPosting";
import CreateTaskForm from "./CreateTaskForm";
import AIHitGenerator from "./AIHitGenerator";

export default function MusicianDashboardFull() {
  // Основные вкладки: 0 - Обзор, 1 - Задания, 2 - Инструменты, 3 - Продвижение, 4 - Реферальная программа, 5 - Вывод средств
  const [tabIndex, setTabIndex] = useState(0);
  // Под-вкладки в разделе "Продвижение": 0 - Я.Музыка, 1 - ВК, 2 - Масспостинг
  const [subTabPromo, setSubTabPromo] = useState(0);
  // Логика: если пользователь купил пакет, то promotionPaid становится true
  const [promotionPaid, setPromotionPaid] = useState(false);

  // Данные пользователя (пример, в реальности данные получаются с бэкенда)
  const [userData, setUserData] = useState({
    level: 1,
    bonusRoubles: 150,
    bonusInternal: 50,
    refCode: "ABC123",
    referralsCount: 3,
    totalTasks: 10,
  });
  // Список заданий для вкладки "Задания"
  const [tasks, setTasks] = useState([]);

  // Поля для вывода средств
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [agreePDP, setAgreePDP] = useState(false);

  useEffect(() => {
    // Пример загрузки данных пользователя
    setUserData({
      level: 1,
      bonusRoubles: 150,
      bonusInternal: 50,
      refCode: "ABC123",
      referralsCount: 3,
      totalTasks: 10,
    });
    // Пример загрузки заданий с бэкенда
    fetch("http://localhost:5001/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setTasks(data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Обработка завершения задания
  const handleTaskComplete = async (taskId) => {
    try {
      const res = await fetch("http://localhost:5001/api/taskComplete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 1, taskId }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Задание выполнено, бонус начислен!");
        setTasks((prev) => prev.filter((t) => t._id !== taskId));
      } else {
        alert("Ошибка: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка сети");
    }
  };

  // Покупка пакета: уменьшаем баланс и считаем продвижение оплаченным
  const handlePackageBuy = (pkg) => {
    alert(`Пакет "${pkg.title}" куплен за ${pkg.price}₽`);
    setUserData((prev) => ({
      ...prev,
      bonusRoubles: prev.bonusRoubles - pkg.price,
    }));
    setPromotionPaid(true);
  };

  // Переключение под-вкладок в разделе "Продвижение"
  const handleSubTabPromoChange = (e, newValue) => {
    setSubTabPromo(newValue);
  };

  // Вывод средств
  const handleWithdraw = async () => {
    if (!withdrawAmount || !selectedBank || !agreePDP) {
      alert("Заполните поля и подтвердите согласие");
      return;
    }
    try {
      const response = await fetch("http://localhost:5001/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1,
          amount: Number(withdrawAmount),
          bank: selectedBank,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setUserData((prev) => ({
          ...prev,
          bonusRoubles: prev.bonusRoubles - Number(withdrawAmount),
        }));
      } else {
        alert("Ошибка: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка вывода средств");
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: { xs: 2, sm: 3 },
        mb: { xs: 2, sm: 3 },
        p: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Typography variant="h4" gutterBottom>
        Личный кабинет музыканта
      </Typography>

      {/* Краткая статистика */}
      <Box
        sx={{
          p: { xs: 1, sm: 2 },
          backgroundColor: "#e3f2fd",
          borderRadius: 1,
          mb: { xs: 2, md: 3 },
        }}
      >
        <Typography variant="h6">
          Уровень: {userData.level}/10
        </Typography>
        <Typography variant="h6">
          Баланс: {userData.bonusRoubles} руб. | {userData.bonusInternal} P2T
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Рефералов: {userData.referralsCount} | Всего заданий: {userData.totalTasks}
        </Typography>
      </Box>

      {/* Основные вкладки */}
      <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Обзор" />
        <Tab label="Задания" />
        <Tab label="Инструменты" />
        <Tab label="Продвижение" />
        <Tab label="Реферальная программа" />
        <Tab label="Вывод средств" />
      </Tabs>

      {/* Вкладка "Обзор" */}
      {tabIndex === 0 && <OverviewDashboard />}

      {/* Вкладка "Задания" — выводим только прослушанные задания */}
      {tabIndex === 1 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Задания (Прослушанные)
          </Typography>
          {tasks.length === 0 ? (
            <Typography>Нет заданий</Typography>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onComplete={handleTaskComplete}
              />
            ))
          )}
        </Box>
      )}

      {/* Вкладка "Инструменты" — здесь выводим AIHitGenerator */}
      {tabIndex === 2 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Инструменты
          </Typography>
          <Typography variant="body1">
            Здесь можно добавить AI-обложки, авто-мастеринг и другие сервисы.
          </Typography>
          <AIHitGenerator />
        </Box>
      )}

      {/* Вкладка "Продвижение" */}
      {tabIndex === 3 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Продвижение
          </Typography>
          <Tabs
            value={subTabPromo}
            onChange={handleSubTabPromoChange}
          >
            <Tab label="Продвижение в Я.Музыке" />
            <Tab label="Продвижение в ВК" />
            <Tab label="Масспостинг" />
          </Tabs>
          <Box sx={{ mt: 2 }}>
            {subTabPromo === 0 && (
              <PromotionYandexMusic
                userBalance={userData.bonusRoubles}
                onPromotionBuy={handlePackageBuy}
              />
            )}
            {subTabPromo === 1 && (
              <PromotionVK
                userBalance={userData.bonusRoubles}
                onPackageBuy={handlePackageBuy}
              />
            )}
            {subTabPromo === 2 && (
              <PromotionMassPosting
                userBalance={userData.bonusRoubles}
                onPackageBuy={handlePackageBuy}
              />
            )}
          </Box>
          {/* Если пакет оплачено, показываем форму создания задания */}
          {promotionPaid && (
            <Box sx={{ mt: 4 }}>
              <CreateTaskForm />
            </Box>
          )}
        </Box>
      )}

      {/* Вкладка "Реферальная программа" */}
      {tabIndex === 4 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Реферальная программа
          </Typography>
          {userData.refCode ? (
            <Typography>
              Ваша реферальная ссылка:{" "}
              <strong>
                https://вашдомен/register?ref={userData.refCode}
              </strong>
            </Typography>
          ) : (
            <Typography>Реферальный код не найден</Typography>
          )}
        </Box>
      )}

      {/* Вкладка "Вывод средств" */}
      {tabIndex === 5 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Вывод средств
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
          <TextField
            label="Сумма для вывода (₽)"
            type="number"
            fullWidth
            sx={{ mb: 2 }}
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={agreePDP}
                onChange={(e) => setAgreePDP(e.target.checked)}
                color="primary"
              />
            }
            label="Согласен с обработкой персональных данных"
          />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleWithdraw}>
              Вывести
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}