/* eslint-disable react/prop-types */
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};
