import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { ROUTE } from '@constants/_common';

interface IProps {
  allowed: boolean;
  redirectPath?: string;
  children?: ReactNode;
}

function ProtectedRoute(props: IProps) {
  const {
    allowed = false,
    redirectPath = ROUTE.LOGIN,
    children = null,
  } = props;
  if (!allowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children || <Outlet />;
}

export default ProtectedRoute;
