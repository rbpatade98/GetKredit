// src/routes/ProtectedRoute.jsx

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const loggedIn = !!localStorage.getItem("loggedInUser");

  if (!loggedIn) {
    // Not logged in → redirect to signin
    return <Navigate to="/signin" replace />;
  }

  // Logged in → render children (DashboardLayout with Outlet)
  // If children passed directly, render them
  // If used as layout wrapper, render Outlet
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
