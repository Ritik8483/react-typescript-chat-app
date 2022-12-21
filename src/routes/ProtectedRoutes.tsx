import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: any) => {
  const getpersistedToken = useSelector(
    (state: any) => state.authSlice.authToken
  );
  if (!getpersistedToken) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoutes;
