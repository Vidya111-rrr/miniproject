import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Settings = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: '',
    username: '',
    email: '',
    role: '',
    company: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nameForm, setNameForm] = useState({ name: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });
  const [nameMessage, setNameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  // Fetch user details on mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You must be logged in to view this page.');
          setLoading(false);
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:4000/api/users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user details.');
        }

        const data = await response.json();
        setUserDetails({
          name: data.name || 'N/A',
          username: data.username || 'N/A',
          email: data.email || 'N/A',
          role: data.role || 'N/A',
          company: data.company || 'N/A',
        });
        setNameForm({ name: data.name || '' });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  // Handle name update
  const handleNameChange = (e) => {
    setNameForm({ name: e.target.value });
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    setNameMessage('');
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/api/users/update-name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: nameForm.name }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update name.');
      }

      setUserDetails((prev) => ({ ...prev, name: nameForm.name }));
      setNameMessage('Name updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle password update
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMessage('');
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/api/users/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordForm),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update password.');
      }

      setPasswordMessage('Password updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="settings-page">
        <h1>Settings</h1>
        <div className="user-details">
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Username:</strong> {userDetails.username}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Role:</strong> {userDetails.role}</p>
          <p><strong>Company:</strong> {userDetails.company}</p>
        </div>

        <form onSubmit={handleNameSubmit}>
          <h2>Update Name</h2>
          <input
            type="text"
            value={nameForm.name}
            onChange={handleNameChange}
            placeholder="Enter new name"
          />
          <button type="submit">Update Name</button>
          {nameMessage && <p>{nameMessage}</p>}
        </form>

        <form onSubmit={handlePasswordSubmit}>
          <h2>Update Password</h2>
          <input
            type="password"
            name="currentPassword"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
            placeholder="Enter current password"
          />
          <input
            type="password"
            name="newPassword"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            placeholder="Enter new password"
          />
          <button type="submit">Update Password</button>
          {passwordMessage && <p>{passwordMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Settings;