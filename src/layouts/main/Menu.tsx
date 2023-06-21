import { useState, useEffect } from "react";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Link, Stack } from "@mui/material";
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

// ----------------------------------------------------------------------

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

type ChildItemType = {
  title: string;
  path: string;
};

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

function MenuDesktopItem({ item, isHome, isOffset }: MenuDesktopItemProps) {
  const { title, path } = item;
  return (
    <LinkStyle
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
