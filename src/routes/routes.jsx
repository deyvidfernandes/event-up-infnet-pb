import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "../pages/Layout.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import { ProtectedRoute, PublicRoute } from "./AuthGuard.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";

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
