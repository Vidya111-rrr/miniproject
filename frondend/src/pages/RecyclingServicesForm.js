import React, { useState, useEffect } from 'react';
import './RecyclingServicesForm.css';

const RecyclerPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // If authentication is required
        const response = await fetch('http://localhost:4000/api/waste-collection', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '', // Include token if needed
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message || 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="recycler-container">
      <h1>Recycling Services</h1>

      {loading && <p>Loading data...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <table className="recycler-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Waste Category</th>
              <th>Waste Amount (kg)</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.email}</td>
                  <td>{entry.address}</td>
                  <td>{entry.phone}</td>
                  <td>{entry.wasteCategory}</td>
                  <td>{entry.wasteAmount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecyclerPage;
