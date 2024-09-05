import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // or use cookies if you prefer

  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/" />;
  }

  // Otherwise, render the children (protected component)
  return children;
};

export default ProtectedRoute;
