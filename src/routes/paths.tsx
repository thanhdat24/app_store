// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS = "/";
const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/admin";

export const PATH_AUTH = {
  home: ROOTS,
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
};

export const PATH_PAGE = {
  root: "/",
  page404: "/404",
  page500: "/500",
  components: "/components",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    dashboard: path(ROOTS_DASHBOARD, "/dashboard"),
  },
  user: {
    root: path(ROOTS_DASHBOARD, "/user"),
    new: path(ROOTS_DASHBOARD, "/user/new"),
    list: path(ROOTS_DASHBOARD, "/user/list"),
    account: path(ROOTS_DASHBOARD, "/user/account"),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/user/${id}/edit`),
  },
  userType: {
    root: path(ROOTS_DASHBOARD, "/user-type"),
    list: path(ROOTS_DASHBOARD, "/user-type/list"),
    new: path(ROOTS_DASHBOARD, "/user-type/new"),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/user-type/${id}/edit`),
  },
  staff: {
    root: path(ROOTS_DASHBOARD, "/staff"),
    new: path(ROOTS_DASHBOARD, "/staff/new"),
    list: path(ROOTS_DASHBOARD, "/staff/list"),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/staff/${id}/edit`),
  },
  revenueRoutes: {
    root: path(ROOTS_DASHBOARD, "/revenue-routes"),
    new: path(ROOTS_DASHBOARD, "/revenue-routes/new"),
    list: path(ROOTS_DASHBOARD, "/revenue-routes/list"),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/revenue-routes/${id}/edit`),
  },
  receipt: {
    root: path(ROOTS_DASHBOARD, "/receipt"),
    new: (id: number) => path(ROOTS_DASHBOARD, `/receipt/user/${id}/new`),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/receipt/user/${id}/edit`),
    list: path(ROOTS_DASHBOARD, "/receipt/list"),
    
  },

  billingPeriod: {
    root: path(ROOTS_DASHBOARD, "/billing-period"),
    list: path(ROOTS_DASHBOARD, "/billing-period/list"),
    new: path(ROOTS_DASHBOARD, "/billing-period/new"),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/billing-period/${id}/edit`),
  },
  permission: {
    root: path(ROOTS_DASHBOARD, "/permission"),
    list: path(ROOTS_DASHBOARD, "/permission/list"),
    new: path(ROOTS_DASHBOARD, "/permission/new"),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/permission/${id}/edit`),
  },
  district: {
    root: path(ROOTS_DASHBOARD, "/district"),
    list: path(ROOTS_DASHBOARD, "/district/list"),
    new: path(ROOTS_DASHBOARD, "/district/new"),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/district/${id}/edit`),
  },
  wards: {
    root: path(ROOTS_DASHBOARD, "/wards"),
    list: path(ROOTS_DASHBOARD, "/wards/list"),
    new: path(ROOTS_DASHBOARD, "/wards/new"),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/wards/${id}/edit`),
  },
};
