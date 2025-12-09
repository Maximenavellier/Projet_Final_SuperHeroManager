import React from 'react';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
// CORRECTION : On utilise le hook useAuth
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Si pas connecté, on redirige vers le login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;