import PropTypes from "prop-types";
import SimpleBarReact from "simplebar-react";

// @mui
import { alpha, styled } from "@mui/material/styles";
import { Box } from "@mui/material";

//

interface ScrollbarProps {
  children: React.ReactNode;
  sx?: object;
}

// ----------------------------------------------------------------------

const RootStyle = styled("div")(() => ({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
  backgroundColor: "#111c43",
  color: "#a3aed1",
}));

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  color: "#a3aed1 !important",
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&:before": {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 10,
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6,
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
  },
}));

// ----------------------------------------------------------------------

const Scrollbar: React.FC<ScrollbarProps> = ({ children, sx, ...other }) => {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  if (isMobile) {
    return (
      <Box sx={{ overflowX: "auto", ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <RootStyle>
      <SimpleBarStyle sx={sx} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
};

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default Scrollbar;
