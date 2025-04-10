import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const BidsPage = () => {
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);
  const [pendingWastes, setPendingWastes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('none');
  const [bidCategoryFilter, setBidCategoryFilter] = useState('all');
  const [pendingCategoryFilter, setPendingCategoryFilter] = useState('all');
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to view your bids.');
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserEmail(decoded.username);
    } catch (err) {
      setError('Invalid token. Please log in again.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!userEmail) return;

    const fetchData = async () => {
      try {
        const bidsResponse = await fetch('http://localhost:4000/api/bids');
        const bidsData = await bidsResponse.json();
        const userBids = bidsData.filter((bid) => bid.sellerEmail === userEmail);
        setBids(userBids);

        const wasteResponse = await fetch('http://localhost:4000/api/waste-collection');
        const wasteData = await wasteResponse.json();
        const userWastes = wasteData.filter((waste) => waste.email === userEmail);
        const bidWasteIds = bidsData.map((bid) => bid.wasteId._id);
        const pending = userWastes.filter((waste) => !bidWasteIds.includes(waste._id));
        setPendingWastes(pending);
      } catch (err) {
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  const handleAcceptBid = async (bidId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to accept a bid.');
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:4000/api/waste-collection/accept-bid/${bidId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert(result.message);

      const bidsResponse = await fetch('http://localhost:4000/api/bids');
      const updatedBids = await bidsResponse.json();
      const userBids = updatedBids.filter((bid) => bid.sellerEmail === userEmail);
      setBids(userBids);

      const wasteResponse = await fetch('http://localhost:4000/api/waste-collection');
      const wasteData = await wasteResponse.json();
      const userWastes = wasteData.filter((waste) => waste.email === userEmail);
      const bidWasteIds = userBids.map((bid) => bid.wasteId._id);
      const pending = userWastes.filter((waste) => !bidWasteIds.includes(waste._id));
      setPendingWastes(pending);
    } catch (err) {
      setError(err.message || 'Failed to accept bid.');
    }
  };

  const sortedBids = [...bids].sort((a, b) => {
    if (sortOrder === 'asc') return a.bidAmount - b.bidAmount;
    if (sortOrder === 'desc') return b.bidAmount - a.bidAmount;
    return 0;
  });

  const filteredBids = bidCategoryFilter === 'all'
    ? sortedBids
    : sortedBids.filter((bid) => bid.wasteId.wasteCategory === bidCategoryFilter);

  const filteredPendingWastes = pendingCategoryFilter === 'all'
    ? pendingWastes
    : pendingWastes.filter((waste) => waste.wasteCategory === pendingCategoryFilter);

  const bidCategories = ['all', ...new Set(bids.map((bid) => bid.wasteId.wasteCategory))];
  const pendingCategories = ['all', ...new Set(pendingWastes.map((waste) => waste.wasteCategory))];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="fixed top-0 w-full bg-green-600 text-white p-4 shadow-md z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold font-poppins">EcoSync</h1>
          <nav className="flex space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/recycler" className="hover:underline">Recycler</Link>
            <Link to="/bids" className="hover:underline">My Bids</Link>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 mt-20 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-green-600 font-poppins mb-6">My Bids</h1>

        {loading && <p className="text-center">Loading data...</p>}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center mb-4">
            <p>{error}</p>
            {error.includes('log in') && (
              <button
                onClick={() => navigate('/login')}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Log In Again
              </button>
            )}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <label>Sort by Price:</label>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="p-2 border rounded-lg">
                  <option value="none">None</option>
                  <option value="asc">Low to High</option>
                  <option value="desc">High to Low</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <label>Filter by Category:</label>
                <select value={bidCategoryFilter} onChange={(e) => setBidCategoryFilter(e.target.value)} className="p-2 border rounded-lg">
                  {bidCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-green-600 mb-4 font-poppins">Received Bids</h2>
              {filteredBids.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBids.map((bid) => (
                    <div key={bid._id} className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
                      <p><strong>Bidder Name:</strong> {bid.bidderName}</p>
                      <p><strong>Category:</strong> {bid.wasteId.wasteCategory}</p>
                      <p><strong>Amount:</strong> {bid.wasteId.wasteAmount} kg</p>
                      <p><strong>Address:</strong> {bid.wasteId.address}</p>
                      <p><strong>Phone:</strong> {bid.wasteId.phone}</p>
                      <p><strong>Bid Amount:</strong> ${bid.bidAmount}</p>
                      <p><strong>Bidder Email:</strong> {bid.bidderEmail}</p>
                      <button
                        onClick={() => handleAcceptBid(bid._id)}
                        className="mt-3 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                      >
                        Accept Bid
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No bids received for your wastes.</p>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-600 mb-4 font-poppins">Pending Wastes</h2>
              <div className="mb-4 flex items-center gap-3">
                <label>Filter by Category:</label>
                <select value={pendingCategoryFilter} onChange={(e) => setPendingCategoryFilter(e.target.value)} className="p-2 border rounded-lg">
                  {pendingCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
              {filteredPendingWastes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPendingWastes.map((waste) => (
                    <div key={waste._id} className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
                      <p><strong>Category:</strong> {waste.wasteCategory}</p>
                      <p><strong>Amount:</strong> {waste.wasteAmount} kg</p>
                      <p><strong>Address:</strong> {waste.address}</p>
                      <p><strong>Phone:</strong> {waste.phone}</p>
                      <p className="text-gray-600 italic">Status: Pending (No bids yet)</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No pending wastes to display.</p>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default BidsPage;
