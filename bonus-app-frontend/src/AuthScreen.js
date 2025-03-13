// src/AuthScreen.js (пример)
import React from 'react';

const YANDEX_CLIENT_ID = "ВАШ_CLIENT_ID"; 
const REDIRECT_URI = "http://localhost:5001/auth/callback"; 

function AuthScreen() {
  const handleYandexLogin = () => {
    const authUrl = `https://oauth.yandex.ru/authorize?response_type=code`
      + `&client_id=${YANDEX_CLIENT_ID}`
      + `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authUrl;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Авторизация</h2>
      <button
        onClick={handleYandexLogin}
        style={{
          backgroundColor: '#fc3f1d',
          color: '#fff',
          padding: '10px 20px',
          fontSize: '16px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Войти через Яндекс
      </button>
    </div>
  );
}

export default AuthScreen;