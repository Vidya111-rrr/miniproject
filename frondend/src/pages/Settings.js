// pages/Settings.js
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
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update password.');
      }

      setPasswordMessage('Password updated successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center mt-16 p-4 md:p-8">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-green-600 font-poppins">
            Account Settings
          </h2>

          {/* Loading and Error Messages */}
          {loading && (
            <p className="text-center text-gray-700 font-roboto text-lg">Loading...</p>
          )}
          {error && (
            <p className="text-center bg-red-100 text-red-700 p-4 rounded-lg font-roboto text-lg mb-4">
              {error}
            </p>
          )}

          {!loading && !error && (
            <>
              {/* User Details */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 font-poppins mb-4">
                  Your Details
                </h3>
                <p className="text-gray-700 font-roboto mb-2">
                  <span className="font-semibold">Name:</span> {userDetails.name}
                </p>
                <p className="text-gray-700 font-roboto mb-2">
                  <span className="font-semibold">Username:</span> {userDetails.username}
                </p>
                <p className="text-gray-700 font-roboto mb-2">
                  <span className="font-semibold">Email:</span> {userDetails.email}
                </p>
                <p className="text-gray-700 font-roboto mb-2">
                  <span className="font-semibold">Role:</span> {userDetails.role}
                </p>
                <p className="text-gray-700 font-roboto">
                  <span className="font-semibold">Company:</span> {userDetails.company}
                </p>
              </div>

              {/* Update Name Form */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 font-poppins mb-4">
                  Update Name
                </h3>
                <form onSubmit={handleNameSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1 font-roboto"
                    >
                      New Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={nameForm.name}
                      onChange={handleNameChange}
                      placeholder="Enter your new name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-roboto"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold font-roboto"
                  >
                    Update Name
                  </button>
                </form>
                {nameMessage && (
                  <p className="text-center text-green-600 font-roboto mt-4">{nameMessage}</p>
                )}
              </div>

              {/* Update Password Form */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 font-poppins mb-4">
                  Update Password
                </h3>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-gray-700 mb-1 font-roboto"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter your current password"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-roboto"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700 mb-1 font-roboto"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter your new password"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-roboto"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold font-roboto"
                  >
                    Update Password
                  </button>
                </form>
                {passwordMessage && (
                  <p className="text-center text-green-600 font-roboto mt-4">{passwordMessage}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;