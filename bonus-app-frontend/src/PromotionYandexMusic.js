// PromotionYandexMusic.js
import React from "react";
import { Box, Typography } from "@mui/material";
import PackageList from "./PackageList";

export default function PromotionYandexMusic({ userBalance, onPromotionBuy }) {
  const listensPackages = [
    {
      title: "Стартовый",
      description: "100 новых слушателей на трек\n+ лайки на трек",
      price: 2900,
    },
    {
      title: "Базовый",
      description: "200 новых слушателей на трек\n+ лайки на трек",
      price: 4900,
    },
    {
      title: "Оптимальный",
      description: "500 новых слушателей на трек\n+ лайки на трек",
      price: 11900,
      bonus: "Соберем обратную связь по вашему треку от наших пользователей.",
    },
    {
      title: "Продвинутый",
      description: "1000 новых слушателей на трек\n+ лайки на трек",
      price: 19900,
      bonus: "Соберем обратную связь по вашему треку от наших пользователей.",
    },
  ];

  const presavePackages = [
    { title: "50 пресейвов на трек/альбом", price: 2000 },
    { title: "100 пресейвов на трек/альбом", price: 3500 },
    { title: "200 пресейвов на трек/альбом", price: 6200 },
    { title: "500 пресейвов на трек/альбом", price: 14500 },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Продвижение в Яндекс.Музыке
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Ваш баланс: {userBalance}₽
      </Typography>

      {/* Список пакетов "Прослушивания" */}
      <PackageList
        title="Прослушивания"
        packages={listensPackages}
        userBalance={userBalance}
        onPackageBuy={onPromotionBuy}
      />

      {/* Список пакетов "Пресейвы" */}
      <PackageList
        title="Пресейвы"
        packages={presavePackages}
        userBalance={userBalance}
        onPackageBuy={onPromotionBuy}
      />
    </Box>
  );
}