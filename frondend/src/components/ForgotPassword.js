import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/forgot-password', { email });
      alert(response.data.message);
      navigate('/reset-password?token=' + response.data.resetToken);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <img src="https://img.icons8.com/ios-filled/50/000000/lock.png" alt="Lock" style={{ display: 'block', margin: '0 auto 20px' }} />
      <h2>Forgot Password?</h2>
      <p>You can reset your password here.</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email address"
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;