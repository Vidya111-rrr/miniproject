import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles for react-toastify

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect to selection if the user is already logged in
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/selection'); // Redirect to selection if token exists
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token in local storage
        localStorage.setItem('token', data.token);

        // Show success message with green check mark
        toast.success('Login successful! 🎉', {
          position: "top-center", // Display at the top-center of the screen
          autoClose: 300, // Duration to show the toast
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });

        // Navigate to the selection page after the toast is shown
        setTimeout(() => {
          navigate('/selection');
        }, 1000); // Delay for 1 second to allow user to see the toast
      } else {
        // Handle invalid credentials or errors
        setError(data.message || 'Login failed. Please try again.');
        toast.error(data.message || 'Login failed. Please try again.', {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Login error:', err);
      toast.error('An error occurred. Please try again later.', {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;
