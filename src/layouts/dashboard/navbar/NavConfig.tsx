// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Label from "../../../components/Label";
import SvgIconStyle from "../../../components/SvgIconStyle";

// ----------------------------------------------------------------------

type IconName =
  | "ic_blog"
  | "ic_cart"
  | "ic_chat"
  | "ic_shipper"
  | "ic_color"
  | "ic_shoes"
  | "ic_brand"
  | "ic_user"
  | "ic_obj"
  | "ic_cate"
  | "ic_promotion"
  | "ic_invoice"
  | "ic_rating"
  | "ic_ecommerce"
  | "ic_analytics"
  | "ic_dashboard";

const getIcon = (name: IconName): React.ReactNode => (
  <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon("ic_blog"),
  cart: getIcon("ic_cart"),
  chat: getIcon("ic_chat"),
  shipper: getIcon("ic_shipper"),
  color: getIcon("ic_color"),
  shoes: getIcon("ic_shoes"),
  brand: getIcon("ic_brand"),
  user: getIcon("ic_user"),
  obj: getIcon("ic_obj"),
  cate: getIcon("ic_cate"),
  // kanban: getIcon('ic_kanban'),
  promotion: getIcon("ic_promotion"),
  invoice: getIcon("ic_invoice"),
  rating: getIcon("ic_rating"),

  ecommerce: getIcon("ic_ecommerce"),
  analytics: getIcon("ic_analytics"),
  dashboard: getIcon("ic_dashboard"),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "Tổng quan",
    items: [
      {
        title: "Thống kê",
        path: PATH_DASHBOARD.general.dashboard,
        icon: ICONS.analytics,
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "Quản lý",
    items: [
      // USER
      {
        title: "Khách hàng",
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: "Danh sách", path: PATH_DASHBOARD.user.list },
          // { title: 'Tạo', path: PATH_DASHBOARD.user.new },

          { title: "Tài khoản", path: PATH_DASHBOARD.user.account },
        ],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
];

export default navConfig;
