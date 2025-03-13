import React, { useState } from 'react';

const BonusWithdraw = () => {
  const [amount, setAmount] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Фиксированный userId для теста
        body: JSON.stringify({ userId: 1, amount: Number(amount) })
      });
      const data = await response.json();
      setResponseMessage(data.message + ' New bonus: ' + data.bonus);
    } catch (error) {
      console.error('Withdrawal error:', error);
      setResponseMessage('Withdrawal error');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Withdraw Bonus</h2>
      <form onSubmit={handleWithdraw}>
        <div>
          <label>Amount to withdraw: </label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Withdraw</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default BonusWithdraw;