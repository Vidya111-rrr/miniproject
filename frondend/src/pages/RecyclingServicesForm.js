<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecyclerPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showBidPopup, setShowBidPopup] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const categories = ['All', 'Plastic', 'Paper', 'Glass', 'Metal', 'Organic', 'Other'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/api/waste-collection', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Fetched Data:', result); // Debug: Log the fetched data
        setData(result);
        setFilteredData(result);
      } catch (err) {
        setError(err.message || 'Failed to fetch data.');
      } finally {
        setLoading(false);
>>>>>>> f9db2ba7e528f7170cdbfb46b899a75bfa146c0d
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

  // Handle Search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterData(term, selectedCategory);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle Category Filter
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    filterData(searchTerm, category);
    setCurrentPage(1); // Reset to first page on filter
  };

  // Filter Data based on Search and Category
  const filterData = (term, category) => {
    let filtered = data;

    // Filter by search term
    if (term) {
      filtered = filtered.filter(
        (entry) =>
          (entry.name?.toLowerCase() || '').includes(term) ||
          (entry.email?.toLowerCase() || '').includes(term) ||
          (entry.address?.toLowerCase() || '').includes(term)
      );
    }

    // Filter by category using wasteCategory
    if (category !== 'All') {
      filtered = filtered.filter((entry) =>
        (entry.wasteCategory || '').toLowerCase() === category.toLowerCase()
      );
    }

    console.log('Filtered Data:', filtered); // Debug: Log the filtered data
    setFilteredData(filtered);
  };

  // Handle Buy Button Click
  const handleBuyClick = (entry) => {
    const token = localStorage.getItem('token');
    console.log('Token when Buy is pressed:', token); // Print the token to the console
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded Token Payload:', payload); // Print the decoded token payload
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('No token found in localStorage');
    }
    setSelectedEntry(entry);
    setShowBidPopup(true);
  };

  // Handle Bid Submission
  const handleBidSubmit = async (e) => {
    e.preventDefault();
    if (!bidAmount || bidAmount <= 0) {
      alert('Please enter a valid bid amount.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to submit a bid.');
        setShowBidPopup(false);
        return;
      }

      // Decode the token to get bidder email
      let bidderEmail;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        bidderEmail = payload.username; // The username field in the token is the email
        if (!bidderEmail) {
          throw new Error('Token does not contain bidder email.');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        alert('Invalid token. Please log in again.');
        setShowBidPopup(false);
        return;
      }

      // Prepare the bid data
      const bidData = {
        bidAmount: parseFloat(bidAmount),
        wasteId: selectedEntry._id, // From the table
        bidderEmail, // From the token
        sellerEmail: selectedEntry.email, // From the table
      };

      console.log('Bid Data being sent:', bidData); // Debug: Log the bid data

      const response = await fetch('http://localhost:4000/api/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bidData),
      });

      const result = await response.json();
      if (response.ok) {
        setShowBidPopup(false);
        setBidAmount('');
        alert('Bid request submitted successfully!');
      } else {
        alert(result.message || 'Failed to submit bid.');
      }
    } catch (error) {
      console.error('Error submitting bid:', error);
      alert('Server error. Please try again later.');
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-green-600 text-white p-4 shadow-md z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold font-poppins">EcoSync</h1>
          <nav className="flex space-x-4">
            <Link to="/" className="hover:underline text-base md:text-lg font-roboto">Home</Link>
            <Link to="/recycler" className="hover:underline text-base md:text-lg font-roboto">Recycler</Link>
            <Link to="/bids" className="hover:underline text-base md:text-lg font-roboto">My Bids</Link>
            <Link to="/login" className="hover:underline text-base md:text-lg font-roboto">Login</Link>
            <Link to="/register" className="hover:underline text-base md:text-lg font-roboto">Register</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Title and Docker */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            {/* Title (Slightly Left) */}
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold text-green-600 text-left font-poppins">
                Recycling Services
              </h1>
            </div>

            {/* MacOS-Style Docker (Right Side) */}
            <div className="mt-4 md:mt-0 md:w-1/2 flex justify-end">
              <div className="flex space-x-2 p-2 bg-gray-100 bg-opacity-80 backdrop-blur-md rounded-full shadow-lg">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className={`px-4 py-2 rounded-full font-roboto text-base transition-all duration-300 transform hover:scale-110 ${
                      selectedCategory === category
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6 flex justify-center">
            <input
              type="text"
              placeholder="Search by name, email, or address..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full max-w-md p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-roboto text-base"
            />
          </div>

          {/* Loading and Error Messages */}
          {loading && (
            <p className="text-center text-gray-700 font-roboto text-lg">Loading data...</p>
          )}
          {error && (
            <p className="text-center bg-red-100 text-red-700 p-4 rounded-lg font-roboto text-lg">
              {error}
            </p>
          )}

          {/* Table */}
          {!loading && !error && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-lg rounded-lg border border-gray-200">
                  <thead>
                    <tr className="bg-green-600 text-white">
                      <th className="p-4 text-left font-roboto text-lg">Name</th>
                      <th className="p-4 text-left font-roboto text-lg">Email</th>
                      <th className="p-4 text-left font-roboto text-lg">Address</th>
                      <th className="p-4 text-left font-roboto text-lg">Phone Number</th>
                      <th className="p-4 text-left font-roboto text-lg">Waste Category</th>
                      <th className="p-4 text-left font-roboto text-lg">Waste Amount (kg)</th>
                      <th className="p-4 text-left font-roboto text-lg">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((entry, index) => (
                        <tr
                          key={index}
                          className="border-b hover:bg-gray-100 transition-all duration-200"
                        >
                          <td className="p-4 font-roboto text-base">{entry.name || 'N/A'}</td>
                          <td className="p-4 font-roboto text-base">{entry.email || 'N/A'}</td>
                          <td className="p-4 font-roboto text-base">{entry.address || 'N/A'}</td>
                          <td className="p-4 font-roboto text-base">{entry.phone || 'N/A'}</td>
                          <td className="p-4 font-roboto text-base">{entry.wasteCategory || 'N/A'}</td>
                          <td className="p-4 font-roboto text-base">{entry.wasteAmount || 'N/A'}</td>
                          <td className="p-4">
                            <button
                              onClick={() => handleBuyClick(entry)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 font-roboto text-base"
                            >
                              Buy
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="p-4 text-center text-gray-700 font-roboto text-lg"
                        >
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
                {/* Rows Per Page Dropdown */}
                <div className="mb-4 md:mb-0">
                  <label className="mr-2 font-roboto text-base">Rows per page:</label>
                  <select
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    className="p-2 border border-gray-300 rounded-lg font-roboto text-base"
                  >
                    <option value={15}>15</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                {/* Page Navigation */}
                <div className="flex space-x-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-roboto text-base ${
                      currentPage === 1
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    } transition-all duration-300`}
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 font-roboto text-base">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-roboto text-base ${
                      currentPage === totalPages
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    } transition-all duration-300`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bidding Request Popup */}
      {showBidPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-bold text-green-600 mb-4 font-poppins">
              Place Your Bid
            </h3>
            <p className="text-gray-700 mb-4 font-roboto text-base">
              You are bidding for {selectedEntry?.name || 'this user'}'s waste collection.
            </p>
            <form onSubmit={handleBidSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="bidAmount"
                  className="block text-base font-medium text-gray-700 mb-1 font-roboto"
                >
                  Bid Amount ($)
                </label>
                <input
                  type="number"
                  id="bidAmount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter your bid amount"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-roboto text-base"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-all duration-300 font-roboto text-lg"
                >
                  Submit Bid
                </button>
                <button
                  type="button"
                  onClick={() => setShowBidPopup(false)}
                  className="flex-1 border border-green-600 text-green-600 p-4 rounded-lg hover:bg-green-50 transition-all duration-300 font-roboto text-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
>>>>>>> f9db2ba7e528f7170cdbfb46b899a75bfa146c0d
    </div>
  );
};

<<<<<<< HEAD
export default WasteCollectionForm;
=======
export default RecyclerPage;
>>>>>>> f9db2ba7e528f7170cdbfb46b899a75bfa146c0d
