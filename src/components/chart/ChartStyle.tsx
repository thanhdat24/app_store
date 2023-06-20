// @mui
import { alpha, useTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

// utils
import cssStyles from "../../utils/cssStyles";

// ----------------------------------------------------------------------

export default function ChartStyle() {
  const theme = useTheme();

  return (
    <GlobalStyles
      styles={{
        "&.apexcharts-canvas": {
          // Tooltip
          ".apexcharts-xaxistooltip": {
            ...cssStyles(theme).bgBlur(),
            border: 0,
            color: theme.palette.text.primary,
            boxShadow: `0 0 2px 0 ${alpha(
              "#919EAB",
              0.24
            )}, -20px 20px 40px -4px ${alpha("#919EAB", 0.24)}`,
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            "&:before": { borderBottomColor: "transparent" },
            "&:after": {
              borderBottomColor: alpha(theme.palette.background.default, 0.8),
            },
          },
          ".apexcharts-tooltip.apexcharts-theme-light": {
            ...cssStyles(theme).bgBlur(),
            border: 0,
            boxShadow: `0 0 2px 0 ${alpha(
              "#919EAB",
              0.24
            )}, -20px 20px 40px -4px ${alpha("#919EAB", 0.24)}`,
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            "& .apexcharts-tooltip-title": {
              border: 0,
              textAlign: "center",
              fontWeight: theme.typography.fontWeightBold,
              backgroundColor: alpha("#919EAB", 0.16),
              color:
                theme.palette.text[
                  theme.palette.mode === "light" ? "secondary" : "primary"
                ],
            },
          },
          // Legend
          ".apexcharts-legend": {
            padding: 0,
          },
          ".apexcharts-legend-series": {
            display: "flex !important",
            alignItems: "center",
          },
          ".apexcharts-legend-marker": {
            marginRight: 8,
          },
          ".apexcharts-legend-text": {
            lineHeight: "18px",
            textTransform: "capitalize",
          },
        },
      }}
    />
  );
}
