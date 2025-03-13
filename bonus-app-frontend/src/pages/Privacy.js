import React from "react";
import { Container, Typography, Box } from "@mui/material";

function Privacy() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ (Play2Top)
      </Typography>
      <Typography variant="body2" gutterBottom>
        Дата актуализации: «___» ________ 2023 г.
      </Typography>

      <Box sx={{ mt: 2 }}>
        {/* --- Раздел 1 --- */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          1. Общие положения
        </Typography>
        <Typography variant="body1" paragraph>
          1.1. Настоящая Политика конфиденциальности (далее – «Политика»)
          определяет порядок обработки и защиты персональных данных Пользователей
          Сервиса «Play2Top» (далее – «Сервис», «Сайт»).
        </Typography>
        <Typography variant="body1" paragraph>
          1.2. Оператор персональных данных: Индивидуальный предприниматель
          (данные см. в Оферте). Все вопросы по обработке данных можно направлять
          на ekzne@yandex.ru.
        </Typography>
        <Typography variant="body1" paragraph>
          1.3. Использование Сервиса означает согласие с данной Политикой.
        </Typography>

        {/* --- Раздел 2 --- */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
          2. Персональные данные, которые обрабатываются
        </Typography>
        <Typography variant="body1" paragraph>
          2.1. Данные, собираемые при регистрации:
          <br />• E-mail,
          <br />• Логин, пароль (хранится в зашифрованном виде),
          <br />• Имя (при желании),
          <br />• Роль (музыкант/слушатель).
        </Typography>
        <Typography variant="body1" paragraph>
          2.2. Данные, которые автоматически передаются:
          <br />• IP-адрес,
          <br />• Cookies,
          <br />• Информация о браузере и ОС,
          <br />• Данные о посещениях страниц Сервиса.
        </Typography>
        <Typography variant="body1" paragraph>
          2.3. Данные, необходимые для финансовых операций (через YooKassa):
          <br />• Информация о платежах (ID транзакции, сумма). Полные реквизиты
          карт не хранятся на Сайте.
        </Typography>

        {/* --- Раздел 3 --- */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
          3. Цели обработки персональных данных
        </Typography>
        <Typography variant="body1" paragraph>
          3.1. Оказание услуг:
          <br />• Регистрация, идентификация Пользователя,
          <br />• Предоставление доступа к функционалу (покупка пакетов,
          начисление бонусов).
        </Typography>
        <Typography variant="body1" paragraph>
          3.2. Улучшение качества Сервиса, статистика посещений, отправка
          уведомлений (новости, обновления).
        </Typography>
        <Typography variant="body1" paragraph>
          3.3. Выполнение требований законодательства РФ.
        </Typography>

        {/* --- Раздел 4 --- */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
          4. Передача данных третьим лицам
        </Typography>
        <Typography variant="body1" paragraph>
          4.1. Персональные данные могут передаваться платёжным системам
          (YooKassa) в объёме, необходимом для обработки оплаты и возвратов.
        </Typography>
        <Typography variant="body1" paragraph>
          4.2. В иных случаях передача возможна только при наличии согласия
          Пользователя или требований законодательства.
        </Typography>

        {/* --- Раздел 5 --- */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
          5. Меры по защите данных
        </Typography>
        <Typography variant="body1" paragraph>
          5.1. Оператор принимает технические и организационные меры для защиты
          персональных данных от несанкционированного доступа.
        </Typography>
        <Typography variant="body1" paragraph>
          5.2. Доступ к данным имеют только уполномоченные сотрудники, обязанные
          сохранять конфиденциальность.
        </Typography>

        {/* --- Раздел 6 --- */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
          6. Сроки хранения и уничтожение данных
        </Typography>
        <Typography variant="body1" paragraph>
          6.1. Данные хранятся до тех пор, пока существует аккаунт Пользователя
          или пока это необходимо для исполнения договора.
        </Typography>
        <Typography variant="body1" paragraph>
          6.2. По письменному запросу Пользователя оператор может удалить
          (обезличить) личную информацию, если это не противоречит требованиям
          закона.
        </Typography>

        {/* --- Раздел 7 --- */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
          7. Права Пользователя
        </Typography>
        <Typography variant="body1" paragraph>
          7.1. Пользователь вправе запросить информацию о своих данных, требовать
          их обновления, блокировки или удаления при наличии законных оснований.
        </Typography>
        <Typography variant="body1" paragraph>
          7.2. Отзыв согласия на обработку данных может привести к невозможности
          дальнейшего использования Сервиса.
        </Typography>

        {/* --- Раздел 8 --- */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
          8. Изменение политики
        </Typography>
        <Typography variant="body1" paragraph>
          8.1. Оператор вправе вносить изменения в Политику, публикуя новую
          редакцию на Сайте с указанием даты последнего обновления.
        </Typography>
        <Typography variant="body1" paragraph>
          8.2. Продолжение использования Сервиса после опубликования изменений
          означает согласие с новой редакцией.
        </Typography>
      </Box>
    </Container>
  );
}

export default Privacy;