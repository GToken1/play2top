// src/components/Footer.js
import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 4,
        py: 2,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Play2Top
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Link component={RouterLink} to="/oferta" sx={{ mx: 1 }}>
          Публичная оферта
        </Link>
        <Link component={RouterLink} to="/privacy" sx={{ mx: 1 }}>
          Политика конфиденциальности
        </Link>
        <Link component={RouterLink} to="/refund" sx={{ mx: 1 }}>
          Возврат средств
        </Link>
        <Link href="mailto:support@play2top.ru" sx={{ mx: 1 }}>
          Контакты
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;