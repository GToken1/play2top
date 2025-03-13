import React from 'react';

const EmbeddedTrack = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Listen via Embedded Player</h2>
      <iframe 
        src="https://music.yandex.ru/iframe/#track/1234567" 
        width="100%" 
        height="200" 
        frameBorder="0" 
        allow="autoplay; encrypted-media" 
        allowFullScreen
        title="Yandex Music Player"
      ></iframe>
    </div>
  );
};

export default EmbeddedTrack;