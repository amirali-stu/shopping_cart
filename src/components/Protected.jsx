import { useAuth } from "../context/AuthContext";

export function Protected({ children, msg = null }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : msg;
}

export default Protected;
