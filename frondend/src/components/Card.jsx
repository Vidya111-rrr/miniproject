// Card.jsx
import React from "react";
import "./Card.css";

const Card = ({ item }) => {
  return (
    <div className="card">
      <img src={item.image} alt={item.name} className="card-image" />
      <div className="card-content">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p className="price">${item.price}</p>
        <button className="buy-button">Buy Now</button>
      </div>
    </div>
  );
};

export default Card;