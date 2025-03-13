// PromotionMassPosting.js
import React from "react";
import { Box, Typography } from "@mui/material";
import PackageList from "./PackageList";

export default function PromotionMassPosting({ userBalance, onPackageBuy }) {
  const packages = [
    {
      title: "Пакет стартовый",
      description:
        "От 50 видеороликов в соц сеть Tik-tok.\nОхваты от 100k до 200k.",
      price: 9900,
    },
    {
      title: "Пакет стандартный",
      description:
        "От 100 видеороликов в соц сеть Tik-tok.\nОхваты от 200k до 500k.",
      price: 16900,
    },
    {
      title: "Пакет оптимальный",
      description:
        "От 300 видеороликов в соц. сеть Tik-Tok.\nОхваты от 500k до 5млн.",
      price: 39000,
    },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Масспостинг
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Публикация видеороликов под треки артистов в соц. сетях наших пользователей.
        <br />
        <br />
        <strong>Как это работает:</strong>
        <br />
        Креативом и воплощением идей для видеороликов под ваш трек занимаются сами пользователи нашего сервиса. Это могут быть танцевальные видео, эмоциональный видеоряд, липсинг, каверы, юмористические видео и многое другое.
      </Typography>
      <PackageList
        title="Тарифы"
        packages={packages}
        userBalance={userBalance}
        onPackageBuy={onPackageBuy}
      />
    </Box>
  );
}