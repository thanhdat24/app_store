import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { List, Box, ListSubheader } from "@mui/material";
//
import NavListRoot from "./NavList";

// ----------------------------------------------------------------------

type ListSubheaderStyleProps = {
  subheader: string;
};

export const ListSubheaderStyle = styled(
  ({ subheader, ...rest }: ListSubheaderStyleProps) => (
    <ListSubheader {...rest} disableSticky disableGutters>
      {subheader}
    </ListSubheader>
  )
)(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  fontFamily: "Public Sans,sans-serif",
  color: "#a3aed1 !important",
  fontWeight: "700",
  lineHeight: "1.5",
  fontSize: " 0.75rem",
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

interface NavSectionVerticalProps {
  navConfig: any;
  [key: string]: any;
  userLogin: any;
}

interface NavGroup {
  subheader: string;
  items: NavItem[];
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const NavSectionVertical = ({
  navConfig,
  userLogin,
  ...other
}: NavSectionVerticalProps) => {
  return (
    <Box {...other}>
      {navConfig.map((group: NavGroup) => {
        if (
          userLogin.USERNAME === "admin" ||
          (userLogin.CHITIETPHANQUYENs.some(
            (item: any) => item.QUYEN.TENQUYEN === "Nhân viên thu ngân"
          )
            ? group.subheader === "Quản lý khách hàng" ||
              group.subheader === "Tổng quan" ||
              group.subheader === "Quản lý thông tin sử dụng"
            : userLogin.CHITIETPHANQUYENs.some(
                (item: any) => item.QUYEN.TENQUYEN === "Quản trị hệ thống"
              )
            ? group.subheader === "Tổng quan" ||
              group.subheader === "Quản lý thông tin sử dụng"
            : userLogin.CHITIETPHANQUYENs.some(
                (item: any) => item.QUYEN.TENQUYEN === "Nhân viên quản trị"
              ) && group.subheader === "Quản lý khách hàng")
        ) {
          return (
            <List key={group.subheader} disablePadding sx={{ px: 2 }}>
              <ListSubheaderStyle subheader={group.subheader} />
              {group.items
                .filter((item) => {
                  const isNhanVienThuNgan = userLogin.CHITIETPHANQUYENs.some(
                    (chitietphanquyen: any) =>
                      chitietphanquyen.QUYEN.TENQUYEN === "Nhân viên thu ngân"
                  );
                  const isQuanTriHeThong = userLogin.CHITIETPHANQUYENs.some(
                    (chitietphanquyen: any) =>
                      chitietphanquyen.QUYEN.TENQUYEN === "Quản trị hệ thống"
                  );

                  const isNhanVienQuanTri = userLogin.CHITIETPHANQUYENs.some(
                    (chitietphanquyen: any) =>
                      chitietphanquyen.QUYEN.TENQUYEN === "Nhân viên quản trị"
                  );
                  if (isNhanVienThuNgan && isQuanTriHeThong) {
                    return (
                      item.title === "Kỳ thu" ||
                      item.title === "Khách hàng" ||
                      item.title === "Phiếu thu" ||
                      item.title === "Thống kê"
                    );
                  } else if (isNhanVienThuNgan) {
                    return (
                      item.title === "Phiếu thu" ||
                      item.title === "Khách hàng" ||
                      item.title === "Thống kê"
                    );
                  } else if (isQuanTriHeThong) {
                    return item.title === "Kỳ thu" || item.title === "Thống kê";
                  }

                  if (isNhanVienQuanTri) {
                    return item.title === "Khách hàng";
                  }

                  return true;
                })
                .map((list) => (
                  <NavListRoot key={list.title} list={list} />
                ))}
            </List>
          );
        } else {
          return null; // Skip rendering for other cases
        }
      })}
    </Box>
  );
};

NavSectionVertical.propTypes = {
  navConfig: PropTypes.array,
};

export default NavSectionVertical;
