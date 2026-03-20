import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router";
import Layout from "../pages/layouts/Layout";
import AccountPage from "../pages/AccountPage/AccountPage";
import { ProtectedRoute, PublicRoute } from "./AuthGuard";
import HomePage from "../pages/HomePage/HomePage";
import HubLayout from "../pages/layouts/HubLayout";

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
        element: <ProtectedRoute><HubLayout /></ProtectedRoute>,
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
