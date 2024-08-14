import { useAuth } from "@/context/auth-context";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

function AuthMiddleware({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AuthMiddleware;
