import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";
// routes
import { PATH_DASHBOARD } from "../routes/paths";

// ----------------------------------------------------------------------

interface GuestGuardProps {
  children: PropTypes.ReactNodeLike;
}

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, userLogin } = useAppSelector((state) => state.admin);
  console.log("userLogin",  userLogin);
  if (isAuthenticated || userLogin) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
