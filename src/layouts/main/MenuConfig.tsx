// components
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: "Trang chủ",
    icon: <Iconify icon={"eva:home-fill"} {...ICON_SIZE} />,
    path: "/",
  },

  {
    title: "Giới thiệu",
    path: "/giothieu",
    icon: <Iconify icon={"eva:file-fill"} {...ICON_SIZE} />,
  },
  {
    title: "Tin tức",
    path: "/tintuc",
    icon: <Iconify icon={"eva:file-fill"} {...ICON_SIZE} />,
  },
  {
    title: "Dịch vụ",
    path: "/dichvu",
    icon: <Iconify icon={"eva:file-fill"} {...ICON_SIZE} />,
  },
];

export default menuConfig;
