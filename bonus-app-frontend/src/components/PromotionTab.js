// src/components/PromotionTab.js
import React from 'react';
import { Container, Typography, Box, Grid, Button, Link } from '@mui/material';

const PromotionTab = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Продвижение
      </Typography>
      <Typography variant="body1" gutterBottom>
        Вы можете выполнять задания, копить рубли и P2T и продвигать свои треки БЕСПЛАТНО.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Накопленные средства в рублях можно выводить на карту, либо использовать для покупки пакетов продвижения.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Каждый новый уровень, который открывается при накоплении P2T, даст вам новый бесплатный пакет слушателей.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Вы можете воспользоваться нашими платными пакетами продвижения. Если у вас есть промокод, сообщите его менеджеру при отправке заявки.
      </Typography>

      <Box sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Продвижение в Яндекс.Музыке
        </Typography>
        <Link href="https://usemytrack.ru" target="_blank" rel="noopener">
          Узнать подробнее
        </Link>
      </Box>

      <Typography variant="h6" gutterBottom>
        Платные пакеты продвижения
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ border: "1px solid #ccc", borderRadius: 1, p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              ⚡ Стартовый:
            </Typography>
            <Typography variant="body2">
              100 новых слушателей на трек{'\n'}+ лайки на трек
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
              2 900₽
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 1 }}>
              Купить
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ border: "1px solid #ccc", borderRadius: 1, p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              ⚡ Базовый:
            </Typography>
            <Typography variant="body2">
              200 новых слушателей на трек{'\n'}+ лайки на трек
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
              4 900₽
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 1 }}>
              Купить
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ border: "1px solid #ccc", borderRadius: 1, p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              ⚡ Оптимальный:
            </Typography>
            <Typography variant="body2">
              500 новых слушателей на трек{'\n'}+ лайки на трек
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
              11 900₽
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 1 }}>
              Купить
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ border: "1px solid #ccc", borderRadius: 1, p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              ⚡ Продвинутый:
            </Typography>
            <Typography variant="body2">
              1000 новых слушателей на трек{'\n'}+ лайки на трек
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
              19 900₽
            </Typography>
            <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
              🌟 Бонус! Соберем обратную связь по вашему треку от наших пользователей.
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 1 }}>
              Купить
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Пресейвы
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ border: "1px solid #ccc", borderRadius: 1, p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                ⚡ 50 пресейвов:
              </Typography>
              <Typography variant="body2">
                2 000₽
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                Купить
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ border: "1px solid #ccc", borderRadius: 1, p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                ⚡ 100 пресейвов:
              </Typography>
              <Typography variant="body2">
                3 500₽
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                Купить
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ border: "1px solid #ccc", borderRadius: 1, p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                ⚡ 200 пресейвов:
              </Typography>
              <Typography variant="body2">
                6 200₽
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                Купить
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ border: "1px solid #ccc", borderRadius: 1, p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                ⚡ 500 пресейвов:
              </Typography>
              <Typography variant="body2">
                14 500₽
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                Купить
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PromotionTab;