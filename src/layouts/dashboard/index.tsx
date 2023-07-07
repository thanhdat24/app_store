import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// @mui
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
// config
import { HEADER, NAVBAR } from "../../utils/config";
//
import NavbarVertical from "./navbar/NavbarVertical";
import DashboardHeader from "./header";
import { useAppDispatch } from "../../redux/store";

// ----------------------------------------------------------------------

const MainStyle = styled("main")(({ theme }) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT + 24,
  paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create("margin-left", {
      duration: theme.transitions.duration.shorter,
    }),
    // ...(collapseClick && {
    //   marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    // }),
  },
}));

type Props = {};

export default function DashboardLayout({}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: { lg: "flex" },
        minHeight: { lg: 1 },
      }}
    >
      <DashboardHeader />

      <NavbarVertical
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />

      <MainStyle>
        <Outlet />
      </MainStyle>
    </Box>
  );
}
