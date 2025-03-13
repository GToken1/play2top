import React from "react";
import { Container, Typography, Box } from "@mui/material";

function Refund() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        ПРАВИЛА ВОЗВРАТА
      </Typography>
      <Typography variant="body2" gutterBottom>
        (Если вынести отдельно; иначе можно оставить в Оферте.)  
        <br />
        Дата актуализации: «___» ________ 2023 г.
      </Typography>

      <Box sx={{ mt: 2 }}>
        {/* --- Раздел 1 --- */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          1. Общие положения
        </Typography>
        <Typography variant="body1" paragraph>
          1.1. Правила возврата распространяются на оплаченные услуги,
          предоставляемые на Сайте «Play2Top».
        </Typography>

        {/* --- Раздел 2 --- */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
          2. Виды услуг
        </Typography>
        <Typography variant="body1" paragraph>
          • «Пакеты продвижения» для музыкантов (N показов / прослушиваний),
          <br />
          • Дополнительные AI-услуги (обработка треков),
          <br />
          • И другие оплачиваемые функции.
        </Typography>

        {/* --- Раздел 3 --- */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
          3. Условия возврата
        </Typography>
        <Typography variant="body1" paragraph>
          3.1. Возврат средств возможен, если услуга не была оказана (полностью
          или частично).
          <br />
          3.2. Если услуга оказана частично, возврат возможен пропорционально
          невостребованной части, если иное не оговорено тарифом.
        </Typography>

        {/* --- Раздел 4 --- */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
          4. Способ возврата
        </Typography>
        <Typography variant="body1" paragraph>
          4.1. Возврат осуществляется тем же путём, что и оплата (на ту же
          карту/счёт), в срок до 10 рабочих дней с момента одобрения заявки.
          <br />
          4.2. Комиссии платёжных систем могут удерживаться (если это прописано в
          правилах).
        </Typography>

        {/* --- Раздел 5 --- */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
          5. Процедура
        </Typography>
        <Typography variant="body1" paragraph>
          5.1. Чтобы запросить возврат, Пользователь отправляет письмо на
          ekzne@yandex.ru с темой «Возврат средств» и указывает:
          <br />
          - Дату и сумму платежа,
          <br />
          - Причину возврата,
          <br />
          - Контактные данные.
        </Typography>
        <Typography variant="body1" paragraph>
          5.2. Исполнитель рассматривает заявку в течение 5 рабочих дней,
          принимает решение и уведомляет Пользователя.
        </Typography>

        {/* --- Раздел 6 --- */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 1 }}>
          6. Отказ в возврате
        </Typography>
        <Typography variant="body1" paragraph>
          6.1. Если причина возврата не связана с неисправностью сервиса или
          неоказанием услуг, и при этом услуга оказана в полном объёме, возврат
          не производится.
        </Typography>
        <Typography variant="body1" paragraph>
          6.2. При выявлении нарушений правил (мошенничество, обман) со стороны
          Пользователя, возврат может быть отклонён.
        </Typography>
      </Box>
    </Container>
  );
}

export default Refund;