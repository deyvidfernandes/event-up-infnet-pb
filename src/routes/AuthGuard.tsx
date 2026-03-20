import { Navigate } from "react-router";
import { isLogged } from "../lib/util/mockLocalStorage";
import { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isLogged()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

type PublicRouteProps = {
  children: ReactNode;
};

export function PublicRoute({ children }: PublicRouteProps) {
  if (isLogged()) {
    return <Navigate to="/u" replace />;
  }
  return children;
}