import { memo } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/isAuth';

interface ProtectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/login', children }) => {
  const isAuth = useAuth();
  if (isAuth === false) return <Navigate to={redirectPath} />;
  return <>{children || <Outlet />}</>;
};

export default memo(ProtectedRoute);
