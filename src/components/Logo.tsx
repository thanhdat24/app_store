import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

type LogoProps = {
  disabledLink?: boolean;
  sx?: object;
};

export default function Logo({ disabledLink = false, sx }: LogoProps) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img width={80} height={80} src="/logo/Bluewass.png" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
