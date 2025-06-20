import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '@shared/auth/context/AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authState } = useAuth();

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>{children}</>
  );
};

export default ProtectedRoute;
