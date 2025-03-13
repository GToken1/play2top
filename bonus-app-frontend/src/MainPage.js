// src/MainPage.js
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
// Важно: используем Link из react-router-dom, чтобы кнопка могла быть ссылкой
import { Link as RouterLink } from "react-router-dom";

const MainPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: `url("/images/fon-gl.png") no-repeat center center`,
        backgroundSize: "cover",
      }}
    >
      <Container maxWidth="lg" sx={{ pt: { xs: 10, md: 12 }, pb: 8 }}>
        {/* Два верхних блока (музыкант / слушатель) */}
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-around"
          sx={{ textAlign: "center", color: "#fff" }}
        >
          {/* Левая колонка: Музыкант */}
          <Grid item xs={12} md={4}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Start Creating
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, mb: 2 }}>
              Продвигай свою музыку.
              <br />
              Создавай хиты с AI P2T
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ textTransform: "none" }}
              component={RouterLink}
              to="/register?role=musician"
            >
              Sign Up (Музыкант)
            </Button>
          </Grid>

          {/* Правая колонка: Слушатель */}
          <Grid item xs={12} md={4}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Зарабатывай, слушая
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, mb: 2 }}>
              Выполняй задания и зарабатывай.
              <br />
              Поддержи будущих звезд
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ textTransform: "none" }}
              component={RouterLink}
              to="/register?role=listener"
            >
              Sign Up (Слушатель)
            </Button>
          </Grid>
        </Grid>

        {/* Заголовок "Почему стоит присоединиться?" */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 2, color: "#fff" }}>
            Почему стоит присоединиться?
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 4, color: "#fff" }}>
            Здесь можно вставить текст с usemytrack.ru (после кнопки «Регистрация»).
            Продолжение текста... и т.д.
          </Typography>
        </Box>

        {/* Четыре карточки (примеры блоков) */}
        <Grid container spacing={2}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card
                sx={{
                  minHeight: 180,
                  backgroundColor: "rgba(255,255,255,0.8)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Блок {i + 1}
                  </Typography>
                  <Typography variant="body2">
                    Короткое описание, можно заменить на:
                    <br />- User Recap
                    <br />- Start Creating
                    <br />- Join Community
                    <br />- Social Features
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MainPage;