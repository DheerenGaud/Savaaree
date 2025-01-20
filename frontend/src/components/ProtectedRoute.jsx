// ProtectedRoute.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = () => {
  const isAuthenticated = document.cookie.includes("authenticated"); 

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }


  return <Outlet />;
};

export default ProtectedRoute;