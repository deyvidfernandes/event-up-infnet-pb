import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router";
import AccountPage from "../pages/AccountPage/AccountPage";
import { ProtectedRoute, PublicRoute } from "./AuthGuard";
import LoggedLayout from "../layouts/LoggedLayout/LoggedLayout";
import NewEventPage from "@/pages/NewEventPage/NewEventPage";
import UserHomePage from "../pages/UserHomePage/UserHomePage";
import EventDetailsPage from "@/pages/EventDetailsPage/EventDetailsPage";
import SubscribedEventsPage from "@/pages/SubscribedEventsPage/SubscribedEventsPage";

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
        element: <ProtectedRoute><LoggedLayout /></ProtectedRoute>,
        children: [
          {
            index: true,
            element: <Navigate to="home" replace />
          },
          {
            path: "home",
            element: <UserHomePage/>
          },
          {
            path: "novo-evento",
            element: <NewEventPage />
          },
          {
            path: "detalhe-evento/:id",
            element: <EventDetailsPage />
          },
          {
            path: "inscricoes",
            element: <SubscribedEventsPage />
          }
        ]
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
