import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { lazy } from "react";
const Login = lazy(() => import("../auth/Login"));
const Signup = lazy(() => import("../auth/Signup"));
const Dashboard = lazy(() => import("../components/Dashboard"));
const ProtectedRoutes = lazy(() => import("./ProtectedRoutes"));
const ForgotPassword = lazy(() => import("../auth/ForgotPassword"));
const MobileAuth = lazy(() => import("../auth/MobileAuth"));

const RoutesComponent = () => {
  const routeElement = useRoutes([
    {
      path: "/",
      element: <Login />,
    },

    { path: "/signup", element: <Signup /> },
    {
      path: "dashboard",
      element: (
        <ProtectedRoutes>
          <Dashboard />
        </ProtectedRoutes>
      ),
    },
    { path: "forgot-password", element: <ForgotPassword /> },
    { path: "phone-auth", element: <MobileAuth /> },
    // { path: "*", element: <Navigate to={<Login />} /> },
  ]);
  return routeElement;
};

export default RoutesComponent;
