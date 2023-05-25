import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, Link, ListItemText } from "@mui/material";
//
import { ListItemStyle, ListItemTextStyle, ListItemIconStyle } from "./style";
import { isExternalLink } from ".";
import Iconify from "../../../../components/Iconify";

// ----------------------------------------------------------------------

interface NavItemRootProps {
  item: any;
  open?: boolean;
  active?: boolean;
  onOpen?: VoidFunction;
}

const NavItemRoot = ({
  item,
  open = false,
  active,
  onOpen,
}: NavItemRootProps) => {
  const { title, path, icon, info, children } = item;

  const renderContent = (
    <>
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
      <ListItemTextStyle disableTypography primary={title} />

      <>
        {info && info}
        {children && <ArrowIcon open={open} />}
      </>
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeRoot={active}>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle component={Link} href={path} target="_blank" rel="noopener">
      {renderContent}
    </ListItemStyle>
  ) : (
    <ListItemStyle component={RouterLink} to={path} activeRoot={active}>
      {renderContent}
    </ListItemStyle>
  );
};

NavItemRoot.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  item: PropTypes.shape({
    children: PropTypes.array,
    icon: PropTypes.any,
    info: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

export default NavItemRoot;

interface NavItemSubProps {
  item: any;
  open?: boolean;
  active?: boolean;
  onOpen?: VoidFunction;
}

const NavItemSub = ({ item, open, active, onOpen }: NavItemSubProps) => {
  const { title, path, info, children } = item;

  const renderContent = (
    <>
      <DotIcon active={active || false} />
      <ListItemText disableTypography primary={title} />
      {info && info}
      {children && <ArrowIcon open={open || false} />}
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle
      component={Link}
      href={path}
      target="_blank"
      rel="noopener"
      subItem
    >
      {renderContent}
    </ListItemStyle>
  ) : (
    <ListItemStyle component={RouterLink} to={path} activeSub={active} subItem>
      {renderContent}
    </ListItemStyle>
  );
};

NavItemSub.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  item: PropTypes.shape({
    children: PropTypes.array,
    info: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
  }),
};

export { NavItemSub };
// ----------------------------------------------------------------------

interface DotIconProps {
  active: boolean;
}

const DotIcon = ({ active }: DotIconProps) => {
  return (
    <ListItemIconStyle>
      <Box
        component="span"
        sx={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: "text.disabled",

          transition: (theme) =>
            theme.transitions.create("transform", {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: "scale(2)",
            bgcolor: "primary.main",
          }),
        }}
      />
    </ListItemIconStyle>
  );
};

DotIcon.propTypes = {
  active: PropTypes.bool,
};

export { DotIcon };
// ----------------------------------------------------------------------

interface ArrowIconProps {
  open: boolean;
}

const ArrowIcon = ({ open }: ArrowIconProps) => {
  return (
    <Iconify
      icon={open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
      sx={{ width: 16, height: 16, ml: 1 }}
    />
  );
};

ArrowIcon.propTypes = {
  open: PropTypes.bool,
};

export { ArrowIcon };
