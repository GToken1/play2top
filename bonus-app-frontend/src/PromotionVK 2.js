// PromotionVK.js
import React from "react";
import { Box, Typography } from "@mui/material";
import PackageList from "./PackageList";

export default function PromotionVK({ userBalance, onPackageBuy }) {
  const listensPackages = [
    {
      title: "Стартовый",
      description: "100 новых слушателей на трек\n100 добавлений в плейлисты",
      price: 2900,
    },
    // ...
  ];

  const presavePackages = [
    { title: "50 пресейвов на трек/альбом", price: 2000 },
    // ...
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Продвижение в ВК
      </Typography>
      <PackageList
        title="Прослушивания"
        packages={listensPackages}
        userBalance={userBalance}
        onPackageBuy={onPackageBuy}
      />
      <PackageList
        title="Пресейвы"
        packages={presavePackages}
        userBalance={userBalance}
        onPackageBuy={onPackageBuy}
      />
    </Box>
  );
}