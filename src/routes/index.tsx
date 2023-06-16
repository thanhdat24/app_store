import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
import { Login } from "../sections/auth";
import DashboardLayout from "../layouts/dashboard";
import { PATH_AFTER_LOGIN } from "../utils/config";
import GeneralApp from "../pages/Dashboard/GeneralApp";
import CustomerList from "../pages/Dashboard/Customer/CustomerList";
import Account from "../pages/Dashboard/Customer/Account";
import CustomerAction from "../pages/Dashboard/Customer/CustomerAction";
import CustomerTypeList from "../pages/Dashboard/Customer/CustomerTypeList";
import CustomerActionType from "../pages/Dashboard/Customer/CustomerActionType";
import ReceiptList from "../pages/Dashboard/Receipt/ReceiptList";
import ReceiptAction from "../pages/Dashboard/Receipt/ReceiptAction";
import BillingPeriodList from "../pages/Dashboard/BillingPeriod/BillingPeriodList";
import StaffList from "../pages/Dashboard/Staff/StaffList";
import StaffAction from "../pages/Dashboard/Staff/StaffAction";
import PermissionList from "../pages/Dashboard/Permission/PermissionList";
import PermissionAction from "../pages/Dashboard/Permission/PermissionAction";
import DistrictList from "../pages/Dashboard/District/DistrictList";
import DistrictAction from "../pages/Dashboard/District/DistrictAction";
import WardsAction from "../pages/Dashboard/Wards/WardsAction";
import WardsList from "../pages/Dashboard/Wards/WardsList";
import RevenueRoutesList from "../pages/Dashboard/RevenueRoutes/RevenueRoutesList";
import RevenueRoutesAction from "../pages/Dashboard/RevenueRoutes/RevenueRoutesAction";
import BillingPeriodAction from "../pages/Dashboard/BillingPeriod/BillingPeriodAction";
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";

type Props = {};

const Loadable = (Component: React.ComponentType<any>) => (props: any) => {
  const { pathname } = useLocation();

  return (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router({}: Props) {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
      ],
    },

    // Dashboard Routes
    {
      path: "admin",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: "dashboard", element: <GeneralApp /> },
        {
          path: "user",
          children: [
            {
              element: <Navigate to="/admin/user/profile" replace />,
              index: true,
            },

            { path: "list", element: <CustomerList /> },
            { path: "new", element: <CustomerAction /> },
            { path: "account", element: <Account /> },
            { path: ":id/edit", element: <CustomerAction /> },
          ],
        },
        {
          path: "user-type",
          children: [
            {
              element: <Navigate to="/admin/user-type/list" replace />,
              index: true,
            },

            { path: "list", element: <CustomerTypeList /> },
            { path: "new", element: <CustomerActionType /> },
            { path: ":id/edit", element: <CustomerActionType /> },
          ],
        },
        {
          path: "billing-period",
          children: [
            {
              element: <Navigate to="/admin/billing-period/list" replace />,
              index: true,
            },
            { path: "list", element: <BillingPeriodList /> },
            { path: "new", element: <BillingPeriodAction /> },
          ],
        },
        {
          path: "receipt",
          children: [
            {
              element: <Navigate to="/admin/receipt/list" replace />,
              index: true,
            },
            { path: "list", element: <ReceiptList /> },
            { path: "user/:id/new", element: <ReceiptAction /> },
            { path: "user/:id/edit", element: <ReceiptAction /> },
          ],
        },

        {
          path: "staff",
          children: [
            {
              element: <Navigate to="/admin/staff/list" replace />,
              index: true,
            },
            { path: "list", element: <StaffList /> },
            { path: "new", element: <StaffAction /> },
            { path: ":id/edit", element: <StaffAction /> },
          ],
        },
        {
          path: "permission",
          children: [
            {
              element: <Navigate to="/admin/permission/list" replace />,
              index: true,
            },
            { path: "list", element: <PermissionList /> },
            { path: "new", element: <PermissionAction /> },
            { path: ":id/edit", element: <PermissionAction /> },
          ],
        },
        {
          path: "district",
          children: [
            {
              element: <Navigate to="/admin/district/list" replace />,
              index: true,
            },
            { path: "list", element: <DistrictList /> },
            { path: "new", element: <DistrictAction /> },
            { path: ":id/edit", element: <DistrictAction /> },
          ],
        },
        {
          path: "wards",
          children: [
            {
              element: <Navigate to="/admin/wards/list" replace />,
              index: true,
            },
            { path: "list", element: <WardsList /> },
            { path: "new", element: <WardsAction /> },
            { path: ":id/edit", element: <WardsAction /> },
          ],
        },
        {
          path: "revenue-routes",
          children: [
            {
              element: <Navigate to="/admin/revenue-routes/list" replace />,
              index: true,
            },
            { path: "list", element: <RevenueRoutesList /> },
            { path: "new", element: <RevenueRoutesAction /> },
            { path: ":id/edit", element: <RevenueRoutesAction /> },
          ],
        },
      ],
    },
    // Main Routes
    {
      path: "/",
      element: <Navigate to="/auth/login" replace />,
    },
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
