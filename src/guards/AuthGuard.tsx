import { FC, ReactNode, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// hooks
import { useAppSelector } from "../redux/store";
// sections
import { Login } from "../sections/auth";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  // const { isAuthenticated, isInitialized } = useAuth();
  const { isAuthenticated, userLogin } = useAppSelector((state) => state.admin);
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  if (!isAuthenticated && !userLogin) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

export default AuthGuard;
