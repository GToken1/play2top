// src/App.js
import React from "react";
import { Routes, Route, Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  ThemeProvider,
  createTheme,
} from "@mui/material";

// Главная страница
import MainPage from "./MainPage";

// Юр. документы
import Oferta from "./pages/Oferta";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";

// Компонент Footer
import Footer from "./components/Footer";

// Остальные импорты:
import Feed from "./Feed";
import MusicianDashboardFull from "./MusicianDashboardFull";
import Register from "./Register";
// Убираем лишние страницы, так как они уже встроены в ЛК
// import BonusWithdraw from "./BonusWithdraw";
// import ExternalTrack from "./ExternalTrack";
// import EmbeddedTrack from "./EmbeddedTrack";
// import Feedback from "./Feedback";
import PaymentPage from "./PaymentPage";
import AuthScreen from "./screens/AuthScreen";
import RoleSelectionScreen from "./screens/RoleSelectionScreen";
// import ChatSupport from "./ChatSupport";
import ListenerDashboard from "./ListenerDashboard";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
});

const App = () => {
  // Определяем текущий маршрут
  const location = useLocation();
  // Проверяем, главная ли это страница
  const isHomePage = location.pathname === "/";

  return (
    <ThemeProvider theme={theme}>
      {/* Шапка сайта (AppBar) */}
      <AppBar
        position={isHomePage ? "absolute" : "static"}
        sx={{
          backgroundColor: isHomePage ? "transparent" : "primary.main",
          boxShadow: "none",
          color: isHomePage ? "#fff" : "inherit",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ flexWrap: "wrap" }}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: "none",
                color: isHomePage ? "#fff" : "inherit",
              }}
            >
              Play2Top
            </Typography>

            {/* Оставляем только необходимые кнопки */}
            <Button color="inherit" component={RouterLink} to="/auth">
              Войти
            </Button>
            <Button color="inherit" component={RouterLink} to="/role-selection">
              Выбор роли
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Регистрация
            </Button>
            <Button color="inherit" component={RouterLink} to="/feed">
              Лента
            </Button>
            <Button color="inherit" component={RouterLink} to="/lk-musician">
              Музыкант
            </Button>
            <Button color="inherit" component={RouterLink} to="/lk-listener">
              Слушатель
            </Button>
            <Button color="inherit" component={RouterLink} to="/payment">
              Оплата
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Основная часть (Routes) */}
      <Box sx={{ mt: isHomePage ? 0 : 4 }}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/auth" element={<AuthScreen />} />
            <Route path="/role-selection" element={<RoleSelectionScreen />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/lk-musician" element={<MusicianDashboardFull />} />
            <Route path="/lk-listener" element={<ListenerDashboard />} />
            <Route path="/payment" element={<PaymentPage />} />

            {/* Главная страница */}
            <Route path="/" element={<MainPage />} />

            {/* Юридические документы */}
            <Route path="/oferta" element={<Oferta />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/refund" element={<Refund />} />
          </Routes>
        </Container>
      </Box>

      {/* Футер */}
      <Footer />
    </ThemeProvider>
  );
};

export default App;