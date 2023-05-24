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
};
