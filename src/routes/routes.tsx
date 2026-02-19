import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/";
import Layout from "../pages/Layout.js";
import LoginPage from "../pages/LoginPage/LoginPage.js";
import { ProtectedRoute, PublicRoute } from "./AuthGuard.js";
import HomePage from "../pages/HomePage/HomePage.js";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
        {
        index: true,
        element: <Navigate to="/u" replace />
      },
      {
        path: "login",
        index: true,
        element: <PublicRoute><LoginPage /></PublicRoute>
      },
      {
        path: "u",
        element: <ProtectedRoute><Layout /></ProtectedRoute>,
        children: [
          {
            index: true,
            element: <Navigate to="home" replace />
          },
          {
            path: "home",
            element: <HomePage />
          }
        ]
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
