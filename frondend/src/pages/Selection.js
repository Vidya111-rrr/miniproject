import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Selection.css';

const Selection = () => {
  const navigate = useNavigate();

  return (
    <div className="selection-container">
      <h1>Unlock Your Service</h1>
      <div className="selection-cards">
        <div className="selection-card">
          <img src="/images/request.jpg" alt="Waste Collection" />
          <h3>Waste Collection</h3>
          <p>Request efficient and timely waste collection services to keep your surroundings clean.</p>
          <button onClick={() => navigate('/WasteCollectionForm')}>Dive In</button>
        </div>
        <div className="selection-card">
          <img src="/images/collection.jpg" alt="Recycling" />
          <h3>Recycling Services</h3>
          <p>Buy waste sustainably and join the green revolution by promoting recycling.</p>
          <button onClick={() => navigate('/RecyclingServicesForm')}>Dive In</button>
        </div>
      </div>
    </div>
  );
};

export default Selection;