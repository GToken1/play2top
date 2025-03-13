// src/screens/AuthScreen.js
import React, { useEffect, useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const AuthScreen = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Пример Яндекс OAuth (если используете)
  const CLIENT_ID = "7bf34d5f244b4ad1bdce4340fb7e8d0f";
  const REDIRECT_URI = "https://play2top.ru/auth/callback";
  const ORIGIN = "https://play2top.ru";

  useEffect(() => {
    if (!window.YaAuthSuggest) {
      console.warn("YaAuthSuggest не найден. Проверьте public/index.html");
      return;
    }
    window.YaAuthSuggest.init(
      {
        client_id: CLIENT_ID,
        response_type: "token", // или "code"
        redirect_uri: REDIRECT_URI,
      },
      ORIGIN,
      {
        view: "button",
        parentId: "yandex-sso",
        buttonView: "main",
        buttonTheme: "light",
        buttonSize: "m",
        buttonBorderRadius: 6,
      }
    )
      .then(({ handler }) => handler())
      .then((data) => {
        console.log("Yandex SSO init success:", data);
      })
      .catch((err) => {
        console.error("Yandex SSO init error:", err);
        if (err.code === "in_progress") {
          console.warn("Yandex SSO is in progress. Это не критично.");
        }
      });
  }, []);

  const handleLocalLogin = async () => {
    try {
      // Отправляем запрос на бэкенд
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      // Парсим ответ
      const data = await response.json();
      console.log("Login response data:", data);

      if (response.ok) {
        // Успешный логин
        console.log("Login success:", data);

        // Если используете JWT:
        // localStorage.setItem("token", data.token);

        // Перенаправление по роли
        if (data.user && data.user.role === "musician") {
          navigate("/lk-musician");
        } else {
          navigate("/lk-listener");
        }
      } else {
        // Сервер вернул ошибку (4xx или 5xx)
        console.log("Login error data:", data);

        if (data && data.message) {
          alert("Ошибка: " + data.message);
        } else {
          // Если нет поля message, покажем весь объект
          alert("Ошибка: " + JSON.stringify(data));
        }
      }
    } catch (err) {
      // Ошибка сети, CORS или что-то внезапное
      console.error("Login error (catch):", err);
      alert("Ошибка сети или сервера");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Авторизация
      </Typography>

      <TextField
        label="Email"
        fullWidth
        sx={{ mt: 2 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Пароль"
        fullWidth
        type="password"
        sx={{ mt: 2 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleLocalLogin}>
        Войти
      </Button>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Или войти через Яндекс ID:
        </Typography>
        <div id="yandex-sso" />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography>
          Нет аккаунта?{" "}
          <Button
            variant="text"
            component={RouterLink}
            to="/register"
            sx={{ textTransform: "none" }}
          >
            Зарегистрируйтесь
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthScreen;