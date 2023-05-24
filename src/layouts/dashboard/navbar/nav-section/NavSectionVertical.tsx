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
  fontWeight: "700",
  lineHeight: "1.5",
  fontSize: " 0.75rem",
  color: theme.palette.text.primary,
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

interface NavSectionVerticalProps {
  navConfig: any;
  [key: string]: any;
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
  ...other
}: NavSectionVerticalProps) => {
  return (
    <Box {...other}>
      {navConfig.map((group: NavGroup) => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle subheader={group.subheader} />

          {group.items.map((list) => (
            <NavListRoot key={list.title} list={list} />
          ))}
        </List>
      ))}
    </Box>
  );
};

NavSectionVertical.propTypes = {
  navConfig: PropTypes.array,
};

export default NavSectionVertical;
