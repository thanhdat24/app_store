import { useState, useEffect } from "react";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import { Box, Link, Stack, ListItem } from "@mui/material";
// components

// ----------------------------------------------------------------------

const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginRight: theme.spacing(5),
  textDecoration: "none",
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
  "&:hover": {
    opacity: 0.48,
    textDecoration: "none",
  },
}));

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 0,
  marginTop: theme.spacing(3),
  color: theme.palette.text.secondary,
  transition: theme.transitions.create("color"),
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

// ----------------------------------------------------------------------

interface NavConfig {
  title: string;
  path: string;
  children: Array<{
    subheader: string;
    items: Array<{ title: string; path: string }>;
  }>;
}

interface MenuDesktopItemProps {
  isHome: boolean;
  isOffset: boolean;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  item: any;
}

interface Menu {
  isHome: boolean;
  isOffset: boolean;
  item: any;
}

interface IconBulletProps {
  type: "item" | "subheader";
}

type ChildItemType = {
  title: string;
  path: string;
};

type ChildrenType = {
  subheader: string;
  items: ChildItemType[];
};

type Props = {
  children: ChildrenType[];
};

function IconBullet({ type = "item" }: IconBulletProps) {
  return (
    <Box sx={{ width: 24, height: 16, display: "flex", alignItems: "center" }}>
      <Box
        component="span"
        sx={{
          ml: "2px",
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: "currentColor",
          ...(type !== "item" && {
            ml: 0,
            width: 8,
            height: 2,
            borderRadius: 2,
          }),
        }}
      />
    </Box>
  );
}
export default function Menu({ isOffset, isHome, item }: Menu) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack direction="row">
      {item.map((link: any) => (
        <MenuDesktopItem
          key={link.title}
          item={link}
          isOpen={open}
          onOpen={handleOpen}
          onClose={handleClose}
          isOffset={isOffset}
          isHome={isHome}
        />
      ))}
    </Stack>
  );
}

function MenuDesktopItem({
  item,
  isHome,
  isOpen,
  isOffset,
  onOpen,
  onClose,
}: MenuDesktopItemProps) {
  const { title, path, children } = item;
  const transparent = alpha("#919EAB", 0.16);
  return (
    <LinkStyle
      to={path}
      component={RouterLink}
      end={path === "/"}
      sx={{
        ...(isHome && { color: "common.black" }),
        ...(isOffset && { color: "text.primary" }),
        "&.active": {
          color: "primary.main",
        },
      }}
    >
      {title}
    </LinkStyle>
  );
}
