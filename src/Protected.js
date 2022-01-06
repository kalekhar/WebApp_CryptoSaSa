import { Navigate, Outlet } from "react-router-dom";
import auth from './Status/auth'

const ProtectedRoutes = () => {
  const isAuth = auth.isAuthenticated();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;