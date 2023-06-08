import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { styled, useTheme } from "@mui/material/styles";
import { Box, Stack, Drawer } from "@mui/material";
import Logo from "../../../components/Logo";
import Scrollbar from "../../../components/Scrollbar";
import NavbarAccount from "./NavbarAccount";
import { NAVBAR } from "../../../utils/config";
import navConfig from "./NavConfig";
import { NavSectionVertical } from "./nav-section";
// hooks

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

type Props = {};

interface NavbarVerticalProps {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
}

const NavbarVertical: React.FC<NavbarVerticalProps> = ({
  isOpenSidebar,
  onCloseSidebar,
}) => {
  const theme = useTheme();

  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          // ...(isCollapse && { alignItems: "center" }),
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Logo />

          {/* {isDesktop && !isCollapse && (
            <CollapseButton
              onToggleCollapse={onToggleCollapse}
              collapseClick={collapseClick}
            />
          )} */}
        </Stack>

      </Stack>

      <NavSectionVertical navConfig={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      {/* {!isCollapse && <NavbarDocs />} */}
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: NAVBAR.DASHBOARD_WIDTH,
        },
      }}
    >
      <Drawer
        open
        variant="persistent"
        PaperProps={{
          sx: {
            width: NAVBAR.DASHBOARD_WIDTH,
            borderRightStyle: "dashed",
            bgcolor: "background.default",
            transition: (theme) =>
              theme.transitions.create("width", {
                duration: theme.transitions.duration.standard,
              }),
          },
        }}
      >
        {renderContent}
      </Drawer>
    </RootStyle>
  );
};

NavbarVertical.propTypes = {
  isOpenSidebar: PropTypes.bool.isRequired,
  onCloseSidebar: PropTypes.func.isRequired,
};

export default NavbarVertical;
