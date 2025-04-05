import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Logged in but wrong role
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
