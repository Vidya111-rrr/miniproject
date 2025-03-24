import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BidsPage = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('You must be logged in to view your bids.');
        }

        const response = await fetch('http://localhost:4000/api/bids?myBids=true', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Fetched Bids:', result); // Debug: Log the fetched bids
        setBids(result);
      } catch (err) {
        setError(err.message || 'Failed to fetch bids.');
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(bids.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedBids = bids.slice(startIndex, endIndex);

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
            <p className="text-center text-gray-700 font-roboto text-lg">Loading bids...</p>
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
                      <th className="p-4 text-left font-roboto text-lg">Bid Amount ($)</th>
                      <th className="p-4 text-left font-roboto text-lg">Bidder Email</th>
                      <th className="p-4 text-left font-roboto text-lg">Seller Email</th>
                      <th className="p-4 text-left font-roboto text-lg">Waste Collection Name</th>
                      <th className="p-4 text-left font-roboto text-lg">Waste Category</th>
                      <th className="p-4 text-left font-roboto text-lg">Waste Amount (kg)</th>
                      <th className="p-4 text-left font-roboto text-lg">Address</th>
                      <th className="p-4 text-left font-roboto text-lg">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedBids.length > 0 ? (
                      paginatedBids.map((bid, index) => (
                        <tr
                          key={index}
                          className="border-b hover:bg-gray-100 transition-all duration-200"
                        >
                          <td className="p-4 font-roboto text-base">{bid.bidAmount || 'N/A'}</td>
                          <td className="p-4 font-roboto text-base">{bid.bidderEmail || 'N/A'}</td>
                          <td className="p-4 font-roboto text-base">{bid.sellerEmail || 'N/A'}</td>
                          <td className="p-4 font-roboto text-base">{bid.wasteId?.name || 'N/A'}</td>
                          <td className="p-4 font-roboto text-base">{bid.wasteId?.wasteCategory || 'N/A'}</td>
                          <td className="p-4 font-roboto text-base">{bid.wasteId?.wasteAmount || 'N/A'}</td>
                          <td className="p-4 font-roboto text-base">{bid.wasteId?.address || 'N/A'}</td>
                          <td className="p-4 font-roboto text-base">{bid.wasteId?.phone || 'N/A'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="8"
                          className="p-4 text-center text-gray-700 font-roboto text-lg"
                        >
                          No bids available
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
    </div>
  );
};

export default BidsPage;