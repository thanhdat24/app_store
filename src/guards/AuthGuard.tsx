import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";
// routes
import { PATH_DASHBOARD, PATH_PAGE } from "../routes/paths";

// ----------------------------------------------------------------------

interface AuthGuardProps {
  children: PropTypes.ReactNodeLike;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  // const { isAuthenticated, userLogin } = useAppSelector((state) => state.admin);
  // if (isAuthenticated && userLogins?.role === "quản trị") {
  //   return <Navigate to={PATH_DASHBOARD.general.dashboard} />;
  // }
  return <>{children}</>;
}
