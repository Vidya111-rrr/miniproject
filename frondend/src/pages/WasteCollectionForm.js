import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WasteCollectionForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles for react-toastify

const WasteCollectionForm = () => {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    wasteCategory: '',
    wasteAmount: ''
  });

  // State for error and success messages
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/waste-collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit waste collection data');
      }

      // Show success message with green check mark
      toast.success('Waste collection data submitted successfully! ✔️', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });

      // Clear form data
      setFormData({
        name: '',
        email: '',
        address: '',
        phone: '',
        wasteCategory: '',
        wasteAmount: '',
      });
    } catch (err) {
      setError(err.message);
      console.error('Error submitting waste collection data:', err);
      toast.error(`Error: ${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="form-container">
      <h1>Waste Collection Form</h1>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Waste Collection Form */}
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Waste Category</label>
        <select
          name="wasteCategory"
          value={formData.wasteCategory}
          onChange={handleChange}
          required
        >
          <option value=""> </option>
          <option value="Plastic">Plastic</option>
          <option value="Paper">Paper</option>
          <option value="Glass">Glass</option>
          <option value="Metal">Metal</option>
          <option value="Organic">Organic</option>
          <option value="Other">Other</option>
        </select>

        <label>Waste Amount (kg)</label>
        <input
          type="number"
          name="wasteAmount"
          value={formData.wasteAmount}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default WasteCollectionForm;
