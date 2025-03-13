import React, { useState } from 'react';

const UploadTrack = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadMessage('Пожалуйста, выберите файл.');
      return;
    }
    const formData = new FormData();
    formData.append('trackFile', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await fetch('http://localhost:5001/uploadTrack', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        setUploadMessage('Трек успешно загружен!');
      } else {
        setUploadMessage('Ошибка загрузки: ' + data.message);
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setUploadMessage('Ошибка загрузки трека.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Загрузить трек</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Название трека: </label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Описание: </label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <div>
          <label>Выберите файл: </label>
          <input type="file" onChange={handleFileChange} accept="audio/*" required />
        </div>
        <button type="submit">Загрузить</button>
      </form>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default UploadTrack;