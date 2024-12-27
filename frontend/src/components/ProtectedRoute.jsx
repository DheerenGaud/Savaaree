// ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.UserSlice.isAuthenticated); 

  if (!isAuthenticated) {
    // return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;