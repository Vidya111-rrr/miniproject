import React, { useState } from "react";
import Card from "../components/Card";

const Store = () => {
  const allProducts = [
    { id: 1, name: "Recycled Paper Bag", type: "Paper", price: 5.99, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Upcycled Glass Bottle", type: "Glass", price: 9.99, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Recycled Plastic Chair", type: "Plastic", price: 49.99, image: "https://via.placeholder.com/150" },
    { id: 4, name: "Eco-Friendly Notebook", type: "Paper", price: 7.99, image: "https://via.placeholder.com/150" },
    { id: 5, name: "Sustainable Wooden Cutlery", type: "Wood", price: 14.99, image: "https://via.placeholder.com/150" },
    { id: 6, name: "Reclaimed Wood Frame", type: "Wood", price: 19.99, image: "https://via.placeholder.com/150" },
    { id: 7, name: "Organic Cotton Tote Bag", type: "Fabric", price: 12.99, image: "https://via.placeholder.com/150" },
    { id: 8, name: "Solar-Powered Lantern", type: "Electronics", price: 24.99, image: "https://via.placeholder.com/150" },
    { id: 9, name: "Bamboo Toothbrush", type: "Wood", price: 3.99, image: "https://via.placeholder.com/150" },
    { id: 10, name: "Recycled Metal Water Bottle", type: "Metal", price: 18.99, image: "https://via.placeholder.com/150" },
  ];

  const [products, setProducts] = useState(allProducts);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ type: "", minPrice: "", maxPrice: "" });
  const [filterOpen, setFilterOpen] = useState(false);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    applyFilters(keyword, filters);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = (searchTerm, currentFilters) => {
    let filtered = allProducts.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    if (currentFilters.type) {
      filtered = filtered.filter((item) => item.type === currentFilters.type);
    }
    if (currentFilters.minPrice) {
      filtered = filtered.filter((item) => item.price >= parseFloat(currentFilters.minPrice));
    }
    if (currentFilters.maxPrice) {
      filtered = filtered.filter((item) => item.price <= parseFloat(currentFilters.maxPrice));
    }

    setProducts(filtered);
  };

  const handleApplyFilters = () => {
    applyFilters(search, filters);
    setFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters({ type: "", minPrice: "", maxPrice: "" });
    setSearch("");
    setProducts(allProducts);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">Recycled Products Store</h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6 max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        />
        <button
          className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => setFilterOpen(true)}
        >
          Filter
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>

      {/* Filter Modal */}
      {filterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
            <button className="absolute top-2 right-3 text-xl" onClick={() => setFilterOpen(false)}>×</button>
            <h3 className="text-lg font-semibold mb-4">Filter Products</h3>

            <label className="block mb-2">Type:</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">All</option>
              <option value="Paper">Paper</option>
              <option value="Glass">Glass</option>
              <option value="Plastic">Plastic</option>
              <option value="Wood">Wood</option>
              <option value="Fabric">Fabric</option>
              <option value="Electronics">Electronics</option>
              <option value="Metal">Metal</option>
            </select>

            <label className="block mt-3 mb-2">Min Price:</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />

            <label className="block mt-3 mb-2">Max Price:</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />

            <button onClick={handleApplyFilters} className="w-full bg-green-500 text-white py-3 mt-4 rounded-lg hover:bg-green-600">
              Apply Filters
            </button>
            <button onClick={resetFilters} className="w-full bg-red-500 text-white py-3 mt-2 rounded-lg hover:bg-red-600">
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;
