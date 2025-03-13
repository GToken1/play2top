// PackageList.js
import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";

export default function PackageList({ title, packages, userBalance, onPackageBuy }) {
  const renderPackage = (pkg) => {
    const affordable = userBalance >= pkg.price;
    return (
      <Grid item xs={12} sm={6} md={3} key={pkg.title}>
        <Card sx={{ minHeight: 180, opacity: affordable ? 1 : 0.5 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {pkg.title}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
              {pkg.description}
            </Typography>
            {pkg.bonus && (
              <Typography
                variant="body2"
                sx={{ mt: 1, color: "green", fontStyle: "italic" }}
              >
                🌟 Бонус! {pkg.bonus}
              </Typography>
            )}
            <Typography
              variant="h5"
              color="secondary"
              sx={{ mt: 1, fontWeight: "bold" }}
            >
              {pkg.price}₽
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={!affordable}
              onClick={() => affordable && onPackageBuy && onPackageBuy(pkg)}
            >
              {affordable ? "Купить" : "Недоступно"}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {packages.map(renderPackage)}
      </Grid>
    </Box>
  );
}