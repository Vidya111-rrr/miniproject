import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WasteCollectionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    location: '',
    phone: '',
    wasteCategories: [{ category: '', amount: '' }],
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to access this form.');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:4000/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const userData = await response.json();
        if (response.ok) {
          setFormData((prev) => ({
            ...prev,
            name: userData.name,
            email: userData.email,
          }));
        } else {
          toast.error('Failed to fetch user data.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Server error. Please try again.');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (index, e) => {
    const { name, value } = e.target;
    const updatedWasteCategories = [...formData.wasteCategories];
    updatedWasteCategories[index] = { ...updatedWasteCategories[index], [name]: value };
    setFormData({ ...formData, wasteCategories: updatedWasteCategories });
  };

  const handleAddWasteCategory = () => {
    setFormData({
      ...formData,
      wasteCategories: [...formData.wasteCategories, { category: '', amount: '' }],
    });
  };

  const handleRemoveWasteCategory = (index) => {
    const updatedWasteCategories = formData.wasteCategories.filter((_, i) => i !== index);
    setFormData({ ...formData, wasteCategories: updatedWasteCategories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.address || !formData.phone || !formData.location) {
      toast.error('Please fill all required fields (address, phone, location).');
      return;
    }

    for (let i = 0; i < formData.wasteCategories.length; i++) {
      const entry = formData.wasteCategories[i];
      if (!entry.category || !entry.amount || entry.amount <= 0) {
        toast.error('Please fill all waste category fields with valid data.');
        return;
      }
    }

    try {
      for (const entry of formData.wasteCategories) {
        const wasteData = {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          location: formData.location,
          phone: formData.phone,
          wasteCategory: entry.category,
          wasteAmount: parseFloat(entry.amount),
        };

        const response = await fetch('http://localhost:4000/api/waste-collection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(wasteData),
        });

        if (!response.ok) {
          throw new Error(`Failed to submit waste collection data for category: ${entry.category}`);
        }
      }

      toast.success('Waste collection data submitted successfully!');
      setFormData({
        ...formData,
        address: '',
        phone: '',
        location: '',
        wasteCategories: [{ category: '', amount: '' }],
      });
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  const handleNavigateToBids = () => {
    navigate('/bids');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="fixed top-0 w-full bg-green-600 text-white p-4 shadow-md z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold font-poppins">EcoSync</h1>
          <nav className="flex space-x-4">
            <Link to="/" className="hover:underline text-base md:text-lg font-roboto">Home</Link>
            <Link to="/bids" className="hover:underline text-base md:text-lg font-roboto">View Bids</Link>
            <Link to="/login" className="hover:underline text-base md:text-lg font-roboto">Login</Link>
          </nav>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-8 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-green-600 mb-6 font-poppins text-center">
              Waste Collection Form
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 font-roboto">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 font-roboto">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                    disabled
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-gray-700 font-semibold mb-2 font-roboto">District</label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 font-roboto">Waste Categories</label>
                {formData.wasteCategories.map((entry, index) => (
                  <div key={index} className="flex items-center gap-4 mb-4">
                    <select
                      name="category"
                      value={entry.category}
                      onChange={(e) => handleCategoryChange(index, e)}
                      className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                      className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                      min="0"
                      step="0.01"
                    />
                    {formData.wasteCategories.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveWasteCategory(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddWasteCategory}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Add More Waste
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
              >
                Submit Waste Collection
              </button>
            </form>
            <div className="mt-6 text-center">
              <button
                onClick={handleNavigateToBids}
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
              >
                View Bids
              </button>
            </div>
            <ToastContainer />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-4 font-poppins">
              Make a Difference with EcoSync
            </h2>
            <p className="text-gray-700 mb-4 font-roboto text-base leading-relaxed">
              By submitting your waste collection, you're taking a vital step towards a cleaner planet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteCollectionForm;