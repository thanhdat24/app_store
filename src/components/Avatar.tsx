import PropTypes from "prop-types";
import { forwardRef } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Avatar as MUIAvatar,
  AvatarProps as MUIAvatarProps,
} from "@mui/material";

// ----------------------------------------------------------------------

interface AvatarProps extends Omit<MUIAvatarProps, "color"> {
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error";
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ color = "default", children, sx, ...other }, ref) => {
    const theme = useTheme();

    if (color === "default") {
      return (
        <MUIAvatar ref={ref} sx={sx} {...other}>
          {children}
        </MUIAvatar>
      );
    }

    return (
      <MUIAvatar
        ref={ref}
        sx={{
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette[color].contrastText,
          backgroundColor: theme.palette[color].main,
          ...sx,
        }}
        {...other}
      >
        {children}
      </MUIAvatar>
    );
  }
);

Avatar.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
  color: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
  ]),
};

export default Avatar;
