import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router";
import Layout from "../pages/Layout.js";
import AccountPage from "../pages/AccountPage/AccountPage.js";
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
        element: <PublicRoute><AccountPage view="login"/></PublicRoute>
      },
      {
        path: "signup",
        element: <PublicRoute><AccountPage view='signup'/></PublicRoute>
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
