import React from 'react';
import { useLocation } from 'react-router-dom';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const location = useLocation();
  const { formData } = location.state || {};

  return (
    <div className="confirmation-container">
      <h1>Submission Confirmation</h1>
      {formData ? (
        <div className="confirmation-details">
          <p>Thank you for your submission! Here are your details:</p>
          <ul>
            <li><strong>Name:</strong> {formData.name}</li>
            <li><strong>Email:</strong> {formData.email}</li>
            <li><strong>Address:</strong> {formData.address}</li>
            <li><strong>Phone Number:</strong> {formData.phone}</li>
            <li><strong>Waste Category:</strong> {formData.wasteCategory}</li>
            <li><strong>Waste Amount (kg):</strong> {formData.wasteAmount}</li>
          </ul>
        </div>
      ) : (
        <p>No details to display.</p>
      )}
    </div>
  );
};

export default ConfirmationPage;