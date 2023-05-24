// @mui
import { alpha, styled } from "@mui/material/styles";
import { ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import { NAVBAR, ICON } from "../../../../utils/config";

// config

// ----------------------------------------------------------------------

interface ListItemStyleProps {
  activeRoot?: boolean;
  activeSub?: boolean;
  subItem?: boolean;
  component?: any;
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
}

export const ListItemStyle = styled(ListItemButton)<ListItemStyleProps>(
  ({ activeRoot, activeSub, subItem, theme }) => ({
    ...theme.typography.body2,
    position: "relative",
    height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
    textTransform: "capitalize",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5),
    color: theme.palette.text.secondary,

    borderRadius: theme.shape.borderRadius,
    // activeRoot
    ...(activeRoot && {
      ...theme.typography.subtitle2,
      color: theme.palette.primary.main,
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity
      ),
    }),
    // activeSub
    ...(activeSub && {
      ...theme.typography.subtitle2,
      color: theme.palette.text.primary,
      fontFamily: "Public Sans,sans-serif",
      fontWeight: "700",
    }),
    // subItem
    ...(subItem && {
      height: NAVBAR.DASHBOARD_ITEM_SUB_HEIGHT,
    }),
  })
);

interface ListItemTextStyleProps {
  primary: any;
}

export const ListItemTextStyle = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== "isCollapse",
})<ListItemTextStyleProps>(({ theme, primary }) => ({
  whiteSpace: "nowrap",
  transition: theme.transitions.create(["width", "opacity"], {
    duration: theme.transitions.duration.shorter,
  }),
  fontWeight: "400",
  marginTop: "4px",
  marginBottom: "0px",
  color: "#637381",
  fontFamily: "Public Sans,sans-serif",
}));

export const ListItemIconStyle = styled(ListItemIcon)({
  width: ICON.NAVBAR_ITEM,
  height: ICON.NAVBAR_ITEM,
  minWidth: "auto",
  marginRight: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg": { width: "100%", height: "100%" },
});
