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
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  pricing: "/pricing",
  payment: "/payment",
  about: "/about-us",
  contact: "/contact-us",
  faqs: "/faqs",
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
    edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
  },
  userType: {
    root: path(ROOTS_DASHBOARD, "/user-type"),
    list: path(ROOTS_DASHBOARD, "/user-type/list"),
    new: path(ROOTS_DASHBOARD, "/user-type/new"),
  },
  staff: {
    root: path(ROOTS_DASHBOARD, "/staff"),
    new: path(ROOTS_DASHBOARD, "/staff/new"),
    list: path(ROOTS_DASHBOARD, "/staff/list"),
  },
  receipt: {
    root: path(ROOTS_DASHBOARD, "/receipt"),
    new: path(ROOTS_DASHBOARD, "/receipt/new"),
    list: path(ROOTS_DASHBOARD, "/receipt/list"),
  },
  billingPeriod: {
    root: path(ROOTS_DASHBOARD, "/billing-period"),
    list: path(ROOTS_DASHBOARD, "/billing-period/list"),
    new: path(ROOTS_DASHBOARD, "/billing-period/new"),
  },
  permission: {
    root: path(ROOTS_DASHBOARD, "/permission"),
    list: path(ROOTS_DASHBOARD, "/permission/list"),
    new: path(ROOTS_DASHBOARD, "/permission/new"),
  },
  district: {
    root: path(ROOTS_DASHBOARD, "/district"),
    list: path(ROOTS_DASHBOARD, "/district/list"),
    new: path(ROOTS_DASHBOARD, "/district/new"),
  },
  wards: {
    root: path(ROOTS_DASHBOARD, "/wards"),
    list: path(ROOTS_DASHBOARD, "/wards/list"),
    new: path(ROOTS_DASHBOARD, "/wards/new"),
  },
};
