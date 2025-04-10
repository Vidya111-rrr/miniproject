import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token, role } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:4000/reset-password/${token}`,
        { newPassword: password }
      );

      if (res.data?.message) {
        setMessage(res.data.message);
        setTimeout(() => navigate(`/${role}/login`), 2000);
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Reset Password</h2>

        {message && <div className="text-green-600 text-center">{message}</div>}
        {error && <div className="text-red-600 text-center">{error}</div>}

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
