import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';

const ChatSupport = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    // Добавляем сообщение пользователя в историю
    const newConversation = [...conversation, { sender: 'user', text: message }];
    setConversation(newConversation);
    
    try {
      const response = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      const data = await response.json();
      if (data.reply) {
        setConversation([...newConversation, { sender: 'bot', text: data.reply }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
    
    setMessage('');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Чат поддержки
      </Typography>
      <Paper sx={{ p: 2, maxHeight: 400, overflowY: 'auto' }}>
        {conversation.map((msg, index) => (
          <Box key={index} sx={{ my: 1, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <Typography variant="body1" sx={{ display: 'inline-block', p: 1, borderRadius: 1, bgcolor: msg.sender === 'user' ? '#1976d2' : '#e0e0e0', color: msg.sender === 'user' ? '#fff' : '#000' }}>
              {msg.text}
            </Typography>
          </Box>
        ))}
      </Paper>
      <Box sx={{ display: 'flex', mt: 2 }}>
        <TextField
          label="Ваше сообщение"
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSend} sx={{ ml: 1 }}>
          Отправить
        </Button>
      </Box>
    </Container>
  );
};

export default ChatSupport;