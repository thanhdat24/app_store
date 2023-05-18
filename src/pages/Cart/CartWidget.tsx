import { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";
// @mui
import { alpha, styled } from "@mui/material/styles";
import { Badge } from "@mui/material";
import Iconify from "../../components/Iconify";
// components

type Props = {};

const RootStyle = styled(RouterLink)(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: "flex",
  cursor: "pointer",
  position: "fixed",
  alignItems: "center",
  top: theme.spacing(12),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: `-12px 12px 32px -4px ${alpha(
    theme.palette.mode === "light"
      ? theme.palette.grey[600]
      : theme.palette.common.black,
    0.36
  )}`,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create("opacity"),
  "&:hover": { opacity: 0.72 },
}));

export default function CartWidget({}: Props) {
  return (
    <RootStyle to="/checkout">
      <Badge showZero badgeContent={0} color="error" max={99}>
        <Iconify icon={"eva:shopping-cart-fill"} width={24} height={24} />
      </Badge>
    </RootStyle>
  );
}
