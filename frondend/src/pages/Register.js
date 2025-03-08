import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles for react-toastify

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match!', {
        position: "top-center", // Display at the top-center of the screen
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      // Make the POST request to the back-end for registration
      const response = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
        
        // Show success toast notification with green checkmark
        toast.success('Registration successful! 🎉', {
          position: "top-center", // Display at the top-center of the screen
          autoClose: 300,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });

        // Navigate to the login page after a short delay
        setTimeout(() => {
          navigate('/login'); // Redirect to the login page
        }, 1000); // Delay for 1 seconds to allow user to see the toast
      } else {
        console.error('Registration failed:', data.message);
        setError(data.message || 'Registration failed. Please try again.');

        // Show failure toast notification with X mark
        toast.error(data.message || 'Registration failed. Please try again.', {
          position: "top-center", // Display at the top-center of the screen
          autoClose: 200,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.error('An error occurred during registration:', err);
      setError('An error occurred. Please try again later.');

      // Show failure toast notification with X mark
      toast.error('An error occurred. Please try again later.', {
        position: "top-center", // Display at the top-center of the screen
        autoClose: 200,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default Register;
