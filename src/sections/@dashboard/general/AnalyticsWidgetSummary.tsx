import PropTypes from "prop-types";
// @mui
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils
import Iconify from "../../../components/Iconify";
// components

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

interface AnalyticsWidgetSummaryProps {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error";
  icon: string;
  title: string;
  total: number;
}

export default function AnalyticsWidgetSummary({
  title,
  total,
  icon,
  color = "primary",
}: AnalyticsWidgetSummaryProps) {
  return (
    <RootStyle
      sx={{
        color:
          color === "success"
            ? "rgb(0, 75, 80)"
            : color === "info"
            ? "rgb(0, 55, 104)"
            : color === "warning"
            ? "rgb(122, 65, 0)"
            : color === "error"
            ? "rgb(122, 9, 22)"
            : "",
        background:
          color === "success"
            ? "linear-gradient(135deg, rgba(91, 228, 155, 0.2), rgba(0, 167, 111, 0.2)) rgb(255, 255, 255)"
            : color === "info"
            ? "linear-gradient(135deg, rgba(97, 243, 243, 0.2), rgba(0, 184, 217, 0.2)) rgb(255, 255, 255)"
            : color === "warning"
            ? "linear-gradient(135deg, rgba(255, 214, 102, 0.2), rgba(255, 171, 0, 0.2)) rgb(255, 255, 255)"
            : color === "error"
            ? "linear-gradient(135deg, rgba(255, 172, 130, 0.2), rgba(255, 86, 48, 0.2)) rgb(255, 255, 255)"
            : "",
            borderRadius: "16px",
      }}
    >
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette[color].dark,
              0
            )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{total}</Typography>
      <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
        {title}
      </Typography>
    </RootStyle>
  );
}
