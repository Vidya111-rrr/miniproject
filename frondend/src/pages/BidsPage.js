import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const BidsPage = () => {
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);
  const [pendingWastes, setPendingWastes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('none'); // none, asc, desc
  const [bidCategoryFilter, setBidCategoryFilter] = useState('all');
  const [pendingCategoryFilter, setPendingCategoryFilter] = useState('all');
  const [userEmail, setUserEmail] = useState(null);

  // Fetch user email from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token); // Debug: Log the raw token

    if (!token) {
      setError('You must be logged in to view your bids.');
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log('Decoded Token in Frontend:', decoded); // Debug: Log the decoded token
      setUserEmail(decoded.username); // Assuming the token contains the email as 'username'
    } catch (err) {
      console.error('Token decoding error:', err); // Debug: Log the error
      setError('Invalid token. Please log in again.');
      setLoading(false);
    }
  }, []);

  // Fetch bids and waste data
  useEffect(() => {
    if (!userEmail) return;

    const fetchData = async () => {
      try {
        // Fetch all bids
        const bidsResponse = await fetch('http://localhost:4000/api/bids/test', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!bidsResponse.ok) {
          throw new Error(`HTTP error! Status: ${bidsResponse.status}`);
        }

        const bidsData = await bidsResponse.json();
        // Filter bids where sellerEmail matches the logged-in user's email
        const userBids = bidsData.filter((bid) => bid.sellerEmail === userEmail);
        setBids(userBids);

        // Fetch all waste collections
        const wasteResponse = await fetch('http://localhost:4000/api/waste-collection', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!wasteResponse.ok) {
          throw new Error(`HTTP error! Status: ${wasteResponse.status}`);
        }

        const wasteData = await wasteResponse.json();
        // Filter wastes belonging to the user (by email)
        const userWastes = wasteData.filter((waste) => waste.email === userEmail);
        // Find wastes that are not currently bid on
        const bidWasteIds = bidsData.map((bid) => bid.wasteId._id);
        const pending = userWastes.filter((waste) => !bidWasteIds.includes(waste._id));
        setPendingWastes(pending);
      } catch (err) {
        setError(err.message || 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  // Handle Accept Bid (placeholder)
  const handleAcceptBid = (bidId) => {
    // Placeholder: In a real app, this would make a POST request to accept the bid
    alert(`Accepted bid with ID: ${bidId}`);
    // Optionally, refresh bids after accepting
    // setBids(bids.filter((bid) => bid._id !== bidId));
  };

  // Sort bids by price
  const sortedBids = [...bids].sort((a, b) => {
    if (sortOrder === 'asc') return a.bidAmount - b.bidAmount;
    if (sortOrder === 'desc') return b.bidAmount - a.bidAmount;
    return 0; // 'none' or default
  });

  // Filter bids by category
  const filteredBids = bidCategoryFilter === 'all'
    ? sortedBids
    : sortedBids.filter((bid) => bid.wasteId.wasteCategory === bidCategoryFilter);

  // Filter pending wastes by category
  const filteredPendingWastes = pendingCategoryFilter === 'all'
    ? pendingWastes
    : pendingWastes.filter((waste) => waste.wasteCategory === pendingCategoryFilter);

  // Get unique categories for filtering
  const bidCategories = ['all', ...new Set(bids.map((bid) => bid.wasteId.wasteCategory))];
  const pendingCategories = ['all', ...new Set(pendingWastes.map((waste) => waste.wasteCategory))];

  return (
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
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-green-600 text-left font-poppins mb-6">
            My Bids
          </h1>

          {/* Loading and Error Messages */}
          {loading && (
            <p className="text-center text-gray-700 font-roboto text-lg">Loading data...</p>
          )}
          {error && (
            <p className="text-center bg-red-100 text-red-700 p-4 rounded-lg font-roboto text-lg">
              {error}
            </p>
          )}

          {/* Bids Section */}
          {!loading && !error && (
            <>
              {/* Sorting and Filtering Controls */}
              <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <label className="font-roboto text-base">Sort by Price:</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg font-roboto text-base"
                  >
                    <option value="none">None</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <label className="font-roboto text-base">Filter by Category:</label>
                  <select
                    value={bidCategoryFilter}
                    onChange={(e) => setBidCategoryFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg font-roboto text-base"
                  >
                    {bidCategories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bids Grid */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-green-600 mb-4 font-poppins">
                  Received Bids
                </h2>
                {filteredBids.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBids.map((bid) => (
                      <div
                        key={bid._id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <h3 className="text-xl font-semibold text-gray-800 font-poppins mb-2">
                          {bid.wasteId.name}'s Waste
                        </h3>
                        <p className="text-gray-700 font-roboto mb-1">
                          <span className="font-semibold">Category:</span> {bid.wasteId.wasteCategory}
                        </p>
                        <p className="text-gray-700 font-roboto mb-1">
                          <span className="font-semibold">Amount:</span> {bid.wasteId.wasteAmount} kg
                        </p>
                        <p className="text-gray-700 font-roboto mb-1">
                          <span className="font-semibold">Address:</span> {bid.wasteId.address}
                        </p>
                        <p className="text-gray-700 font-roboto mb-1">
                          <span className="font-semibold">Phone:</span> {bid.wasteId.phone}
                        </p>
                        <p className="text-gray-700 font-roboto mb-1">
                          <span className="font-semibold">Bid Amount:</span> ${bid.bidAmount}
                        </p>
                        <p className="text-gray-700 font-roboto mb-3">
                          <span className="font-semibold">Bidder:</span> {bid.bidderEmail}
                        </p>
                        <button
                          onClick={() => handleAcceptBid(bid._id)}
                          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all duration-300 font-roboto"
                        >
                          Accept Bid
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700 font-roboto text-lg">
                    No bids received for your wastes.
                  </p>
                )}
              </div>

              {/* Pending Wastes Section */}
              <div>
                <h2 className="text-2xl font-semibold text-green-600 mb-4 font-poppins">
                  Pending Wastes (Not Yet Bid On)
                </h2>
                {/* Filter Pending Wastes by Category */}
                <div className="mb-4 flex items-center gap-3">
                  <label className="font-roboto text-base">Filter by Category:</label>
                  <select
                    value={pendingCategoryFilter}
                    onChange={(e) => setPendingCategoryFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg font-roboto text-base"
                  >
                    {pendingCategories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
                {filteredPendingWastes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPendingWastes.map((waste) => (
                      <div
                        key={waste._id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <h3 className="text-xl font-semibold text-gray-800 font-poppins mb-2">
                          {waste.name}'s Waste
                        </h3>
                        <p className="text-gray-700 font-roboto mb-1">
                          <span className="font-semibold">Category:</span> {waste.wasteCategory}
                        </p>
                        <p className="text-gray-700 font-roboto mb-1">
                          <span className="font-semibold">Amount:</span> {waste.wasteAmount} kg
                        </p>
                        <p className="text-gray-700 font-roboto mb-1">
                          <span className="font-semibold">Address:</span> {waste.address}
                        </p>
                        <p className="text-gray-700 font-roboto mb-3">
                          <span className="font-semibold">Phone:</span> {waste.phone}
                        </p>
                        <p className="text-gray-600 font-roboto italic">
                          Status: Pending (No bids yet)
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700 font-roboto text-lg">
                    No pending wastes to display.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BidsPage;