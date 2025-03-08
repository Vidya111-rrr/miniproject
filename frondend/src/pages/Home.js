import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Smart Waste Management System</h1>
      <p>Manage waste efficiently and keep your environment clean.</p>

      <div className="services">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <img src="images/request.jpg" alt="Waste Collection" />
            <h3>Effortless Waste Collection for Your Community</h3>
            <p>Say goodbye to waste woes! Our efficient waste collection service ensures your surroundings are always clean and green. Simply request a pickup, and we'll handle the rest, providing a hassle-free experience.</p>
          </div>
          <div className="service-card">
            <img src="/images/collection.jpg" alt="Recycling" />
            <h3>Empower Recycling Industries: Buy Waste Sustainably</h3>
            <p>Join the green revolution! Recycling industries can now easily purchase waste directly from the community, promoting sustainability and reducing landfill impact. Our platform connects you with quality waste materials for recycling.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;