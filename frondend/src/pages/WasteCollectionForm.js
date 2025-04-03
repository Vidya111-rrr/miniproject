import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

  // Handle input change for user details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

    // Validate user details
    if (!formData.name || !formData.email || !formData.address || !formData.phone ) {
      toast.error('Please fill all user details (name, email, address, phone).', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
      return;
    }

    // Validate waste categories
    for (let i = 0; i < formData.wasteCategories.length; i++) {
      const entry = formData.wasteCategories[i];
      if (!entry.category || !entry.amount || entry.amount <= 0) {
        toast.error('Please fill all waste category fields with valid data (category and positive amount).', {
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
      // Submit each waste category as a separate request
      for (const entry of formData.wasteCategories) {
        const wasteData = {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          phone: formData.phone,
          wasteCategory: entry.category,
          wasteAmount: parseFloat(entry.amount),
          location:formData.location
        };

        const response = await fetch('http://localhost:4000/api/waste-collection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(wasteData),
        });

        if (!response.ok) {
          throw new Error(`Failed to submit waste collection data for category: ${entry.category}`);
        }

        const result = await response.json();
        console.log(`Waste collection submitted:`, result); // Debug: Log each submission
      }

      // Show success message
      toast.success('All waste collection data submitted successfully! ✔', {
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
        location:'',
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

  // Navigate to bids page
  const handleNavigateToBids = () => {
    navigate('/bids');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-green-600 text-white p-4 shadow-md z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold font-poppins">EcoSync</h1>
          <nav className="flex space-x-4">
            <Link to="/" className="hover:underline text-base md:text-lg font-roboto">Home</Link>
            <Link to="/recycler" className="hover:underline text-base md:text-lg font-roboto">Recycler</Link>
            <Link to="/bids" className="hover:underline text-base md:text-lg font-roboto">View Bids</Link>
            <Link to="/login" className="hover:underline text-base md:text-lg font-roboto">Login</Link>
            <Link to="/register" className="hover:underline text-base md:text-lg font-roboto">Register</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Left Side: Form */}
          <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-green-600 mb-6 font-poppins text-center">
              Waste Collection Form
            </h1>

            {/* Waste Collection Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 font-roboto">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 font-roboto">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-gray-700 font-semibold mb-2 font-roboto">Address</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-gray-700 font-semibold mb-2 font-roboto">location</label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2 font-roboto">Phone</label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  required
                />
              </div>

              {/* Waste Categories - Dynamic Add/Remove */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 font-roboto">Waste Categories</label>
                {formData.wasteCategories.map((entry, index) => (
                  <div key={index} className="flex items-center gap-4 mb-4">
                    <select
                      name="category"
                      value={entry.category}
                      onChange={(e) => handleCategoryChange(index, e)}
                      className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                      required
                    >
                      <option value="" disabled>Select Waste Category</option>
                      <option value="Plastic">Plastic</option>
                      <option value="Glass">Glass</option>
                      <option value="Metal">Metal</option>
                      <option value="Organic">Organic</option>
                      <option value="Paper">Paper</option>
                      <option value="Other">Other</option>
                    </select>
                    <input
                      type="number"
                      name="amount"
                      value={entry.amount}
                      onChange={(e) => handleCategoryChange(index, e)}
                      placeholder="Amount (kg)"
                      className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                      required
                      min="0"
                      step="0.01"
                    />
                    {formData.wasteCategories.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveWasteCategory(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300 font-roboto"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddWasteCategory}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 font-roboto"
                >
                  Add More Waste
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 font-roboto text-lg"
              >
                Submit Waste Collection
              </button>
            </form>

            {/* Button to Navigate to Bids Page */}
            <div className="mt-6 text-center">
              <button
                onClick={handleNavigateToBids}
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-all duration-300 font-roboto text-lg"
              >
                View Bids
              </button>
            </div>

            {/* Toast container for notifications */}
            <ToastContainer />
          </div>

          {/* Right Side: Inspirational Text */}
          <div className="md:w-1/2 flex flex-col justify-center p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-4 font-poppins">
              Make a Difference with EcoSync
            </h2>
            <p className="text-gray-700 mb-4 font-roboto text-base leading-relaxed">
              By submitting your waste collection, you're taking a vital step towards a cleaner planet. Every piece of waste you recycle helps reduce landfill use, conserve natural resources, and lower greenhouse gas emissions.
            </p>
            <p className="text-gray-700 mb-4 font-roboto text-base leading-relaxed">
              Join our community of eco-warriors who are making sustainability a reality. Together, we can create a future where waste is a resource, not a burden.
            </p>
            <p className="text-gray-700 font-roboto text-base leading-relaxed">
              <span className="font-semibold">Inspiration:</span> Did you know that recycling just 1 ton of plastic can save up to 7,200 pounds of CO2 emissions? Your actions matter!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteCollectionForm;