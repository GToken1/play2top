import React, { useState } from 'react';

const Listen = () => {
  // Очередь треков – пока задаём несколько примеров
  const tracks = [
    { id: 1, title: 'SoundHelix Song 1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 2, title: 'SoundHelix Song 2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 3, title: 'SoundHelix Song 3', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [bonus, setBonus] = useState(null);

  // Отправка запроса на начисление бонуса при полном прослушивании трека
  const handleEnded = async () => {
    try {
      const response = await fetch('http://localhost:5001/listen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1, trackId: tracks[currentIndex].id })
      });
      const data = await response.json();
      setBonus(data.bonus);
    } catch (error) {
      console.error('Error during bonus request:', error);
    }
    // Автоматически переключаемся на следующий трек
    if (currentIndex < tracks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert('You have finished all tracks in the queue.');
    }
  };

  // Функция для пропуска текущего трека (без начисления бонуса)
  const handleSkip = () => {
    if (currentIndex < tracks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert('No more tracks to skip.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Listen to a Track</h2>
      <h3>Now Playing: {tracks[currentIndex].title}</h3>
      <audio
        controls
        onEnded={handleEnded}
        src={tracks[currentIndex].url}
      >
        Your browser does not support the audio element.
      </audio>
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleSkip}>Skip Track</button>
      </div>
      {bonus !== null && (
        <p>Your bonus: {bonus}</p>
      )}
      <h3>Queue:</h3>
      <ol>
        {tracks.map((track, index) => (
          <li key={track.id} style={{ fontWeight: index === currentIndex ? 'bold' : 'normal' }}>
            {track.title}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Listen;