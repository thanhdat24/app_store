import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
import MainLayout from "../layouts/main";
import Cart from "../pages/Cart/CartWidget";
import Checkout from "../pages/Checkout/Checkout";
import Detail from "../pages/Detail/Detail";
import HomePage from "../pages/Home/Home";
import { Login } from "../sections/auth";
import Profile from "../pages/Profile/Profile";
import Search from "../pages/Search/Search";
import DashboardLayout from "../layouts/dashboard";
import { PATH_AFTER_LOGIN } from "../utils/config";
import GeneralApp from "../pages/Dashboard/GeneralApp";
import CustomerList from "../pages/Dashboard/Customer/CustomerList";
import Account from "../pages/Dashboard/Customer/Account";

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
          element: <Login />,
        },
      ],
    },

    // Dashboard Routes
    {
      path: "admin",
      element: <DashboardLayout />,
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
            { path: "account", element: <Account /> },
          ],
        },
      ],
    },
    // Main Routes
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        {
          path: "carts",
          element: <Cart />,
        },
        {
          path: "detail",
          children: [{ path: ":id", element: <Detail /> }],
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "search",
          element: <Search />,
        },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
