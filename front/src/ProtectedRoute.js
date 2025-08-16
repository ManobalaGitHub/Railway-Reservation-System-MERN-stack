import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    // Not logged in, redirect to login
    return <Navigate to="/admin" replace />;
  }
  return children;
}
