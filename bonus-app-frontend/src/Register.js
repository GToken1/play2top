// src/Register.js
import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

function Register() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 1) Считываем ?role= из URL (например, /register?role=listener)
  //    Если нет параметра, ставим по умолчанию "musician".
  const defaultRole = searchParams.get("role") || "musician";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [yandexLink, setYandexLink] = useState("");
  // 2) Начальное значение role = defaultRole
  const [role, setRole] = useState(defaultRole);
  const [message, setMessage] = useState("");

  // Если хочешь сразу же скрыть/показать какие-то поля при изменении role,
  // можно использовать useEffect(() => { ... }, [role])

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Минимальные проверки
    if (username.length < 3) {
      setMessage("Логин должен быть не менее 3 символов.");
      return;
    }
    if (password.length < 6) {
      setMessage("Пароль должен быть не менее 6 символов.");
      return;
    }
    if (!isValidUrl(yandexLink)) {
      setMessage("Введите корректную ссылку на ваш кабинет/профиль в Яндекс Музыке.");
      return;
    }

    try {
      // Отправляем запрос на бэкенд
      const res = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role, yandexLink }),
      });
      const data = await res.json();

      if (res.ok) {
        // Если не нужно подтверждать email, сразу перенаправляем в ЛК
        if (role === "musician") {
          navigate("/lk-musician");
        } else {
          navigate("/lk-listener");
        }

        // Если нужно подтверждать email, можно вместо этого:
        // navigate("/verify-email", { state: { username } });
      } else {
        setMessage("Ошибка: " + data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Ошибка сети");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Регистрация
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Логин (Email)"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
          required
        />

        <TextField
          label="Пароль"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
          required
        />

        <TextField
          label="Ссылка на ваш профиль Яндекс Музыки"
          fullWidth
          value={yandexLink}
          onChange={(e) => setYandexLink(e.target.value)}
          sx={{ mb: 2 }}
          required
        />

        {/* Выбор роли (музыкант/слушатель) */}
        <div style={{ marginBottom: "16px" }}>
          <label>Выберите роль: </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ padding: "8px", marginLeft: "8px" }}
          >
            <option value="musician">Музыкант</option>
            <option value="listener">Слушатель</option>
          </select>
        </div>

        <Button variant="contained" color="primary" type="submit">
          Зарегистрироваться
        </Button>
      </form>

      {message && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Container>
  );
}

export default Register;