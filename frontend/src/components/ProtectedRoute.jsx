import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requireEmployer, requireJobSeeker }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requireEmployer && user.role !== 'employer') {
    return <Navigate to="/jobseeker-dashboard" replace />;
  }

  if (requireJobSeeker && user.role !== 'jobseeker') {
    return <Navigate to="/employer-dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;