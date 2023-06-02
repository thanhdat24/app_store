// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Label from "../../../components/Label";
import SvgIconStyle from "../../../components/SvgIconStyle";

// ----------------------------------------------------------------------

type IconName =
  | "ic_user"
  | "ic_invoice"
  | "ic_analytics"
  | "ic_billing_period"
  | "ic_permission"
  | "ic_district"
  | "ic_wards";

const getIcon = (name: IconName): React.ReactNode => (
  <SvgIconStyle
    src={`/icons/${name}.svg`}
    sx={{ color: "#a3aed1", fill: "#a3aed1", width: 1, height: 1 }}
  />
);

const ICONS = {
  analytics: getIcon("ic_analytics"),
  user: getIcon("ic_user"),
  receipt: getIcon("ic_invoice"),
  billing: getIcon("ic_billing_period"),
  permission: getIcon("ic_permission"),
  district: getIcon("ic_district"),
  wards: getIcon("ic_wards"),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: "Tổng quan",
  //   items: [
  //     {
  //       title: "Thống kê",
  //       path: PATH_DASHBOARD.general.dashboard,
  //       icon: ICONS.analytics,
  //     },
  //   ],
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "Quản lý khách hàng",
    items: [
      // USER
      {
        title: "Khách hàng",
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: "Danh sách", path: PATH_DASHBOARD.user.list },
          { title: "Tạo", path: PATH_DASHBOARD.user.new },
          { title: "Tài khoản", path: PATH_DASHBOARD.user.account },
        ],
      },
      // Loại khách hàng
      {
        title: "Loại Khách hàng",
        path: PATH_DASHBOARD.userType.root,
        icon: ICONS.user,
        children: [
          { title: "Danh sách", path: PATH_DASHBOARD.userType.list },
          { title: "Tạo", path: PATH_DASHBOARD.userType.new },
        ],
      },
    ],
  },

  // {
  //   subheader: "Quản lý thông tin sử dụng",
  //   items: [
  //     // RECEIPT
  //     {
  //       title: "Kỳ thu",
  //       path: PATH_DASHBOARD.billingPeriod.root,
  //       icon: ICONS.billing,
  //       children: [
  //         { title: "Danh sách", path: PATH_DASHBOARD.billingPeriod.list },
  //         { title: "Tạo", path: PATH_DASHBOARD.billingPeriod.new },
  //       ],
  //     },
  //     {
  //       title: "Phiếu thu",
  //       path: PATH_DASHBOARD.receipt.root,
  //       icon: ICONS.receipt,
  //       children: [
  //         { title: "Danh sách", path: PATH_DASHBOARD.receipt.list },
  //         { title: "Tạo", path: PATH_DASHBOARD.receipt.new },
  //       ],
  //     },
  //   ],
  // },

  {
    subheader: "Quản lý danh mục hệ thống",
    items: [
      // RECEIPT
      {
        title: "Nhân viên",
        path: PATH_DASHBOARD.staff.root,
        icon: ICONS.user,
        children: [
          { title: "Danh sách", path: PATH_DASHBOARD.staff.list },
          { title: "Tạo", path: PATH_DASHBOARD.staff.new },
        ],
      },
      {
        title: "Quyền",
        path: PATH_DASHBOARD.permission.root,
        icon: ICONS.permission,
        children: [
          { title: "Danh sách", path: PATH_DASHBOARD.permission.list },
          { title: "Tạo", path: PATH_DASHBOARD.permission.new },
        ],
      },
      {
        title: "Quận Huyện",
        path: PATH_DASHBOARD.district.root,
        icon: ICONS.district,
        children: [
          { title: "Danh sách", path: PATH_DASHBOARD.district.list },
          { title: "Tạo", path: PATH_DASHBOARD.district.new },
        ],
      },
      {
        title: "Xã phường",
        path: PATH_DASHBOARD.wards.root,
        icon: ICONS.wards,
        children: [
          { title: "Danh sách", path: PATH_DASHBOARD.wards.list },
          { title: "Tạo", path: PATH_DASHBOARD.wards.new },
        ],
      },
      {
        title: "Tuyến thu",
        path: PATH_DASHBOARD.staff.root,
        icon: ICONS.user,
        children: [
          { title: "Danh sách", path: PATH_DASHBOARD.revenueRoutes.list },
          { title: "Tạo", path: PATH_DASHBOARD.revenueRoutes.new },
        ],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
];

export default navConfig;
