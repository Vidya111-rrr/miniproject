import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WasteCollectionForm = () => {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    wasteCategories: [
      { category: '', amount: '' },
    ],
  });

  // Handle input change for dynamic waste categories
  const handleCategoryChange = (index, e) => {
    const { name, value } = e.target;
    const updatedWasteCategories = [...formData.wasteCategories];
    updatedWasteCategories[index] = { ...updatedWasteCategories[index], [name]: value };
    setFormData({ ...formData, wasteCategories: updatedWasteCategories });
  };

  // Add new waste category entry
  const handleAddWasteCategory = () => {
    setFormData({
      ...formData,
      wasteCategories: [
        ...formData.wasteCategories,
        { category: '', amount: '' },
      ],
    });
  };

  // Remove a waste category entry
  const handleRemoveWasteCategory = (index) => {
    const updatedWasteCategories = formData.wasteCategories.filter((_, i) => i !== index);
    setFormData({ ...formData, wasteCategories: updatedWasteCategories });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate waste categories
    for (let i = 0; i < formData.wasteCategories.length; i++) {
      const category = formData.wasteCategories[i];
      if (!category.category || !category.amount) {
        toast.error('Please fill all waste category fields with valid data.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
        return;
      }
    }

    try {
      const response = await fetch('http://localhost:4001/api/waste-collection', {
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
      toast.success('Waste collection data submitted successfully! ✔', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });

      // Clear form data
      setFormData({
        name: '',
        email: '',
        address: '',
        phone: '',
        wasteCategories: [{ category: '', amount: '' }],
      });
    } catch (err) {
      toast.error(`Error: ${err.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Waste Collection Form</h1>

        {/* Waste Collection Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Address</label>
            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone</label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Waste Categories - Dynamic Add/Remove */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Waste Categories</label>
            {formData.wasteCategories.map((entry, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <select
                  name="category"
                  value={entry.category}
                  onChange={(e) => handleCategoryChange(index, e)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="" disabled>Select Waste Category</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Glass">Glass</option>
                  <option value="Metal">Metal</option>
                  <option value="Organic">Organic</option>
                </select>
                <input
                  type="number"
                  name="amount"
                  value={entry.amount}
                  onChange={(e) => handleCategoryChange(index, e)}
                  placeholder="Amount (kg)"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveWasteCategory(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddWasteCategory}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add More
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit
          </button>
        </form>

        {/* Toast container for notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default WasteCollectionForm;