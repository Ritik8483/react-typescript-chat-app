import React from "react";
import { useRoutes } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("../auth/Login"));
const Signup = lazy(() => import("../auth/Signup"));
const Dashboard=lazy(() => import("../components/Dashboard"));

const RoutesComponent = () => {
  const routeElement = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "dashboard", element: <Dashboard /> },
  ]);
  return routeElement;
};

export default RoutesComponent;
