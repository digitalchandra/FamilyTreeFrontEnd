import { Navigate } from "react-router-dom";
import TokenService from "../utils/TokenService";

const ProtectedRoute = ({ children }) => {

  const token = TokenService.getToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;