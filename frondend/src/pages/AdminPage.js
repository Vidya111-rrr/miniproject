import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Admin = () => {
  const navigate = useNavigate();
  const [generatorUsers, setGeneratorUsers] = useState([]);
  const [collectorUsers, setCollectorUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/admin/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch users.');
        }

        const users = await response.json();
        // Filter users into generators and collectors
        const generators = users.filter(user => user.role === 'generator');
        const collectors = users.filter(user => user.role === 'wastecollector');
        setGeneratorUsers(generators);
        setCollectorUsers(collectors);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user.');
      }

      // Update the state to remove the deleted user
      setGeneratorUsers(generatorUsers.filter(user => user._id !== userId));
      setCollectorUsers(collectorUsers.filter(user => user._id !== userId));
      alert('User deleted successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-center text-gray-700 font-roboto text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-center bg-red-100 text-red-700 p-4 rounded-lg font-roboto text-lg">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start mt-16 p-4 md:p-8">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-green-600 font-poppins">
            Admin Dashboard
          </h2>

          {/* Generator Users Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 font-poppins mb-4">
              Generator Users
            </h3>
            {generatorUsers.length === 0 ? (
              <p className="text-center text-gray-700 font-roboto">No generator users found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b text-left font-roboto text-gray-700">Name</th>
                      <th className="py-2 px-4 border-b text-left font-roboto text-gray-700">Username</th>
                      <th className="py-2 px-4 border-b text-left font-roboto text-gray-700">Email</th>
                      <th className="py-2 px-4 border-b text-left font-roboto text-gray-700">Company</th>
                      <th className="py-2 px-4 border-b text-left font-roboto text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatorUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b font-roboto text-gray-700">{user.name}</td>
                        <td className="py-2 px-4 border-b font-roboto text-gray-700">{user.username}</td>
                        <td className="py-2 px-4 border-b font-roboto text-gray-700">{user.email}</td>
                        <td className="py-2 px-4 border-b font-roboto text-gray-700">{user.company || 'N/A'}</td>
                        <td className="py-2 px-4 border-b">
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-all duration-300 font-roboto text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Collector Users Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 font-poppins mb-4">
              Collector Users
            </h3>
            {collectorUsers.length === 0 ? (
              <p className="text-center text-gray-700 font-roboto">No collector users found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b text-left font-roboto text-gray-700">Name</th>
                      <th className="py-2 px-4 border-b text-left font-roboto text-gray-700">Username</th>
                      <th className="py-2 px-4 border-b text-left font-roboto text-gray-700">Email</th>
                      <th className="py-2 px-4 border-b text-left font-roboto text-gray-700">Company</th>
                      <th className="py-2 px-4 border-b text-left font-roboto text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collectorUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b font-roboto text-gray-700">{user.name}</td>
                        <td className="py-2 px-4 border-b font-roboto text-gray-700">{user.username}</td>
                        <td className="py-2 px-4 border-b font-roboto text-gray-700">{user.email}</td>
                        <td className="py-2 px-4 border-b font-roboto text-gray-700">{user.company || 'N/A'}</td>
                        <td className="py-2 px-4 border-b">
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-all duration-300 font-roboto text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;