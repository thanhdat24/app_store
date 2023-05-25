// ----------------------------------------------------------------------
// @mui
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

export default function Card() {
  const theme = useTheme();
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          position: "relative",
          boxShadow: `0 0 2px 0 ${alpha(
            "#919EAB",
            0.2
          )}, 0 12px 24px -4px ${alpha("#919EAB", 0.12)}`,
          borderRadius: Number(theme.shape.borderRadius) * 2,
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: "h6" },
        subheaderTypographyProps: {
          variant: "body2",
          marginTop: theme.spacing(0.5),
        },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
  };
}
