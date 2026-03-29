import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FullscreenLoader } from "../feedback/FullscreenLoader";

export function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <FullscreenLoader label="Carregando..." />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
