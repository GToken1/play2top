import React, { useState } from 'react';

const ExternalTrack = ({ trackUrl, trackTitle }) => {
  const [bonus, setBonus] = useState(null);
  const [completed, setCompleted] = useState(false);

  // Функция для открытия трека в новом окне
  const openTrack = () => {
    window.open(trackUrl, '_blank');
  };

  // Функция подтверждения выполнения задания пользователем
  const handleConfirm = async () => {
    try {
      // Отправляем запрос на backend для начисления бонуса
      // Здесь используем фиксированный userId для теста (1)
      const response = await fetch('http://localhost:5001/listen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1, trackId: 0 }) // trackId можно использовать, если потребуется
      });
      const data = await response.json();
      setBonus(data.bonus);
      setCompleted(true);
    } catch (error) {
      console.error('Error during bonus request:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Promote Your Track</h2>
      <h3>Now Playing: {trackTitle}</h3>
      <p>
        Click the button below to open the track on Yandex Music.
      </p>
      <button onClick={openTrack}>Open Track</button>
      <br /><br />
      <p>After listening, click the button to confirm you've completed the task:</p>
      <button onClick={handleConfirm} disabled={completed}>
        {completed ? 'Task Completed' : 'I have listened and performed actions'}
      </button>
      {bonus !== null && (
        <p>Your bonus: {bonus}</p>
      )}
    </div>
  );
};

export default ExternalTrack;