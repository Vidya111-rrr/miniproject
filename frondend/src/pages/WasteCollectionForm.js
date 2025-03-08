import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WasteCollectionForm.css';

const WasteCollectionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    wasteCategory: '',
    wasteAmount: ''
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('token'); // Get JWT token if required

      const response = await fetch('http://localhost:4000/api/waste-collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '', // Add auth token if required
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error submitting form.');
      }

      setSuccessMessage(data.message);
      setFormData({
        name: '',
        email: '',
        address: '',
        phone: '',
        wasteCategory: '',
        wasteAmount: ''
      });

      // Navigate to confirmation page with submitted data
      navigate('/confirmation', { state: { formData } });

    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
      console.error('Submission error:', err);
    }
  };

  return (
    <div className="form-container">
      <h1>Waste Collection Form</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          Phone Number:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <label>
          Waste Category:
          <select name="wasteCategory" value={formData.wasteCategory} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="organic">Organic</option>
            <option value="plastic">Plastic</option>
            <option value="metal">Metal</option>
            <option value="paper">Paper</option>
            <option value="glass">Glass</option>
          </select>
        </label>
        <label>
          Waste Amount (kg):
          <input type="number" name="wasteAmount" value={formData.wasteAmount} onChange={handleChange} required min="0.1" step="0.1" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WasteCollectionForm;
