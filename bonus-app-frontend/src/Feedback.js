import React, { useState } from 'react';

const Feedback = () => {
  const [trackUrl, setTrackUrl] = useState('');
  const [comment, setComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно отправить данные на backend для сохранения обратной связи
    console.log('Feedback submitted:', { trackUrl, comment });
    setFeedbackSubmitted(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Обратная связь</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ссылка на трек: </label>
          <input 
            type="text" 
            value={trackUrl} 
            onChange={(e) => setTrackUrl(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Комментарий: </label>
          <textarea 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Отправить обратную связь</button>
      </form>
      {feedbackSubmitted && <p>Спасибо за ваш отзыв!</p>}
    </div>
  );
};

export default Feedback;