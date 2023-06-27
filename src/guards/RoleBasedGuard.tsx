import { FC, ReactNode } from "react";
import { Container, Alert, AlertTitle } from "@mui/material";
import { useAppSelector } from "../redux/store";

interface RoleBasedGuardProps {
  children: ReactNode;
}

const useCurrentRole = (): string => {
  // Logic here to get current user role
  const role = "admin";
  return role;
};

const RoleBasedGuard: FC<RoleBasedGuardProps> = ({ children }) => {
  const accessibleRoles = [
    "Quản trị hệ thống",
    "Nhân viên quản trị",
    "Nhân viên thu ngân",
  ];
  const { userLogin } = useAppSelector((state) => state.admin);
  const currentRole = useCurrentRole();

  if (!accessibleRoles.includes(currentRole)) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  } else {
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default RoleBasedGuard;
