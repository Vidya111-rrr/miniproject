import React, { useState } from "react";
import Card from "../components/Card";
import "./Store.css";

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
    <div className="store-container">
      <h1 className="store-title">Recycled Products Store</h1>

      {/* Search & Filter */}
      <div className="store-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
          className="search-bar"
        />
        <button className="filter-button" onClick={() => setFilterOpen(true)}>Filter</button>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {products.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>

      {/* Filter Panel */}
      <div className={`filter-panel ${filterOpen ? "open" : ""}`}>
        <button className="close-filter" onClick={() => setFilterOpen(false)}>×</button>
        <h3>Filter Products</h3>
        <label>Type:</label>
        <select name="type" value={filters.type} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Paper">Paper</option>
          <option value="Glass">Glass</option>
          <option value="Plastic">Plastic</option>
          <option value="Wood">Wood</option>
          <option value="Fabric">Fabric</option>
          <option value="Electronics">Electronics</option>
          <option value="Metal">Metal</option>
        </select>
        <label>Min Price:</label>
        <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} />
        <label>Max Price:</label>
        <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} />
        <button onClick={handleApplyFilters}>Apply Filters</button>
        <button onClick={resetFilters} className="reset-button">Reset</button>
      </div>
    </div>
  );
};

export default Store;
