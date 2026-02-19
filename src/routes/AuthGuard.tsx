import { Navigate } from "react-router";
import { isLogged } from "../util/mockLocalStorage";

export function ProtectedRoute({ children }) {
  if (!isLogged()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export function PublicRoute({ children }) {
  if (isLogged()) {
    return <Navigate to="/u" replace />;
  }
  return children;
}