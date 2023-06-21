// @mui
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
export default function Button(theme: Theme) {
  const transparent = alpha("#919EAB", 0.16);
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            boxShadow: "none",
          },
        },
        sizeLarge: {
          height: 48,
        },
        // contained
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: `0 8px 16px 0 ${transparent}`,
          "&:hover": {
            backgroundColor: theme.palette.grey[400],
          },
        },
        // containedPrimary: {
        //   boxShadow: theme.customShadows.primary,
        // },
        // containedSecondary: {
        //   boxShadow: theme.customShadows.secondary,
        // },
        // containedInfo: {
        //   boxShadow: theme.customShadows.info,
        // },
        // containedSuccess: {
        //   boxShadow: theme.customShadows.success,
        // },
        // containedWarning: {
        //   boxShadow: theme.customShadows.warning,
        // },
        // containedError: {
        //   boxShadow: theme.customShadows.error,
        // },
        // outlined
        outlinedInherit: {
          border: `1px solid ${alpha("#919EAB", 0.32)}`,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
