import PropTypes from "prop-types";
// icons
import { Icon } from "@iconify/react";
// @mui
import { Box, BoxProps } from "@mui/material";

// ----------------------------------------------------------------------

interface IconifyProps extends BoxProps {
  icon: React.ReactElement | string;
}

export default function Iconify({ icon, sx, ...other }: IconifyProps) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
};
